// таймер и кнопки старт/стоп и рестарт, игровое поле, кубики на поле, модальное окно, кнопка мадального окна, счетчик, таблица и инпут имени
const timeDown = document.querySelector(".time");
const btnStart = document.querySelector(".start");
const btnRestart = document.querySelector(".restart");
const counterGame = document.querySelector(".counter");
const field = document.querySelector(".field");
const modal = document.querySelector(".modal");
const btnModal = document.querySelector(".btn-modal");
const counterResult = document.querySelector(".counter-score");
const table = document.querySelector("table");
const nameValue = document.querySelector("#inputName");

const colors = ["red", "yellow", "green", "blue", "aqua", "olive", "purple"];

let time = 60;
let score = 1;
let timeInterval;
let tournament;
let result;

btnStart.onclick = start;
btnRestart.onclick = restart;
btnModal.addEventListener('click', modalHide);

//функция старта игры и вызова функции создания кубика
function start() {
    const excelBlock = document.querySelectorAll(".excel");
  
    excelBlock.forEach((el) => el.onclick = deletCube);

    if (btnStart.dataset.active == "false") {
        btnStart.dataset.active = "true";

        timeInterval = setInterval(updataTimeDown, 1000);
        switch (time) {
        case 60:
            cubeBlock(2);
        break;
        }
        field.style.filter = "blur(0)";
        field.style.pointerEvents = "auto";
    } else {
        btnStart.dataset.active = "false";
        field.style.filter = "blur(10px)";
        field.style.pointerEvents = "none";
        clearInterval(timeInterval);
    }
}


//функция таймера
function updataTimeDown() {
  if (time >= 0) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timeDown.innerHTML = `${minutes}:${seconds}`;

    time--;
  } else {
    setTimeout(() => {
      clearInterval(timeInterval);
    });

    gameOver();
  }
}

//Конец игры если истекло время или закончились кубики
function gameOver() {
    if (time == -1 || document.querySelectorAll('.cube').length == 0) {
        if (btnStart.dataset.active == "true") {
          btnStart.dataset.active = "false";
          field.style.filter = "blur(10px)";
          field.style.pointerEvents = "none";
          modal.style.display = "block";
          counterResult.innerHTML = `${score - 1}`;
          removeCube();
        }
        return (time = 60);
      }
}


//функция рестарт которая вызыват старт если на поле есть квадратик то его удалчет
function restart() {
  time = 60;
  removeCube();
  start();
  cleaningForNewGame();
}


//создание поля
for (let i = 1; i < 121; i++) {
  let excel = document.createElement("div");
  field.appendChild(excel);
  excel.classList.add("excel");
  excel.style.backgroundColor = "silver";
}


//создает ячейки на поле
let excelArr = document.querySelectorAll(".excel");
let x = 1,
  y = 10;

for (let i = 0; i < excelArr.length; i++) {
  if (x > 12) {
    x = 1;
    y--;
  }
  excelArr[i].setAttribute("posX", x);
  excelArr[i].setAttribute("posY", y);
  x++;
}


//создание появление рандомных кубиков на после
function cubeBlock(n) {
  for (let i = 1; i <= n; i++) {
    function generateCube() {
      let posX = Math.round(Math.random() * (12 - 1) + 1);
      let posY = Math.round(Math.random() * (10 - 1) + 1);
      return [posX, posY];
    }

    let coordinates = generateCube();
    cube = document.querySelector(
      `[posX = "${coordinates[0]}"][posY = "${coordinates[1]}"]`
    );

    while (cube.classList.contains("cube")) {
      let coordinates = generateCube();
      cube = document.querySelector(
        `[posX = "${coordinates[0]}"][posY = "${coordinates[1]}"]`
      );  
    }
    cube.classList.add("cube"); 
    setColorToElement();
  }
}

//присваивание цвета класс .cube
function setColorToElement(){
    let cube = document.querySelectorAll('.cube');
    const color = getRandomColor();
    cube.forEach(i => {
        if(i.style.backgroundColor == "silver"){
            i.style.backgroundColor = color;
        }
    })
}


//рандомный выбор цвета
function getRandomColor(){
    return colors[Math.floor(Math.random() * colors.length)];
}

//удаление куба по клику
function deletCube(e){
    if (e.target.classList.contains('cube')){
        e.target.style.backgroundColor = "silver";
        e.target.classList.remove('cube');
        counterGame.innerHTML = `${score}`; //счетчик
        score++;
        rendomCube()
    }
} 


//создает рандомное количество кубиков от 0 до 2
function rendomCube() {
    let random = Math.round(Math.random() * (2 - 0)); 
    switch (random) {
        case 0:
            gameOver();
        break;
        case 1:
            cubeBlock(1);
        break;
        case 2:
            cubeBlock(2);
        break;
    }
};


//удаление куба по истечению времени или рестарте аптимизация функции
function removeCube() {
  const cube = document.querySelectorAll(".cube");

  if (
    (cube.length != 0 || cube.length == 0) &&
    (btnStart.dataset.active == "false" || btnStart.dataset.active == "true")
  ) {
    btnStart.dataset.active = "false";
    clearInterval(timeInterval);
    cube.forEach((el) => {
        el.style.backgroundColor = "silver";
        el.classList.remove("cube");
    });
  }
}


//скрытие модального окна
function modalHide() {
    storage();
    cleaningForNewGame();
}


//очищает данные для новой игры
function cleaningForNewGame() {
    modal.style.display = "none";
    score = 1;
    counterGame.innerHTML = 0;
}

//валидация inputa
nameValue.addEventListener('input', () => {
    let value = nameValue.value;
    let regularExpression = /^(([A-Za-z0-9]|[А-Яа-я0-9]){2,15})$/;   

    if (regularExpression.test(value)) {
        nameValue.classList.add('valid');
        nameValue.classList.remove('invalid');
        btnActive();
    }
    else {
        nameValue.classList.add('invalid');
        nameValue.classList.remove('valid');
        btnActive();
    }
});

//доступ к кнопке только если имя валидное
 function btnActive() {
    let valid = document.querySelector('.valid');

    if(valid) {
        btnModal.disabled = false;
    } else {
        btnModal.disabled = true;
    }  
}


//сохранение с локальное хранилище 
function storage() {
    tournament.push(new CreateTournament(result  = (score -1), nameValue.value));
    localStorage.setItem('tournament', JSON.stringify(tournament));
    tableStoreg(tournament.length - 1);
}


//Работа с localStorage и Выводом в таблицу
localStorage.length < 1 ? tournament = [] : tournament = JSON.parse(localStorage.getItem('tournament'));

//добавление таблицы
const tableStoreg = (i) => {
    table.innerHTML += `
        <tr class="tr">
            <td class="name-info">${tournament[i].name}</td>
            <td class="result-info">${tournament[i].result}</td>
            <td>
        </tr>
    `
}

tournament.forEach((element, i) => {
    tableStoreg(i);
})

function CreateTournament (result, name) {
    this.result = result;
    this.name = name;
}