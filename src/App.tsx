import {
  Bot,
  Braces,
  Cpu,
  ExternalLink,
  GitBranch,
  Globe2,
  Layers3,
  RadioTower,
  Rocket,
  ShieldCheck,
  Smartphone,
  Terminal,
  Zap,
} from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import './App.css'

type Skill = {
  name: string
  detail: string
  level: number
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
}

type Project = {
  name: string
  status: string
  detail: string
  stack: string[]
  href?: string
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
    name: 'Apps Android / Capacitor',
    detail: 'players, cameras, WebView nativo, build e release',
    level: 96,
    icon: Smartphone,
  },
  {
    name: 'Frontend premium',
    detail: 'React, Vite, Framer Motion, UI hacker responsiva',
    level: 94,
    icon: Layers3,
  },
  {
    name: 'Automacao e pipelines',
    detail: 'processamento em lote, agendamento, APIs e recovery',
    level: 92,
    icon: Bot,
  },
  {
    name: 'IA, voz e visao',
    detail: 'assistentes, ElevenLabs, captura de tela e CV',
    level: 88,
    icon: Cpu,
  },
  {
    name: 'OSC / VR / tracking',
    detail: 'pose detection, UDP, VRChat e full body tracking',
    level: 86,
    icon: RadioTower,
  },
  {
    name: 'Deploy e publicacao',
    detail: 'GitHub Releases, Pages, APKs e handoff iOS',
    level: 90,
    icon: Rocket,
  },
]

const projects: Project[] = [
  {
    name: 'G4T0XX Music Player',
    status: 'publico',
    detail:
      'Streaming musical com UX mobile, integracao Android, downloads e fluxo de release.',
    stack: ['React', 'Capacitor', 'Android', 'GitHub Releases'],
    href: 'https://github.com/GABRIELMSORENSEN/G4T0XX-Music-Player',
  },
  {
    name: 'G4 Docs Editor',
    status: 'publico',
    detail:
      'Editor local de PDF com app desktop e publicacao em GitHub Pages.',
    stack: ['Desktop', 'PDF', 'Pages', 'UI'],
    href: 'https://github.com/GABRIELMSORENSEN/g4-docs-editor',
  },
  {
    name: 'POLIGON Assistant AI',
    status: 'publico',
    detail:
      'Assistente desktop com voz neural, visao computacional e leitura de contexto.',
    stack: ['AI', 'Voice', 'Vision', 'Desktop'],
    href: 'https://github.com/GABRIELMSORENSEN/POLIGON-ASSISTENT-AI',
  },
  {
    name: 'NetTunnel Pro',
    status: 'publico',
    detail:
      'VPN com Xray-core, React, Capacitor e Android VpnService.',
    stack: ['VPN', 'React', 'Capacitor', 'Android'],
    href: 'https://github.com/GABRIELMSORENSEN/nettunnel-pro',
  },
  {
    name: 'G4T0XX Hybrid FBT',
    status: 'privado',
    detail:
      'Full body tracking hibrido para Quest 3S / VRChat com OSC e camera mobile.',
    stack: ['CameraX', 'ML Kit', 'OSC', 'VRChat'],
  },
  {
    name: 'SonicTubeOcf Pipeline',
    status: 'local',
    detail:
      'Pipeline de videos com narracao, recuperacao de falhas, fila e agendamento.',
    stack: ['Python', 'ElevenLabs', 'YouTube API', 'Scheduler'],
  },
]

const stats = [
  ['repos publicos', '09'],
  ['apps em release', '04+'],
  ['motion layer', 'Framer'],
  ['profile', 'online'],
]

const nav = [
  ['Skills', '#skills'],
  ['Apps', '#apps'],
  ['Sobre', '#sobre'],
  ['Contato', '#contato'],
]

const terminalLines = [
  '$ npx create-g4txx-portfolio --mode hacker',
  'loading: motion, apps, automation, deploy',
  'status: portfolio online / github pages armed',
]

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

