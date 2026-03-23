import { motion } from "framer-motion";

const routeA = "M60 480 Q70 430, 100 390 Q130 350, 160 310";
const routeB = "M160 310 Q190 270, 220 250 Q250 230, 260 190";
const routeC = "M260 190 Q270 150, 240 110 Q210 70, 190 40";

const stops = [
  { x: 60, y: 480, label: "A", color: "hsl(225, 85%, 55%)", name: "Apple Park" },
  { x: 160, y: 310, label: "B", color: "hsl(210, 100%, 60%)", name: "Cupertino City Hall" },
  { x: 190, y: 40, label: "C", color: "hsl(0, 75%, 50%)", name: "Rancho San Antonio" },
];

export const MultiRouteScreen = () => (
  <div className="w-full h-full bg-[hsl(var(--map-dark))] relative overflow-hidden">
    <div className="absolute inset-0 map-grid opacity-15" />

    {/* Background roads */}
    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 314 596">
      <path d="M0 200 Q100 185, 200 205 Q280 215, 314 195" stroke="hsl(222,20%,16%)" strokeWidth="2.5" fill="none" />
      <path d="M0 350 Q80 340, 160 355 Q240 365, 314 345" stroke="hsl(222,20%,16%)" strokeWidth="2.5" fill="none" />
      <path d="M120 0 Q130 200, 110 400 Q105 500, 120 596" stroke="hsl(222,20%,16%)" strokeWidth="2" fill="none" />
      <path d="M240 0 Q245 150, 235 300 Q230 450, 240 596" stroke="hsl(222,20%,16%)" strokeWidth="2" fill="none" />
    </svg>

    {/* Route segments */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 314 596">
      {[
        { d: routeA, delay: 0.5, color: "hsl(225, 85%, 55%)" },
        { d: routeB, delay: 1.5, color: "hsl(225, 75%, 50%)" },
        { d: routeC, delay: 2.5, color: "hsl(225, 65%, 45%)" },
      ].map((r, i) => (
        <g key={i}>
          {/* Glow */}
          <motion.path
            d={r.d}
            stroke={r.color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            opacity="0.12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: r.delay, ease: "easeInOut" }}
          />
          {/* Line */}
          <motion.path
            d={r.d}
            stroke={r.color}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="8 4"
            className="route-glow"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: r.delay, ease: "easeInOut" }}
          />
        </g>
      ))}

      {/* Stop markers */}
      {stops.map((s, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + i * 1, type: "spring", stiffness: 200 }}
        >
          <circle cx={s.x} cy={s.y} r="16" fill={s.color} opacity="0.12" />
          <circle cx={s.x} cy={s.y} r="10" fill={s.color} />
          <text x={s.x} y={s.y + 3.5} textAnchor="middle" fill="white" fontSize="9" fontWeight="700">
            {s.label}
          </text>
        </motion.g>
      ))}
    </svg>

    {/* Route planner card */}
    <motion.div
      className="absolute top-3 left-3 right-3 bg-secondary/90 backdrop-blur-xl rounded-2xl border border-primary/15 overflow-hidden"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Transport mode tabs */}
      <div className="flex items-center gap-1 px-3 py-1.5 border-b border-border/40">
        {["🚗", "🚌", "🚲", "🚶"].map((icon, i) => (
          <motion.div
            key={i}
            className={`px-2.5 py-1 rounded-lg text-[10px] ${i === 0 ? "bg-primary/15" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.05 }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {stops.map((s, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2.5 px-3 py-2 border-b border-border/40 last:border-0"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.15 }}
        >
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold text-white"
            style={{ backgroundColor: s.color }}
          >
            {s.label}
          </div>
          <span className="text-[11px] text-foreground/80 font-medium">{s.name}</span>
        </motion.div>
      ))}

      <motion.div
        className="flex items-center gap-2 px-3 py-2 border-t border-border/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="w-5 h-5 rounded-md bg-muted flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(210,20%,50%)" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <span className="text-[10px] text-muted-foreground">Add Destination</span>
      </motion.div>
    </motion.div>

    {/* Bottom summary */}
    <motion.div
      className="absolute bottom-14 left-3 right-3 flex gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3 }}
    >
      {[
        { label: "Total", value: "18 min" },
        { label: "Distance", value: "9.4 mi" },
        { label: "Stops", value: "3" },
      ].map((item) => (
        <div key={item.label} className="flex-1 bg-secondary/70 rounded-xl border border-primary/10 p-2 text-center">
          <p className="text-[8px] text-muted-foreground">{item.label}</p>
          <p className="text-[11px] font-semibold text-foreground">{item.value}</p>
        </div>
      ))}
    </motion.div>
  </div>
);
