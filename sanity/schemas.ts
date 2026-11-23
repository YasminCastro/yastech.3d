import { defineArrayMember, defineField, defineType } from "sanity"
import { categorias } from "../lib/produtos"
import { apiVersion } from "./env"

export const cor = defineType({
  name: "cor",
  title: "Cor",
  type: "document",
  fields: [
    defineField({ name: "nome", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "material",
      title: "Material",
      type: "string",
      options: { list: ["PLA", "PETG"], layout: "radio", direction: "horizontal" },
      initialValue: "PLA",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "hex",
      title: "Código da cor",
      description: "Formato #RRGGBB, ex.: #E3202A. Dá pra pegar em htmlcolorcodes.com",
      type: "string",
      validation: (r) => r.required().regex(/^#[0-9a-fA-F]{6}$/, { name: "hex" }),
    }),
    defineField({
      name: "hex2",
      title: "Segunda cor (só para filamento duo color)",
      description: "Deixe vazio se a cor for única. Formato #RRGGBB, ex.: #8B2680",
      type: "string",
      validation: (r) => r.regex(/^#[0-9a-fA-F]{6}$/, { name: "hex" }),
    }),
    defineField({ name: "ordem", title: "Ordem na lista", type: "number", initialValue: 100 }),
  ],
  orderings: [{ title: "Ordem", name: "ordem", by: [{ field: "material", direction: "desc" }, { field: "ordem", direction: "asc" }] }],
  preview: {
    select: { nome: "nome", material: "material", hex: "hex", hex2: "hex2" },
    prepare: ({ nome, material, hex, hex2 }) => ({ title: nome, subtitle: `${material} · ${hex2 ? `duo ${hex} + ${hex2}` : hex}` }),
  },
})

export const produto = defineType({
  name: "produto",
  title: "Produto",
  type: "document",
  // Produto novo já começa com todas as cores publicadas marcadas; basta remover as que não se aplicam.
  initialValue: async (_params, { getClient }) => {
    const ids: string[] = await getClient({ apiVersion }).fetch(
      `*[_type == "cor" && !(_id in path("drafts.**"))] | order(material desc, ordem asc, nome asc)._id`,
    )
    return { cores: ids.map((id) => ({ _type: "reference", _ref: id, _key: id })) }
  },
  fields: [
    defineField({ name: "nome", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Endereço da página",
      description: "Clique em “Generate” para criar a partir do nome.",
      type: "slug",
      options: { source: "nome", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "string",
      options: { list: categorias.map((c) => ({ title: c.label, value: c.id })), layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "preco",
      title: "Preço (R$)",
      type: "number",
      validation: (r) => r.required().min(0).precision(2),
    }),
    defineField({
      name: "fotos",
      title: "Fotos",
      description: "A primeira foto aparece no catálogo. Arraste para reordenar.",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Descrição da foto (acessibilidade)", type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "cores",
      title: "Cores disponíveis",
      description: "Produtos novos já vêm com todas as cores marcadas. Remova as que não estão disponíveis para esta peça.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "cor" }] })],
    }),
    defineField({ name: "descricao", title: "Descrição", type: "text", rows: 4 }),
    defineField({
      name: "subtitulo",
      title: "Subtítulo (opcional)",
      description: "Linha pequena no card do catálogo. Ex.: “Capinha de isqueiro · BIC Grande”",
      type: "string",
    }),
    defineField({
      name: "apelido",
      title: "Frase de destaque (opcional)",
      description: "Aparece em letra cursiva abaixo do nome na página do produto.",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "nome", preco: "preco", categoria: "categoria", media: "fotos.0" },
    prepare: ({ title, preco, categoria, media }) => ({
      title,
      subtitle: `${categorias.find((c) => c.id === categoria)?.label ?? ""} · R$ ${preco ?? "?"}`,
      media,
    }),
  },
})

export const schemaTypes = [produto, cor]
