import { motion } from "framer-motion";

export const PinDropScreen = () => (
  <div className="w-full h-full bg-[hsl(var(--map-dark))] relative overflow-hidden">
    <div className="absolute inset-0 map-grid opacity-15" />

    {/* Roads */}
    <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 314 596">
      <path d="M0 250 Q100 240, 200 255 Q280 265, 314 245" stroke="hsl(222,20%,16%)" strokeWidth="3" fill="none" />
      <path d="M0 380 Q80 370, 160 385 Q240 395, 314 375" stroke="hsl(222,20%,16%)" strokeWidth="3" fill="none" />
      <path d="M140 0 Q150 200, 130 400 Q125 500, 140 596" stroke="hsl(222,20%,16%)" strokeWidth="2.5" fill="none" />
      <text x="20" y="245" fill="hsl(215,12%,28%)" fontSize="5" fontWeight="500" letterSpacing="1.2">HOMESTEAD RD</text>
      <text x="135" y="15" fill="hsl(215,12%,28%)" fontSize="5" fontWeight="500" letterSpacing="1.2" transform="rotate(88, 135, 15)">STELLING RD</text>
    </svg>

    {/* Radar rings from pin point */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 314 596">
      {[30, 60, 90, 120].map((r, i) => (
        <motion.circle
          key={i}
          cx="157"
          cy="220"
          r={r}
          fill="none"
          stroke="hsl(225, 85%, 55%)"
          strokeWidth="0.8"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ delay: 1.3 + i * 0.2, duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}
    </svg>

    {/* Pin drop animation */}
    <motion.div
      className="absolute left-1/2 top-[30%] -translate-x-1/2"
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 120, damping: 12 }}
    >
      {/* Shadow */}
      <motion.div
        className="absolute top-[42px] left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-primary/15"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ delay: 1.2, duration: 0.6 }}
      />

      {/* Marker */}
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none">
        <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z" fill="hsl(225, 85%, 55%)" />
        <circle cx="18" cy="18" r="7" fill="hsl(222, 35%, 4%)" />
        <circle cx="18" cy="18" r="3" fill="hsl(225, 85%, 65%)" />
      </svg>
    </motion.div>

    {/* Reverse geocode info card */}
    <motion.div
      className="absolute left-3 right-3 top-[52%]"
      initial={{ y: 30, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-secondary/90 backdrop-blur-xl rounded-2xl border border-primary/15 p-3.5">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(225,85%,55%)" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-foreground">Pin Dropped</span>
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>

        {[
          { label: "Address", value: "10600 N Tantau Ave, Cupertino" },
          { label: "Coordinates", value: "37.3318° N, 122.0312° W" },
          { label: "Elevation", value: "72m above sea level" },
          { label: "County", value: "Santa Clara, CA 95014" },
          { label: "Plus Code", value: "849V+RG Cupertino" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2 + i * 0.1 }}
          >
            <span className="text-[9px] text-muted-foreground">{item.label}</span>
            <span className="text-[9px] font-mono text-foreground/80">{item.value}</span>
          </motion.div>
        ))}

        <motion.div
          className="mt-2.5 px-2 py-1 rounded-md bg-primary/10 border border-primary/15 inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <span className="text-[8px] font-mono text-primary/80">Reverse Geocoding API</span>
        </motion.div>
      </div>
    </motion.div>
  </div>
);
