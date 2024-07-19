import {
  Setter,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import elements from "./elements.json";

// Preprocess elements into multiple indexes
const elementsByAtomicNumber: ChemicalElement[] = [];
const elementsBySymbol: Record<string, ChemicalElement> = {};
const elementsByName: Record<string, ChemicalElement> = {};

type ChemicalElement = (typeof elements)[number];
type KeySequenceHandler = {
  expectedSequence: string[];
  sequenceAction: <T>() => T | void;
};

const konamiCodeKeySequenceHandler = {
  expectedSequence: [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ],
  sequenceAction: () => {
    window.location.href = "https://en.wikipedia.org/wiki/Dmitri_Mendeleev";
  },
} satisfies KeySequenceHandler;

const ElementDisplay = ({
  data,
  setDisplayInfo,
}: {
  data?: ChemicalElement;
  setDisplayInfo: Setter<boolean>;
}) => {
  const handleExitClick = () => setDisplayInfo(false);
  const [exitOnHover, setExitOnHover] = createSignal<boolean>(false);
  return (
    <main class="flex h-full w-full flex-col items-center overflow-hidden rounded-lg bg-white dark:bg-gray-900">
      <KeySequence sequenceHandler={konamiCodeKeySequenceHandler}></KeySequence>
      <div class="flex w-full justify-end bg-inherit p-4">
        <img
          src={exitOnHover() ? "exit2.svg" : "exit.svg"}
          class="h-10 w-10 cursor-pointer"
          alt="Exit"
          onClick={handleExitClick}
          onMouseEnter={() => setExitOnHover(true)}
          onMouseLeave={() => setExitOnHover(false)}
        />
      </div>
      <div class="flex w-full justify-center bg-inherit p-4">
        <div
          class="flex h-[150px] w-[150px] cursor-default flex-col items-center justify-center rounded-xl transition-all duration-200 ease-in-out"
          style={{ "background-color": `#${data?.cpkHexColor}` }}
        >
          <h1 class="font-poppins text-[1rem]">{data?.atomicMass}</h1>
          <h1 class="font-poppins text-[4rem]">{data?.symbol}</h1>
          <h1 class="font-poppins text-[1rem]">{data?.atomicNumber}</h1>
        </div>
      </div>
      <div class="flex h-auto w-full flex-col justify-center bg-inherit p-4 md:flex-row">
        <div class="flex w-full flex-col p-4 md:w-1/2">
          <p class="m-4 font-inter text-lg md:text-2xl dark:text-gray-200">
            Atomic number : {data?.atomicNumber}
          </p>
          <p class="m-4 font-inter text-lg md:text-2xl dark:text-gray-200">
            Symbol : {data?.symbol}
          </p>
          <p class="m-4 font-inter text-lg md:text-2xl dark:text-gray-200">
            Name : {data?.name}
          </p>
          <p class="m-4 font-inter text-lg md:text-2xl dark:text-gray-200">
            Atomic mass : {data?.atomicMass}
          </p>
          <p class="m-4 font-inter text-lg md:text-2xl dark:text-gray-200">
            Electronic configuration : {data?.electronicConfiguration}
          </p>
        </div>
        <div class="flex w-full flex-col p-4 md:w-1/2">
          <p class="m-4 font-inter text-lg md:text-2xl dark:text-gray-200">
            Oxidation states : {data?.oxidationStates}
          </p>
          <p class="m-4 font-inter text-lg md:text-2xl dark:text-gray-200">
            Standard physical state : {data?.standardState}
          </p>
          <p class="m-4 font-inter text-lg md:text-2xl dark:text-gray-200">
            Density : {data?.density} g/cm^3
          </p>
          <p class="m-4 font-inter text-lg md:text-2xl dark:text-gray-200">
            Type : {data?.groupBlock}
          </p>
          <p class="m-4 font-inter text-lg md:text-2xl dark:text-gray-200">
            Year discovered : {data?.yearDiscovered}
          </p>
        </div>
      </div>
    </main>
  );
};

const Home = ({
  setElement,
  setDisplayInfo,
}: {
  setElement: Setter<ChemicalElement | undefined>;
  setDisplayInfo: Setter<boolean>;
}) => {
  const [elementInput, setElementInput] = createSignal<string>("");

  return (
    <>
      <header class="mb-8 text-center font-poppins text-4xl md:text-6xl dark:text-white">
        Element.al
      </header>
      <main class="flex flex-col items-center">
        <KeySequence
          sequenceHandler={konamiCodeKeySequenceHandler}
        ></KeySequence>
        <form
          class="flex flex-col items-center md:flex-row md:space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!!!elementInput()) return;

            const numberQuery = Number(elementInput());

            if (!isNaN(numberQuery) && numberQuery >= 1 && numberQuery <= 118) {
              // Find element by atomic number
              setElement(elementsByAtomicNumber[numberQuery - 1]);
            } else if (elementInput().length <= 2) {
              // Find element by symbol
              setElement(elementsBySymbol[elementInput()]);
            } else {
              // Find element by name
              setElement(elementsByName[elementInput()]);
            }
            setDisplayInfo(true);
          }}
        >
          <input
            class="h-[6vh] w-[80vw] rounded-md p-2 text-xl md:w-[30vw] md:text-2xl"
            type="text"
            name="element"
            placeholder="Search element"
            value={elementInput()}
            onInput={(e) => setElementInput(e.target.value)}
            required
          />
          <button
            class="mt-4 h-[6vh] w-20 rounded-md border-none bg-[#4020cf] text-xl text-white hover:bg-[#2f13ac] md:mt-0 md:text-2xl"
            type="submit"
          >
            Go
          </button>
        </form>
        <p class="m-3.5 text-center text-lg md:text-xl dark:text-gray-200">
          You can search by name, atomic number or symbol.
        </p>
      </main>
      <footer class="flex flex-col items-center">
        <p class="mb-3.5 mt-8 text-center text-lg md:text-xl dark:text-gray-200">
          Created by
        </p>
        <div class="flex flex-row">
          <a href="https://github.com/delta911ee">
            <img
              class="m-1 w-12 overflow-hidden rounded-[50%]"
              src="delta911ee.png"
              alt="Profile picture of delta911ee"
            />
          </a>
          <a href="https://github.com/souvlaki42">
            <img
              class="m-1 w-12 overflow-hidden rounded-[50%]"
              src="souvlaki42.png"
              alt="Profile picture of Souvlaki42"
            />
          </a>
        </div>
      </footer>
    </>
  );
};

