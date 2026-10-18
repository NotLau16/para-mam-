"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Stamp, X } from "lucide-react";

// ========================================== TODO: PERSONALIZAR CONTENIDO AQUÍ ==========================================
const CONTENIDO = {
  cartaTitulo: "Mamá,",
  carta: [
    "Quería escribirte algo que se pudiera abrir cuando tengas un ratito y en cualquier momento que lo desees y sin apuro.",
    "Gracias por tu amor incondicional. Por esa forma tuya de cuidarme aunque los años pasen y yo siga creciendo. Gracias por hacerme sentir que siempre hay un lugar al que volver y saber que vos vas a estar ahi.",
    "Entre Córdoba y Salta hay un montón de kilómetros, pero a vos te siento cerca en cada acción que hago y cada decisión que voy a tomar. Siempre pienso ¿Qué me diría mi mamá?. En cada llamada, en cada reencuentro, en cada pequeñas situaciones cotidianas te pienso y estás presente en mi corazón",
    "Cada charla, cada consejo (hasta los que no te pedí) y cada visita me importan más de lo que te digo. Me hacen ser quien soy y poder seguir creciendo y formandome como persona y hombre.",
    "Este presente no es nada comparado con todo lo que hacés, pero está hecho con muchísimo cariño y amor. Gracias por dejarme ser tu hijo y por compartir tu vida conmigo",
  ],
  firma: "Te ama y te quiere muchísimo, tu hijo, Lautaro",
  fotos: [
    { src: "/fotos/foto1.jpeg", epigrafe: "Tu ultimo cumpleños", reverso: "Tu ultimo cumpleñaos aca en Córdoba y espero que pasemos muchisimo mas cumpleños júntos." },
    { src: "/fotos/foto2.jpeg", epigrafe: "Juntos para mi cumpleaños", reverso: "Una felicidad inmensa poder seguir festejando mi cumpleaños con mi familia y a tu lado." },
    { src: "/fotos/foto3.jpeg", epigrafe: "Cuando eramos mas jovenes", reverso: "Un recuerdo de cuando eramos más jovenes y seguimos igual de lindos." },
    { src: "/fotos/foto4.jpeg", epigrafe: "Momento madre e hijo", reverso: "Un dia cualquiera es especial si estamos sonriendo juntos." },
  ],
  papelitos: [
    "Porque me atendés el teléfono aunque estés ocupada.",
    "Porque aunque no cocines seguido, siempre que me cocinas me trae muchisimos lindos recuerdos y sabores.",
    "Porque siempre sabés cuándo algo me pasa, aunque diga “todo bien”.",
    "Porque cada consejo tuyo termina teniendo razón.",
    "Porque me enseñaste a ser el hombre que soy hoy en dia.",
    "Porque tu abrazo es una paz inmensa e inimaginable.",
    "Porque hasta el dia de hoy me seguis comprando lo que pido a pesar de que hayas echos muchismos gastos.",
    "Porque siempre en todo lo que hago me brindas todo tu apoyo y me preguntas como me fue.",
    "Porque a pesar de la distancia me seguis enseñando y dandome todo tu tiempo.",
    "Porque sos la mejor mamá que la vida me pudo dar.",
  ],
  cupones: [
    { id: "soporte", texto: "Vale por soporte técnico para el celular o aparato tecnológico" },
    { id: "merienda", texto: "Vale por una merienda, almuerzo o cena juntos apenas nos veamos" },
    { id: "abrazo", texto: "Vale por un abrazo interminable" },
    { id: "peli", texto: "Vale por elegir una pelicula o algun juego para jugar juntos" },
  ],
  abrazoBoton: "Apretá acá para recibir un abrazo desde Córdoba",
  mensajeFinal: "¡Feliz Día, Má! Te quiero muchísimo — Lau",
};
// =======================================================================================================================

const C = { rosa: "#D88C9A", salvia: "#84A59D", oro: "#D4AF37", tinta: "#2C2523", papel: "#F4EFE6" };
const spring = { type: "spring", stiffness: 260, damping: 18 } as const;

/* ---------- Partículas de fondo (solo cliente, sin hidratación) ---------- */
function Particulas() {
  const [items, setItems] = useState<{ x: number; s: number; d: number; t: number; c: string }[]>([]);
  useEffect(() => {
    setItems(Array.from({ length: 14 }, (_, i) => ({
      x: Math.random() * 100, s: 8 + Math.random() * 12, d: Math.random() * 10, t: 14 + Math.random() * 10,
      c: [C.rosa, C.oro, C.salvia][i % 3],
    })));
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((p, i) => (
        <motion.span key={i} className="absolute top-0 block rounded-[60%_40%_60%_40%]"
          style={{ left: `${p.x}%`, width: p.s, height: p.s * 0.75, background: p.c, opacity: 0.35 }}
          initial={{ y: -40, rotate: 0 }} animate={{ y: "105vh", rotate: 360, x: [0, 24, -24, 0] }}
          transition={{ duration: p.t, delay: p.d, repeat: Infinity, ease: "linear" }} />
      ))}
    </div>
  );
}

