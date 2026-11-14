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

export const produtos: Produto[] = [
  { slug: "lego", file: "lego.jpg", nome: "Lego", cat: "capinhas", tag: "CAPINHA", sub: "Capinha de isqueiro · Mini BIC", preco: 9, fotos: [{ src: "/img/lego.jpg", alt: "Capinha de isqueiro Lego", nome: "lego.jpg" }] },
  { slug: "dragao", file: "dragao.jpg", nome: "Dragão", cat: "capinhas", tag: "CAPINHA", sub: "Capinha de isqueiro · BIC Grande", preco: 10, fotos: [{ src: "/img/dragao.jpg", alt: "Capinha de isqueiro Dragão", nome: "dragao.jpg" }] },
  { slug: "panico", file: "panico.jpg", nome: "Pânico", cat: "capinhas", tag: "CAPINHA", sub: "Capinha de isqueiro · BIC Grande", preco: 10, fotos: [{ src: "/img/panico.jpg", alt: "Capinha de isqueiro Pânico", nome: "panico.jpg" }] },
  { slug: "anti-rato", file: "anti_rato.jpg", nome: "Anti Rato", cat: "capinhas", tag: "CAPINHA", sub: "Capinha de isqueiro · BIC", preco: 10, fotos: [{ src: "/img/anti-rato.jpg", alt: "Capinha de isqueiro Anti Rato", nome: "anti_rato.jpg" }] },
  {
    slug: "unicornio",
    file: "unicornio.jpg",
    nome: "Unicórnio",
    cat: "chaveiros",
    tag: "CHAVEIRO",
    sub: "Chaveiro · PLA",
    preco: 15,
    apelido: "fofinho e sentadinho",
    descricao: "Chaveiro de unicórnio impresso em 3D, com argola de metal. Cada peça é feita sob encomenda na cor que você escolher.",
    fotos: [
      { src: "/img/unicornio-rosa.jpg", alt: "Chaveiro unicórnio rosa", nome: "unicornio_rosa.jpg" },
      { src: "/img/unicornio-verde.jpg", alt: "Chaveiro unicórnio verde", nome: "unicornio_verde.jpg" },
    ],
  },
  { slug: "cachorro-balao", file: "cachorro.jpg", nome: "Cachorro Balão", cat: "chaveiros", tag: "CHAVEIRO", sub: "Chaveiro · PLA", preco: 15, fotos: [{ src: "/img/cachorro-balao.jpg", alt: "Chaveiro cachorro balão", nome: "cachorro.jpg" }] },
  { slug: "porta-cigarro-liso", file: "porta_liso.jpg", nome: "Porta Cigarro Liso", cat: "porta", tag: "PORTA CIGARRO", sub: "Porta cigarro · PLA", preco: 25, fotos: [] },
  { slug: "porta-cigarro-xadrez", file: "porta_xadrez.jpg", nome: "Porta Cigarro Xadrez", cat: "porta", tag: "PORTA CIGARRO", sub: "Porta cigarro · PLA", preco: 28, fotos: [] },
  { slug: "suporte-de-celular", file: "suporte.jpg", nome: "Suporte de Celular", cat: "aleatorios", tag: "ALEATÓRIO", sub: "Aleatório · PLA", preco: 18, fotos: [] },
  { slug: "mini-vaso", file: "mini_vaso.jpg", nome: "Mini Vaso", cat: "aleatorios", tag: "ALEATÓRIO", sub: "Aleatório · PLA", preco: 20, fotos: [] },
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

export const getProduto = (slug: string) => produtos.find((p) => p.slug === slug)
