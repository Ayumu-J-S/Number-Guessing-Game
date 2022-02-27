/**
 * Guessing agent that does binary search on certain interval.
 */
export default class GuessingAgentSmart {
    /**
     * Constructor for the class.
     *
     * @param {Number} low lower bound of the anser value
     * @param {Nuber} high higher range of the anser value
     */
    constructor(low, high) {
        this.high = high;
        this.low = low;
        this.guess = null;
        this.timesGuessed = 0;
    }

    /**
     * Guesses the number in the middle of the range.
     */
    generateGuess() {
        this.guess = Math.round((this.low + this.high) / 2);
        this.timesGuessed++;
    }

    /**
     *
     * @param {String} hint higher if the guess has to be higher
     * lower if the guess has to be lower
     */
    recieveHint(hint) {
        if (hint === "higer") {
            this.low = this.guess + 1;
        } else if (hint === "lower") {
            this.high = this.guess - 1;
        }
    }
}
