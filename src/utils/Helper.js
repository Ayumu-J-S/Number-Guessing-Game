/**
 * A function that checks if the uer input was valid input.
 *
 * @param {*} input input by the user. Can be of any type.
 * @returns true if the input variable is number or false if not
 */
function validateInput(input) {
    if (!input) return false;
    if (input.trim() === "") return false;

    if (isNaN(input)) {
        return false;
    } else {
        return true;
    }
}

/**
 * A function that checks if the input is in the range.
 * Note that the input variable is assumed to be a number.
 *
 * @param {Number} input number to check the range on
 * @param {Number} lowRange inclusive low value
 * @param {Number} highRange inclusive high value
 * @returns True if input is in the range or false if no
 */
function validateRange(input, lowRange, highRange) {
    if (input >= lowRange && input <= highRange) {
        return true;
    } else {
        return false;
    }
}

/**
 * This function checks if the input (data parameter) is valid; that is
 * input is an integer number and within the range. If the input is invalid,
 * then the function focuses on the input field passed into the ref variable
 * and alert the user as well as returning false.
 *
 * @param {*} data input value to check.
 * @param {Object} ref reference that has the property "current". The function
 * assumes that ref reffers to input dom.
 * @returns true if the input is valid and false if not.
 */
function checkGuess(data, low, high, ref) {
    const userGuess = data;
    let validInput = validateInput(userGuess);
    let isInt = false;
    let validRange = false;

    if (validInput) {
        validRange = validateRange(userGuess, low, high);
        isInt = Number.isInteger(Number(userGuess));
    } else {
        alert("You did not entered a number! Please enter a number.");
        ref.current.value = "";
        ref.current.focus();
        return false;
    }

    if (!isInt) {
        alert(
            "You did not entered an integer number! Please enter an integer number"
        );
        ref.current.value = "";
        ref.current.focus();
        return false;
    }

    if (!validRange) {
        alert(
            "Number you entered was out of range!" +
                " Range:" +
                low +
                "-" +
                high
        );
        ref.current.value = "";
        ref.current.focus();
        return false;
    }

    return true;
}

export default checkGuess;
