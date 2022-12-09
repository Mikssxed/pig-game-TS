'use strict';

const rollDice = document.querySelector('.btn--roll');
const dice: HTMLImageElement = document.querySelector('.dice');
const players = document.querySelectorAll('.player');
const holdScore = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let currentScore = 0;

const generateRandomNumber = () => Math.round(Math.random() * 5 + 1);
const switchPlayer = () =>
  players.forEach(player => player.classList.toggle('player--active'));

const displayDiceRoll = () => {
  let actualPlayer = document.querySelector('.player--active .current-score');
  let actualNumber = generateRandomNumber();
  dice.src = `dice-${actualNumber}.png`;
  if (actualNumber != 1) {
    currentScore += actualNumber;
    actualPlayer.textContent = String(currentScore);
  } else {
    currentScore = 0;
    actualPlayer.textContent = String(0);
    switchPlayer();
  }
};

rollDice.addEventListener('click', displayDiceRoll);

holdScore.addEventListener('click', function () {
  let actualPlayerCurrentScore = document.querySelector(
    '.player--active .current-score'
  );
  let actualPlayerScore: HTMLElement = document.querySelector('.player--active .score');
  actualPlayerScore.textContent =String(
    Number(actualPlayerScore.textContent) +
    Number(actualPlayerCurrentScore.textContent));
  actualPlayerCurrentScore.textContent = String(0);
  if (Number(actualPlayerScore.textContent) >= 100) {
    actualPlayerCurrentScore.textContent = `You win!`;
    rollDice.setAttribute('disabled', 'true');
    holdScore.setAttribute('disabled', 'true');
    document.querySelector('.player--active').classList.add('player--winner');
  } else {
    currentScore = 0;
    switchPlayer();
  }
});

newGame.addEventListener('click', function () {
  currentScore = 0;
  document.querySelectorAll('.score').forEach(item => (item.innerHTML = String(0)));
  document
    .querySelectorAll('.current-score')
    .forEach(item => (item.innerHTML = String(0)));
  rollDice.removeAttribute('disabled');
  holdScore.removeAttribute('disabled');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  document.querySelector('.player--active').classList.remove('player--winner');
});
