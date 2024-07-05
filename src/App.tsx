import { Setter, Show, createEffect, createSignal } from "solid-js";
import elements from "./elements.json";

type ElementType = (typeof elements)[number];

const Element = ({
	data,
	setDisplayInfo,
}: {
	data?: ElementType;
	setDisplayInfo: Setter<boolean>;
}) => {
	const handleExitClick = () => setDisplayInfo(false);
	return (
		<div class="newMain">
			<div class="exitContainer">
				<img
					src="exit.svg"
					class="exitIcon"
					alt="Exit"
					onClick={handleExitClick}
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
	setElement: Setter<ElementType | undefined>;
	setDisplayInfo: Setter<boolean>;
}) => {
	const [elementInput, setElementInput] = createSignal<string>("");

	return (
		<>
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
					placeholder="Type any element name..."
					value={elementInput()}
					onInput={(e) => setElementInput(e.target.value)}
					required
				/>
				<button class="search" type="submit">
					Go
				</button>
			</form>
			<p class="helperText">You can also search by atomic number or symbol.</p>
		</>
	);
};

const KeySequence = ({
	expectedSequence,
	actionHandler,
}: {
	expectedSequence: string[];
	actionHandler: () => void;
}) => {
	const [_, setKeySequence] = createSignal<string[]>([]);
	const handleKeyDown = (event: KeyboardEvent) => {
		const { key } = event;
		setKeySequence((prevKeys) => {
			const newKeys = [...prevKeys, key].slice(-expectedSequence.length);
			if (newKeys.join(",") === expectedSequence.join(",")) {
				// Expected sequence matched
				actionHandler();
			}
			return newKeys;
		});
	};

	createEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return null;
};

export default function App() {
	const [displayInfo, setDisplayInfo] = createSignal<boolean>(false);
	const [element, setElement] = createSignal<ElementType | undefined>(
		undefined
	);
	createEffect(() => {
		if (displayInfo() && !!!element())
			alert("This element does not exist. Try again.");
		setDisplayInfo(false);
	});

	return (
		<>
			<header>Element.al</header>
			<main>
				<KeySequence
					expectedSequence={[
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
					]}
					actionHandler={() => {
						window.location.href =
							"https://en.wikipedia.org/wiki/Dmitri_Mendeleev";
					}}
				></KeySequence>
				<Show when={!displayInfo()}>
					<Home setElement={setElement} setDisplayInfo={setDisplayInfo}></Home>
				</Show>
				<Show when={displayInfo() && !!element()}>
					<Element data={element()} setDisplayInfo={setDisplayInfo}></Element>
				</Show>
			</main>
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
}
