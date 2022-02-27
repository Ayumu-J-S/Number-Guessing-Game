import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import styles from "./modal.css.js";
import "./App.css";
import HumanGuessBox from "./components/HumanGuessBox.js";
import ComputerGuessBox from "./components/ComputerGuessBox.js";
import { Contexts } from "./context/Contexts.js";

// This is needed so screen readers don't see main content when modal is
// opened
Modal.setAppElement("#root");

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalText, setModalText] = useState("");
    const [key, setKey] = useState(1);
    const [mode, setMode] = useState("smart");
    // Get all of the contexts so they can be reset
    const {
        answer,
        setAnswer,
        didUserGuess,
        setDidUserGuess,
        didComputerGuess,
        setDidComputerGuess,
        userFinalGuess,
        setUserFinalGuess,
        computerFinalGuess,
        setComputerFinalGuess,
        timesGuessed,
        setTimesGuessed,
    } = useContext(Contexts);

    // This will prevent too many rerenders
    useEffect(() => {
        if (didComputerGuess || didUserGuess || timesGuessed >= 10) {
            if (didComputerGuess && didUserGuess) {
                setModalTitle("It was a draw!");
                setModalText(
                    "You and the computer guessed it in the same turn..."
                );
            }
            if (!didComputerGuess && !didUserGuess) {
                setModalTitle("It was a draw!");
                setModalText("You and the computer did not guess in time.");
            }
            if (didComputerGuess && !didUserGuess) {
                setModalTitle("Computer won :)");
                setModalText("");
            }
            if (!didComputerGuess && didUserGuess) {
                setModalTitle("You won!");
                setModalText("");
            }
            setModalIsOpen(true);
        }
    }, [didComputerGuess, didUserGuess, timesGuessed]);

    // This function is used onClick in Modal buttons
    function reset() {
        // Close the modal
        setModalIsOpen(false);
        // Changing key will remount the comonent
        setKey(key + 1);
        // Set all the contex state to its default
        setAnswer(Math.floor(Math.random() * 100) + 1);
        setDidUserGuess(false);
        setDidComputerGuess(false);
        setUserFinalGuess(0);
        setComputerFinalGuess(0);
        setTimesGuessed(0);
    }

    return (
        <div className="App">
            <div className="descriptions">
                <h1>You VS Computer!</h1>
                <p>
                    A random number between 1 and 100 was arbitrarily selected.
                    Now your computer will be guessing this number. See if you
                    can guess quicker than your computer does. We'll tell you if
                    your guess was too high or too low and your computer also
                    knows as much as you, or as least as you...
                </p>
            </div>
            <div className="answers">
                <div className="leftHalf">
                    <HumanGuessBox key={key}></HumanGuessBox>
                </div>
                <div className="rightHalf">
                    <ComputerGuessBox key={key} mode={mode}></ComputerGuessBox>
                </div>
            </div>
            <Modal isOpen={modalIsOpen} style={styles}>
                <h1>{modalTitle}</h1>
                <p>{modalText}</p>
                <p>
                    {"The answer was: "} <span className="bold">{answer}</span>
                </p>
                <p>{"Your final guess was: " + userFinalGuess}</p>
                <p>{"Computers final guess was: " + computerFinalGuess}</p>
                <div className="playAgain">
                    <p>
                        {key === 1
                            ? "It turns out that you were playing this game against a smart agent (called Smart Agent), which always guesses in a certain pattern. You can play with another agent if you'd like."
                            : "Click one of the buttons below to play again! Dumb Agent is the least smart agent and Random Smart Agent and Smart Agent have somewhat similar level of inteligentce."}
                    </p>
                    <button
                        onClick={() => {
                            reset();
                            setMode("smart");
                        }}
                    >
                        Play againt Smart Agent
                    </button>
                    <button
                        onClick={() => {
                            reset();
                            setMode("random-smart");
                        }}
                    >
                        Play againt Random Smart Agent
                    </button>
                    <button
                        onClick={() => {
                            reset();
                            setMode("dumb");
                        }}
                    >
                        Play against Dumb Agent
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default App;
