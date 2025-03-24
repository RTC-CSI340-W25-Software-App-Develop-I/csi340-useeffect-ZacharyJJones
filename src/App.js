import "./App.css";
import { useState, useEffect } from "react";
import CardDetail from "./components/CardDetail";
import Cards from "./components/Cards";

function App() {
	const [characters, setCharacters] = useState([]);
	const [selectedCharacter, setSelectedCharacter] = useState(null);
	const [pageNum, setPageNum] = useState(1);
	const [canNavigateNext, setCanNavigateNext] = useState(true);
	const [canNavigatePrev, setCanNavigatePrev] = useState(false);

	useEffect(() => {
		fetchCharacters(pageNum);
	}, [pageNum]);

	const fetchCharacters = async (pageNum) => {
		let res = await fetch(`https://swapi.dev/api/people/?page=${pageNum}`);
		let data = await res.json();
		setCanNavigateNext(data.next !== null);
		setCanNavigatePrev(data.previous !== null);
		setCharacters(data.results);
	};

	const fetchCharacterDetails = (characterName) => {
		const char = characters.find((x) => x.name === characterName);
		setSelectedCharacter((prevState) => char);
	};

	const setPage = (newPage) => {
		// It is actually better not to do the prevState pattern here, otherwise
		// ... user can click twice on button when valid, and end up navigating to invalid page
		// >> Turns out, user can do that anyway even when not using that pattern.
		setPageNum(newPage);
		setSelectedCharacter((prevState) => null);
	};

	return (
		<div className="App">
			<h1>Star Wars Characters</h1>
			<div className="main-container ">
				<div>
					<Cards
						characters={characters}
						onCharacterClick={fetchCharacterDetails}
					/>
					<div>
						<button
							disabled={!canNavigatePrev}
							onClick={() => setPage(pageNum - 1)}
						>
							Back
						</button>
						<button
							disabled={!canNavigateNext}
							onClick={() => setPage(pageNum + 1)}
						>
							Next
						</button>
					</div>
				</div>
				{selectedCharacter && <CardDetail character={selectedCharacter} />}
			</div>
		</div>
	);
}

export default App;
