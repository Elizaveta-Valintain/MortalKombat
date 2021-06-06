const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Kitana',
    hp: '100',
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Спички', 'Вонючий носок', 'Кость индейца'],
    attack: function () {
        console.log(this.name + 'Fight...')
    }
};

const player2 = {
    player: 2,
    name: 'Sonya',
    hp: '100',
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Газовая горелка', 'Засохшая какаха', 'Щепотка соли'],
    attack: function () {
        console.log(this.name + 'Fight...')
    }
};


function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag
}

function createPlayer(playerObject) {

    const $player = createElement('div', 'player' + playerObject.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');


    $life.style.width = playerObject.hp + '%';
    $name.innerText = playerObject.name;
    $img.src = playerObject.img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}


function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');

    player.hp -= Math.floor(Math.random()*20);
    console.log(player.hp);
    if (player.hp <= 0) {
        player.hp = 0
    } else {
        $playerLife.style.width = player.hp + '%';
    }



    if (player.hp < 0) {
        $arenas.appendChild(playerLose(player.name));
    }
}

function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose';
    $randomButton.disabled = true;
    return $loseTitle
}

$randomButton.addEventListener('click', function () {
    console.log('####: Click Random Button');
    changeHP(player1);
    changeHP(player2);
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));




