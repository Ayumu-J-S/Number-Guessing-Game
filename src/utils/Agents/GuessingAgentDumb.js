import GuessingAgentSmartRand from "./GuessingAgentSmartRand";

/**
 * Guessing Agent class that guesses number randomly.
 */
export default class GuessingAgentDumb extends GuessingAgentSmartRand {
    constructor(low, high) {
        // Set the third argument 0 so that it always guesses randamly.
        super(low, high, 0);
    }

    /**
     * Only update the lower bound or higher bound 70% of the time.
     * @override
     */
    recieveHint(hint) {
        // Only update the range 70% of the time
        if (Math.random() >= 0.7) {
            if (hint === "higer") {
                this.low = this.guess + 1;
            } else if (hint === "lower") {
                this.high = this.guess - 1;
            }
        }
    }
}
