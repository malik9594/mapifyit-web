"use client";

import React, { useEffect, useRef } from 'react';

// --- Types & Data Definitions ---
type Hub = { x: number; y: number; name: string; showLabel: boolean };
type Particle = { start: string; end: string; progress: number; speed: number };
type HeroParticle = { start: string; end: string; progress: number; speed: number; x: number; y: number };

const hubs: Record<string, Hub> = {
    SEA: { x: 0.12, y: 0.15, name: 'Seattle', showLabel: false },
    SFO: { x: 0.08, y: 0.40, name: 'San Francisco', showLabel: false },
    LAX: { x: 0.15, y: 0.60, name: 'Los Angeles', showLabel: true },
    PHX: { x: 0.22, y: 0.65, name: 'Phoenix', showLabel: false },
    DEN: { x: 0.35, y: 0.45, name: 'Denver', showLabel: false },
    DFW: { x: 0.52, y: 0.70, name: 'Dallas', showLabel: true },
    ORD: { x: 0.65, y: 0.35, name: 'Chicago', showLabel: true },
    ATL: { x: 0.72, y: 0.68, name: 'Atlanta', showLabel: false },
    MIA: { x: 0.82, y: 0.90, name: 'Miami', showLabel: false },
    JFK: { x: 0.88, y: 0.30, name: 'New York', showLabel: true },
    BOS: { x: 0.92, y: 0.22, name: 'Boston', showLabel: false },
    DCA: { x: 0.84, y: 0.42, name: 'Washington', showLabel: false },
    MSP: { x: 0.55, y: 0.25, name: 'Minneapolis', showLabel: false },
    STL: { x: 0.60, y: 0.50, name: 'St. Louis', showLabel: false },
    HOU: { x: 0.55, y: 0.80, name: 'Houston', showLabel: false },
};

const hubKeys = Object.keys(hubs);
const colorPrimary = '#00AEEF';
const colorPrimaryRGB = '0, 174, 239';

const routes: [string, string][] = [
    ['SEA', 'SFO'], ['SFO', 'LAX'], ['LAX', 'PHX'], ['SEA', 'DEN'],
    ['SFO', 'DEN'], ['LAX', 'DEN'], ['PHX', 'DFW'], ['DEN', 'DFW'],
    ['DEN', 'ORD'], ['DFW', 'HOU'], ['DFW', 'STL'], ['HOU', 'ATL'],
    ['DFW', 'ATL'], ['STL', 'ORD'], ['ORD', 'MSP'], ['ORD', 'JFK'],
    ['ORD', 'DCA'], ['STL', 'ATL'], ['ATL', 'MIA'], ['ATL', 'DCA'],
    ['DCA', 'JFK'], ['JFK', 'BOS'], ['MSP', 'SEA'],
];

// Initialize Particles (Vehicles) outside component to prevent recreation
const numParticles = 1200;
const initialParticles: Particle[] = [];
for (let i = 0; i < numParticles; i++) {
    const routeObj = routes[Math.floor(Math.random() * routes.length)];
    initialParticles.push({
        start: routeObj[0],
        end: routeObj[1],
        progress: Math.random(),
        speed: 0.0003 + Math.random() * 0.001,
    });
}

function lerp(start: number, end: number, amt: number): number {
    return (1 - amt) * start + amt * end;
}

