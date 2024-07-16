'use strict';

const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const currentScoreP1 = document.querySelector('#current--0');
const currentScoreP2 = document.querySelector('#current--1');
const scoreP1 = document.getElementById('score--0');
const scoreP2 = document.getElementById('score--1');

let score, player, current, playing;

const activePlayer = function () {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

const init = function () {
  player = 0;
  score = [0, 0];
  current = 0;
  playing = true;

  scoreP1.textContent = scoreP2.textContent = 0;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
};
init();

roll.addEventListener('click', function () {
  if (playing) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randomNumber}.png`;
    if (randomNumber === 1) {
      current = 0;
      if (player1.classList.contains('player--active')) {
        currentScoreP1.textContent = current;
        activePlayer();
      } else {
        currentScoreP2.textContent = current;
        activePlayer();
      }
    } else {
      current += randomNumber;
      if (player1.classList.contains('player--active')) {
        currentScoreP1.textContent = current;
      } else {
        currentScoreP2.textContent = current;
      }
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    if (player1.classList.contains('player--active')) {
      score[0] += current;
      scoreP1.textContent = score[0];
      current = 0;
      currentScoreP1.textContent = current;
      if (score[0] >= 20) {
        player1.classList.add('player--winner');
        playing = false;
      } else {
        activePlayer();
      }
    } else {
      score[1] += current;
      scoreP2.textContent = score[1];
      current = 0;
      currentScoreP2.textContent = current;
      if (score[1] >= 20) {
        player2.classList.add('player--winner');
        playing = false;
      } else {
        activePlayer();
      }
    }
  }
});

newGame.addEventListener('click', init);
