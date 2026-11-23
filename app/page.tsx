import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FolderIcon, HeartY2K, InstagramIcon, Sparkle, SparkleSolid } from "@/components/site/icons"
import { FotoLoop } from "@/components/site/foto-loop"
import { ProductCard } from "@/components/site/product-card"
import { Window } from "@/components/site/window"
import { INSTAGRAM_DM, categorias } from "@/lib/produtos"
import { getProdutos } from "@/lib/store"

// Visual usado quando a categoria ainda não tem nenhum produto com foto.
const capas: Record<string, { fundo: string; icone: "pasta" | "brilho" }> = {
  capinhas: { fundo: "bg-placeholder-lilac", icone: "pasta" },
  porta: { fundo: "bg-placeholder-lilac", icone: "pasta" },
  chaveiros: { fundo: "bg-placeholder-sky", icone: "brilho" },
  aleatorios: { fundo: "bg-placeholder-sky", icone: "brilho" },
}

const passos = [
  { n: "01", titulo: "Escolha no catálogo", texto: "Veja os modelos, tamanhos e as cores disponíveis de cada peça.", fundo: "bg-lilac-bg" },
  { n: "02", titulo: "Chama no Insta", texto: "Manda na DM o nome do produto e a cor que você quer.", fundo: "bg-lemon-cream" },
  { n: "03", titulo: "Imprimo pra você", texto: "Sua peça é impressa sob encomenda.", fundo: "bg-sky-pale" },
]

