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
    <main class="h-[100vh] w-[100vw] justify-center">
      <KeySequence sequenceHandler={konamiCodeKeySequenceHandler}></KeySequence>
      <div class="flex h-[20vh] w-screen justify-end">
        <img
          src={exitOnHover() ? "exit2.svg" : "exit.svg"}
          class="m-10 h-10 w-10"
          alt="Exit"
          onClick={handleExitClick}
          onMouseEnter={() => setExitOnHover(true)}
          onMouseLeave={() => setExitOnHover(false)}
        />
      </div>
      <div class="flex h-fit w-screen justify-center">
        <div
          class="flex h-[150px] w-[150px] cursor-default flex-col items-center justify-center rounded-xl transition-all duration-200 ease-in-out"
          style={{ "background-color": `#${data?.cpkHexColor}` }}
        >
          <h1 class="font-poppins text-[1rem]">{data?.atomicMass}</h1>
          <h1 class="font-poppins text-[4rem]">{data?.symbol}</h1>
          <h1 class="font-poppins text-[1rem]">{data?.atomicNumber}</h1>
        </div>
      </div>
      <div class="flex h-[50vh] w-screen justify-center">
        <div class="flex h-[50vh] w-[50vw] flex-col justify-center">
          <p class="m-1.5 pl-[12.5vw] font-inter text-[2rem]">
            Atomic number : {data?.atomicNumber}
          </p>
          <p class="m-1.5 pl-[12.5vw] font-inter text-[2rem]">
            Symbol : {data?.symbol}
          </p>
          <p class="m-1.5 pl-[12.5vw] font-inter text-[2rem]">
            Name : {data?.name}
          </p>
          <p class="m-1.5 pl-[12.5vw] font-inter text-[2rem]">
            Atomic mass : {data?.atomicMass}
          </p>
          <p class="m-1.5 pl-[12.5vw] font-inter text-[2rem]">
            Electronic configuration : {data?.electronicConfiguration}
          </p>
        </div>
        <div class="flex h-[50vh] w-[50vw] flex-col justify-center">
          <p class="m-1.5 pl-[12.5vw] font-inter text-[2rem]">
            Oxidation states : {data?.oxidationStates}
          </p>
          <p class="m-1.5 pl-[12.5vw] font-inter text-[2rem]">
            Standard physical state : {data?.standardState}
          </p>
          <p class="m-1.5 pl-[12.5vw] font-inter text-[2rem]">
            Density : {data?.density} g/cm^3
          </p>
          <p class="m-1.5 pl-[12.5vw] font-inter text-[2rem]">
            Type : {data?.groupBlock}
          </p>
          <p class="m-1.5 pl-[12.5vw] font-inter text-[2rem]">
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
      <header class="text-center font-poppins text-6xl">Element.al</header>
      <main>
        <KeySequence
          sequenceHandler={konamiCodeKeySequenceHandler}
        ></KeySequence>
      </main>
      <form
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
          class="h-[6vh] w-[30vw] border-none text-2xl"
          type="text"
          name="element"
          placeholder="Type any element value..."
          value={elementInput()}
          onInput={(e) => setElementInput(e.target.value)}
          required
        />
        <button
          class="h-[6vh] w-20 border-none bg-[#4020cf] text-2xl text-white hover:bg-[#2f13ac]"
          type="submit"
        >
          Go
        </button>
      </form>
      <p class="m-3.5 text-center text-xl">
        You can also search by atomic number or symbol.
      </p>
      <footer class="flex flex-col items-center">
        <p class="m-3.5 text-center text-xl">Created by</p>
        <div class="flex flex-row">
          <a href="https://github.com/souvlaki42">
            <img
              class="m-1 w-12 overflow-hidden rounded-[50%]"
              src="souvlaki42.png"
              alt="Profile picture of Souvlaki42"
            />
          </a>
          <a href="https://github.com/delta911ee">
            <img
              class="m-1 w-12 overflow-hidden rounded-[50%]"
              src="delta911ee.png"
              alt="Profile picture of delta911ee"
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