/* ---------- Sobre 3D ---------- */
function Sobre({ onOpened }: { onOpened: () => void }) {
  const [abierto, setAbierto] = useState(false);
  const abrir = () => {
    if (abierto) return;
    setAbierto(true);
    setTimeout(() => {
      confetti({ particleCount: 70, spread: 90, origin: { y: 0.6 }, colors: [C.rosa, C.oro, C.salvia], scalar: 1.1, gravity: 0.7 });
      onOpened();
    }, 2300);
  };
  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-[#FDFBF7]" exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 0.7 }}>
      <div style={{ perspective: 900 }} className="relative h-[210px] w-[310px]">
        {/* tarjeta interior */}
        <motion.div className="paper absolute left-3 right-3 top-3 z-10 flex h-[190px] items-center justify-center rounded-md"
          animate={abierto ? { y: -120, scale: 1.05 } : { y: 0 }} transition={{ delay: 0.9, duration: 1, type: "spring", damping: 16 }}>
          <p className="font-hand text-3xl" style={{ color: C.rosa }}>Para Mamá</p>
        </motion.div>
        {/* cuerpo */}
        <div className="absolute inset-0 z-20 rounded-md" style={{ background: `linear-gradient(135deg, #EFE6D6, ${C.papel})`, boxShadow: "0 18px 30px -12px rgba(44,37,35,.35)", clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }} />
        {/* solapa */}
        <motion.div className="absolute left-0 top-0 h-[115px] w-full" style={{ transformOrigin: "top", transformStyle: "preserve-3d", zIndex: abierto ? 5 : 30 }}
          animate={{ rotateX: abierto ? -180 : 0 }} transition={{ duration: 0.9, delay: 0.3, ease: "easeInOut" }}>
          <div className="h-full w-full" style={{ background: "linear-gradient(180deg,#E8DCC7,#F1E8D8)", clipPath: "polygon(0 0,100% 0,50% 100%)", backfaceVisibility: "hidden" }} />
        </motion.div>
        {/* sello */}
        <motion.button aria-label="Abrir sobre" onClick={abrir} className="absolute left-1/2 top-[100px] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white"
          style={{ background: `radial-gradient(circle at 35% 30%, #E9B2BC, ${C.rosa} 55%, #B96F7F)`, boxShadow: `0 0 0 3px ${C.oro}, 0 6px 12px rgba(44,37,35,.35)` }}
          animate={abierto ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] } : { scale: [1, 1.06, 1] }}
          transition={abierto ? { duration: 0.5 } : { duration: 2, repeat: Infinity }} whileTap={{ scale: 0.9 }}>
          <Heart size={26} fill="currentColor" />
        </motion.button>
      </div>
      <motion.p className="font-hand text-2xl" animate={{ opacity: abierto ? 0 : 1 }}>Tocá el sello para abrir</motion.p>
    </motion.div>
  );
}

/* ---------- Carta ---------- */
function Carta() {
  return (
    <section className="relative z-10 mx-auto max-w-md px-5 pt-16">
      <div className="paper relative rounded-sm px-7 pb-10 pt-12">
        <span className="washi -top-3 left-3 -rotate-6" style={{ background: C.rosa }} />
        <span className="washi -top-3 right-3 rotate-6" style={{ background: C.salvia }} />
        <h1 className="font-hand text-5xl" style={{ color: C.rosa }}>{CONTENIDO.cartaTitulo}</h1>
        <div className="mt-5 space-y-5">
          {CONTENIDO.carta.map((p, i) => (
            <motion.p key={i} className="font-hand text-[1.55rem] leading-[1.35]" initial={{ opacity: 0, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1 }}>{p}</motion.p>
          ))}
        </div>
        <p className="font-hand mt-8 text-right text-3xl" style={{ color: C.salvia }}>{CONTENIDO.firma}</p>
      </div>
    </section>
  );
}

