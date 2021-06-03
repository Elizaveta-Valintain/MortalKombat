const playerOne = {
    name: 'Kitana',
    hp: '100',
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Спички','Вонючий носок', 'Кость индейца'],
    attack: function () {
        console.log(this.name + 'Fight...')
    }
};

const playerTwo = {
    name: 'Sonya',
    hp: '100',
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Газовая горелка','Засохшая какаха', 'Щепотка соли'],
    attack: function () {
        console.log(this.name + 'Fight...')
    }
};

function createPlayer(mainClass, playerObject) {

    const $player = document.createElement('div');
    $player.classList.add(mainClass);

    const $div_progressbar = document.createElement('div');
    $div_progressbar.classList.add('progressbar')
    $player.appendChild($div_progressbar);


    const $div_life = document.createElement('div');
    $div_life.classList.add('life');
    $div_life.style.width = '100%';

    const $div_name = document.createElement('div');
    $div_name.classList.add('name');

    $div_progressbar.appendChild($div_life);
    $div_progressbar.appendChild($div_name);
    $div_name.innerText = playerObject.name;

    const $div_character = document.createElement('div');
    $div_character.classList.add('character');

    $player.appendChild($div_character);

    const $img = document.createElement('img');
    $img.src = playerObject.img;

    $div_character.appendChild($img);

    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player);

}

createPlayer('player1', playerOne);
createPlayer('player2', playerTwo);


