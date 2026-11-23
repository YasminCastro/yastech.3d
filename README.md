# YasTech.3D

Catálogo online da **YasTech.3D**, uma loja de impressões 3D sob encomenda: capinhas de isqueiro, porta cigarro, chaveiros e outras peças. O site mostra os produtos com fotos, preço e cores disponíveis. O pedido é feito pela DM do Instagram [@yastech.3d](https://instagram.com/yastech.3d).

Os produtos e as cores são cadastrados no **Sanity Studio**, que fica dentro do próprio site em `/studio`.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) + componentes [shadcn/ui](https://ui.shadcn.com) (Base UI)
- [Sanity](https://www.sanity.io) como CMS (Studio embutido via `next-sanity`)
- Deploy pensado para a [Vercel](https://vercel.com)

> **Atenção:** esta versão do Next.js tem mudanças incompatíveis com versões anteriores. Antes de mexer no código, consulte a documentação em `node_modules/next/dist/docs/` (veja [AGENTS.md](AGENTS.md)).

## Páginas

| Rota | O que tem |
| --- | --- |
| `/` | Home com hero, categorias, novidades e o passo a passo do pedido |
| `/catalogo` | Catálogo completo com filtro por categoria |
| `/catalogo/[slug]` | Página do produto: fotos, preço, descrição e escolha de cor |
| `/sobre` | Sobre a loja e dúvidas frequentes |
| `/studio` | Sanity Studio para gerenciar produtos e cores |

## Como rodar

Pré-requisito: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). O Studio fica em [http://localhost:3000/studio](http://localhost:3000/studio).

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
# Opcional, o padrão é "production"
NEXT_PUBLIC_SANITY_DATASET=production
```

Sem o `NEXT_PUBLIC_SANITY_PROJECT_ID` o site ainda abre, mas o catálogo fica vazio.

Para usar o Studio em `localhost`, adicione `http://localhost:3000` em **CORS origins** (com credenciais) no painel do projeto em [sanity.io/manage](https://www.sanity.io/manage). Faça o mesmo com o domínio de produção.

### Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Sobe o build de produção |
| `npm run lint` | ESLint |

## Conteúdo no Sanity

O Studio tem dois tipos de documento:

- **Produto**: nome, endereço da página (slug), categoria, preço, fotos (a primeira vira a capa no catálogo), cores disponíveis, descrição, subtítulo e frase de destaque opcionais.
- **Cor**: nome, material (PLA ou PETG), código hex e, para filamentos duo color, uma segunda cor.

Algumas regras:

- Um produto novo já começa com todas as cores publicadas marcadas. Basta remover as que não se aplicam.
- Se um produto ficar sem nenhuma cor marcada, o site mostra todas as cores cadastradas.
- Alterações publicadas no Studio aparecem no site em até 1 minuto (revalidação de 60 s).
- As categorias são fixas e ficam em [lib/produtos.ts](lib/produtos.ts): capinhas de isqueiro, porta cigarro, chaveiros e aleatórios.

## Estrutura

```
app/                  Páginas (App Router)
  catalogo/           Catálogo e página de produto
  sobre/              Sobre e FAQ
  studio/             Sanity Studio embutido
components/
  site/               Componentes do site (header, footer, card de produto, janelas, ícones)
  ui/                 Componentes base do shadcn/ui
lib/
  produtos.ts         Tipos, categorias, links do Instagram e formatação de preço
  store.ts            Consultas GROQ ao Sanity
  image-loader.ts     Loader de imagens usando o CDN do Sanity
sanity/
  env.ts              Project ID, dataset e versão da API
  schemas.ts          Schemas de Produto e Cor
sanity.config.ts      Configuração do Studio
public/img/           Imagens locais usadas como fallback
```

## Imagens

O `next.config.ts` usa um loader customizado ([lib/image-loader.ts](lib/image-loader.ts)) que redimensiona as fotos pelo CDN do Sanity. Assim o site não consome a cota de otimização de imagens da Vercel no plano gratuito. Imagens de `public/` são servidas como estão.

## Deploy

1. Importe o repositório na Vercel.
2. Configure `NEXT_PUBLIC_SANITY_PROJECT_ID` (e `NEXT_PUBLIC_SANITY_DATASET`, se não for `production`).
3. Adicione o domínio do site nas CORS origins do projeto no Sanity.
