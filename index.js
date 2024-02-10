const MAPPINGS = {
  'mnemonica': [
    '4C', '2H', '7D', '3C', '4H', '6D', 'AS', '5H', '9S', '2S', 'QH', '3D', 'QC',
    '8H', '6S', '5S', '9H', 'KC', '2D', 'JH', '3S', '8S', '6H', '10C','5D', 'KD',
    '2C', '3H', '8D', '5C', 'KS', 'JD', '8C', '10S', 'KH', 'JC', '7S', '10H','AD',
    '4S', '7H', '4D', 'AC', '9C', 'JS', 'QD', '7C', 'QS', '10D','6C', 'AH', '9D'
  ],
  'redford': [
    'QH', '2S', '5D', '8C', 'JH', 'KS', '10H','7C', '4D', 'AS', '8H', '5C', '2D',
    'QS', '9H', '6C', '3D', '10S','7H', '4C', 'AD', 'JS', '9S', '6H', '3C', 'KD',
    'QD', '10D','7S', '4H', 'AC', 'JD', '8S', '5H', '2C', '2H', 'QC', '9D', '6S',
    '3H', 'KS', '4S', 'AH', 'JC', '8D', '5S', '3S', 'KH', '10C','7D', '6D', '9C'
  ],
};

const index_to_card = (index) => {
  const card = MAPPINGS[document.getElementById('stack').value][index - 1];

  if(!card) {
    console.error(`Missing card @ index ${index}!`);
  }

  return card;
};

const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

const reset = () => {
  document.getElementById('cards').innerHTML = "";
  document.getElementById('instructions').innerHTML = "";
};

const display_cards = (cards) => {
  document.getElementById('cards').innerHTML = "";

  cards.forEach((card, _) => {
    if(!card) {
      console.error('Missing card!');
    }

    let img = document.createElement('img');
    img.src = `img/${card}.png`;
    img.id = `card${card}`;
    img.classList.add('card');
    document.getElementById('cards').appendChild(img);
  })
};

const display_indexes = (indexes) => {
  display_cards(indexes.map(index_to_card));
}

const games = {
  'review': {
    'instructions': 'Just displays the stack',
    'start': () => {
      display_indexes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52]);
    },
  },
  'find-the-outlier': {
    'instructions': 'Either the first or second half of the stack, with one card from the other half. Click on the extra card!',
    'start': () => {
      let list;
      let extra;
      if(Math.random() < 0.5) {
        list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
        extra = Math.floor((Math.random() * 26) + 27);
      } else {
        list = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
        extra = Math.floor((Math.random() * 26) + 1);
      }

      display_indexes(shuffle(list.concat([extra])));

      document.getElementById(`card${index_to_card(extra)}`).addEventListener("click", () => {
        alert("Got it!");
      });
    },
  },
};

const setup = () => {
  const game = games[document.getElementById('game').value];
  document.getElementById('instructions').innerHTML = game['instructions'];
  game.start();
};

window.addEventListener("load", () => {
  document.getElementById('restart').addEventListener('click', () => {
    setup();
  });
  document.getElementById('game').addEventListener('change', () => {
    setup();
  });
  document.getElementById('stack').addEventListener('change', () => {
    setup();
  });
});
