import { motion } from "framer-motion";

// Cupertino area roads - stylized grid inspired by the reference map
const roads = [
  // Horizontal roads
  { d: "M0 100 Q60 95, 120 105 Q200 115, 314 98", delay: 0 },
  { d: "M0 190 Q80 185, 160 195 Q240 200, 314 185", delay: 0.15 },
  { d: "M0 280 Q100 275, 200 285 Q260 290, 314 278", delay: 0.3 },
  { d: "M0 370 Q70 365, 140 375 Q220 380, 314 365", delay: 0.45 },
  { d: "M0 460 Q90 455, 180 465 Q260 470, 314 458", delay: 0.6 },
  // Vertical roads
  { d: "M60 0 Q65 100, 55 200 Q50 300, 65 400 Q70 500, 60 596", delay: 0.1 },
  { d: "M140 0 Q145 120, 135 240 Q130 360, 145 480 Q148 540, 140 596", delay: 0.25 },
  { d: "M220 0 Q225 80, 215 160 Q210 300, 225 440 Q228 520, 220 596", delay: 0.4 },
  { d: "M280 0 Q285 100, 275 200 Q270 350, 285 500 Q288 550, 280 596", delay: 0.55 },
];

// Road labels - Cupertino street names
const streetLabels = [
  { x: 30, y: 95, text: "STEVENS CREEK BLVD", angle: -2, delay: 1.2 },
  { x: 20, y: 185, text: "HOMESTEAD RD", angle: -1, delay: 1.4 },
  { x: 50, y: 275, text: "BOLLINGER RD", angle: 1, delay: 1.6 },
  { x: 40, y: 365, text: "RAINBOW DR", angle: 0, delay: 1.8 },
  { x: 55, y: 10, text: "DE ANZA BLVD", angle: 88, delay: 1.3 },
  { x: 135, y: 10, text: "STELLING RD", angle: 88, delay: 1.5 },
  { x: 215, y: 10, text: "WOLFE RD", angle: 88, delay: 1.7 },
];

// POI markers - Cupertino landmarks
const markers = [
  { x: 160, y: 150, delay: 1.0, label: "Apple Park" },
  { x: 80, y: 280, delay: 1.4, label: "Cupertino City Hall" },
  { x: 240, y: 200, delay: 1.8, label: "Vallco Mall" },
  { x: 120, y: 400, delay: 2.2, label: "Memorial Park" },
];

// Buildings (3D-like blocks)
const buildings = [
  { x: 70, y: 120, w: 30, h: 20, delay: 0.8 },
  { x: 170, y: 130, w: 25, h: 35, delay: 0.9 },
  { x: 100, y: 220, w: 20, h: 25, delay: 1.0 },
  { x: 200, y: 250, w: 35, h: 20, delay: 1.1 },
  { x: 250, y: 320, w: 22, h: 28, delay: 1.2 },
  { x: 90, y: 340, w: 28, h: 18, delay: 1.3 },
  { x: 180, y: 420, w: 30, h: 22, delay: 1.0 },
  { x: 260, y: 140, w: 18, h: 24, delay: 1.1 },
];

