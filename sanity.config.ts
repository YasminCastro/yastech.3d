"use client"

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { apiVersion, dataset, projectId } from "./sanity/env"
import { schemaTypes } from "./sanity/schemas"

export default defineConfig({
  name: "yastech3d",
  title: "YasTech.3D",
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.documentTypeListItem("produto").title("Produtos"),
            S.documentTypeListItem("cor").title("Cores"),
          ]),
    }),
  ],
})
