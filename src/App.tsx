import {
  Bot,
  Braces,
  Cpu,
  ExternalLink,
  GitBranch,
  Layers3,
  RadioTower,
  Rocket,
  ShieldCheck,
  Smartphone,
  Terminal,
  Zap,
} from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ComponentType,
  type ReactNode,
} from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import './App.css'

type IconComponent = ComponentType<{
  size?: number
  strokeWidth?: number
  className?: string
}>

type Skill = {
  name: string
  detail: string
  level: number
  icon: IconComponent
}

type Project = {
  name: string
  status: string
  detail: string
  stack: string[]
  href?: string
}

type ToolLogo = {
  name: string
  code: string
  tone: string
}

const profile = {
  name: 'GABRIEL SORENSEN',
  handle: 'G4T0XX',
  github: 'https://github.com/GABRIELMSORENSEN',
  repos: 'https://github.com/GABRIELMSORENSEN?tab=repositories',
  portfolioRepo: 'https://github.com/GABRIELMSORENSEN/g4t0xx-portfolio',
  portfolioLive: 'https://gabrielmsorensen.github.io/g4t0xx-portfolio/',
}

const skills: Skill[] = [
  {
    name: 'Mobile engineering',
    detail: 'Android, Capacitor, camera, offline-first, APK e release',
    level: 96,
    icon: Smartphone,
  },
  {
    name: 'Frontend systems',
    detail: 'React, Vite, Framer Motion e interfaces profissionais',
    level: 95,
    icon: Layers3,
  },
  {
    name: 'Automation pipelines',
    detail: 'filas, APIs, recoveries, schedulers e rotinas confiaveis',
    level: 92,
    icon: Bot,
  },
  {
    name: 'Applied AI',
    detail: 'voz, visao, agentes, OCR, captura de tela e ML Kit',
    level: 89,
    icon: Cpu,
  },
  {
    name: 'Realtime systems',
    detail: 'OSC, UDP, pose detection, VRChat e full body tracking',
    level: 86,
    icon: RadioTower,
  },
  {
    name: 'Release engineering',
    detail: 'GitHub Pages, Releases, builds, APKs e handoff iOS',
    level: 91,
    icon: Rocket,
  },
]

const tools: ToolLogo[] = [
  { name: 'React', code: 'RX', tone: '#ff1744' },
  { name: 'Vite', code: 'VT', tone: '#ff3b30' },
  { name: 'TypeScript', code: 'TS', tone: '#d90429' },
  { name: 'Framer Motion', code: 'FM', tone: '#ff0055' },
  { name: 'Capacitor', code: 'CP', tone: '#ff4d6d' },
  { name: 'Android', code: 'AN', tone: '#ff1744' },
  { name: 'Python', code: 'PY', tone: '#c1121f' },
  { name: 'Node.js', code: 'ND', tone: '#e5383b' },
  { name: 'GitHub', code: 'GH', tone: '#ff758f' },
  { name: 'YouTube API', code: 'YT', tone: '#ff0000' },
  { name: 'ElevenLabs', code: 'EL', tone: '#ef233c' },
  { name: 'ML Kit', code: 'ML', tone: '#d00000' },
  { name: 'CameraX', code: 'CX', tone: '#ff2e63' },
  { name: 'OSC / UDP', code: 'OSC', tone: '#b7094c' },
  { name: 'VRChat', code: 'VR', tone: '#f72585' },
  { name: 'GitHub Pages', code: 'PG', tone: '#fb5607' },
]

