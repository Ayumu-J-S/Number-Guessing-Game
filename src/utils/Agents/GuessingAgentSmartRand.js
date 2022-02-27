import GuessingAgentSmart from "./GuessingAgentSmart";

/**
 * Guessing agent class that guesses random nubmer within the range only
 * certain percentage of the time, and guesses in the middle of the range
 * other percenatage of the tiem. This percentage can be set in the
 * randomeness parameter in the consturctor.
 */
export default class GuessingAgentSmartRand extends GuessingAgentSmart {
    /**
     * Consturctor for the class.
     *
     * @param {Number} low lower bound of the answer value
     * @param {Number} high higher bound of the answer value
     * @param {Number} randomness percentage on the frequency that agent guesses
     * randomely. It takes the value from 0 to 1 in floating point. It has the
     * default value of 0.3
     */
    constructor(low, high, randomness = 0.3) {
        super(low, high);
        this.randomness = randomness;
    }

    /**
     * This function imitates the human's behaviour of guessing randomly.
     * Depening on the randomness variable, the randomness change.
     *
     * @override
     */
    generateGuess() {
        if (Math.random() >= this.randomness) {
            this.guess = getRandomNumberBetween(this.low, this.high);
        } else {
            this.guess = Math.round((this.low + this.high) / 2);
        }
        this.timesGuessed++;
    }
}

/**
 * Function that gueses random number between min and max (both included).
 * @param {Number} min
 * @param {Number} max
 * @returns
 */
function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
