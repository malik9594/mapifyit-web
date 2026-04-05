'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Settings, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import * as THREE from 'three';

// --- CUSTOM TWEEN ENGINE (Guarantees Next.js compilation without external GSAP dependency) ---
const easeFunctions = {
    "linear": (t: number) => t,
    "power1.inOut": (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    "power2.in": (t: number) => t * t,
    "power2.out": (t: number) => t * (2 - t),
    "power2.inOut": (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    "power3.inOut": (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    "power3.out": (t: number) => --t * t * t + 1,
    "back.in": (t: number) => { const s = 1.70158; return t * t * ((s + 1) * t - s); },
    "back.out": (t: number) => { const s = 1.70158; return --t * t * ((s + 1) * t + s) + 1; },
    "elastic.out": (t: number) => {
        if (t === 0) return 0; if (t === 1) return 1;
        const p = 0.3; const s = p / 4;
        return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
    }
};

class Tween {
    targets: any[];
    vars: any;
    duration: number;
    delay: number;
    ease: (t: number) => number;
    startTime: number;
    startVals: any[];
    isDead: boolean;
    paused: boolean;
    pauseTime: number;

    constructor(targets: any, vars: any) {
        let tgts = Array.isArray(targets) ? targets : [targets];
        this.targets = tgts.filter(t => t);
        this.vars = vars;
        this.duration = (vars.duration || 0) * 1000;
        this.delay = (vars.delay || 0) * 1000;
        const easeName = typeof vars.ease === 'string' ? vars.ease.split('(')[0] : 'linear';
        this.ease = (easeFunctions as any)[easeName] || easeFunctions["linear"];
        this.startTime = performance.now() + this.delay;
        this.startVals = [];
        this.isDead = false;
        this.paused = false;
        this.pauseTime = 0;

        this.targets.forEach(t => {
            let sv: any = {};
            for (let k in vars) {
                if (['duration', 'delay', 'ease', 'onComplete', 'repeat', 'value'].includes(k)) {
                    if (k === 'value' && t.value !== undefined) sv[k] = t.value;
                    continue;
                }
                if (t instanceof HTMLElement && k === 'width') {
                    sv[k] = parseFloat(t.style.width) || 0;
                } else {
                    sv[k] = t[k] !== undefined ? t[k] : 0;
                }
            }
            this.startVals.push(sv);
        });
    }

    update(time: number) {
        if (this.isDead || this.paused || time < this.startTime) return;

        let elapsed = time - this.startTime;
        let p = this.duration === 0 ? 1 : Math.min(1, Math.max(0, elapsed / this.duration));
        let e = this.ease(p);

        this.targets.forEach((t, i) => {
            let sv = this.startVals[i];

            // Handle specific properties
            if (this.vars.value !== undefined && t.value !== undefined) {
                t.value = sv.value + (this.vars.value - sv.value) * e;
            }

            for (let k in sv) {
                if (k === 'value') continue;
                if (t instanceof HTMLElement && (k === 'width' || k === 'height' || k === 'opacity')) {
                    let endVal = parseFloat(this.vars[k]);
                    t.style[k as any] = (sv[k] + (endVal - sv[k]) * e) + (k === 'opacity' ? '' : '%');
                } else {
                    t[k] = sv[k] + (this.vars[k] - sv[k]) * e;
                }
            }
        });

        if (p >= 1) {
            if (this.vars.repeat === -1) {
                this.startTime = time;
            } else {
                this.isDead = true;
                if (this.vars.onComplete) this.vars.onComplete();
            }
        }
    }

    kill() { this.isDead = true; }
    pause() {
        if (!this.paused) {
            this.paused = true;
            this.pauseTime = performance.now();
        }
    }
    resume() {
        if (this.paused) {
            this.startTime += (performance.now() - this.pauseTime);
            this.paused = false;
        }
    }
}

const createGsapMock = () => {
    const tweens: Tween[] = [];
    return {
        to: (targets: any, vars: any) => {
            const t = new Tween(targets, vars);
            tweens.push(t);
            return t;
        },
        update: (time: number) => {
            tweens.forEach(t => t.update(time));
            for (let i = tweens.length - 1; i >= 0; i--) {
                if (tweens[i].isDead) tweens.splice(i, 1);
            }
        },
        killAll: () => { tweens.length = 0; }
    };
};
// --- END CUSTOM TWEEN ENGINE ---


// --- DATA & CONFIG ---
const SCENES = [
    { title: "Digital Elevation Model", desc: "High-resolution 3D terrain mapping with dynamic elevation grading and contour visualization.", camPos: { x: 0, y: 15, z: 30 }, camLook: { x: 0, y: 0, z: 0 } },
    { title: "Intelligent Vectorization", desc: "Automated conversion of satellite imagery into structured vector data, building extrusion, and feature mapping.", camPos: { x: 20, y: 25, z: 20 }, camLook: { x: 0, y: 0, z: 0 } },
    { title: "Multi-Layer Spatial Analysis", desc: "Stacking and analyzing diverse geospatial layers, from infrastructure to demographic heatmaps.", camPos: { x: 0, y: 35, z: 25 }, camLook: { x: 0, y: -5, z: 0 } },
    { title: "Real-Time Asset Tracking", desc: "Dynamic geofencing, live visualization of moving spatial data, and behavioral clustering.", camPos: { x: 0, y: 40, z: 0.1 }, camLook: { x: 0, y: 0, z: 0 } },
    { title: "Dynamic Routing Engine", desc: "Real-time pathfinding with multi-variable constraint optimization and trajectory highlighting.", camPos: { x: -10, y: 25, z: 10 }, camLook: { x: 0, y: 0, z: 0 } },
    { title: "Voronoi Catchment Zones", desc: "Automated territory mapping and spatial coverage optimization based on distribution nodes.", camPos: { x: 0, y: 30, z: 15 }, camLook: { x: 0, y: 0, z: 0 } },
    { title: "Field Data Synchronization", desc: "Live bidirectional syncing between remote mobile agents and centralized cloud nodes.", camPos: { x: 15, y: 10, z: 35 }, camLook: { x: 0, y: 5, z: 0 } },
    { title: "Terrain & Solar Analysis", desc: "Dynamic 3D shading, environmental impact visualization, and topographical illumination.", camPos: { x: -25, y: 15, z: 25 }, camLook: { x: 0, y: 5, z: 0 } },
    { title: "Precision Coordinate Snapping", desc: "Sub-meter accuracy grid alignment, spatial rectification, and coordinate standardization.", camPos: { x: 0, y: 20, z: 0.1 }, camLook: { x: 0, y: 0, z: 0 } },
    { title: "Global-to-Local Scaling", desc: "Seamless navigation from macro-global projections to micro-street level data environments.", camPos: { x: 0, y: 0, z: 60 }, camLook: { x: 0, y: 0, z: 0 } }
];

const CONFIG = {
    duration: 4500, // Reduced by 25% (was 6000)
    colors: {
        bg: 0x0B0B0F,
        accent: 0x2E6BFF,
        accentNeon: 0x00FFCC,
        alert: 0xFF3366,
        grid: 0x222233
    }
};

const GISVisualEngine = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const indexRef = useRef<HTMLSpanElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const [isHovered, setIsHovered] = useState(false);
    const isPausedRef = useRef(false);
    const progressTweenRef = useRef<any>(null);

    // Refs to expose scene control to the React button handlers
    const nextSceneRef = useRef(() => { });
    const prevSceneRef = useRef(() => { });

    useEffect(() => {
        if (!mountRef.current) return;

        const gsap = createGsapMock();

        // --- THREE.JS SETUP ---
        const container = mountRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(CONFIG.colors.bg);
        scene.fog = new THREE.FogExp2(CONFIG.colors.bg, 0.015);

        const initWidth = container.clientWidth || 800;
        const initHeight = container.clientHeight || 600;
        const camera = new THREE.PerspectiveCamera(45, initWidth / initHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(initWidth, initHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        container.appendChild(renderer.domElement);

        const cameraTarget = new THREE.Vector3(0, 0, 0);
        scene.add(new THREE.AmbientLight(0xffffff, 0.3));

        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(20, 40, 20);
        scene.add(mainLight);

        const baseGrid = new THREE.GridHelper(200, 100, CONFIG.colors.accent, CONFIG.colors.grid);
        baseGrid.position.y = -0.1;
        (baseGrid.material as THREE.Material).transparent = true;
        (baseGrid.material as THREE.Material).opacity = 0.15;
        scene.add(baseGrid);

        const sceneGroups = Array(10).fill(null).map(() => {
            const group = new THREE.Group();
            group.visible = false;
            scene.add(group);
            return group;
        });

        function createGlowingLineMaterial(color: number) {
            return new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        }

        // --- SCENE 1: DEM ---
        const terrainGeo = new THREE.PlaneGeometry(60, 60, 64, 64);
        terrainGeo.rotateX(-Math.PI / 2);
        const terrainMat = new THREE.MeshStandardMaterial({ color: 0x11111a, wireframe: true, emissive: 0x0a1a3a, transparent: true, opacity: 0 });
        const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
        const posAttr = terrainGeo.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
            let x = posAttr.getX(i);
            let z = posAttr.getZ(i);
            let y = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 4 + Math.sin(x * 0.05 + z * 0.05) * 2;
            posAttr.setY(i, y > 0 ? y : y * 0.2);
        }
        terrainGeo.computeVertexNormals();
        sceneGroups[0].add(terrainMesh);

        // --- SCENE 2: Vector Conversion ---
        const cityGroup = new THREE.Group();
        const buildingMat = new THREE.MeshBasicMaterial({ color: CONFIG.colors.accent, wireframe: true, transparent: true, opacity: 0 });
        const cityGrid = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), buildingMat, 200);
        const dummy = new THREE.Object3D();
        for (let i = 0; i < 200; i++) {
            let h = Math.random() * 5 + 1;
            dummy.position.set((Math.random() - 0.5) * 40, h / 2, (Math.random() - 0.5) * 40);
            dummy.scale.set(1, h, 1);
            dummy.updateMatrix();
            cityGrid.setMatrixAt(i, dummy.matrix);
        }
        cityGrid.instanceMatrix.needsUpdate = true;
        cityGroup.add(cityGrid);
        sceneGroups[1].add(cityGroup);

        // --- SCENE 3: Multi-Layer ---
        const layerGroup = new THREE.Group();
        const layerMatBase = new THREE.MeshBasicMaterial({ color: 0x222233, transparent: true, opacity: 0, wireframe: true });
        const layerMatHeat = new THREE.MeshBasicMaterial({ color: CONFIG.colors.alert, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
        const layerMatTop = new THREE.MeshBasicMaterial({ color: CONFIG.colors.accentNeon, transparent: true, opacity: 0, wireframe: true });
        const p1 = new THREE.Mesh(new THREE.PlaneGeometry(30, 30, 10, 10), layerMatBase);
        const p2 = new THREE.Mesh(new THREE.PlaneGeometry(30, 30, 20, 20), layerMatHeat);
        const p3 = new THREE.Mesh(new THREE.PlaneGeometry(30, 30, 5, 5), layerMatTop);
        [p1, p2, p3].forEach(p => { p.rotateX(-Math.PI / 2); layerGroup.add(p); });
        sceneGroups[2].add(layerGroup);
        (sceneGroups[2] as any).animData = { p1, p2, p3 };

        // --- SCENE 4: Real-time Asset Tracking ---
        const trackingGroup = new THREE.Group();
        const trackerGeo = new THREE.BufferGeometry();
        const trackerPos = new Float32Array(100 * 3);
        const trackerBasePos = new Float32Array(100 * 3);
        for (let i = 0; i < 300; i += 3) {
            trackerPos[i] = trackerBasePos[i] = (Math.random() - 0.5) * 30;
            trackerPos[i + 1] = trackerBasePos[i + 1] = 0.5;
            trackerPos[i + 2] = trackerBasePos[i + 2] = (Math.random() - 0.5) * 30;
        }
        trackerGeo.setAttribute('position', new THREE.BufferAttribute(trackerPos, 3).setUsage(THREE.DynamicDrawUsage));
        const trackers = new THREE.Points(trackerGeo, new THREE.PointsMaterial({ size: 0.4, color: CONFIG.colors.accentNeon, transparent: true, opacity: 0, blending: THREE.AdditiveBlending }));
        const ringGeo = new THREE.RingGeometry(8, 8.2, 64);
        ringGeo.rotateX(-Math.PI / 2);
        const geofence = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: CONFIG.colors.alert, transparent: true, opacity: 0, side: THREE.DoubleSide }));
        trackingGroup.add(trackers, geofence);
        sceneGroups[3].add(trackingGroup);
        (sceneGroups[3] as any).animData = { trackers, geofence, pos: trackerPos, basePos: trackerBasePos };

        // --- SCENE 5: Routing Engine ---
        const routeGroup = new THREE.Group();
        const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-15, 0, -10), new THREE.Vector3(0, 0, 15), new THREE.Vector3(15, 0, -5));
        const routeLineMat = createGlowingLineMaterial(CONFIG.colors.accentNeon);
        routeLineMat.opacity = 0;
        const routeLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)), routeLineMat);
        const vehMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
        const vehicle = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), vehMat);
        routeGroup.add(routeLine, vehicle);
        sceneGroups[4].add(routeGroup);
        (sceneGroups[4] as any).animData = { curve, vehicle, routeLineMat, vehMat };

        // --- SCENE 6: Accurate Voronoi GLSL ---
        const voronoiGroup = new THREE.Group();
        const vCenters = [
            new THREE.Vector2(-10, -10),
            new THREE.Vector2(10, -5),
            new THREE.Vector2(-5, 12),
            new THREE.Vector2(15, 15),
            new THREE.Vector2(0, 0)
        ];
        const vColors = [
            new THREE.Color(0x2E6BFF), new THREE.Color(0x00FFCC),
            new THREE.Color(0xFF3366), new THREE.Color(0x8844FF),
            new THREE.Color(0x0088FF)
        ];

        const voronoiUniforms = {
            uCenters: { value: vCenters },
            uColors: { value: vColors },
            uTime: { value: 0 },
            uProgress: { value: 0 }
        };

        const voronoiMat = new THREE.ShaderMaterial({
            uniforms: voronoiUniforms,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                uniform vec2 uCenters[5];
                uniform vec3 uColors[5];
                uniform float uTime;
                uniform float uProgress;

                void main() {
                    vec2 pos = (vUv - 0.5) * 40.0;
                    float minDist = 9999.0;
                    float min2Dist = 9999.0;
                    int minIndex = 0;

                    for(int i = 0; i < 5; i++) {
                        float d = distance(pos, uCenters[i]);
                        if(d < minDist) {
                            min2Dist = minDist;
                            minDist = d;
                            minIndex = i;
                        } else if(d < min2Dist) {
                            min2Dist = d;
                        }
                    }

                    float edgeDist = min2Dist - minDist;
                    float isBorder = 1.0 - smoothstep(0.0, 0.4, edgeDist);
                    float pulse = sin(minDist * 1.5 - uTime * 4.0) * 0.5 + 0.5;

                    vec3 baseColor = uColors[0];
                    if (minIndex == 1) baseColor = uColors[1];
                    if (minIndex == 2) baseColor = uColors[2];
                    if (minIndex == 3) baseColor = uColors[3];
                    if (minIndex == 4) baseColor = uColors[4];

                    vec3 cellColor = baseColor * (0.2 + 0.3 * pulse);
                    vec3 borderColor = vec3(0.0, 1.0, 0.8);
                    vec3 finalColor = mix(cellColor, borderColor, isBorder * 0.8);

                    float reveal = smoothstep(uProgress * 35.0, (uProgress * 35.0) - 3.0, minDist);
                    float planeEdgeFade = smoothstep(20.0, 10.0, length(pos));
                    float alpha = reveal * planeEdgeFade * (0.5 + isBorder * 0.5);

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `
        });

        const voronoiPlane = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), voronoiMat);
        voronoiPlane.rotateX(-Math.PI / 2);
        voronoiPlane.position.y = 0.1;
        voronoiGroup.add(voronoiPlane);

        const centerNodes: THREE.MeshBasicMaterial[] = [];
        const nodeGeo = new THREE.SphereGeometry(0.3, 16, 16);
        vCenters.forEach(c => {
            const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
            const node = new THREE.Mesh(nodeGeo, nodeMat);
            node.position.set(c.x, 0.5, c.y);
            voronoiGroup.add(node);
            centerNodes.push(nodeMat);
        });

        sceneGroups[5].add(voronoiGroup);
        (sceneGroups[5] as any).animData = { uniforms: voronoiUniforms, nodes: centerNodes };

        // --- SCENE 7: Field Data Sync ---
        const fieldGroup = new THREE.Group();
        const cloudMat = new THREE.MeshBasicMaterial({ color: CONFIG.colors.accentNeon, wireframe: true, transparent: true, opacity: 0 });
        const cloudNode = new THREE.Mesh(new THREE.OctahedronGeometry(2), cloudMat);
        cloudNode.position.set(0, 15, 0);
        fieldGroup.add(cloudNode);
        const syncPts = [];
        for (let i = 0; i < 20; i++) syncPts.push((Math.random() - 0.5) * 40, 0, (Math.random() - 0.5) * 40, 0, 15, 0);
        const syncLinesMat = new THREE.LineBasicMaterial({ color: CONFIG.colors.accent, transparent: true, opacity: 0 });
        const syncLines = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(syncPts, 3)), syncLinesMat);
        fieldGroup.add(syncLines);
        sceneGroups[6].add(fieldGroup);
        (sceneGroups[6] as any).animData = { cloudNode, syncLinesMat, cloudMat };

        // --- SCENE 8: 3D Terrain & Lighting ---
        const solidTerrainMat = new THREE.MeshStandardMaterial({ color: 0x1a2a4a, roughness: 0.8, metalness: 0.2, flatShading: true, transparent: true, opacity: 0 });
        const solidTerrain = new THREE.Mesh(terrainGeo, solidTerrainMat);
        const movingLight = new THREE.PointLight(CONFIG.colors.accentNeon, 2, 100);
        movingLight.position.set(-20, 10, -20);
        const movingLightHelper = new THREE.Mesh(new THREE.SphereGeometry(0.5), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 }));
        movingLight.add(movingLightHelper);
        sceneGroups[7].add(solidTerrain, movingLight);
        (sceneGroups[7] as any).animData = { light: movingLight, mat: solidTerrainMat, helperMat: movingLightHelper.material };

        // --- SCENE 9: Coordinate Snapping ---
        const snapGroup = new THREE.Group();
        const snapGrid = new THREE.GridHelper(40, 40, CONFIG.colors.accentNeon, 0x111122);
        (snapGrid.material as THREE.Material).transparent = true;
        (snapGrid.material as THREE.Material).opacity = 0;
        snapGroup.add(snapGrid);
        const snapMats: THREE.Mesh[] = [];
        for (let i = 0; i < 30; i++) {
            let m = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 }));
            m.userData.targetX = Math.round((Math.random() - 0.5) * 40);
            m.userData.targetZ = Math.round((Math.random() - 0.5) * 40);
            m.position.set(m.userData.targetX + (Math.random() - 0.5) * 2, 0, m.userData.targetZ + (Math.random() - 0.5) * 2);
            snapGroup.add(m);
            snapMats.push(m);
        }
        sceneGroups[8].add(snapGroup);
        (sceneGroups[8] as any).animData = { gridMat: snapGrid.material, pts: snapMats };

        // --- SCENE 10: Global Map ---
        const globeGroup = new THREE.Group();
        const globeMat = new THREE.MeshBasicMaterial({ color: CONFIG.colors.accent, wireframe: true, transparent: true, opacity: 0 });
        const globe = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 32), globeMat);
        const globeCities = new THREE.Group();
        const cityMatGlobe = new THREE.MeshBasicMaterial({ color: CONFIG.colors.alert, transparent: true, opacity: 0 });
        for (let i = 0; i < 50; i++) {
            let phi = Math.acos(-1 + (2 * i) / 50), theta = Math.sqrt(50 * Math.PI) * phi;
            let m = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 2), cityMatGlobe);
            m.position.setFromSphericalCoords(20, phi, theta);
            m.lookAt(0, 0, 0);
            globeCities.add(m);
        }
        globeGroup.add(globe, globeCities);
        sceneGroups[9].add(globeGroup);
        (sceneGroups[9] as any).animData = { globe, globeMat, cityMatGlobe };


        // --- ANIMATION CONTROLLER ---
        let currentSceneIndex = -1;
        let globalTime = 0;
        let vehicleProgress = { val: 0 };
        const clock = new THREE.Clock();
        let animationId: number;

        function exitScene(index: number) {
            if (index < 0) return;
            const grp = sceneGroups[index];

            if (index === 0) {
                gsap.to(terrainMat, { opacity: 0, duration: 1 });
                gsap.to(terrainMesh.scale, { y: 0.01, duration: 1.5, ease: "power2.inOut" });
            } else if (index === 1) {
                gsap.to(buildingMat, { opacity: 0, duration: 0.5 });
                gsap.to(cityGroup.scale, { y: 0.01, duration: 1, ease: "back.in(1.5)" });
            } else if (index === 2) {
                const { p1, p2, p3 } = (sceneGroups[2] as any).animData;
                gsap.to([p1.material, p2.material, p3.material], { opacity: 0, duration: 1 });
                gsap.to([p1.position, p2.position, p3.position], { y: 0, duration: 1 });
            } else if (index === 3) {
                const { trackers, geofence } = (sceneGroups[3] as any).animData;
                gsap.to([trackers.material, geofence.material], { opacity: 0, duration: 1 });
            } else if (index === 4) {
                const { routeLineMat, vehMat } = (sceneGroups[4] as any).animData;
                gsap.to([routeLineMat, vehMat], { opacity: 0, duration: 1 });
            } else if (index === 5) {
                const { uniforms, nodes } = (sceneGroups[5] as any).animData;
                gsap.to(uniforms.uProgress, { value: 0, duration: 1, ease: "power2.in" });
                nodes.forEach((n: any) => gsap.to(n, { opacity: 0, duration: 0.5 }));
            } else if (index === 6) {
                const { cloudMat, syncLinesMat, cloudNode } = (sceneGroups[6] as any).animData;
                gsap.to([cloudMat, syncLinesMat], { opacity: 0, duration: 1 });
                gsap.to(cloudNode.position, { y: 5, duration: 1 });
            } else if (index === 7) {
                const { mat, helperMat } = (sceneGroups[7] as any).animData;
                gsap.to([mat, helperMat], { opacity: 0, duration: 1 });
            } else if (index === 8) {
                const { gridMat, pts } = (sceneGroups[8] as any).animData;
                gsap.to(gridMat, { opacity: 0, duration: 1 });
                pts.forEach((p: any) => gsap.to(p.material, { opacity: 0, duration: 0.5 }));
            } else if (index === 9) {
                const { globeMat, cityMatGlobe } = (sceneGroups[9] as any).animData;
                gsap.to([globeMat, cityMatGlobe], { opacity: 0, duration: 1 });
            }

            setTimeout(() => { grp.visible = false; }, 1500);
        }

        function enterScene(index: number) {
            const grp = sceneGroups[index];
            const data = SCENES[index];
            grp.visible = true;

            if (titleRef.current) titleRef.current.innerText = data.title;
            if (descRef.current) descRef.current.innerText = data.desc;
            if (indexRef.current) indexRef.current.innerText = (index + 1).toString().padStart(2, '0');

            gsap.to(camera.position, { x: data.camPos.x, y: data.camPos.y, z: data.camPos.z, duration: 2.5, ease: "power3.inOut" });
            gsap.to(cameraTarget, { x: data.camLook.x, y: data.camLook.y, z: data.camLook.z, duration: 2.5, ease: "power3.inOut" });

            if (progressTweenRef.current) progressTweenRef.current.kill();
            if (progressRef.current) progressRef.current.style.width = "0%";

            progressTweenRef.current = gsap.to(progressRef.current, {
                width: "100", // Using 100 for % later
                duration: CONFIG.duration / 1000,
                ease: "linear",
                onComplete: () => {
                    if (!isPausedRef.current) handleNextScene();
                }
            });

            if (index === 0) {
                terrainMesh.scale.y = 0.01;
                gsap.to(terrainMat, { opacity: 0.8, duration: 1, delay: 0.5 });
                gsap.to(terrainMesh.scale, { y: 1, duration: 2, ease: "elastic.out" });
            } else if (index === 1) {
                cityGroup.scale.y = 0.01;
                gsap.to(buildingMat, { opacity: 0.6, duration: 1 });
                gsap.to(cityGroup.scale, { y: 1, duration: 2, ease: "power3.out" });
            } else if (index === 2) {
                const { p1, p2, p3 } = (sceneGroups[2] as any).animData;
                p1.position.y = p2.position.y = p3.position.y = 0;
                gsap.to(p1.material, { opacity: 0.3, duration: 1 });
                gsap.to(p2.material, { opacity: 0.8, duration: 1, delay: 0.2 });
                gsap.to(p3.material, { opacity: 0.5, duration: 1, delay: 0.4 });
                gsap.to(p1.position, { y: 0, duration: 2, ease: "power2.out" });
                gsap.to(p2.position, { y: 4, duration: 2, ease: "power2.out" });
                gsap.to(p3.position, { y: 8, duration: 2, ease: "power2.out" });
            } else if (index === 3) {
                const { trackers, geofence } = (sceneGroups[3] as any).animData;
                gsap.to(trackers.material, { opacity: 1, duration: 1 });
                gsap.to(geofence.material, { opacity: 0.4, duration: 1 });
            } else if (index === 4) {
                const { routeLineMat, vehMat } = (sceneGroups[4] as any).animData;
                vehicleProgress.val = 0;
                gsap.to(routeLineMat, { opacity: 1, duration: 1 });
                gsap.to(vehMat, { opacity: 1, duration: 1 });
                gsap.to(vehicleProgress, { val: 1, duration: 4, repeat: -1, ease: "power1.inOut" });
            } else if (index === 5) {
                const { uniforms, nodes } = (sceneGroups[5] as any).animData;
                uniforms.uProgress.value = 0;
                gsap.to(uniforms.uProgress, { value: 1, duration: 2.5, ease: "power2.out" });
                nodes.forEach((n: any, i: number) => gsap.to(n, { opacity: 1, duration: 1, delay: i * 0.2 }));
            } else if (index === 6) {
                const { cloudMat, syncLinesMat, cloudNode } = (sceneGroups[6] as any).animData;
                cloudNode.position.y = 5;
                gsap.to(cloudMat, { opacity: 1, duration: 1 });
                gsap.to(syncLinesMat, { opacity: 0.4, duration: 1, delay: 0.5 });
                gsap.to(cloudNode.position, { y: 15, duration: 2, ease: "back.out" });
            } else if (index === 7) {
                const { mat, helperMat } = (sceneGroups[7] as any).animData;
                gsap.to(mat, { opacity: 0.9, duration: 1 });
                gsap.to(helperMat, { opacity: 1, duration: 1 });
            } else if (index === 8) {
                const { gridMat, pts } = (sceneGroups[8] as any).animData;
                gsap.to(gridMat, { opacity: 0.3, duration: 1 });
                pts.forEach((p: any) => {
                    p.position.set(p.userData.targetX + (Math.random() - 0.5) * 10, 0, p.userData.targetZ + (Math.random() - 0.5) * 10);
                    gsap.to(p.material, { opacity: 1, duration: 0.5 });
                    gsap.to(p.position, { x: p.userData.targetX, z: p.userData.targetZ, duration: 1.5 + Math.random(), ease: "elastic.out", delay: 0.5 });
                });
            } else if (index === 9) {
                const { globe, globeMat, cityMatGlobe } = (sceneGroups[9] as any).animData;
                globe.rotation.set(0, 0, 0);
                gsap.to(globeMat, { opacity: 0.4, duration: 1 });
                gsap.to(cityMatGlobe, { opacity: 0.8, duration: 1, delay: 0.5 });
            }
        }

        function handleNextScene() {
            exitScene(currentSceneIndex);
            currentSceneIndex = (currentSceneIndex + 1) % SCENES.length;
            enterScene(currentSceneIndex);
        }

        function handlePrevScene() {
            exitScene(currentSceneIndex);
            currentSceneIndex = (currentSceneIndex - 1 + SCENES.length) % SCENES.length;
            enterScene(currentSceneIndex);
        }

        // Expose to outer scope (React buttons)
        nextSceneRef.current = () => { if (progressTweenRef.current) handleNextScene(); };
        prevSceneRef.current = () => { if (progressTweenRef.current) handlePrevScene(); };

        function renderLoop() {
            try {
                const delta = clock.getDelta();
                globalTime += delta;
                gsap.update(performance.now()); // Custom engine tick

                camera.lookAt(cameraTarget);

                if (currentSceneIndex === 0) {
                    terrainMesh.rotation.z = Math.sin(globalTime * 0.1) * 0.05;
                } else if (currentSceneIndex === 3) {
                    const { trackers, geofence, pos, basePos } = (sceneGroups[3] as any).animData;
                    for (let i = 0; i < pos.length; i += 3) {
                        pos[i] = basePos[i] + Math.sin(globalTime * 2 + i) * 1.5;
                        pos[i + 2] = basePos[i + 2] + Math.cos(globalTime * 2 + i) * 1.5;
                    }
                    trackers.geometry.attributes.position.needsUpdate = true;
                    geofence.scale.setScalar(1 + Math.sin(globalTime * 3) * 0.02);
                } else if (currentSceneIndex === 4) {
                    const { curve, vehicle } = (sceneGroups[4] as any).animData;
                    const safeVal = Math.max(0, Math.min(1, vehicleProgress.val));
                    const pt = curve.getPoint(safeVal);
                    if (pt) vehicle.position.copy(pt);
                } else if (currentSceneIndex === 5) {
                    const { uniforms } = (sceneGroups[5] as any).animData;
                    uniforms.uTime.value = globalTime;
                } else if (currentSceneIndex === 6) {
                    const { cloudNode } = (sceneGroups[6] as any).animData;
                    cloudNode.rotation.y += delta * 0.5;
                    cloudNode.rotation.x += delta * 0.2;
                } else if (currentSceneIndex === 7) {
                    const { light } = (sceneGroups[7] as any).animData;
                    light.position.x = Math.sin(globalTime * 0.5) * 30;
                    light.position.z = Math.cos(globalTime * 0.5) * 30;
                } else if (currentSceneIndex === 9) {
                    const { globe } = (sceneGroups[9] as any).animData;
                    globe.rotation.y += delta * 0.2;
                    globe.rotation.x = Math.sin(globalTime * 0.2) * 0.2;
                }

                baseGrid.position.x = (globalTime * 2) % 10;
                renderer.render(scene, camera);

                animationId = requestAnimationFrame(renderLoop);
            } catch (error) {
                console.error("Fatal animation loop error:", error);
                if (animationId) cancelAnimationFrame(animationId);
            }
        }

        // --- RESIZE OBSERVER ---
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                if (width > 0 && height > 0) {
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                    renderer.setSize(width, height);
                }
            }
        });
        resizeObserver.observe(container);

        // --- START ---
        camera.position.set(0, 100, 100);
        camera.lookAt(0, 0, 0);

        const initialTimeout = setTimeout(() => {
            handleNextScene();
        }, 500);
        renderLoop();

        // --- CLEANUP ---
        return () => {
            clearTimeout(initialTimeout);
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
            if (progressTweenRef.current) progressTweenRef.current.kill();
            gsap.killAll();

            // Safe disposal of WebGL resources
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    // Helper functions for interaction pause/resume shared across overlay layers
    const handleMouseEnter = () => {
        setIsHovered(true);
        isPausedRef.current = true;
        if (progressTweenRef.current) progressTweenRef.current.pause();
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        isPausedRef.current = false;
        if (progressTweenRef.current) progressTweenRef.current.resume();
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-[#0B0B0F]">
            {/* 3D Canvas Mount Point */}
            <div ref={mountRef} className="absolute inset-0 z-[1]" />

            {/* Vignette Overlay for Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(11,11,15,0.85)_100%)] z-[2] pointer-events-none" />

            {/* Scene Information UI */}
            <div className="absolute top-[10%] left-[5%] w-[400px] max-w-[85%] z-10 pointer-events-none flex flex-col gap-3">
                <div className="font-mono text-[10px] sm:text-xs text-[#2E6BFF] tracking-[2px] uppercase flex items-center gap-2.5">
                    <div className="w-[30px] h-[1px] bg-[#2E6BFF]" />
                    Module <span ref={indexRef}>01</span> // 10
                </div>
                <h2 ref={titleRef} className="text-2xl md:text-[32px] font-semibold leading-[1.2] m-0 drop-shadow-[0_0_20px_rgba(46,107,255,0.3)] text-white">
                    Initializing...
                </h2>
                <p ref={descRef} className="text-sm md:text-base text-slate-400 leading-[1.6] font-light m-0 pr-4">
                    Loading geospatial environment...
                </p>
            </div>

            {/* Play/Pause Status Badge */}
            <div
                className={`absolute top-10 right-[5%] font-mono text-[11px] px-3 py-1.5 border rounded-full flex items-center gap-2 z-10 transition-all duration-300 ${isHovered ? 'border-white/30 text-white bg-white/5' : 'border-[#2E6BFF]/30 text-[#2E6BFF] bg-[#2E6BFF]/5'
                    }`}
            >
                <div className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-white' : 'bg-[#2E6BFF] shadow-[0_0_8px_#2E6BFF] animate-[pulse_1.5s_infinite]'}`} />
                <span>{isHovered ? 'PAUSED BY USER' : 'AUTO-PLAY ACTIVE'}</span>
            </div>

            {/* Progress Bar Container */}
            <div className="absolute bottom-10 left-[5%] w-[90%] h-0.5 bg-white/10 z-10 rounded-sm overflow-hidden pointer-events-none">
                <div ref={progressRef} className="h-full w-0 bg-[#2E6BFF] shadow-[0_0_10px_rgba(46,107,255,0.6)] origin-left" />
            </div>

            {/* Next / Prev Controls */}
            <div
                className="absolute bottom-14 right-[5%] z-30 flex gap-2.5"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <button
                    onClick={() => prevSceneRef.current()}
                    className="flex items-center gap-1.5 bg-[#2E6BFF]/10 border border-[#2E6BFF]/30 text-[#2E6BFF] font-mono text-xs px-3.5 py-2 rounded cursor-pointer transition-all duration-300 hover:bg-[#2E6BFF]/30 hover:border-[#2E6BFF] hover:text-white hover:shadow-[0_0_10px_rgba(46,107,255,0.5)] uppercase tracking-wider"
                >
                    <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                    onClick={() => nextSceneRef.current()}
                    className="flex items-center gap-1.5 bg-[#2E6BFF]/10 border border-[#2E6BFF]/30 text-[#2E6BFF] font-mono text-xs px-3.5 py-2 rounded cursor-pointer transition-all duration-300 hover:bg-[#2E6BFF]/30 hover:border-[#2E6BFF] hover:text-white hover:shadow-[0_0_10px_rgba(46,107,255,0.5)] uppercase tracking-wider"
                >
                    Next <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* General Interaction Layer (Catches main canvas mouse events to pause) */}
            <div
                className="absolute inset-0 z-20 cursor-crosshair"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
        </div>
    );
};

export default function GISShowcase() {
    return (
        <div className="w-full h-full">
            {/* Your Requested UI Wrapper */}
            <div className="relative h-full">
                <div className="relative group h-full">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-700 to-cyan-400 rounded-[2.2rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>

                    <div className="relative h-full bg-[#0A101F] border border-blue-950 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col">
                        {/* Toolbar header */}
                        <div className="px-6 py-4 border-b border-blue-950/50 bg-slate-950 flex items-center justify-between shrink-0">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-pulse" />
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-800" />
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                            </div>
                            <span className="text-[11px] font-mono text-cyan-500 uppercase tracking-widest">Analytic_Workspace_v4</span>
                            <Settings className="w-4 h-4 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer" />
                        </div>

                        {/* Viewport content */}
                        <div className="flex-1 w-full bg-[#080E18] relative min-h-[500px]">

                            {/* Embedded WebGL Engine component */}
                            <GISVisualEngine />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}