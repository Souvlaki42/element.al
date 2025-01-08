import { component$, useSignal } from "@builder.io/qwik";
import { MagnifyingGlassIcon } from "./MagnifyingGlassIcon";

type SearchProps = {
  dinos: { name: string; description: string }[];
};

export const Search = component$<SearchProps>(({ dinos }) => {
  const query = useSignal("");
  const filtered = dinos.filter(
    (element) =>
      element.name.toLowerCase().includes(query.value.toLowerCase()) ||
      element.description.toLowerCase().includes(query.value.toLowerCase())
  );

  return (
    <div class="relative">
      <div class="relative">
        <MagnifyingGlassIcon class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        <input
          type="text"
          value={query.value}
          onInput$={(_, target) => (query.value = target.value)}
          class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="Search dinos..."
          aria-label="Search dinos"
        />
      </div>

      {query.value && (
        <ol class="absolute z-10 mt-2 max-h-96 w-full overflow-y-auto rounded-lg bg-white shadow-lg dark:bg-gray-700">
          {filtered.map((dino) => (
            <li key={dino.name}>
              <a class="block px-4 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600">
                {dino.name} - {dino.description}
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
});
