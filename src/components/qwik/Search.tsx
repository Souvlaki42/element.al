import { component$, useSignal } from "@builder.io/qwik";
import type { InferEntrySchema } from "astro:content";
type SearchProps = {
  elements: InferEntrySchema<"elements">[];
};
export const Search = component$<SearchProps>(({ elements }) => {
  const query = useSignal("");
  const filteredElements = elements.filter(
    (element) =>
      element.name.toLowerCase().includes(query.value.toLowerCase()) ||
      element.symbol.toLowerCase().includes(query.value.toLowerCase()) ||
      element.atomicNumber
        .toString()
        .toLowerCase()
        .includes(query.value.toLowerCase())
  );
  return (
    <div class="relative">
      <div class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
          class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          ></path>
        </svg>
        <input
          type="text"
          value={query.value}
          onInput$={(_, target) => (query.value = target.value)}
          class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="Search elements..."
          aria-label="Search elements"
        />
      </div>
      {query.value && (
        <ol class="absolute z-10 mt-2 max-h-96 w-full overflow-y-auto rounded-lg bg-white shadow-lg dark:bg-gray-700">
          {filteredElements.map((element) => (
            <li key={element.atomicNumber}>
              <a
                href={`/elements/${element.atomicNumber}`}
                class="block px-4 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
              >
                {element.symbol} - {element.name} [{element.atomicNumber}]
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
});
