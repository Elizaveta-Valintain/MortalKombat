const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control')
const $chat = document.querySelector('.chat');

const $load = document.addEventListener("DOMContentLoaded", () => {
    generateLogs('start', player2, player1);
});

const HIT = {
    head: 30,
    body: 25,
    foot: 20
}

const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: [
        'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
        'Часы показывали [time], когда [player1] и [player2] не поделили платье.',
        'Часы показывали [time], когда [player1] споткнулся об голову [player2]',
    ],
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: [
        'Ничья - это тоже победа!'
    ]
};

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
}

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

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function changeHP(randomNumber) {
    this.hp -= randomNumber;

    if (this.hp <= 0) {
        this.hp = 0
    }
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

function getRandom(num) {
    return Math.ceil(Math.random() * num);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function showResult() {
    if (player2.hp === 0 || player1.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();

    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerLose(player2.name));
        generateLogs('end', player1, player2);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerLose(player1.name));
        generateLogs('end', player2, player1);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerLose());
        generateLogs('draw');
    }
}

function playerAttack() {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }

    return attack;
}

function currentTimeNow() {
    let today = new Date;
    return today.getHours() + ':' + today.getMinutes();
}

function generateLogs(type, player1, player2) {

    switch (type) {
        case 'hit': {
            let n = getRandom(logs.hit.length - 1);
            //   console.log('#####: hit - ' + n);
            const text = logs[type][n]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);

            const hp = player1.hp;
            const r = 100 - hp;

            const el = `<p>${currentTimeNow()} ${text} (${-r})${hp}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            break;
        }

        case 'defence': {
            let n = getRandom(logs.defence.length - 1);
            //console.log('#####: defence - ' + n);
            const text = logs[type][n]
                .replace('[playerKick]', player2.name)
                .replace('[playerDefence]', player1.name);

            const hp = player2.hp;
            const r = 100 - hp;

            const el = `<p>${currentTimeNow()} ${text} (${-r})${hp}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            break;
        }

        case 'end': {
            let n = getRandom(logs.end.length - 1);
            //console.log('#####: end - ' + n);
            const text = logs[type][n]
                .replace('[playerWins]', player2.name)
                .replace('[playerLose]', player1.name);

            const el = `<p>${currentTimeNow()} ${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            break;
        }

        case 'start': {
            let n = getRandom(logs.start.length - 1);
            //console.log('#####: start - ' + n);
            const text = logs[type][n]
                .replace('[time]', currentTimeNow)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);

            const el = `<p>${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            break;
        }

        case 'draw': {
            let n = getRandom(logs.draw.length - 1);
            console.log('#####: draw - ' + n);
            const text = logs[type][n];
            const el = `<p>${currentTimeNow()} ${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            break;
        }
    }


}


$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHP((enemy.value));
        player1.renderHP();
        generateLogs('hit', player2, player1);
        generateLogs('defence', player2, player1);
    }

    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2);
        generateLogs('defence', player1, player2);
    }

    // console.log('###: hit ' + logs.hit.length);
    // console.log('###: defence ' + logs.defence.length);
    // console.log('###: end ' + logs.end.length);
    // console.log('###: start ' + logs.start.length);

    showResult();

})