function App() {
  const shouldReduceMotion = useReducedMotion()
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 24 })
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 24 })
  const pointerMask = useMotionTemplate`radial-gradient(circle at ${smoothX}% ${smoothY}%, rgba(25, 255, 154, 0.24), transparent 34rem)`

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(((event.clientX - rect.left) / rect.width) * 100)
    mouseY.set(((event.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <main className="shell" onPointerMove={handlePointerMove}>
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
        <a className="icon-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
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
            visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.11 } },
          }}
        >
          <motion.p className="handle-line" variants={reveal}>
            {profile.handle} // app builder // automation operator
          </motion.p>
          <motion.h1 variants={reveal}>{profile.name}</motion.h1>
          <motion.p className="hero-text" variants={reveal}>
            Desenvolvedor focado em apps, automacoes, IA, mobile, VR e interfaces
            com energia hacker. Eu pego a ideia, transformo em produto, testo,
            publico e deixo pronto para uso.
          </motion.p>
          <motion.div className="hero-actions" variants={reveal}>
            <motion.a
              className="primary-action"
              href="#apps"
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <Rocket size={19} strokeWidth={1.8} />
              Ver apps
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
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 26, rotateX: shouldReduceMotion ? 0 : 5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.2 }}
        >
          <div className="terminal-top">
            <span />
            <span />
            <span />
            <strong>operator.session</strong>
          </div>
          <div className="terminal-body">
            {terminalLines.map((line, index) => (
              <motion.code
                key={line}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.44 + index * 0.18 }}
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

      <section className="section skills-section" id="skills">
        <SectionTitle
          icon={Braces}
          title="Habilidades"
          text="Stack organizado para construir, testar, corrigir, empacotar e publicar produtos reais."
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
          icon={Zap}
          title="Apps desenvolvidos"
          text="Projetos publicos e builds locais que mostram mobile, desktop, automacao, IA e deploy."
        />
        <div className="project-grid">
          {projects.map((project, index) => (
            <RevealCard key={project.name} delay={index * 0.05}>
              <article className="project-card">
                <div className="project-head">
                  <span>{project.status}</span>
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.name}`}>
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
          text="Nao sou perfil de vitrine. Sou execucao: abrir o projeto, entender o alvo, corrigir, validar e entregar."
        />
        <div className="about-grid">
          <RevealCard>
            <div className="about-copy">
              <p>
                Atuo como desenvolvedor full-stack e mobile com pegada de operador:
                interfaces rapidas, apps Android, automacoes com APIs, ferramentas
                desktop, pipelines de video, IA aplicada e publicacao completa.
              </p>
              <p>
                Meu foco e transformar ideia solta em produto testavel, com visual
                forte, fluxo real, build passando e link de entrega funcionando.
              </p>
            </div>
          </RevealCard>
          <RevealCard delay={0.08}>
            <div className="timeline">
              <div>
                <strong>01</strong>
                <span>Prototipar UI e fluxo</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Codar app, automacao ou painel</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Testar, empacotar e publicar</span>
              </div>
            </div>
          </RevealCard>
        </div>
      </section>

      <section className="section contact-section" id="contato">
        <SectionTitle
          icon={Globe2}
          title="Contato profissional"
          text="Canal principal: GitHub. Repositorios, perfil e portfolio ficam conectados em um unico hub."
        />
        <div className="contact-grid">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <GitBranch size={24} strokeWidth={1.8} />
            <span>Perfil GitHub</span>
            <ExternalLink size={17} strokeWidth={1.8} />
          </a>
          <a href={profile.repos} target="_blank" rel="noreferrer">
            <Braces size={24} strokeWidth={1.8} />
            <span>Repositorios</span>
            <ExternalLink size={17} strokeWidth={1.8} />
          </a>
          <a href={profile.portfolioRepo} target="_blank" rel="noreferrer">
            <Rocket size={24} strokeWidth={1.8} />
            <span>Repo do portfolio</span>
            <ExternalLink size={17} strokeWidth={1.8} />
          </a>
        </div>
      </section>

      <footer className="footer">
        <span>{profile.handle} online</span>
        <a href={profile.portfolioLive}>portfolio live</a>
      </footer>
    </main>
  )
}

function SectionTitle({
  icon: Icon,
  title,
  text,
}: {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
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
      viewport={{ once: true, amount: 0.28 }}
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
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
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

export default App
