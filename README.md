# Number Guessing Game

A modified React version of <a href="https://github.com/mdn/learning-area/blob/main/javascript/introduction-to-js-1/first-splash/number-guessing-game.html">the simple guessing game made by mdn</a>. You can play the game at https://ayumu-j-s.github.io/Number-Guessing-Game/.

## List of modification
<ol>
  <li>Used React to make the code more readable.</li>
  <li>Added functionalities to check if the value entered by the user is valid, i.e., to check if the input value is actually an integer with the range from 1 to 100.</li>
  <li>Changed the game to play against the computer agent. (There are three types of agents. Check below for the detail)</li>
  <li>The input value can be entered by not only by clicking the submit button but also by clicking enter key.</li>
  <li>Made the computer guesses invisible so that the user cannot get a hint from the computer's previous guesses.</li>
  <li>Instead of informing the user if they won or not by just displaying the result on the page, a modal was used to display the information. This modal has multiple different titles and texts. It displays them depending on who won between the user and computer agent. It also shows the user's final guess and the computer's final guess along with the answer.</li>
</ol>

## List of guessing agents
These agent classes can be found in Agents dir in utils dir.
<ol>
<li>Smart Agent: This agent basically does a binary search to find the answer.</li>
<li>Random Smart Agent: This agent jis also doing a binary search but also has some randomness. This imitates the human's behaviour of guessing For example, some might guess 50 in the first turn while others might take a chance and guess a random number, say 70, to be ahead of the game. This agent imitates this sort of behaviour.</li>
<li>Dumb Agent: This agent just guesses completely randomly. In fact, 70% of the time, this agent ignores the "hint", meaning that it does not update its lower bound and the upper bound of the guess 70% of the time. Very naive...</li>
</ol>

