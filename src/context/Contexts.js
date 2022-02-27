import React, { useState } from "react";

// Initialize the context
export const Contexts = React.createContext({});

/**
 * A react component that takes all the children component. This function
 * makes the state context usable between all the children components.
 * All the children of Router will be able to access Contexts.
 *
 * @returns context provider that wraps the tree of components
 * (all the decendents of children) that need the state context.
 */
const ProvideContexts = ({ children }) => {
    // This is the answer to the game in a certain turn
    const [answer, setAnswer] = useState(Math.floor(Math.random() * 100) + 1);
    // This signals if the user guesses the answer
    const [didUserGuess, setDidUserGuess] = useState(false);
    // This signals if the computer guesses the answer
    const [didComputerGuess, setDidComputerGuess] = useState(false);
    // Stores the last guess that user makes
    const [userFinalGuess, setUserFinalGuess] = useState(0);
    // Stores the last guess that computer makes
    const [computerFinalGuess, setComputerFinalGuess] = useState(0);
    // Stores the number of times that *user guessed*
    const [timesGuessed, setTimesGuessed] = useState(0);

    //Children of Router will be able to access value
    const value = {
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
    };

    return <Contexts.Provider value={value}>{children}</Contexts.Provider>;
};

export default ProvideContexts;