const projects: Project[] = [
  {
    name: 'G4T0XX Music Player',
    status: 'mobile release',
    detail:
      'Produto mobile com player, downloads, UX Android e fluxo de distribuicao.',
    stack: ['React', 'Capacitor', 'Android', 'Releases'],
    href: 'https://github.com/GABRIELMSORENSEN/G4T0XX-Music-Player',
  },
  {
    name: 'G4 Docs Editor',
    status: 'web app',
    detail:
      'Editor PDF local com interface desktop, build estatico e publicacao web.',
    stack: ['PDF', 'Desktop', 'Pages', 'UI'],
    href: 'https://github.com/GABRIELMSORENSEN/g4-docs-editor',
  },
  {
    name: 'POLIGON Assistant AI',
    status: 'ai desktop',
    detail:
      'Assistente desktop com voz neural, visao computacional e leitura de contexto.',
    stack: ['AI', 'Voice', 'Vision', 'Desktop'],
    href: 'https://github.com/GABRIELMSORENSEN/POLIGON-ASSISTENT-AI',
  },
  {
    name: 'NetTunnel Pro',
    status: 'network app',
    detail:
      'Aplicativo de rede com Xray-core, Capacitor e Android VpnService.',
    stack: ['VPN', 'Xray-core', 'Capacitor', 'Android'],
    href: 'https://github.com/GABRIELMSORENSEN/nettunnel-pro',
  },
  {
    name: 'G4T0XX Hybrid FBT',
    status: 'realtime',
    detail:
      'Sistema realtime para full body tracking, Quest 3S, VRChat, camera e OSC.',
    stack: ['CameraX', 'ML Kit', 'OSC', 'VRChat'],
  },
  {
    name: 'SonicTubeOcf Pipeline',
    status: 'pipeline',
    detail:
      'Pipeline operacional com narracao, recoveries, fila e agendamento no YouTube.',
    stack: ['Python', 'ElevenLabs', 'YouTube API', 'Scheduler'],
  },
]

const stats = [
  ['public repos', '09'],
  ['product builds', '04+'],
  ['motion system', 'HyperFrames'],
  ['delivery', 'online'],
]

const nav = [
  ['Home', '#top'],
  ['Core', '#core'],
  ['Motion', '#motion'],
  ['Ferramentas', '#tools'],
  ['Projetos', '#apps'],
  ['Contato', '#contato'],
]

const terminalLines = [
  '$ start engineering-portfolio --profile G4T0XX',
  'focus: product engineering, automation, mobile, AI',
  'delivery: validated build / GitHub Pages online',
]

const introCells = Array.from({ length: 96 }, (_, index) => index)
const pixelCells = Array.from({ length: 56 }, (_, index) => index)

