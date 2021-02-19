'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1'); //another way of selecting ids, getElementbyID
const diceElement = document.querySelector('.dice'); //Storing dice element
const current0Element = document.getElementById('current--0'); //We are going to store current score when player's turn
const current1Element = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
// score0Element.textContent = 0;
// score1Element.textContent = 0;
// diceElement.classList.add('hidden'); //Adding hidden element from css to our dice element.

// //Storing big scores into array
// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

let scores, currentScore, activePlayer, playing;

//initialization (reset function)
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  //remove active player, but keep player0 active to start
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  diceElement.classList.add('hidden');
};

init();

//Switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Toggling lets us do less work by switching the classes for us. We are toggling the active player highlight.
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`; //src method to select our png files, using a temporal literal from the dice local variable

    //3. Check for rolled 1: if true, switch to next player. If false, add dice roll to current score
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore; //example scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      //Finish Game
      playing = false;
      diceElement.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
