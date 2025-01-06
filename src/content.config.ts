import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { elementSchema } from "~/lib/schemas";

type Element = z.infer<typeof elementSchema>;
const elements = defineCollection({
  loader: file("src/elements.json", {
    parser: (text) => {
      const json = JSON.parse(text) as Element[];
      return json.map((element) => {
        return {
          ...element,
          id: element.atomicNumber.toString()
        };
      });
    }
  }),
  schema: elementSchema
});

export const collections = { elements };
