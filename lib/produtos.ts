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
  /** Cores oferecidas para este produto (todas as cadastradas, se o produto não restringir). */
  cores: Cor[]
}

export type Material = "PLA" | "PETG"
/** `hex2` só existe em filamentos duo color. */
export type Cor = { nome: string; hex: string; hex2?: string | null; material: Material }

export const INSTAGRAM_DM = "https://ig.me/m/yastech.3d"
export const INSTAGRAM_PERFIL = "https://instagram.com/yastech.3d"

export const categorias: { id: CategoriaId; label: string; tag: string }[] = [
  { id: "capinhas", label: "Capinhas de isqueiro", tag: "CAPINHA" },
  { id: "porta", label: "Porta cigarro", tag: "PORTA CIGARRO" },
  { id: "chaveiros", label: "Chaveiros", tag: "CHAVEIRO" },
  { id: "aleatorios", label: "Aleatórios", tag: "ALEATÓRIO" },
]

export const formatarPreco = (v: number) => "R$ " + v.toFixed(2).replace(".", ",")