const reveal = {
  hidden: { opacity: 0, y: 32, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

function App() {
  const [introActive, setIntroActive] = useState(true)
  const shouldReduceMotion = useReducedMotion()
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 24 })
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 24 })
  const pointerMask = useMotionTemplate`radial-gradient(circle at ${smoothX}% ${smoothY}%, rgba(255, 0, 64, 0.28), transparent 33rem)`

  useEffect(() => {
    if (shouldReduceMotion) return
    const timer = window.setTimeout(() => setIntroActive(false), 2350)
    return () => window.clearTimeout(timer)
  }, [shouldReduceMotion])

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(((event.clientX - rect.left) / rect.width) * 100)
    mouseY.set(((event.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <main className="shell" onPointerMove={handlePointerMove}>
      {!shouldReduceMotion && introActive && <IntroWipe />}
      <motion.div
        className="pointer-field"
        aria-hidden="true"
        style={{ background: shouldReduceMotion ? undefined : pointerMask }}
      />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Voltar ao topo">
          <Terminal size={22} strokeWidth={1.8} />
          <span>{profile.handle}</span>
        </a>
        <nav aria-label="Navegacao principal">
          {nav.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a
          className="icon-link"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <GitBranch size={20} strokeWidth={1.8} />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-bg" aria-hidden="true" />
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 } },
          }}
        >
          <motion.p className="handle-line" variants={reveal}>
            Software Engineer // Product Builder // Release Operator
          </motion.p>
          <motion.h1 variants={reveal}>
            {profile.name}
            <span> / {profile.handle}</span>
          </motion.h1>
          <motion.p className="hero-text" variants={reveal}>
            Construo produtos digitais com foco em engenharia de software:
            arquitetura clara, interfaces modernas, automacoes confiaveis,
            builds testados e publicacao pronta para empresas avaliarem.
          </motion.p>
          <motion.div className="magnetic-row" variants={reveal}>
            <MagneticText text="CREATE" hoverText="ELEVATE" />
            <MagneticText text="BUILD" hoverText="SHIP" />
          </motion.div>
          <motion.div className="hero-actions" variants={reveal}>
            <motion.a
              className="primary-action"
              href="#core"
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <Rocket size={19} strokeWidth={1.8} />
              Ver arquitetura
            </motion.a>
            <motion.a
              className="secondary-action"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <GitBranch size={19} strokeWidth={1.8} />
              GitHub
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.aside
          className="terminal-panel"
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 26,
            rotateX: shouldReduceMotion ? 0 : 5,
          }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.35 }}
        >
          <div className="terminal-top">
            <span />
            <span />
            <span />
            <strong>delivery.pipeline</strong>
          </div>
          <div className="terminal-body">
            {terminalLines.map((line, index) => (
              <motion.code
                key={line}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.5 + index * 0.18 }}
              >
                {line}
              </motion.code>
            ))}
          </div>
          <div className="stat-grid">
            {stats.map(([label, value]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.aside>
      </section>

      <EngineeringWorkbench />

      <section className="section motion-section" id="motion">
        <SectionTitle
          icon={Zap}
          title="Motion system"
          text="Fluxo inspirado em HyperFrames: cenas, ritmo, timeline e transicoes pensadas como uma composicao, mas aplicadas no site em tempo real."
        />
        <MotionStoryboard />
      </section>

      <section className="section tools-section" id="tools">
        <SectionTitle
          icon={Braces}
          title="Ferramentas"
          text="Grid interativo com as tecnologias usadas no meu fluxo de desenvolvimento, automacao, mobile e publicacao."
        />
        <div className="tool-grid">
          {tools.map((tool, index) => (
            <RevealCard key={tool.name} delay={index * 0.025}>
              <PixelToolCard tool={tool} />
            </RevealCard>
          ))}
        </div>
      </section>

      <PixelWipeStrip from="ENGINEERING" to="DELIVERY" />

      <section className="section skills-section" id="skills">
        <SectionTitle
          icon={Layers3}
          title="Habilidades"
          text="Competencias organizadas para criar, manter, empacotar e publicar sistemas de software."
        />
        <div className="skill-grid">
          {skills.map((skill, index) => (
            <RevealCard key={skill.name} delay={index * 0.04}>
              <SkillCard skill={skill} />
            </RevealCard>
          ))}
        </div>
      </section>

      <section className="section apps-section" id="apps">
        <SectionTitle
          icon={Rocket}
          title="Projetos como cases"
          text="Produtos e ferramentas com valor claro para empresas: mobile, desktop, IA, automacao, realtime e deploy."
        />
        <div className="project-grid">
          {projects.map((project, index) => (
            <RevealCard key={project.name} delay={index * 0.05}>
              <article className="project-card">
                <div className="project-head">
                  <span>{project.status}</span>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Abrir ${project.name}`}
                    >
                      <ExternalLink size={18} strokeWidth={1.8} />
                    </a>
                  ) : (
                    <ShieldCheck size={18} strokeWidth={1.8} />
                  )}
                </div>
                <h3>{project.name}</h3>
                <p>{project.detail}</p>
                <div className="stack-list">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            </RevealCard>
          ))}
        </div>
      </section>

      <section className="section about-section" id="sobre">
        <SectionTitle
          icon={Cpu}
          title="Sobre mim"
          text="Engenharia aplicada: transformar problema em sistema funcional, validado e publicavel."
        />
        <div className="about-grid">
          <RevealCard>
            <div className="about-copy">
              <p>
                Sou o GABRIEL SORENSEN, G4T0XX. Trabalho na intersecao entre
                frontend, mobile, automacao, IA e release engineering. Meu foco e
                resolver problemas com sistemas que possam ser testados,
                mantidos e apresentados profissionalmente.
              </p>
              <p>
                Uso GitHub como centro de entrega, documento o que foi feito,
                valido build e deixo o resultado acessivel para revisao,
                instalacao ou publicacao.
              </p>
            </div>
          </RevealCard>
          <RevealCard delay={0.08}>
            <div className="timeline">
              <div>
                <strong>01</strong>
                <span>Planejamento de fluxo e interface</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Implementacao com arquitetura objetiva</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Build, QA, release e publicacao</span>
              </div>
            </div>
          </RevealCard>
        </div>
      </section>

      <CinematicFooter />
    </main>
  )
}

function IntroWipe() {
  return (
    <motion.div
      className="intro-wipe"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      aria-hidden="true"
    >
      <div className="intro-grid">
        {introCells.map((cell) => (
          <motion.span
            key={cell}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: [1, 1, 0], scale: [1, 0.9, 0] }}
            transition={{
              duration: 1.35,
              delay: 0.52 + waveDelay(cell, 12) * 0.025,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <motion.div
        className="intro-mark"
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 1.06], filter: 'blur(0px)' }}
        transition={{ duration: 1.9, ease: 'easeOut' }}
      >
        <span>{profile.handle}</span>
        <strong>SOFTWARE ENGINEERING PORTFOLIO</strong>
      </motion.div>
    </motion.div>
  )
}

function EngineeringWorkbench() {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.36, 0.66, 1], [0.78, 1, 1.18, 0.92])
  const rotateX = useTransform(scrollYProgress, [0, 0.48, 1], [9, 0, -5])
  const glow = useTransform(scrollYProgress, [0, 0.52, 1], [0.25, 1, 0.38])
  const chipY = useTransform(scrollYProgress, [0, 0.55, 1], [42, 0, -18])

  return (
    <section className="computer-scrub" id="core" ref={sectionRef}>
      <div className="computer-sticky">
        <div className="scrub-copy">
          <p className="handle-line">Engineering workbench // scroll composition</p>
          <h2>Arquitetura visivel</h2>
          <p>
            O computador aberto mostra como trabalho por dentro: requisitos,
            camadas de aplicacao, automacoes, infraestrutura, qualidade e
            publicacao em um fluxo observavel.
          </p>
        </div>
        <motion.div
          className="computer-rig"
          style={{
            scale: shouldReduceMotion ? 1 : scale,
            rotateX: shouldReduceMotion ? 0 : rotateX,
            opacity: shouldReduceMotion ? 1 : glow,
          }}
        >
          <div className="screen-shell">
            <div className="screen-bezel">
              <div className="screen-top">
                <span />
                <span />
                <span />
                <strong>software-architecture-map</strong>
              </div>
              <div className="screen-grid">
                <motion.div className="motherboard-line line-a" style={{ y: chipY }} />
                <motion.div className="motherboard-line line-b" style={{ y: chipY }} />
                <motion.div className="core-chip" style={{ y: chipY }}>
                  <span>ENGINEERING CORE</span>
                </motion.div>
                <div className="module module-a">FRONTEND</div>
                <div className="module module-b">MOBILE</div>
                <div className="module module-c">AUTOMATION</div>
                <div className="module module-d">RELEASE</div>
              </div>
            </div>
            <div className="keyboard-base">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function MotionStoryboard() {
  const steps = [
    ['01', 'Briefing', 'Mapear objetivo, publico, restricoes e resultado esperado.'],
    ['02', 'Architecture', 'Definir componentes, dados, rotas, estados e pontos de falha.'],
    ['03', 'Build', 'Implementar com motion, responsividade e interacoes verificaveis.'],
    ['04', 'Validate', 'Rodar lint, build, preview e checks visuais desktop/mobile.'],
    ['05', 'Publish', 'Publicar em GitHub Pages/Releases e manter link rastreavel.'],
  ]

  return (
    <div className="motion-board">
      <div className="scene-player" aria-hidden="true">
        <div className="scene-ruler">
          {steps.map(([id]) => (
            <span key={id}>{id}</span>
          ))}
        </div>
        <div className="scene-canvas">
          <div className="composition-frame frame-a">
            <strong>HTML</strong>
            <span>layout first</span>
          </div>
          <div className="composition-frame frame-b">
            <strong>CSS</strong>
            <span>structured backgrounds</span>
          </div>
          <div className="composition-frame frame-c">
            <strong>MOTION</strong>
            <span>seekable rhythm</span>
          </div>
          <div className="playhead" />
        </div>
      </div>
      <div className="scene-list">
        {steps.map(([id, title, text], index) => (
          <RevealCard key={id} delay={index * 0.04}>
            <article>
              <strong>{id}</strong>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          </RevealCard>
        ))}
      </div>
    </div>
  )
}

function PixelToolCard({ tool }: { tool: ToolLogo }) {
  return (
    <article className="tool-card" style={{ '--tool-tone': tool.tone } as CSSProperties}>
      <div className="pixel-bed" aria-hidden="true">
        {pixelCells.map((cell) => (
          <span key={cell} style={{ '--i': cell } as CSSProperties} />
        ))}
      </div>
      <strong>{tool.code}</strong>
      <span>{tool.name}</span>
    </article>
  )
}

function PixelWipeStrip({ from, to }: { from: string; to: string }) {
  return (
    <section className="pixel-strip" aria-label={`${from} para ${to}`}>
      <div>
        <span>{from}</span>
        <strong>{to}</strong>
      </div>
      <div className="strip-grid" aria-hidden="true">
        {introCells.slice(0, 60).map((cell) => (
          <span key={cell} style={{ '--i': waveDelay(cell, 10) } as CSSProperties} />
        ))}
      </div>
    </section>
  )
}

function CinematicFooter() {
  return (
    <footer className="cinematic-footer" id="contato">
      <div className="footer-giant" aria-hidden="true">
        ENGINEER
      </div>
      <div className="footer-marquee" aria-hidden="true">
        <span>SOFTWARE</span>
        <span>ARCHITECTURE</span>
        <span>MOBILE</span>
        <span>AUTOMATION</span>
        <span>AI</span>
        <span>RELEASE</span>
        <span>SOFTWARE</span>
        <span>ARCHITECTURE</span>
        <span>MOBILE</span>
        <span>AUTOMATION</span>
        <span>AI</span>
        <span>RELEASE</span>
      </div>
      <div className="footer-content">
        <div>
          <p className="handle-line">Professional software engineering</p>
          <h2>Contato profissional</h2>
          <p>
            GitHub e repositorios sao meu hub principal. Empresas podem avaliar
            projeto, codigo, publicacao e evolucao em um unico ecossistema.
          </p>
        </div>
        <div className="footer-links">
          <MagneticLink href={profile.github}>Perfil GitHub</MagneticLink>
          <MagneticLink href={profile.repos}>Repositorios</MagneticLink>
          <MagneticLink href={profile.portfolioRepo}>Repo portfolio</MagneticLink>
          <MagneticLink href={profile.portfolioLive}>Site online</MagneticLink>
        </div>
      </div>
    </footer>
  )
}

function MagneticText({ text, hoverText }: { text: string; hoverText: string }) {
  return (
    <motion.span
      className="magnetic-text"
      whileHover={{ scale: 1.07, rotate: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{text}</span>
      <strong>{hoverText}</strong>
    </motion.span>
  )
}

function MagneticLink({ href, children }: { href: string; children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={shouldReduceMotion ? undefined : { x: 8, scale: 1.03 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
    >
      <span>{children}</span>
      <ExternalLink size={17} strokeWidth={1.8} />
    </motion.a>
  )
}

function SectionTitle({
  icon: Icon,
  title,
  text,
}: {
  icon: IconComponent
  title: string
  text: string
}) {
  return (
    <motion.div
      className="section-title"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55 }}
    >
      <Icon size={25} strokeWidth={1.8} />
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </motion.div>
  )
}

function RevealCard({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.54, delay }}
    >
      {children}
    </motion.div>
  )
}

function SkillCard({ skill }: { skill: Skill }) {
  const shouldReduceMotion = useReducedMotion()
  const Icon = skill.icon

  return (
    <motion.article
      className="skill-card"
      whileHover={shouldReduceMotion ? undefined : { y: -7, rotateX: 2 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      <div className="skill-icon">
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3>{skill.name}</h3>
      <p>{skill.detail}</p>
      <div className="skill-meter" aria-label={`${skill.level}%`}>
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: 'easeOut' }}
        />
      </div>
    </motion.article>
  )
}

function waveDelay(index: number, cols: number) {
  const x = index % cols
  const y = Math.floor(index / cols)
  return x + y
}

export default App
