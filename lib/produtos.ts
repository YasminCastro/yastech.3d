export type CategoriaId = "capinhas" | "porta" | "chaveiros" | "aleatorios"

export type Produto = {
  slug: string
  file: string
  nome: string
  cat: CategoriaId
  tag: string
  sub: string
  preco: number
  fotos: { src: string; alt: string; nome: string }[]
  /** Frase em script exibida abaixo do nome na página do produto. */
  apelido?: string
  descricao?: string
}

export const INSTAGRAM_DM = "https://ig.me/m/yastech.3d"
export const INSTAGRAM_PERFIL = "https://instagram.com/yastech.3d"

export const categorias: { id: CategoriaId; label: string; tag: string }[] = [
  { id: "capinhas", label: "Capinhas de isqueiro", tag: "CAPINHA" },
  { id: "porta", label: "Porta cigarro", tag: "PORTA CIGARRO" },
  { id: "chaveiros", label: "Chaveiros", tag: "CHAVEIRO" },
  { id: "aleatorios", label: "Aleatórios", tag: "ALEATÓRIO" },
]

export const materiais = {
  PLA: [
    { nome: "Preto", hex: "#111111" },
    { nome: "Branco", hex: "#FFFFFF" },
    { nome: "Vermelho", hex: "#E3202A" },
    { nome: "Verde", hex: "#2E7D32" },
    { nome: "Verde Metalizado", hex: "#6BCB3B" },
    { nome: "Amarelo", hex: "#F9B800" },
    { nome: "Azul", hex: "#0047AB" },
    { nome: "Cinza", hex: "#8E8E93" },
  ],
  PETG: [{ nome: "Preto", hex: "#111111" }],
} as const

export type Material = keyof typeof materiais

export const formatarPreco = (v: number) => "R$ " + v.toFixed(2).replace(".", ",")

