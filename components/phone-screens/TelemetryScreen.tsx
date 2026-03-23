import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const telemetryData = [
  { label: "Lat", value: "37.3318°" },
  { label: "Lng", value: "-122.031°" },
  { label: "Speed", value: "35 mph" },
  { label: "Heading", value: "NW 315°" },
  { label: "Altitude", value: "72m" },
  { label: "Accuracy", value: "±2m" },
];

const apiCalls = [
  { method: "GET", endpoint: "/v1/geocode/reverse", status: 200, time: "38ms" },
  { method: "POST", endpoint: "/v1/route/driving", status: 200, time: "95ms" },
  { method: "GET", endpoint: "/v1/places/search", status: 200, time: "52ms" },
  { method: "GET", endpoint: "/v1/telemetry/stream", status: 200, time: "18ms" },
  { method: "POST", endpoint: "/v1/markers/batch", status: 201, time: "110ms" },
];

export const TelemetryScreen = () => {
  const [visibleApis, setVisibleApis] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleApis((prev) => Math.min(prev + 1, apiCalls.length));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[hsl(var(--map-dark))] relative overflow-hidden p-3">
      {/* Scanline effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent scanline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="flex items-center gap-2 mb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(225,85%,55%)" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <span className="text-[12px] font-semibold text-foreground">Telemetry</span>
        <div className="ml-auto flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="text-[8px] text-primary font-medium font-mono">STREAMING</span>
        </div>
      </motion.div>

      {/* Mini radar */}
      <motion.div
        className="relative w-20 h-20 mx-auto mb-3"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <svg viewBox="0 0 80 80" className="w-full h-full">
          {[15, 25, 35].map((r, i) => (
            <circle key={i} cx="40" cy="40" r={r} fill="none" stroke="hsl(225,85%,55%)" strokeWidth="0.5" opacity="0.25" />
          ))}
          <line x1="40" y1="5" x2="40" y2="75" stroke="hsl(225,85%,55%)" strokeWidth="0.3" opacity="0.2" />
          <line x1="5" y1="40" x2="75" y2="40" stroke="hsl(225,85%,55%)" strokeWidth="0.3" opacity="0.2" />
          {/* Sweep */}
          <motion.line
            x1="40"
            y1="40"
            x2="40"
            y2="5"
            stroke="hsl(225,85%,55%)"
            strokeWidth="1"
            opacity="0.6"
            style={{ transformOrigin: "40px 40px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          {/* Center dot */}
          <circle cx="40" cy="40" r="2.5" fill="hsl(225, 85%, 55%)" />
          {/* Blips */}
          <motion.circle cx="55" cy="28" r="1.5" fill="hsl(225,85%,65%)" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
          <motion.circle cx="25" cy="52" r="1.5" fill="hsl(225,85%,65%)" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 2 }} />
          <motion.circle cx="48" cy="55" r="1.5" fill="hsl(225,85%,65%)" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
        </svg>
      </motion.div>

      {/* Telemetry Grid */}
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {telemetryData.map((item, i) => (
          <motion.div
            key={item.label}
            className="bg-secondary/60 rounded-xl border border-primary/10 p-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.08, type: "spring" }}
          >
            <p className="text-[7px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
            <motion.p
              className="text-[10px] font-mono font-medium text-foreground mt-0.5"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {item.value}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* API Calls Log */}
      <motion.div
        className="bg-secondary/40 rounded-2xl border border-primary/10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="px-3 py-1.5 border-b border-border/50 flex items-center justify-between">
          <span className="text-[9px] font-semibold text-foreground/70">API Calls</span>
          <span className="text-[8px] font-mono text-primary/70">Multiple APIs</span>
        </div>
        {apiCalls.slice(0, visibleApis).map((api, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 px-3 py-1.5 border-b border-border/20 last:border-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className={`text-[8px] font-mono font-bold ${api.method === "GET" ? "text-accent" : "text-primary"}`}>
              {api.method}
            </span>
            <span className="text-[8px] font-mono text-foreground/50 flex-1 truncate">{api.endpoint}</span>
            <span className="text-[8px] font-mono text-primary/80">{api.status}</span>
            <span className="text-[8px] font-mono text-muted-foreground">{api.time}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
