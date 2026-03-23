import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const suggestions = [
  { name: "Apple Park Visitor Center", type: "Landmark", distance: "0.8 km" },
  { name: "Cupertino City Center", type: "Area", distance: "1.2 km" },
  { name: "De Anza College", type: "Education", distance: "2.4 km" },
  { name: "Rancho San Antonio", type: "Park", distance: "4.1 km" },
];

const searchText = "Apple Park";

export const SearchScreen = () => {
  const [typed, setTyped] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= searchText.length) {
        setTyped(searchText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSuggestions(true), 300);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[hsl(var(--map-dark))] relative overflow-hidden">
      <div className="absolute inset-0 map-grid opacity-15" />

      {/* Faded map roads */}
      <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 314 596">
        <path d="M0 200 Q100 185, 200 205 Q280 215, 314 195" stroke="hsl(222,20%,16%)" strokeWidth="2.5" fill="none" />
        <path d="M0 350 Q80 340, 160 355 Q240 365, 314 345" stroke="hsl(222,20%,16%)" strokeWidth="2.5" fill="none" />
        <path d="M100 0 Q110 200, 90 400 Q85 500, 100 596" stroke="hsl(222,20%,16%)" strokeWidth="2" fill="none" />
        <path d="M230 0 Q235 150, 225 300 Q220 450, 235 596" stroke="hsl(222,20%,16%)" strokeWidth="2" fill="none" />
      </svg>

      {/* Radar rings background */}
      <svg className="absolute inset-0 w-full h-full opacity-8" viewBox="0 0 314 596">
        {[50, 100, 150, 200].map((r, i) => (
          <circle key={i} cx="157" cy="350" r={r} fill="none" stroke="hsl(225,85%,55%)" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.08" />
        ))}
      </svg>

      {/* Search Bar */}
      <motion.div
        className="absolute top-3 left-3 right-3"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-secondary/90 backdrop-blur-xl rounded-2xl border border-primary/20 p-3">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(225,85%,55%)" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="text-[13px] text-foreground font-medium">
              {typed}
              <motion.span
                className="inline-block w-[2px] h-[14px] bg-primary ml-[1px] align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            </span>
            <div className="ml-auto px-2 py-0.5 rounded-md bg-secondary border border-border">
              <span className="text-[8px] text-muted-foreground">United States</span>
            </div>
          </div>
        </div>

        {/* Autocomplete Dropdown */}
        {showSuggestions && (
          <motion.div
            className="mt-1.5 bg-secondary/95 backdrop-blur-xl rounded-2xl border border-border overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {suggestions.map((s, i) => (
              <motion.div
                key={s.name}
                className="flex items-center gap-3 px-3 py-2.5 border-b border-border/50 last:border-0"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
              >
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(225,85%,55%)" strokeWidth="2">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-foreground truncate">{s.name}</p>
                  <p className="text-[9px] text-muted-foreground">{s.type} · {s.distance}</p>
                </div>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(225,85%,40%)" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* API Badges */}
      <motion.div
        className="absolute bottom-16 left-3 right-3 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        {["Geocoding API", "Places API", "Search API"].map((api, i) => (
          <motion.div
            key={api}
            className="px-2 py-1 rounded-lg bg-primary/8 border border-primary/15"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.7 + i * 0.15 }}
          >
            <span className="text-[8px] font-mono text-primary/70">{api}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
