"use client"
import { useEffect } from "react";

/**
 * --- PERFORMANCE: Global Map Library Prewarmer ---
 * This component starts downloading the heavy map library (maplibre-gl) 
 * as soon as the app is idle. This ensures that the library is already 
 * in the browser's cache before the user reaches the contact page.
 */
export default function GlobalMapPrewarmer() {
    useEffect(() => {
        const MAP_STYLE = 'https://client.mapifyit.com/api/v1/proxy/tiles/dark';
        const TOKEN = 'mfy_8b0755c081c9204caa20681ddab91d2856c3667a6ad8d9e8';

        const timer = setTimeout(() => {
            // 1. Preload Engine
            import('maplibre-gl').catch(() => { });

            // 2. Pre-fetch and STORE Style Object for 1ms access
            fetch(MAP_STYLE, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(style => {
                    // @ts-ignore
                    window.__MAPIFYIT_STYLE__ = style;
                    console.log('%c[Mapifyit] 🚀 Style pre-cached in memory', 'color:#3B82F6');
                })
                .catch(() => { });
        }, 1000); // Start very early

        return () => clearTimeout(timer);
    }, []);

    return null;
}