const KeySequence = ({
  sequenceHandler,
}: {
  sequenceHandler: KeySequenceHandler;
}) => {
  let keySequence = new Array<string>();
  const { expectedSequence, sequenceAction } = sequenceHandler;
  const handleKeyDown = (e: KeyboardEvent) => {
    keySequence = [...keySequence, e.key].slice(-expectedSequence.length);
    if (keySequence.join(",") === expectedSequence.join(",")) {
      sequenceAction();
    }
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);

    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
  });

  return null;
};

export default function App() {
  const [displayInfo, setDisplayInfo] = createSignal<boolean>(false);
  const [element, setElement] = createSignal<ChemicalElement | undefined>(
    undefined,
  );
  createEffect(() => {
    if (displayInfo() && !!!element()) {
      alert("This element does not exist. Try again.");
      setDisplayInfo(false);
    }
  });

  onMount(() => {
    elements.forEach((element) => {
      elementsByAtomicNumber[element.atomicNumber - 1] = element;
      elementsBySymbol[element.symbol] = element;
      elementsByName[element.name] = element;
    });
  });

  return (
    <>
      <Show when={!displayInfo()}>
        <Home setElement={setElement} setDisplayInfo={setDisplayInfo}></Home>
      </Show>
      <Show when={displayInfo() && !!element()}>
        <ElementDisplay
          data={element()}
          setDisplayInfo={setDisplayInfo}
        ></ElementDisplay>
      </Show>
    </>
  );
}
