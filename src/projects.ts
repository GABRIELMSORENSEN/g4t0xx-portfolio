export type Project = {
  name: string
  status: string
  detail: string
  stack: string[]
  category: 'Desktop' | 'Android' | 'VR & IA'
  href?: string
  download?: string
}

const github = 'https://github.com/GABRIELMSORENSEN/'

export const projects: Project[] = [
  { name: 'G4 Docs Editor', status: 'Windows · Linux · Web', category: 'Desktop', detail: 'Abra, anote e reorganize PDFs no próprio dispositivo. Texto, imagens, assinatura e exportação sem enviar documentos para um servidor.', stack: ['React', 'TypeScript', 'Electron', 'PDF.js'], href: `${github}g4-docs-editor`, download: `${github}g4-docs-editor/releases/latest` },
  { name: 'VRChat Translator Hub', status: 'Prévia Windows · código privado', category: 'VR & IA', detail: 'Tradução local de voz e tela para VRChat, com módulos selecionáveis, overlay e modelos executados no PC.', stack: ['Python', 'Whisper', 'Ollama', 'OpenVR'] },
  { name: 'G4T0XX Hybrid FBT', status: 'Prévia Windows · código privado', category: 'VR & IA', detail: 'Exploração de rastreamento corporal com estimativa de pernas e envio de poses por OSC. Integração com VRChat em desenvolvimento.', stack: ['Python', 'NumPy', 'IK', 'OSC'] },
  { name: 'G4T0XX Vision', status: 'Prévia Windows · código privado', category: 'Desktop', detail: 'Gestão de computadores próprios: inventário, presença e ações remotas com acesso controlado.', stack: ['React', 'Python', 'SQLite', 'Agente local'] },
  { name: 'NetTunnel Pro', status: 'Prévia Android · WireGuard', category: 'Android', detail: 'VPN Android com WireGuard, perfis criptografados no Keystore e confirmação real de handshake e tráfego.', stack: ['Android', 'Java', 'WireGuard', 'Keystore'], href: `${github}nettunnel-pro`, download: `${github}nettunnel-pro/releases/tag/v2.0.0-preview.1` },
  { name: 'G4T0XX Modmenu', status: 'Prévia Windows · app autoral', category: 'Desktop', detail: 'Projeto de gerenciamento de jogos e modificações locais para PC.', stack: ['Electron', 'Node.js', 'Mods locais'], href: `${github}G4T0XX-MODMENU`, download: `${github}G4T0XX-MODMENU/releases/tag/v2.0.0-preview.1` },
  { name: 'Forge Mobile', status: 'Prévia Android disponível', category: 'Android', detail: 'Cliente Android para trabalhar com ambientes de desenvolvimento remotos a partir do celular.', stack: ['Android', 'Desenvolvimento remoto'], href: `${github}Forge-Mobile`, download: `${github}Forge-Mobile/releases` },
  { name: 'GATARME', status: 'APK disponível', category: 'Android', detail: 'Despertador para escalas de trabalho, com múltiplos empregos, calendário e alarmes recorrentes.', stack: ['Android', 'Alarmes', 'Calendário'], href: `${github}GATARME`, download: `${github}GATARME/releases/latest` },
  { name: 'POLIGON Assistant AI', status: 'Projeto aberto', category: 'VR & IA', detail: 'Experimentos com assistência no desktop, reconhecimento de voz e interpretação do contexto da tela.', stack: ['Python', 'Voz', 'Visão'], href: `${github}POLIGON-ASSISTENT-AI` },
]
