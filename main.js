const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control')

const HIT = {
    head: 30,
    body: 25,
    foot: 20
}

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Kitana',
    hp: '100',
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    elHP,
    changeHP,
    renderHP,
    attack,

};

const player2 = {
    player: 2,
    name: 'Sonya',
    hp: '100',
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    elHP,
    changeHP,
    renderHP,
    attack,
};

function attack() {
    console.log(this.name + ' ' + 'Fight...');
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $btnWrap = createElement('button', 'button');
    $btnWrap.innerText = 'Reload';

    $btnWrap.addEventListener('click', function () {
        window.location.reload();
    })
    $reloadWrap.appendChild($btnWrap);
    $arenas.appendChild($btnWrap);
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


function changeHP(randomNumber) {
    this.hp -= randomNumber;

    if (this.hp <= 0) {
        this.hp = 0
    }
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText = 'draw';
    }

    return $loseTitle
}

function getRandom(num) {
    return Math.ceil(Math.random() * num);
}


// $randomButton.addEventListener('click', function () {
//     player1.changeHP(getRandom(20))
//     player1.renderHP();
//
//     player2.changeHP(getRandom(20))
//     player2.renderHP();
//
//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true;
//         createReloadButton();
//     }
//
//     if (player1.hp === 0 && player1.hp < player2.hp) {
//         $arenas.appendChild(playerLose(player2.name));
//
//     } else if (player2.hp === 0 && player2.hp < player1.hp) {
//         $arenas.appendChild(playerLose(player1.name));
//     } else if (player1.hp === 0 && player2.hp === 0) {
//         $arenas.appendChild(playerLose());
//     }
//
// })

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    // console.log('#####: hit', hit);
    // console.log('#####: defence', defence);

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function gameResult(a, e) {
                player1.changeHP(a.value);
                player1.renderHP();

                player2.changeHP(e.value);
                player2.renderHP();

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerLose(player2.name));

    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerLose(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerLose());
    }

    // console.log('a ', a);
    // console.log('e ', e);
}

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    // console.dir($formFight);
    const enemy = enemyAttack();
    // console.log(enemy);
    const attack = {};

    for (let item of $formFight) {
        // console.dir(item);
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.hidden = true;
        createReloadButton();
    } else {
        gameResult(attack, enemy);
    }

    // console.log('#####: a', attack);//user
    // console.log('#####: e', enemy);//компьютер


})
