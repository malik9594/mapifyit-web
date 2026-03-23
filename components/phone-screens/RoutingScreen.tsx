import { motion } from "framer-motion";

const routePath = "M80 480 Q90 420, 110 380 Q140 330, 180 290 Q210 260, 230 220 Q250 180, 240 140 Q230 100, 210 70 Q190 40, 180 20";

export const RoutingScreen = () => (
  <div className="w-full h-full bg-[hsl(var(--map-dark))] relative overflow-hidden">
    <div className="absolute inset-0 map-grid opacity-15" />

    {/* Roads */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 314 596">
      {/* Grid roads */}
      <path d="M0 150 Q100 140, 200 155 Q280 165, 314 148" stroke="hsl(222,20%,14%)" strokeWidth="3" fill="none" />
      <path d="M0 280 Q80 270, 160 285 Q240 295, 314 275" stroke="hsl(222,20%,14%)" strokeWidth="3" fill="none" />
      <path d="M0 400 Q100 390, 200 405 Q280 415, 314 395" stroke="hsl(222,20%,14%)" strokeWidth="3" fill="none" />
      <path d="M100 0 Q110 200, 90 400 Q85 500, 100 596" stroke="hsl(222,20%,14%)" strokeWidth="2.5" fill="none" />
      <path d="M220 0 Q230 150, 210 300 Q200 450, 220 596" stroke="hsl(222,20%,14%)" strokeWidth="2.5" fill="none" />

      {/* Street labels */}
      <text x="15" y="145" fill="hsl(215,12%,30%)" fontSize="5" fontWeight="500" letterSpacing="1.2">STEVENS CREEK BLVD</text>
      <text x="30" y="275" fill="hsl(215,12%,30%)" fontSize="5" fontWeight="500" letterSpacing="1.2">BOLLINGER RD</text>

      {/* Route - blue themed */}
      <motion.path
        d={routePath}
        stroke="hsl(225, 85%, 55%)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        className="route-glow"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
      />

      {/* Route glow */}
      <motion.path
        d={routePath}
        stroke="hsl(225, 85%, 65%)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        opacity="0.15"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
      />

      {/* Moving dot */}
      <motion.circle
        r="5"
        fill="hsl(225, 85%, 70%)"
        filter="url(#dotGlow)"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        style={{ offsetPath: `path('${routePath}')` }}
      />

      {/* Start marker */}
      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
        <circle cx="80" cy="480" r="12" fill="hsl(225, 85%, 55%)" opacity="0.15" />
        <circle cx="80" cy="480" r="6" fill="hsl(225, 85%, 55%)" />
        <circle cx="80" cy="480" r="2" fill="white" />
      </motion.g>

      {/* End marker */}
      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5, type: "spring" }}>
        <circle cx="180" cy="20" r="12" fill="hsl(0, 75%, 50%)" opacity="0.15" />
        <circle cx="180" cy="20" r="6" fill="hsl(0, 75%, 50%)" />
        <circle cx="180" cy="20" r="2" fill="white" />
      </motion.g>

      <defs>
        <filter id="dotGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
    </svg>

    {/* Route info card */}
    <motion.div
      className="absolute bottom-14 left-3 right-3 bg-secondary/90 backdrop-blur-xl rounded-2xl border border-primary/15 p-3"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[11px] font-semibold text-foreground">8 min</span>
          <span className="text-[9px] text-muted-foreground">· 4.2 mi</span>
        </div>
        <div className="px-2 py-0.5 rounded-md bg-primary/15 border border-primary/20">
          <span className="text-[8px] font-bold text-primary-foreground/80">FASTEST</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            5:37 PM - 5:45 PM
          </div>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono text-primary/60">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="hsl(225,85%,55%)" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
          Routing API
        </div>
      </div>
    </motion.div>
  </div>
);