/* ---------- Polaroids ---------- */
function Polaroid({ f, i }: { f: (typeof CONTENIDO.fotos)[number]; i: number }) {
  const [flip, setFlip] = useState(false);
  const [err, setErr] = useState(false);
  const face = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as const;
  return (
    <motion.button onClick={() => setFlip(!flip)} className="relative aspect-[4/5] w-full text-left" style={{ perspective: 1000, rotate: i % 2 ? 2.5 : -2.5 }}
      whileTap={{ scale: 0.97 }} aria-label={`Foto: ${f.epigrafe}. Tocá para girar`}>
      <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }} animate={{ rotateY: flip ? 180 : 0 }} transition={{ type: "spring", stiffness: 140, damping: 16 }}>
        <div className="absolute inset-0 flex flex-col bg-white p-2.5 pb-0 shadow-lg" style={face}>
          <div className="relative flex-1 overflow-hidden bg-[#F4EFE6]">
            {err ? (
              <div className="flex h-full items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.rosa}55, ${C.salvia}55)` }}><Heart style={{ color: C.rosa }} /></div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={f.src} alt={f.epigrafe} onError={() => setErr(true)} className="h-full w-full object-cover" />
            )}
          </div>
          <p className="font-hand py-2 text-center text-xl">{f.epigrafe}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-[#FFFDF8] p-4 shadow-lg" style={{ ...face, transform: "rotateY(180deg)" }}>
          <p className="font-hand text-xl leading-snug">{f.reverso}</p>
        </div>
      </motion.div>
    </motion.button>
  );
}
function Galeria() {
  return (
    <section className="relative z-10 mx-auto max-w-md px-5 pt-24">
      <h2 className="font-title text-4xl font-semibold">Momentos guardados</h2>
      <p className="font-hand mt-1 text-xl" style={{ color: C.salvia }}>Tocá cada foto para darla vuelta</p>
      <div className="mt-8 grid grid-cols-2 gap-5">{CONTENIDO.fotos.map((f, i) => <Polaroid key={i} f={f} i={i} />)}</div>
    </section>
  );
}

