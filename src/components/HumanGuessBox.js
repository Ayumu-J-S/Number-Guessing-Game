import { useState, useContext, useEffect, useRef } from "react";
import { Contexts } from "../context/Contexts.js";
import checkGuess from "../utils/Helper.js";
import "./HumanGuessBox.css";

/**
 * A component that holds information about the user guesses.
 * The component has the input field for the user to type in
 * their guess value. This copmonent does not have any props.
 *
 * @returns a box with information about the user guesses
 * such as previous guesses and guage to tell if the guess
 * was high or low.
 */
const HumanGuessBox = () => {
    const [data, setData] = useState("");
    const [isTyped, setIsTyped] = useState(false);
    const [prevGuesses, setPrevGuesses] = useState([]);
    const [guageText, setGuageText] = useState("");
    const [guageColor, setGuageColor] = useState(null);
    const {
        answer,
        setDidUserGuess,
        setUserFinalGuess,
        timesGuessed,
        setTimesGuessed,
    } = useContext(Contexts);
    const inputRef = useRef();

    /**
     * Get data from the input filed.
     *
     * @param {*} val the value typed in iput field
     */
    function getData(val) {
        // This will make sure that isTyped set back to false
        // whenever user is typing the value in the field.
        setIsTyped(false);
        setData(val);
    }

    /**
     * Matches the user guess stored in guess variable to the
     * answer. This function also increments the timesGuessed
     * by 1, and set prevGuesses.
     *
     * @param {*} guess guess typed by the user
     */
    function matchAnswer(guess) {
        setTimesGuessed(timesGuessed + 1);
        setPrevGuesses([...prevGuesses, guess]);
        setUserFinalGuess(guess);
        if (guess === answer) {
            setDidUserGuess(true);
            setGuageText("You got it right!");
            setGuageColor("green");
        } else {
            if (guess < answer) {
                setGuageText("Last guess was too low!");
            } else if (guess > answer) {
                setGuageText("Last guess was too high!");
            }
            setGuageColor("red");
        }
    }

    // This will prevent too many rerenders
    useEffect(() => {
        if (isTyped) {
            if (checkGuess(data, 1, 100, inputRef)) {
                matchAnswer(Number(data));
                inputRef.current.value = "";
                inputRef.current.focus();
            }
        }
    }, [isTyped]);

    return (
        <div className="humanGuess">
            <h2>Your Guess!</h2>
            <div className="form">
                <label htmlFor="guessField">
                    Enter your guess: <br />
                </label>
                <input
                    ref={inputRef}
                    type="text"
                    onChange={
                        // event.target refers to the DOM node
                        (event) => getData(event.target.value)
                    }
                    onKeyPress={(event) => {
                        if (event.key === "Enter") setIsTyped(true);
                    }}
                />
                <input
                    type="submit"
                    value="guess!"
                    onClick={() => setIsTyped(true)}
                />
                <p></p>
            </div>
            <p className="prevGuesses">
                {prevGuesses.length !== 0 ? "previous guesses: " : <br />}
                <br />
                {prevGuesses.join(" ")}
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

export default HumanGuessBox;
