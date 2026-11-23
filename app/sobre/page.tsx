import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ColorStar, HeartY2K, InstagramIcon, Sparkle } from "@/components/site/icons"
import { Window } from "@/components/site/window"
import { INSTAGRAM_PERFIL, type Cor } from "@/lib/produtos"
import { getCores } from "@/lib/store"

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a Yas, a mente por trás da YasTech.3D, e veja as cores disponíveis.",
}

const duvidas = [
  { q: "Quanto tempo demora?", a: "Geralmente entre 2 e 5 dias úteis, mas varia conforme o tamanho da peça e a fila do momento. Antes de fechar, eu te confirmo o prazo do seu pedido." },
  { q: "Vocês enviam?", a: "Estou em Goiânia! Pra quem mora aqui, envio por Uber Flash ou a gente combina um ponto de encontro pra retirada." },
  { q: "Posso escolher qualquer cor?", a: "Sim, entre as cores disponíveis do material." },
]

function CorItem({ nome, hex, hex2 }: Cor) {
  return (
    <li className="flex min-h-12 items-center gap-3 border-2 border-ink bg-white px-3 font-pixel text-base sm:min-h-[52px] sm:px-3.5 sm:text-[17px]">
      <ColorStar hex={hex} hex2={hex2} className="size-[30px]" />
      {nome}
    </li>
  )
}

export default async function SobrePage() {
  const cores = await getCores()
  const pla = cores.filter((c) => c.material === "PLA")
  const petg = cores.filter((c) => c.material === "PETG")
  return (
    <main className="bg-side-glow flex-1">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-[clamp(16px,4vw,56px)] pt-8 pb-16 sm:gap-16 sm:pt-12 sm:pb-24">
        {/* SOBRE */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-12">
          <Window title="sobre_mim.txt" aria-labelledby="sobre-t" className="min-w-0 flex-[1_1_480px] bg-white/85 drop-lg" bodyClassName="flex flex-col gap-4 p-5 sm:gap-[18px] sm:p-[clamp(24px,4vw,48px)]">
            <h1 id="sobre-t" className="flex flex-col">
              <span className="font-script text-[clamp(44px,13vw,56px)] leading-none text-violet sm:text-[clamp(56px,6vw,84px)]">Oi, eu sou a Yas</span>
              <span className="font-pixel text-[24px] leading-[1.1] sm:text-[clamp(30px,3.4vw,42px)] font-bold">A MENTE POR TRÁS DA YASTECH.3D</span>
            </h1>
            <p className="text-lg leading-[1.65] text-ink-soft">
              Sou desenvolvedora de software e sempre fui fascinada por tecnologia, de todos os tipos. A impressão 3D entrou nessa lista quando comprei minha primeira impressora, só por hobby. Comecei imprimindo coisinhas pra facilitar meu dia a dia, e não demorou pros meus amigos começarem a pedir as deles também. Foi assim que nasceu a YasTech.3D.
            </p>
            <p className="text-lg leading-[1.65] text-ink-soft">Cada peça é impressa sob encomenda, camada por camada, na cor que você escolher.</p>
            <Button size="lg" variant="secondary" className="drop-sm self-start" nativeButton={false} render={<a href={INSTAGRAM_PERFIL} />}>
              <InstagramIcon className="size-5" />
              Seguir @yastech.3d
            </Button>
          </Window>

          <div className="relative mx-auto flex min-w-0 flex-[0_1_400px] justify-center p-5">
            <div className="relative aspect-[340/420] w-[280px] max-w-full overflow-hidden rounded-t-[140px] sm:w-[340px] sm:rounded-t-[170px] rounded-b-md border-2 border-ink shadow-[0_0_0_8px_#fff,0_0_50px_20px_rgb(110_220_255/0.7)]">
              <Image src="/img/yas.jpg" alt="Avatar ilustrado da Yasmin com fones de ouvido e camiseta YasTech" fill sizes="(min-width: 640px) 340px, 280px" loading="eager" className="object-cover" />
            </div>
            <HeartY2K id="hhS" className="absolute bottom-0 -left-1.5 h-[64px] w-[70px] animate-float sm:h-[92px] sm:w-[100px]" />
            <Sparkle id="ssS" to="#5B1FD6" className="absolute top-0 right-0 size-11 animate-float sm:size-[60px]" />
          </div>
        </div>

        {/* CORES */}
        <Window title="cores_disponiveis.exe" aria-labelledby="cores-t" className="drop-lg" bodyClassName="flex flex-col gap-5 p-5 sm:gap-6 sm:p-[clamp(24px,4vw,44px)]">
          <h2 id="cores-t" className="font-pixel text-[28px] leading-none font-bold sm:text-[clamp(32px,4vw,48px)]">CORES DISPONÍVEIS</h2>
          <div className="flex flex-wrap gap-8">
            <div className="flex min-w-0 flex-[2_1_420px] flex-col gap-3.5">
              <h3 className="font-pixel text-2xl font-bold">PLA</h3>
              <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(190px,100%),1fr))] gap-2.5 p-0">
                {pla.map((c) => (
                  <CorItem key={c.nome} {...c} />
                ))}
              </ul>
            </div>
            <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-3.5">
              <h3 className="font-pixel text-2xl font-bold">PETG</h3>
              <ul className="m-0 grid list-none gap-2.5 p-0">
                {petg.map((c) => (
                  <CorItem key={c.nome} {...c} />
                ))}
              </ul>
              <p className="text-[15px] leading-normal text-ink-soft">PETG é mais resistente a calor e impacto. Ideal pra peças de uso diário.</p>
            </div>
          </div>
        </Window>

        {/* DÚVIDAS */}
        <section aria-labelledby="faq-t" className="flex flex-col gap-5">
          <h2 id="faq-t" className="font-script text-[clamp(44px,13vw,52px)] leading-none font-normal sm:text-[clamp(52px,6vw,76px)]">Dúvidas</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-3 sm:gap-5">
            {duvidas.map((d) => (
              <div key={d.q} className="flex flex-col gap-2 border-2 border-ink bg-white p-5">
                <h3 className="font-pixel text-xl font-bold">{d.q}</h3>
                <p className="text-base leading-normal text-ink-soft">{d.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
