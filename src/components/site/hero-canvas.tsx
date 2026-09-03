import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";

type Palette = {
  bg: string;
  edge: string;
  grid: string;
  section: string;
  key: string;
};

function readTheme(): Palette {
  const light = document.documentElement.classList.contains("light");
  return {
    bg: light ? "#eef2f8" : "#07111f",
    edge: light ? "#1f5f8b" : "#7eb8d9",
    grid: light ? "#c5d2e4" : "#152844",
    section: light ? "#9bb0c9" : "#1e3a5c",
    key: light ? "#ffffff" : "#e9eef6",
  };
}

/** Small ambient drifting particles — atmosphere, never a focal "mascot". */
function Dust({
  radius,
  speed,
  size,
  y,
  color,
  scroll,
}: {
  radius: number;
  speed: number;
  size: number;
  y: number;
  color: string;
  scroll: React.RefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    elapsed.current += delta;
    const t = elapsed.current * speed;
    const s = scroll.current ?? 0;
    if (!ref.current) return;
    ref.current.position.set(
      Math.cos(t) * (radius + s * 0.6),
      y + Math.sin(t * 1.4) * 0.12 - s * 0.5,
      Math.sin(t) * (radius + s * 0.6),
    );
    ref.current.rotation.x = t * 0.6;
    ref.current.rotation.y = t * 0.4;
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.35}
        roughness={0.4}
        metalness={0.3}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

/** Grid floor — the scene's only real "shape". Idles forever, drifts further with scroll. */
function GridFloor({
  palette,
  scroll,
}: {
  palette: Palette;
  scroll: React.RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const reduce = useRef(false);
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    elapsed.current += delta;
    const s = scroll.current ?? 0;
    const idle = reduce.current ? 0 : elapsed.current * 0.02;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, idle + s * 0.5, 2, delta);
  });

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={palette.bg} roughness={1} metalness={0} />
      </mesh>
      <Grid
        position={[0, -1.34, 0]}
        args={[20, 20]}
        cellSize={0.6}
        cellThickness={0.6}
        cellColor={palette.grid}
        sectionSize={3}
        sectionThickness={1}
        sectionColor={palette.section}
        fadeDistance={14}
        fadeStrength={1.4}
        infiniteGrid
      />
    </group>
  );
}

function CameraRig({
  mouse,
  scroll,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
  scroll: React.RefObject<number>;
}) {
  const { camera, size } = useThree();
  useFrame((_, delta) => {
    const s = scroll.current ?? 0;
    const mx = mouse.current?.x ?? 0;
    const mobile = size.width < 720;
    const z = (mobile ? 6.4 : 5.2) + s * 3.2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, mx * 0.35, 2.6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.28 - s * 1.1, 2.6, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 2.6, delta);
    camera.lookAt(0.2, 0.05 - s * 0.3, 0);
  });
  return null;
}

function Scene() {
  const mouse = useRef({ x: 0, y: 0 });
  // Continuous 0..1 across the *whole* document, not just the hero viewport —
  // so the scene keeps evolving as you scroll instead of freezing after it.
  const scroll = useRef(0);
  const [palette, setPalette] = useState<Palette>(readTheme);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    const sync = () => setPalette(readTheme());
    const media = window.matchMedia("(max-width: 719px)");
    const syncViewport = () => setMobile(media.matches);
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    media.addEventListener("change", syncViewport);
    syncViewport();
    onScroll();
    return () => {
      obs.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", syncViewport);
    };
  }, []);

  return (
    <>
      <color attach="background" args={[palette.bg]} />
      <fog attach="fog" args={[palette.bg, 6, 17]} />
      <hemisphereLight args={[palette.key, palette.bg, 0.5]} />
      <directionalLight position={[-4, 6, 4]} intensity={1.1} color={palette.key} />
      <directionalLight position={[5, 2, -3]} intensity={0.5} color={palette.edge} />
      <ambientLight intensity={0.25} />
      {!mobile ? <Dust radius={2.4} speed={0.45} size={0.1} y={0.6} color={palette.edge} scroll={scroll} /> : null}
      {!mobile ? <Dust radius={3.1} speed={-0.28} size={0.07} y={-0.1} color={palette.edge} scroll={scroll} /> : null}
      {!mobile ? <Dust radius={1.9} speed={0.65} size={0.06} y={1.1} color={palette.edge} scroll={scroll} /> : null}
      <GridFloor palette={palette} scroll={scroll} />
      <CameraRig mouse={mouse} scroll={scroll} />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0.3, 5.4], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: false }}>
        <Scene />
      </Canvas>
    </div>
  );
}