export default async function Home() {
  const produtos = await getProdutos()
  const contagem = (id: string) => produtos.filter((p) => p.cat === id).length
  const destaques = ["unicornio", "cachorro-balao", "lego", "panico"].flatMap((s) => produtos.find((p) => p.slug === s) ?? [])
  const novidades = destaques.length === 4 ? destaques : produtos.slice(0, 4)
  // Hero: os dois círculos passam por todas as fotos; o pequeno começa no meio da lista para não repetir o grande.
  const fotosHero = produtos.filter((p) => p.fotos.length > 0).map((p) => p.fotos[0].src)
  const heroGrande = fotosHero.length > 0 ? fotosHero : ["/img/unicornio-rosa.jpg"]
  const meio = Math.floor(fotosHero.length / 2)
  const heroPequeno = fotosHero.length > 1 ? [...fotosHero.slice(meio), ...fotosHero.slice(0, meio)] : ["/img/hero-2.jpg"]

  return (
    <main className="bg-clouds flex-1">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-[clamp(16px,4vw,56px)] pt-8 pb-16 sm:gap-[72px] sm:pt-14 sm:pb-24">
        {/* HERO */}
        <Window title="yastech.exe" aria-labelledby="hero-t" className="bg-white/70 drop-lg">
          <div className="flex flex-wrap items-center gap-6 p-5 sm:gap-10 sm:p-[clamp(28px,5vw,64px)]">
            <div className="flex min-w-0 flex-[1_1_440px] flex-col items-start gap-5">
              <span className="inline-block border-2 border-ink bg-lemon px-2.5 py-1 text-[13px] font-extrabold sm:px-3 sm:py-1.5 sm:text-[15px] tracking-[0.5px]">
                IMPRESSÕES 3D SOB ENCOMENDA
              </span>
              <h1 id="hero-t" className="flex flex-col">
                <span className="font-pixel text-[clamp(40px,11.5vw,56px)] leading-[0.9] sm:text-[clamp(56px,8vw,108px)] font-bold tracking-[1px]">YASTECH.3D</span>
                <span className="-mt-1 ml-[8%] font-script text-[clamp(56px,17vw,72px)] leading-none text-violet sm:text-[clamp(72px,10vw,140px)]">Catálogo</span>
              </h1>
              <p className="max-w-[34em] text-[17px] leading-[1.55] sm:text-[19px] text-ink-soft">
                Capinhas de isqueiro, chaveiros, porta cigarro e outras coisinhas fofas, impressas camada por camada. Escolha seu modelo, a cor, e chama no Insta.
              </p>
              <div className="mt-1 flex flex-wrap gap-3.5">
                <Button size="xl" className="drop-sm" nativeButton={false} render={<Link href="/catalogo" />}>
                  Ver catálogo →
                </Button>
              </div>
            </div>

            <div aria-hidden="true" className="relative h-[290px] min-w-0 flex-[1_1_380px] sm:h-[480px]">
              <div className="absolute top-3 left-[6%] size-[210px] max-w-[80%] sm:top-5 sm:left-[8%] sm:size-[340px] overflow-hidden rounded-full border-2 border-ink bg-white shadow-[0_0_0_10px_#E3D8FF,0_0_50px_18px_rgb(155_120_255/0.55)]">
                <FotoLoop fotos={heroGrande} sizes="(min-width: 640px) 340px, 210px" eager />
              </div>
              <div className="absolute right-[2%] bottom-1 size-[130px] sm:bottom-2.5 sm:size-[210px] overflow-hidden rounded-full border-2 border-ink bg-white shadow-[0_0_0_8px_#CDEBFF,0_0_40px_12px_rgb(120_200_255/0.6)]">
                <FotoLoop fotos={heroPequeno} sizes="(min-width: 640px) 210px, 130px" atraso={2500} eager />
              </div>
              <HeartY2K id="hh1" className="absolute bottom-[40px] left-0 h-[60px] w-16 animate-float sm:bottom-[70px] sm:h-[88px] sm:w-24" />
              <Sparkle id="ss1" to="#5B1FD6" className="absolute top-0 right-[8%] size-11 animate-float sm:right-[12%] sm:size-16" />
              <SparkleSolid className="absolute bottom-0 left-[52%] size-6 sm:size-[34px]" />
            </div>
          </div>
        </Window>

        {/* CATEGORIAS */}
        <section aria-labelledby="cat-t" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="cat-t" className="font-script text-[clamp(48px,14vw,56px)] leading-none font-normal sm:text-[clamp(56px,7vw,88px)]">Categorias</h2>
            <Link href="/catalogo" className="font-pixel text-lg text-ink">ver tudo →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:gap-6">
            {categorias.map((c, i) => {
              const capa = capas[c.id]
              const fotos = produtos.filter((p) => p.cat === c.id && p.fotos.length > 0).map((p) => p.fotos[0].src)
              return (
                <Link
                  key={c.id}
                  href="/catalogo"
                  className="flex flex-col border-2 border-ink bg-white text-ink no-underline transition-all drop-md hover:-translate-x-[3px] hover:-translate-y-[3px] hover:text-ink hover:[--drop:8px_8px_0_var(--color-ink)]"
                >
                  <div className={`relative flex h-[110px] items-center sm:h-[150px] justify-center overflow-hidden border-b-2 border-ink ${fotos.length > 0 ? "bg-white" : capa.fundo}`}>
                    {fotos.length > 0 ? (
                      <FotoLoop fotos={fotos} sizes="(min-width: 640px) 300px, 50vw" atraso={i * 1200} />
                    ) : capa.icone === "pasta" ? (
                      <FolderIcon className="h-[52px] w-16" />
                    ) : (
                      <Sparkle id={`catSp${i}`} from="#6A2BE8" to="#6A2BE8" className="size-[60px]" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-3 sm:gap-3.5 sm:px-[18px] sm:py-4">
                    <span className="font-pixel text-[28px] leading-none font-bold text-lemon sm:text-[40px] [-webkit-text-stroke:1.5px_var(--color-ink)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-pixel text-[15px] leading-tight font-semibold sm:text-[21px] sm:leading-normal">{c.label}</span>
                      <span className="text-xs text-ink-muted sm:text-sm">{contagem(c.id)} modelos</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* NOVIDADES */}
        <section aria-labelledby="nov-t" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="nov-t" className="font-pixel text-[28px] font-bold sm:text-[clamp(34px,4vw,48px)]">
              <span className="border-2 border-ink bg-lemon px-3.5 py-0.5">NOVIDADES</span>
            </h2>
            <Link href="/catalogo" className="font-pixel text-lg text-ink">ver catálogo completo →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] sm:gap-7">
            {novidades.map((p) => (
              <ProductCard key={p.slug} produto={p} />
            ))}
          </div>
        </section>

        {/* COMO PEDIR */}
        <Window title="como_pedir.txt" aria-labelledby="como-t" className="bg-white/80 drop-lg" bodyClassName="flex flex-col gap-5 p-5 sm:gap-7 sm:p-[clamp(24px,4vw,48px)]">
          <h2 id="como-t" className="font-script text-[clamp(44px,13vw,52px)] leading-none font-normal sm:text-[clamp(52px,6vw,76px)]">Como pedir</h2>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-3 p-0 sm:gap-5">
            {passos.map((p) => (
              <li key={p.n} className={`flex flex-col gap-2.5 border-2 border-ink p-4 sm:p-[22px] ${p.fundo}`}>
                <span className="font-pixel text-5xl leading-none font-bold text-violet">{p.n}</span>
                <span className="font-pixel text-[22px] font-semibold">{p.titulo}</span>
                <span className="text-base leading-normal text-ink-soft">{p.texto}</span>
              </li>
            ))}
          </ol>
        </Window>

        {/* CTA INSTAGRAM */}
        <section aria-labelledby="cta-t" className="flex flex-wrap items-center gap-5 border-2 border-ink bg-ink p-5 sm:gap-8 sm:p-[clamp(24px,4vw,44px)] text-white shadow-[8px_8px_0_var(--color-violet)]">
          <div className="relative h-[132px] w-[110px] flex-none sm:h-[180px] sm:w-[150px] overflow-hidden rounded-t-[55px] rounded-b-lg sm:rounded-t-[75px] border-2 border-white shadow-[0_0_30px_8px_rgb(110_220_255/0.55)]">
            <Image src="/img/yas.jpg" alt="Avatar da Yasmin, dona da YasTech.3D" fill sizes="150px" className="object-cover" />
          </div>
          <div className="flex min-w-0 flex-[1_1_180px] flex-col gap-2.5 sm:flex-[1_1_360px]">
            <h2 id="cta-t" className="font-pixel text-[26px] leading-[1.05] sm:text-[clamp(30px,3.6vw,44px)] font-bold">Ficou com alguma dúvida?</h2>
            <p className="text-base leading-normal text-[#DCD6F2] sm:text-lg">Me chama no Instagram que eu te ajudo a escolher sua peça.</p>
          </div>
          <Button size="xl" variant="secondary" className="border-white shadow-[4px_4px_0_var(--color-violet)] max-sm:w-full" nativeButton={false} render={<a href={INSTAGRAM_DM} />}>
            <InstagramIcon className="size-5" />
            @yastech.3d
          </Button>
        </section>
      </div>
    </main>
  )
}
