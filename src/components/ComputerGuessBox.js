import { useState, useContext, useEffect } from "react";
import { Contexts } from "../context/Contexts.js";
import GuessingAgentSmart from "../utils/Agents/GuessingAgentSmart.js";
import GuessingAgentSmartRand from "../utils/Agents/GuessingAgentSmartRand.js";
import GuessingAgentDumb from "../utils/Agents/GuessingAgentDumb.js";
import "./ComputerGuessBox.css";

/**
 * A React component that holds information about computer guesses.
 * It takes only one props which decides mode of the guessing agent.
 * "mode" variable is eaither start, random-start, or dumb.
 *
 * @param props only caontains one variable called mode
 * @returns a box with information about the computer guesses
 * such as as many asterisks as number of guesses that computer made and
 * if each guess was high or low.
 */
const ComputerGuessBox = (props) => {
    const { mode } = props;
    const [guessingAgent, setGuessingAgent] = useState(null);
    const [computerGuesses, setComputerGuesses] = useState([]);
    const [guageText, setGuageText] = useState("");
    const [guageColor, setGuageColor] = useState(null);
    const { answer, setDidComputerGuess, setComputerFinalGuess, timesGuessed } =
        useContext(Contexts);

    // Only run when the component first mounts
    useEffect(() => {
        if (mode === "smart") {
            setGuessingAgent(new GuessingAgentSmart(1, 100));
        } else if (mode === "random-smart") {
            setGuessingAgent(new GuessingAgentSmartRand(1, 100, 0.3));
        } else if (mode === "dumb") {
            setGuessingAgent(new GuessingAgentDumb(1, 100));
        }
    }, []);

    // Prevent too much render and updating state from Contexts too much
    useEffect(() => {
        // Only run when the guessingAgent exits.
        // This will prevent the error from causing.
        if (guessingAgent) {
            // This if statement right below makes sure that the agent only
            // guesses when the user guasses.
            if (timesGuessed > guessingAgent.timesGuessed) {
                guessingAgent.generateGuess();
                let guess = guessingAgent.guess;
                setComputerGuesses([...computerGuesses, guess]);
                setComputerFinalGuess(guess);
                if (answer === guess) {
                    setDidComputerGuess(true);
                    setGuageText("Computer got it right!");
                    setGuageColor("green");
                } else {
                    if (answer < guess) {
                        guessingAgent.recieveHint("lower");
                        setGuageText("Last guess was too high!");
                    } else if (answer > guess) {
                        guessingAgent.recieveHint("higer");
                        setGuageText("Last guess was too low!");
                    }
                    setGuageColor("red");
                }
            }
        }
    }, [timesGuessed]);

    return (
        <div className="computerGuesses">
            <h2>Computer's Guess!</h2>
            <br />
            <br />
            <p>
                {computerGuesses.length !== 0 ? "previous guesses: " : <br />}
                <br />
                {
                    // make the computer guesses are invisible
                    computerGuesses
                        .map(function (item) {
                            // unicode for asterisk
                            return "\u2217";
                        })
                        .join(" ")
                }
            </p>
            <div
                style={{
                    backgroundColor: guageColor,
                    color: `white`,
                    fontWeight: `bold`,
                }}
            >
                {guageText !== "" ? guageText : <br />}
            </div>
        </div>
    );
};

export default ComputerGuessBox;