export default function FftAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const uiLayerRef = useRef<HTMLDivElement>(null);
    const hoverCardRef = useRef<HTMLDivElement>(null);

    // mutable refs for animation state
    const particlesRef = useRef<Particle[]>([...initialParticles]);
    const heroParticleRef = useRef<HeroParticle>({
        start: 'DEN',
        end: 'DFW',
        progress: 0,
        speed: 0.0025,
        x: 0,
        y: 0,
    });

    // Camera state (moved off window object for Next.js)
    const camRef = useRef({ zoom: 1, panX: 0, panY: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const uiLayer = uiLayerRef.current;
        const hoverCard = hoverCardRef.current;

        if (!canvas || !container || !uiLayer || !hoverCard) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let width: number, height: number;
        let animationFrameId: number;
        const startTime = Date.now();
        const loopDuration = 12000;

        const resize = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('resize', resize);
        resize();

        const drawMapBackground = () => {
            ctx.fillStyle = '#030712';
            ctx.fillRect(0, 0, width, height);

            // Extremely subtle tech grid to imply structure
            ctx.strokeStyle = `rgba(255, 255, 255, 0.02)`;
            ctx.lineWidth = 1;
            const gridSize = 60;
            ctx.beginPath();
            for (let x = 0; x < width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }
            for (let y = 0; y < height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
            ctx.stroke();
        };

        const render = () => {
            const currentTime = Date.now();
            const elapsed = (currentTime - startTime) % loopDuration;

            // 7 Scene Structure Logic based on 12s total
            let scene = 1;
            if (elapsed > 1500) scene = 2; // Real-Time Tracking
            if (elapsed > 3000) scene = 3; // Smart Routing
            if (elapsed > 4500) scene = 4; // Geofence
            if (elapsed > 6000) scene = 5; // Scale
            if (elapsed > 7500) scene = 6; // Analytics
            if (elapsed > 9000) scene = 7; // Reveal

            uiLayer.className = `ui-layer scene-${scene} absolute top-0 left-0 w-full h-full z-20 pointer-events-none`;

            // Fluid Ambient Camera Drift (Satellite feel)
            const driftX = Math.sin(elapsed / 4000) * 30;
            const driftY = Math.cos(elapsed / 3000) * 15;

            let targetZoom = 1;
            let targetPanX = driftX;
            let targetPanY = driftY;

            const heroParticle = heroParticleRef.current;
            const cam = camRef.current;

            // Camera Directing
            if (scene === 2) {
                targetZoom = 3.2;
                const hx = lerp(hubs[heroParticle.start].x, hubs[heroParticle.end].x, heroParticle.progress) * width;
                const hy = lerp(hubs[heroParticle.start].y, hubs[heroParticle.end].y, heroParticle.progress) * height;
                targetPanX = width / 2 - hx * targetZoom + (driftX * 0.2);
                targetPanY = height / 2 - hy * targetZoom + (driftY * 0.2);
            } else if (scene === 3) {
                targetZoom = 1.8;
                targetPanX = width / 2 - (hubs['DFW'].x * width * 0.8) * targetZoom;
                targetPanY = height / 2 - (hubs['DFW'].y * height * 0.8) * targetZoom;
            } else if (scene === 4) {
                targetZoom = 2.5;
                targetPanX = width / 2 - (hubs['DFW'].x * width) * targetZoom + driftX;
                targetPanY = height / 2 - (hubs['DFW'].y * height) * targetZoom + driftY;
            } else if (scene >= 5 && scene <= 6) {
                targetZoom = 1.0;
            } else if (scene === 7) {
                targetZoom = 0.92;
            }

            // Smooth fluid motion
            cam.zoom += (targetZoom - cam.zoom) * 0.04;
            cam.panX += (targetPanX - cam.panX) * 0.04;
            cam.panY += (targetPanY - cam.panY) * 0.04;

            drawMapBackground();

            ctx.save();
            ctx.translate(cam.panX, cam.panY);
            ctx.scale(cam.zoom, cam.zoom);

            ctx.globalCompositeOperation = 'screen';

            // Draw Base Routes (Faint glowing highways)
            ctx.lineWidth = 0.8 / cam.zoom;
            ctx.strokeStyle = `rgba(${colorPrimaryRGB}, 0.15)`;
            routes.forEach(route => {
                const start = hubs[route[0]];
                const end = hubs[route[1]];
                ctx.beginPath();
                ctx.moveTo(start.x * width, start.y * height);
                const mx = (start.x + end.x) / 2 * width;
                const my = ((start.y + end.y) / 2 - 0.05) * height;
                ctx.quadraticCurveTo(mx, my, end.x * width, end.y * height);
                ctx.stroke();
            });

            // Scene 3: AI Route Optimization (Dynamic Path Redrawing)
            if (scene === 3 || scene === 4) {
                ctx.lineWidth = 2.5 / cam.zoom;
                ctx.strokeStyle = `rgba(${colorPrimaryRGB}, 0.8)`;
                ctx.shadowBlur = 15;
                ctx.shadowColor = colorPrimary;
                const optRoutes = [['DEN', 'DFW'], ['LAX', 'DFW'], ['ORD', 'DFW'], ['ATL', 'DFW']];

                const s3Progress = Math.min(1, Math.max(0, (elapsed - 3000) / 1000));

                optRoutes.forEach(route => {
                    const start = hubs[route[0]];
                    const end = hubs[route[1]];
                    ctx.beginPath();
                    ctx.moveTo(start.x * width, start.y * height);
                    const mx = (start.x + end.x) / 2 * width;
                    const my = ((start.y + end.y) / 2 - 0.05) * height;

                    if (scene === 3 && s3Progress < 1) {
                        ctx.setLineDash([1000, 1000]);
                        ctx.lineDashOffset = 1000 * (1 - s3Progress);
                    } else {
                        ctx.setLineDash([]);
                    }

                    ctx.quadraticCurveTo(mx, my, end.x * width, end.y * height);
                    ctx.stroke();
                    ctx.setLineDash([]);
                });
                ctx.shadowBlur = 0;
            }

            // Draw Vehicles (Data flow)
            const generalOpacity = (scene === 2) ? 0.3 : 1;

            particlesRef.current.forEach(p => {
                p.progress += p.speed;
                if (p.progress > 1) {
                    p.progress = 0;
                    const nextRoute = routes[Math.floor(Math.random() * routes.length)];
                    p.start = nextRoute[0];
                    p.end = nextRoute[1];
                }

                const start = hubs[p.start];
                const end = hubs[p.end];
                const mx = (start.x + end.x) / 2 * width;
                const my = ((start.y + end.y) / 2 - 0.05) * height;

                const pr = p.progress;
                const prTail = Math.max(0, p.progress - 0.02);

                const x = Math.pow(1 - pr, 2) * (start.x * width) + 2 * (1 - pr) * pr * mx + Math.pow(pr, 2) * (end.x * width);
                const y = Math.pow(1 - pr, 2) * (start.y * height) + 2 * (1 - pr) * pr * my + Math.pow(pr, 2) * (end.y * height);

                const tx = Math.pow(1 - prTail, 2) * (start.x * width) + 2 * (1 - prTail) * prTail * mx + Math.pow(prTail, 2) * (end.x * width);
                const ty = Math.pow(1 - prTail, 2) * (start.y * height) + 2 * (1 - prTail) * prTail * my + Math.pow(prTail, 2) * (end.y * height);

                const tailAlpha = (scene === 5) ? 0.8 : 0.4 * generalOpacity;
                const gradient = ctx.createLinearGradient(x, y, tx, ty);
                gradient.addColorStop(0, `rgba(${colorPrimaryRGB}, ${tailAlpha})`);
                gradient.addColorStop(1, `rgba(${colorPrimaryRGB}, 0)`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2 / cam.zoom;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(tx, ty);
                ctx.stroke();

                ctx.fillStyle = `rgba(255, 255, 255, ${generalOpacity})`;
                ctx.beginPath();
                ctx.arc(x, y, 1.2 / cam.zoom, 0, Math.PI * 2);
                ctx.fill();
            });

            // Handle Hero Particle
            if (scene >= 1 && scene <= 4) {
                if (scene === 1 && heroParticle.progress === 0) heroParticle.progress = 0.05;
                if (scene >= 2) heroParticle.progress += heroParticle.speed;
                if (heroParticle.progress > 0.98) heroParticle.progress = 0.98;

                const start = hubs[heroParticle.start];
                const end = hubs[heroParticle.end];
                const mx = (start.x + end.x) / 2 * width;
                const my = ((start.y + end.y) / 2 - 0.05) * height;
                const pr = heroParticle.progress;
                const prTail = Math.max(0, pr - 0.04);

                heroParticle.x = Math.pow(1 - pr, 2) * (start.x * width) + 2 * (1 - pr) * pr * mx + Math.pow(pr, 2) * (end.x * width);
                heroParticle.y = Math.pow(1 - pr, 2) * (start.y * height) + 2 * (1 - pr) * pr * my + Math.pow(pr, 2) * (end.y * height);

                const tx = Math.pow(1 - prTail, 2) * (start.x * width) + 2 * (1 - prTail) * prTail * mx + Math.pow(prTail, 2) * (end.x * width);
                const ty = Math.pow(1 - prTail, 2) * (start.y * height) + 2 * (1 - prTail) * prTail * my + Math.pow(prTail, 2) * (end.y * height);

                const gradient = ctx.createLinearGradient(heroParticle.x, heroParticle.y, tx, ty);
                gradient.addColorStop(0, `rgba(${colorPrimaryRGB}, 1)`);
                gradient.addColorStop(1, `rgba(${colorPrimaryRGB}, 0)`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2.5 / cam.zoom;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(heroParticle.x, heroParticle.y);
                ctx.lineTo(tx, ty);
                ctx.stroke();

                ctx.fillStyle = '#fff';
                ctx.shadowBlur = 20;
                ctx.shadowColor = colorPrimary;
                ctx.beginPath();
                ctx.arc(heroParticle.x, heroParticle.y, 2 / cam.zoom, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                if (scene === 2 || scene === 3) {
                    ctx.strokeStyle = `rgba(${colorPrimaryRGB}, ${Math.max(0, 1 - (elapsed % 1200) / 1200)})`;
                    ctx.lineWidth = 1 / cam.zoom;
                    ctx.beginPath();
                    ctx.arc(heroParticle.x, heroParticle.y, (4 + (elapsed % 1200) / 20) / cam.zoom, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Sync HTML Card to exact pixel coordinates on screen
                const screenX = heroParticle.x * cam.zoom + cam.panX;
                const screenY = heroParticle.y * cam.zoom + cam.panY;
                hoverCard.style.left = `${screenX}px`;
                hoverCard.style.top = `${screenY}px`;
            } else {
                heroParticle.progress = 0;
            }

            // Scene 4: Circular Geofence at DFW
            if (scene >= 3 && scene <= 5) {
                const dfw = hubs['DFW'];
                const gx = dfw.x * width;
                const gy = dfw.y * height;
                const radius = 25;

                ctx.fillStyle = `rgba(${colorPrimaryRGB}, 0.05)`;
                ctx.strokeStyle = `rgba(${colorPrimaryRGB}, 0.3)`;
                ctx.lineWidth = 1.5 / cam.zoom;

                if (scene === 4 && heroParticle.progress > 0.85) {
                    ctx.fillStyle = `rgba(${colorPrimaryRGB}, 0.15)`;
                    ctx.strokeStyle = `rgba(${colorPrimaryRGB}, 0.8)`;
                    ctx.shadowBlur = 25;
                    ctx.shadowColor = colorPrimary;
                }

                ctx.beginPath();
                ctx.arc(gx, gy, radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            // Draw Minimal Hub Nodes & Labels
            hubKeys.forEach(key => {
                const h = hubs[key];
                const hx = h.x * width;
                const hy = h.y * height;

                ctx.fillStyle = colorPrimary;
                ctx.beginPath();
                ctx.arc(hx, hy, 1.5 / cam.zoom, 0, Math.PI * 2);
                ctx.fill();

                if (h.showLabel && scene < 7) {
                    const labelEl = container.querySelector<HTMLDivElement>(`#label-${key}`);
                    if (labelEl) {
                        const screenX = hx * cam.zoom + cam.panX;
                        const screenY = hy * cam.zoom + cam.panY - 15;
                        labelEl.style.left = `${screenX}px`;
                        labelEl.style.top = `${screenY}px`;
                    }
                }

                if (scene >= 5) {
                    const pulse = (Math.sin(elapsed / 400 + hx) + 1) / 2;
                    ctx.fillStyle = `rgba(${colorPrimaryRGB}, ${pulse * 0.4})`;
                    ctx.beginPath();
                    ctx.arc(hx, hy, (4 + pulse * 10) / cam.zoom, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            ctx.globalCompositeOperation = 'source-over';
            ctx.restore();

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const resizeObserver = new ResizeObserver(() => resize());
        resizeObserver.observe(container);

        resize();

        return () => {
            window.removeEventListener('resize', resize);
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="py-10 md:py-20 flex items-center justify-center p-4 font-sans">

            <div
                id="hero-container"
                ref={containerRef}
                className="relative w-full max-w-[1440px] h-[500px] md:h-[700px] bg-[#030712] rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-white/5"
            >
                <canvas
                    id="mapCanvas"
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full z-10 [background:radial-gradient(circle_at_center,transparent_30%,#030712_110%)]"
                />

                <div ref={uiLayerRef} className="ui-layer scene-1 absolute top-0 left-0 w-full h-full z-20 pointer-events-none">

                    {/* Scene Narrative Texts */}
                    {/* <div className="scene-text t-s1">Fleet Management System</div> */}
                    <div className="scene-text t-s2">Real-Time Tracking</div>
                    <div className="scene-text t-s3">AI Route Optimization</div>
                    <div className="scene-text t-s4">Geofence Monitoring</div>
                    <div className="scene-text t-s5">Nationwide Fleet Operations</div>
                    <div className="scene-text t-s6">Operational Intelligence</div>

                    {/* City Labels */}
                    <div id="labels-container">
                        {hubKeys.map((key) => {
                            if (!hubs[key].showLabel) return null;
                            return (
                                <div key={key} id={`label-${key}`} className="city-label">
                                    {hubs[key].name}
                                </div>
                            );
                        })}
                    </div>

                    {/* Scene 2/3: Hover Card */}
                    <div id="hover-card" ref={hoverCardRef} className="glass-panel">
                        <div className="header">Live Telemetry</div>
                        <div className="row"><span className="text-muted">Vehicle ID:</span> <span className="val">FLT-2048</span></div>
                        <div className="row"><span className="text-muted">Driver:</span> <span className="val">M. Torres</span></div>
                        <div className="row"><span className="text-muted">Speed:</span> <span className="val">64 mph</span></div>
                        <div className="row"><span className="text-muted">ETA:</span> <span className="val">12:42 PM</span></div>
                        <div className="status"><div className="status-dot"></div> Active Route</div>
                    </div>

                    {/* Scene 4: Notification */}
                    <div id="notification" className="glass-panel">
                        <div className="icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </div>
                        <div className="text">
                            <span style={{ color: '#fff' }}>Vehicle Entered Distribution Hub</span><br />
                            <span className="dist-hub-text">Dallas Logistics Center</span>
                        </div>
                    </div>

                    {/* Scene 6: Analytics */}
                    <div id="analytics">
                        <div className="stat-card">
                            <div className="label">Fleet Size</div>
                            <div className="value">2,480</div>
                        </div>
                        <div className="stat-card">
                            <div className="label">Active Vehicles</div>
                            <div className="value">2,131</div>
                        </div>
                        <div className="stat-card">
                            <div className="label">Deliveries Today</div>
                            <div className="value">18,542</div>
                        </div>
                        <div className="stat-card border-b-2 border-[#00AEEF]">
                            <div className="label">Route Efficiency</div>
                            <div className="value">94%</div>
                            <div className="trend">Optimized</div>
                        </div>
                    </div>

                    {/* Scene 7: Main Title */}
                    {/* <div id="main-title">
                        <h1>Fleet Management System</h1>
                        <h2 className="by-mapifyit">by MapifyIt</h2>
                        <div className="subtitle-container">
                            <p>Real-Time Tracking</p>
                            <div className="dot"></div>
                            <p>Smart Routing</p>
                            <div className="dot"></div>
                            <p>Operational Control</p>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Embedded CSS for Exact Visual Parity */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .text-muted { color: #94a3b8; }
        .glass-panel {
          background: rgba(10, 15, 30, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 174, 239, 0.2);
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          color: #f8fafc;
        }

        .scene-text {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translate(-50%, -20px);
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #00AEEF;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          text-shadow: 0 0 20px rgba(0, 174, 239, 0.5);
          pointer-events: none;
        }

        .ui-layer.scene-1 .t-s1, .ui-layer.scene-2 .t-s2, .ui-layer.scene-3 .t-s3, 
        .ui-layer.scene-4 .t-s4, .ui-layer.scene-5 .t-s5, .ui-layer.scene-6 .t-s6 { 
          opacity: 1; 
          transform: translate(-50%, 0);
          transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
        }

        .city-label {
          position: absolute;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #94a3b8;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: all 0.8s ease;
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }

        .ui-layer.scene-1 .city-label, .ui-layer.scene-2 .city-label, .ui-layer.scene-3 .city-label, 
        .ui-layer.scene-4 .city-label, .ui-layer.scene-5 .city-label, .ui-layer.scene-6 .city-label { opacity: 1; }
        .ui-layer.scene-7 .city-label { opacity: 0; }

        #hover-card {
          position: absolute;
          padding: 16px 20px;
          width: 220px;
          transform: translate(30px, -50%) scale(0.95);
          border-left: 3px solid #00AEEF;
        }
        #hover-card::before {
          content: ''; position: absolute; top: 50%; left: -30px; width: 27px; height: 1px; background: #00AEEF; opacity: 0.5;
        }
        #hover-card .header { font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;}
        #hover-card .row { display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 8px; font-family: monospace; }
        #hover-card .val { font-weight: 400; color: #fff; }
        #hover-card .status { display: inline-flex; align-items: center; gap: 8px; color: #00AEEF; font-weight: 500; margin-top: 8px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;}
        #hover-card .status-dot { width: 6px; height: 6px; background: #00AEEF; border-radius: 50%; box-shadow: 0 0 10px #00AEEF; animation: pulse-blue 2s infinite; }
        
        @keyframes pulse-blue { 0% { box-shadow: 0 0 0 0 rgba(0, 174, 239, 0.6); } 70% { box-shadow: 0 0 0 8px rgba(0, 174, 239, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 174, 239, 0); } }

        .ui-layer.scene-2 #hover-card, .ui-layer.scene-3 #hover-card { opacity: 1; transform: translate(30px, -50%) scale(1); }

        #notification {
          position: absolute;
          top: 2rem;
          right: 2rem;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          transform: translateX(30px);
          border-right: 3px solid #00AEEF;
        }
        #notification .icon { width: 36px; height: 36px; background: rgba(0, 174, 239, 0.15); color: #00AEEF; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(0, 174, 239, 0.2); }
        #notification .text { font-size: 0.85rem; font-weight: 400; font-family: monospace; line-height: 1.4; }
        .dist-hub-text { color: #94a3b8; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px; display: inline-block; }
        
        .ui-layer.scene-4 #notification { opacity: 1; transform: translateX(0); }

        #analytics {
          position: absolute;
          bottom: 2.5rem;
          left: 2.5rem;
          display: flex;
          gap: 1.2rem;
          transform: translateY(30px);
          pointer-events: none;
        }
        .stat-card {
          padding: 16px 20px;
          min-width: 160px;
          background: rgba(10, 15, 30, 0.5);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 174, 239, 0.2);
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          text-align: left;
        }
        .stat-card .label { font-size: 0.7rem; color: #94a3b8; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em; }
        .stat-card .value { font-size: 1.5rem; font-weight: 300; color: #fff; font-family: monospace; }
        .stat-card .trend { font-size: 0.75rem; color: #00AEEF; margin-top: 6px; font-weight: 500; }
        
        .ui-layer.scene-6 #analytics { opacity: 1; transform: translateY(0); }

        #main-title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -20px);
          text-align: center;
          opacity: 0;
          transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #main-title h1 {
          font-size: 2.5rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          color: #fff;
          text-shadow: 0 0 40px rgba(0, 174, 239, 0.4);
        }
        @media (min-width: 768px) {
          #main-title h1 { font-size: 4.5rem; }
        }
        #main-title h2.by-mapifyit {
          font-size: 1.5rem;
          color: #00AEEF;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 24px;
          text-shadow: 0 0 20px rgba(0, 174, 239, 0.3);
        }
        #main-title .subtitle-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
        }
        #main-title p {
          font-size: 1rem;
          color: #00AEEF;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        #main-title .dot {
          width: 4px; height: 4px; background: #94a3b8; border-radius: 50%;
        }
        .ui-layer.scene-7 #main-title { opacity: 1; transform: translate(-50%, -50%); }
      `}} />
        </div>
    );
}