/* ---------- Tarrito ---------- */
function Tarrito() {
  const orden = useRef<number[]>([]);
  const [actual, setActual] = useState<string | null>(null);
  const [n, setN] = useState(0);
  const sacar = () => {
    if (orden.current.length === 0) {
      const a = CONTENIDO.papelitos.map((_, i) => i);
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      orden.current = a;
    }
    setActual(CONTENIDO.papelitos[orden.current.pop() as number]);
    setN((v) => v + 1);
  };
  return (
    <section className="relative z-10 mx-auto max-w-md px-5 pt-24 text-center">
      <h2 className="font-title text-4xl font-semibold">Tarrito de razones por las que sos la mejor mamá</h2>
      <svg viewBox="0 0 200 220" className="mx-auto mt-6 w-48" aria-hidden>
        <rect x="55" y="8" width="90" height="24" rx="6" fill={C.oro} />
        <path d="M60 32h80c18 10 30 30 30 60v95c0 14-10 24-24 24H54c-14 0-24-10-24-24V92c0-30 12-50 30-60z" fill="#ffffff" fillOpacity=".55" stroke={C.salvia} strokeWidth="3" />
        {[[60,150,-12,C.rosa],[95,165,8,C.oro],[120,140,-20,C.salvia],[78,120,15,C.oro],[110,110,-6,C.rosa],[70,185,5,C.salvia],[118,185,-10,C.rosa]].map(([x,y,r,c],i)=>(
          <rect key={i} x={x as number} y={y as number} width="26" height="18" rx="2" fill={c as string} opacity=".85" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </svg>
      <motion.button onClick={sacar} whileTap={{ scale: 0.94 }} className="mt-6 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-lg" style={{ background: C.rosa }}>
        Sacar un papelito
      </motion.button>
      <AnimatePresence>
        {actual && (
          <motion.div className="fixed inset-0 z-40 flex items-center justify-center bg-[#2C2523]/40 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActual(null)}>
            <motion.div key={n} className="paper relative w-full max-w-xs rounded-sm px-6 py-10" style={{ transformOrigin: "bottom" }}
              initial={{ scale: 0.2, rotate: -14, y: 120, rotateX: 80 }} animate={{ scale: 1, rotate: -1.5, y: 0, rotateX: 0 }} exit={{ scale: 0.6, opacity: 0, y: 60 }} transition={{ type: "spring", stiffness: 200, damping: 11 }}>
              <button aria-label="Cerrar" className="absolute right-2 top-2 p-2" onClick={() => setActual(null)}><X size={18} /></button>
              <p className="font-hand text-[1.7rem] leading-snug">{actual}</p>
              <p className="mt-5 text-xs opacity-60">Tocá fuera para guardarlo y sacar otro</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Cuponera ---------- */
const KEY = "mama-cupones-v1";
function Cuponera() {
  const [ok, setOk] = useState<string[]>([]);
  useEffect(() => { try { const s = localStorage.getItem(KEY); if (s) setOk(JSON.parse(s)); } catch {} }, []);
  const canjear = (id: string, e: React.MouseEvent) => {
    if (ok.includes(id)) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    confetti({ particleCount: 40, spread: 60, startVelocity: 25, origin: { x: (r.left + r.width / 2) / innerWidth, y: (r.top + r.height / 2) / innerHeight }, colors: [C.oro, C.rosa, C.salvia] });
    const nuevo = [...ok, id];
    setOk(nuevo);
    try { localStorage.setItem(KEY, JSON.stringify(nuevo)); } catch {}
  };
  const mask = "radial-gradient(circle at 0 50%, transparent 11px, #000 12px) left/51% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent 11px, #000 12px) right/51% 100% no-repeat";
  return (
    <section className="relative z-10 mx-auto max-w-md px-5 pt-24">
      <h2 className="font-title text-4xl font-semibold">Cuponera oficial del Día de la Madre</h2>
      <p className="font-hand mt-1 text-xl" style={{ color: C.salvia }}>Tocá un cupón para canjearlo</p>
      <div className="mt-8 space-y-4">
        {CONTENIDO.cupones.map((c) => {
          const hecho = ok.includes(c.id);
          return (
            <motion.button key={c.id} onClick={(e) => canjear(c.id, e)} whileTap={{ scale: hecho ? 1 : 0.97 }} disabled={hecho}
              className="relative block w-full text-left" style={{ filter: "drop-shadow(0 4px 6px rgba(44,37,35,.18))" }}>
              <div className="relative flex min-h-[96px] items-center gap-4 px-7 py-5" style={{ background: C.papel, WebkitMask: mask, mask, borderLeft: `6px dashed ${hecho ? C.salvia : C.rosa}` }}>
                <Stamp size={28} style={{ color: hecho ? C.salvia : C.rosa }} className="shrink-0" />
                <p className={`font-title text-xl font-semibold leading-tight ${hecho ? "opacity-50" : ""}`}>{c.texto}</p>
                {hecho && (
                  <motion.span initial={{ scale: 3, opacity: 0, rotate: -30 }} animate={{ scale: 1, opacity: 0.9, rotate: -12 }} transition={spring}
                    className="font-hand absolute right-4 top-1/2 -translate-y-1/2 rounded-md border-[3px] px-3 py-1 text-2xl" style={{ color: C.rosa, borderColor: C.rosa }}>¡Canjeado!</motion.span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Cierre ---------- */
function Cierre() {
  const [open, setOpen] = useState(false);
  const abrazo = useCallback(() => {
    setOpen(true);
    try { navigator.vibrate?.([100, 80, 100, 400, 100, 80, 100]); } catch {}
    const corazon = confetti.shapeFromText({ text: "❤️", scalar: 2 });
    const fin = Date.now() + 3500;
    (function lluvia() {
      confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, shapes: [corazon], scalar: 2, colors: [C.rosa] });
      confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors: [C.oro, C.oro, C.rosa] });
      confetti({ particleCount: 6, spread: 120, origin: { x: Math.random(), y: -0.1 }, gravity: 0.9, colors: [C.oro, "#F3D976"] });
      if (Date.now() < fin) requestAnimationFrame(lluvia);
    })();
  }, []);
  return (
    <section className="relative z-10 mx-auto max-w-md px-5 pb-28 pt-28 text-center">
      <motion.button onClick={abrazo} whileTap={{ scale: 0.93 }} animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
        className="rounded-3xl px-7 py-6 text-lg font-semibold text-white shadow-xl" style={{ background: `linear-gradient(135deg, ${C.rosa}, #C4707F)` }}>
        <Heart className="mx-auto mb-2" fill="currentColor" />{CONTENIDO.abrazoBoton}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[55] flex items-center justify-center bg-[#2C2523]/55 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div className="relative w-full max-w-xs rounded-3xl bg-[#FDFBF7] px-7 py-12" style={{ boxShadow: `0 0 60px ${C.oro}88` }}
              initial={{ scale: 0.5, y: 40 }} animate={{ scale: 1, y: 0 }} transition={spring}>
              <motion.div animate={{ scale: [1, 1.25, 1, 1.25, 1] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.4 }}><Heart size={44} className="mx-auto" fill={C.rosa} stroke={C.rosa} /></motion.div>
              <p className="font-title mt-5 text-3xl font-semibold leading-snug">{CONTENIDO.mensajeFinal}</p>
              <p className="mt-6 text-xs opacity-60">Tocá para cerrar</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function Page() {
  const [listo, setListo] = useState(false);
  return (
    <main className="relative min-h-dvh">
      <Particulas />
      <AnimatePresence>{!listo && <Sobre key="sobre" onOpened={() => setListo(true)} />}</AnimatePresence>
      {listo && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <Carta /><Galeria /><Tarrito /><Cuponera /><Cierre />
        </motion.div>
      )}
    </main>
  );
}
