import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const elements = defineCollection({
  loader: file("src/elements.json"),
  schema: z.object({
    id: z.number(), // Atomic number
    symbol: z.string(),
    name: z.string(),
    atomicMass: z.string().or(z.array(z.number())),
    cpkHexColor: z.string().or(z.number()),
    electronicConfiguration: z.string(),
    electronegativity: z.string().or(z.number()),
    atomicRadius: z.string().or(z.number()),
    ionRadius: z.string(),
    vanDerWaalsRadius: z.string().or(z.number()),
    ionizationEnergy: z.string().or(z.number()),
    electronAffinity: z.string().or(z.number()),
    oxidationStates: z.string().or(z.number()),
    standardState: z.string(),
    bondingType: z.string(),
    meltingPoint: z.string().or(z.number()),
    boilingPoint: z.string().or(z.number()),
    density: z.string().or(z.number()),
    groupBlock: z.string(),
    yearDiscovered: z.string().or(z.number())
  })
});

export const collections = { elements };
