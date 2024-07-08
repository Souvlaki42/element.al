import {
	Setter,
	Show,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";
import elements from "./elements.json";

type Element = (typeof elements)[number];
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
	data?: Element;
	setDisplayInfo: Setter<boolean>;
}) => {
	const handleExitClick = () => setDisplayInfo(false);
	const [exitOnHover, setExitOnHover] = createSignal<boolean>(false);
	return (
		<div class="newMain">
			<KeySequence sequenceHandler={konamiCodeKeySequenceHandler}></KeySequence>
			<div class="exitContainer">
				<img
					src={exitOnHover() ? "exit2.svg" : "exit.svg"}
					class="exitIcon"
					alt="Exit"
					onClick={handleExitClick}
					onMouseEnter={() => setExitOnHover(true)}
					onMouseLeave={() => setExitOnHover(false)}
				/>
			</div>
			<div class="symbolContainer">
				<div
					class="symbol"
					style={{ "background-color": `#${data?.cpkHexColor}` }}
				>
					<h1 class="symbolAtomicMass">{data?.atomicMass}</h1>
					<h1 class="symbolText">{data?.symbol}</h1>
					<h1 class="symbolAtomicNumber">{data?.atomicNumber}</h1>
				</div>
			</div>
			<div class="remInfo">
				<div class="remInfoLeft">
					<p class="remText">Atomic number : {data?.atomicNumber}</p>
					<p class="remText">Symbol : {data?.symbol}</p>
					<p class="remText">Name : {data?.name}</p>
					<p class="remText">Atomic mass : {data?.atomicMass}</p>
					<p class="remText">
						Electronic configuration : {data?.electronicConfiguration}
					</p>
				</div>
				<div class="remInfoRight">
					<p class="remText">Oxidation states : {data?.oxidationStates}</p>
					<p class="remText">Standard physical state : {data?.standardState}</p>
					<p class="remText">Density : {data?.density} g/cm^3</p>
					<p class="remText">Type : {data?.groupBlock}</p>
					<p class="remText">Year discovered : {data?.yearDiscovered}</p>
				</div>
			</div>
		</div>
	);
};

const Home = ({
	setElement,
	setDisplayInfo,
}: {
	setElement: Setter<Element | undefined>;
	setDisplayInfo: Setter<boolean>;
}) => {
	const [elementInput, setElementInput] = createSignal<string>("");

	return (
		<>
			<header>Element.al</header>
			<main>
				<KeySequence
					sequenceHandler={konamiCodeKeySequenceHandler}
				></KeySequence>
			</main>
			<form
				class="inputArea"
				onsubmit={(e) => {
					e.preventDefault();
					if (!!!elementInput()) return;

					const numberInfo = Number(elementInput());
					if (!isNaN(numberInfo)) {
						// display by atomic number
						setElement(elements[numberInfo - 1]);
					} else if (elementInput().length <= 2) {
						// display by symbol
						setElement(elements.find((el) => el.symbol === elementInput()));
					} else {
						// display by atomic name
						setElement(elements.find((el) => el.name === elementInput()));
					}
					setDisplayInfo(true);
				}}
			>
				<input
					class="elementName"
					type="text"
					name="element"
					placeholder="Type any element value..."
					value={elementInput()}
					onInput={(e) => setElementInput(e.target.value)}
					required
				/>
				<button class="search" type="submit">
					Go
				</button>
			</form>
			<p class="helperText">You can also search by atomic number or symbol.</p>
			<footer>
				<p class="helperText">Created by</p>
				<div class="creators">
					<a href="https://github.com/souvlaki42">
						<img src="souvlaki42.png" alt="Profile picture of Souvlaki42" />
					</a>
					<a href="https://github.com/delta911ee">
						<img src="delta911ee.png" alt="Profile picture of delta911ee" />
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
	const [element, setElement] = createSignal<Element | undefined>(undefined);
	createEffect(() => {
		if (displayInfo() && !!!element()) {
			alert("This element does not exist. Try again.");
			setDisplayInfo(false);
		}
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
