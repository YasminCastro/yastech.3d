import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FolderIcon, HeartY2K, InstagramIcon, Sparkle, SparkleSolid } from "@/components/site/icons"
import { ProductCard } from "@/components/site/product-card"
import { Window } from "@/components/site/window"
import { INSTAGRAM_DM, categorias } from "@/lib/produtos"
import { getProdutos } from "@/lib/store"

const capas: Record<string, { img?: string; fundo: string; icone?: "pasta" | "brilho" }> = {
  capinhas: { img: "/img/lego.jpg", fundo: "bg-lilac-soft" },
  porta: { fundo: "bg-placeholder-lilac", icone: "pasta" },
  chaveiros: { img: "/img/unicornio-verde.jpg", fundo: "bg-white" },
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

  return (
    <main className="bg-clouds flex-1">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[72px] px-[clamp(16px,4vw,56px)] pt-14 pb-24">
        {/* HERO */}
        <Window title="yastech.exe" aria-labelledby="hero-t" className="bg-white/70 drop-lg">
          <div className="flex flex-wrap items-center gap-10 p-[clamp(28px,5vw,64px)]">
            <div className="flex min-w-0 flex-[1_1_440px] flex-col items-start gap-5">
              <span className="inline-block border-2 border-ink bg-lemon px-3 py-1.5 text-[15px] font-extrabold tracking-[0.5px]">
                IMPRESSÕES 3D SOB ENCOMENDA
              </span>
              <h1 id="hero-t" className="flex flex-col">
                <span className="font-pixel text-[clamp(56px,8vw,108px)] leading-[0.9] font-bold tracking-[1px]">YASTECH.3D</span>
                <span className="-mt-1 ml-[8%] font-script text-[clamp(72px,10vw,140px)] leading-none text-violet">Catálogo</span>
              </h1>
              <p className="max-w-[34em] text-[19px] leading-[1.55] text-ink-soft">
                Capinhas de isqueiro, chaveiros, porta cigarro e outras coisinhas fofas, impressas camada por camada. Escolha seu modelo, a cor, e chama no Insta.
              </p>
              <div className="mt-1 flex flex-wrap gap-3.5">
                <Button size="xl" className="drop-sm" nativeButton={false} render={<Link href="/catalogo" />}>
                  Ver catálogo →
                </Button>
              </div>
            </div>

            <div aria-hidden="true" className="relative h-[480px] min-w-0 flex-[1_1_380px]">
              <div className="absolute top-5 left-[8%] size-[340px] max-w-[80%] overflow-hidden rounded-full border-2 border-ink bg-white shadow-[0_0_0_10px_#E3D8FF,0_0_50px_18px_rgb(155_120_255/0.55)]">
                <Image src="/img/unicornio-rosa.jpg" alt="" fill sizes="340px" priority className="object-cover" />
              </div>
              <div className="absolute right-[2%] bottom-2.5 size-[210px] overflow-hidden rounded-full border-2 border-ink bg-white shadow-[0_0_0_8px_#CDEBFF,0_0_40px_12px_rgb(120_200_255/0.6)]">
                <Image src="/img/hero-2.jpg" alt="" fill sizes="210px" className="object-cover" />
              </div>
              <HeartY2K id="hh1" className="absolute bottom-[70px] left-0 h-[88px] w-24 animate-float" />
              <Sparkle id="ss1" to="#5B1FD6" className="absolute top-0 right-[12%] size-16 animate-float" />
              <SparkleSolid className="absolute bottom-0 left-[52%] size-[34px]" />
            </div>
          </div>
        </Window>

        {/* CATEGORIAS */}
        <section aria-labelledby="cat-t" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="cat-t" className="font-script text-[clamp(56px,7vw,88px)] leading-none font-normal">Categorias</h2>
            <Link href="/catalogo" className="font-pixel text-lg text-ink">ver tudo →</Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
            {categorias.map((c, i) => {
              const capa = capas[c.id]
              return (
                <Link
                  key={c.id}
                  href="/catalogo"
                  className="flex flex-col border-2 border-ink bg-white text-ink no-underline transition-all drop-md hover:-translate-x-[3px] hover:-translate-y-[3px] hover:text-ink hover:[--drop:8px_8px_0_var(--color-ink)]"
                >
                  <div className={`relative flex h-[150px] items-center justify-center overflow-hidden border-b-2 border-ink ${capa.fundo}`}>
                    {capa.img && <Image src={capa.img} alt="" fill sizes="300px" className="object-cover" />}
                    {capa.icone === "pasta" && <FolderIcon className="h-[52px] w-16" />}
                    {capa.icone === "brilho" && <Sparkle id="catSp" from="#6A2BE8" to="#6A2BE8" className="size-[60px]" />}
                  </div>
                  <div className="flex items-center gap-3.5 px-[18px] py-4">
                    <span className="font-pixel text-[40px] leading-none font-bold text-lemon [-webkit-text-stroke:1.5px_var(--color-ink)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="font-pixel text-[21px] font-semibold">{c.label}</span>
                      <span className="text-sm text-ink-muted">{contagem(c.id)} modelos</span>
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
            <h2 id="nov-t" className="font-pixel text-[clamp(34px,4vw,48px)] font-bold">
              <span className="border-2 border-ink bg-lemon px-3.5 py-0.5">NOVIDADES</span>
            </h2>
            <Link href="/catalogo" className="font-pixel text-lg text-ink">ver catálogo completo →</Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-7">
            {novidades.map((p) => (
              <ProductCard key={p.slug} produto={p} />
            ))}
          </div>
        </section>

        {/* COMO PEDIR */}
        <Window title="como_pedir.txt" aria-labelledby="como-t" className="bg-white/80 drop-lg" bodyClassName="flex flex-col gap-7 p-[clamp(24px,4vw,48px)]">
          <h2 id="como-t" className="font-script text-[clamp(52px,6vw,76px)] leading-none font-normal">Como pedir</h2>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 p-0">
            {passos.map((p) => (
              <li key={p.n} className={`flex flex-col gap-2.5 border-2 border-ink p-[22px] ${p.fundo}`}>
                <span className="font-pixel text-5xl leading-none font-bold text-violet">{p.n}</span>
                <span className="font-pixel text-[22px] font-semibold">{p.titulo}</span>
                <span className="text-base leading-normal text-ink-soft">{p.texto}</span>
              </li>
            ))}
          </ol>
        </Window>

        {/* CTA INSTAGRAM */}
        <section aria-labelledby="cta-t" className="flex flex-wrap items-center gap-8 border-2 border-ink bg-ink p-[clamp(24px,4vw,44px)] text-white shadow-[8px_8px_0_var(--color-violet)]">
          <div className="relative h-[180px] w-[150px] flex-none overflow-hidden rounded-t-[75px] rounded-b-lg border-2 border-white shadow-[0_0_30px_8px_rgb(110_220_255/0.55)]">
            <Image src="/img/yas.jpg" alt="Avatar da Yasmin, dona da YasTech.3D" fill sizes="150px" className="object-cover" />
          </div>
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-2.5">
            <h2 id="cta-t" className="font-pixel text-[clamp(30px,3.6vw,44px)] leading-[1.05] font-bold">Ficou com alguma dúvida?</h2>
            <p className="text-lg leading-normal text-[#DCD6F2]">Me chama no Instagram que eu te ajudo a escolher sua peça.</p>
          </div>
          <Button size="xl" variant="secondary" className="border-white shadow-[4px_4px_0_var(--color-violet)]" nativeButton={false} render={<a href={INSTAGRAM_DM} />}>
            <InstagramIcon className="size-5" />
            @yastech.3d
          </Button>
        </section>
      </div>
    </main>
  )
}