export const MapScreen = () => (
  <div className="w-full h-full bg-[hsl(var(--map-dark))] relative overflow-hidden">
    {/* Subtle grid */}
    <div className="absolute inset-0 map-grid opacity-20" />

    {/* Radar sweep overlay */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
      <motion.div
        className="w-full h-full radar-sweep origin-center"
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, hsl(225 85% 55% / 0.06) 30deg, transparent 60deg)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      />
    </div>

    {/* Water/park areas */}
    <motion.div
      className="absolute top-[65%] left-[-5%] w-[45%] h-[20%] rounded-[40%] bg-[hsl(var(--map-green))]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 1.5 }}
    />
    <motion.div
      className="absolute top-[10%] right-[-5%] w-[30%] h-[15%] rounded-[50%] bg-[hsl(var(--map-water))]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 1.5, delay: 0.3 }}
    />

    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 314 596">
      {/* Roads */}
      {roads.map((road, i) => (
        <motion.path
          key={i}
          d={road.d}
          stroke="hsl(222, 20%, 16%)"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: road.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Road glow highlights (main roads) */}
      {roads.slice(0, 2).map((road, i) => (
        <motion.path
          key={`glow-${i}`}
          d={road.d}
          stroke="hsl(225, 80%, 45%)"
          strokeWidth="1"
          fill="none"
          opacity="0.15"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: road.delay + 0.5, ease: "easeInOut" }}
        />
      ))}

      {/* Buildings */}
      {buildings.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="2"
          fill="hsl(222, 20%, 10%)"
          stroke="hsl(222, 18%, 14%)"
          strokeWidth="0.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: b.delay, duration: 0.4 }}
        />
      ))}

      {/* Street labels */}
      {streetLabels.map((label, i) => (
        <motion.text
          key={i}
          x={label.x}
          y={label.y}
          fill="hsl(215, 12%, 35%)"
          fontSize="5"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
          letterSpacing="1.5"
          transform={`rotate(${label.angle}, ${label.x}, ${label.y})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: label.delay, duration: 0.5 }}
        >
          {label.text}
        </motion.text>
      ))}

      {/* Mapify Markers */}
      {markers.map((m, i) => (
        <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: m.delay, type: "spring", stiffness: 200 }}>
          <circle cx={m.x} cy={m.y} r="16" fill="hsl(225, 85%, 55%)" opacity="0.1" className="marker-pulse" />
          <circle cx={m.x} cy={m.y} r="7" fill="hsl(225, 85%, 55%)" />
          <circle cx={m.x} cy={m.y} r="2.5" fill="hsl(0, 0%, 100%)" />
          {/* Label */}
          <rect x={m.x + 10} y={m.y - 8} width={m.label.length * 4.5 + 8} height="14" rx="4" fill="hsl(222, 25%, 7%)" stroke="hsl(222, 18%, 18%)" strokeWidth="0.5" opacity="0.9" />
          <text x={m.x + 14} y={m.y + 1} fill="hsl(210, 20%, 80%)" fontSize="6" fontFamily="Inter, sans-serif" fontWeight="500">
            {m.label}
          </text>
        </motion.g>
      ))}

      {/* Radar rings */}
      {[60, 120, 180].map((r, i) => (
        <motion.circle
          key={i}
          cx="157"
          cy="298"
          r={r}
          fill="none"
          stroke="hsl(225, 85%, 55%)"
          strokeWidth="0.5"
          strokeDasharray="4 6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ delay: 2.5 + i * 0.2, duration: 0.8 }}
        />
      ))}
    </svg>

    {/* Top bar */}
    <motion.div
      className="absolute top-2 left-3 right-3 flex items-center justify-between"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(225,85%,55%)" strokeWidth="2.5">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>
        <span className="text-[11px] font-semibold text-foreground/80">Mapifyit</span>
      </div>
      <div className="flex items-center gap-2">
        <motion.div
          className="px-2.5 py-1 rounded-full bg-primary/15 border border-primary/25"
          animate={{ boxShadow: ["0 0 0px hsl(225 85% 55% / 0)", "0 0 14px hsl(225 85% 55% / 0.35)", "0 0 0px hsl(225 85% 55% / 0)"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="text-[9px] font-medium text-primary-foreground/90">LIVE</span>
        </motion.div>
        <div className="px-2 py-1 rounded-full bg-secondary/80 border border-border">
          <span className="text-[8px] font-mono text-muted-foreground">37.32°N</span>
        </div>
      </div>
    </motion.div>

    {/* GIS Tools badge */}
    <motion.div
      className="absolute top-2 left-1/2 -translate-x-1/2"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5 }}
    >
    </motion.div>

    {/* Right side controls */}
    <motion.div
      className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5"
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.5 }}
    >
      {[
        "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
        "M12 5v14M5 12h14",
        "M5 12h14",
        "M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z",
      ].map((d, i) => (
        <div key={i} className="w-7 h-7 rounded-full bg-secondary/80 border border-border flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(210,20%,65%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={d} />
          </svg>
        </div>
      ))}
    </motion.div>

    {/* Bottom nav */}
    <motion.div
      className="absolute bottom-2 left-3 right-3 h-12 rounded-2xl bg-secondary/80 backdrop-blur-xl border border-border flex items-center justify-around px-4"
      initial={{ y: 60 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {[
        { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z", active: true },
        { d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", active: false },
        { d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7", active: false },
        { d: "M22 12h-4l-3 9L9 3l-3 9H2", active: false },
      ].map((item, i) => (
        <motion.div
          key={i}
          className={`p-2 rounded-xl ${item.active ? "bg-primary/15" : ""}`}
          whileHover={{ scale: 1.1 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.active ? "hsl(225,85%,55%)" : "hsl(210,20%,45%)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={d(item.d)} />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

// Helper to avoid JSX issues with path d attribute
const d = (v: string) => v;
