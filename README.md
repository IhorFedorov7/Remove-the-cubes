# Remove the cubes #
WEBGame

Суть игры заключается в следующем: на странице есть поле, на котором расположены в случайном порядке разноцветные блоки. Кубики убираются с поля наведением курсора на кубик и последующим кликом левой кнопкой мышки. Даётся время - 1 минута. По мере убирания с поля кубиков, на поле появляются новые кубики (случайное количество от 0, 1 или 2). Уборка каждого кубика приносит 1 очко игроку. Цель игры - за 1 минуту набрать наибольшее количество очков..

## Проект написан на: ##
![](https://webformyself.com/javascript/img/icon-js.png) 
![](https://itchief.ru/assets/img/bootstrap/bootstrap-4.png)


# Реализован функционал #

- **Старт/стоп, Новая игра кнопки:**

#### HTML code ####

```html
<div class="cntrol-btm">
  <button
    type="button"
    data-active="false"
    class="btn btn-success rounded-pill start"
  >
    START/PAUSE
  </button>
  <button type="button" class="btn btn-success rounded-pill  restart">
    NEW GAME
  </button>
</div>
```

#### Javascript ####

```javascript
const btnStart = document.querySelector(".start");
const btnRestart = document.querySelector(".restart");

btnStart.onclick = start;
btnRestart.onclick = restart;

//функция старта игры и вызова функции создания кубика
function start() {
  const excelBlock = document.querySelectorAll(".excel");

  excelBlock.forEach((el) => (el.onclick = deletCube));

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

//функция рестарт которая вызыват старт если на поле есть квадратик то его удалчет
function restart() {
  time = 60;
  removeCube();
  start();
  cleaningForNewGame();
}

//очищает данные для новой игры
function cleaningForNewGame() {
  modal.style.display = "none";
  score = 1;
  counterGame.innerHTML = 0;
}
```

- **Поля отображения времени и очков:**

#### HTML code ####

```html
<div class="row col-3">
  <div class="col">
    <h6>Points</h6>
    <div class="counter">0</div>
  </div>
  <div class="col">
    <h6>Time left</h6>
    <div class="time">1:00</div>
  </div>
</div>
```

#### Javascript ####

```javascript
const timeDown = document.querySelector(".time");
const counterGame = document.querySelector(".counter");

let time = 60;
let score = 1;
let timeInterval;

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
```

- **Блок игрового поля и таблицы результатов:**

1. Функция **//создание поля**
2. Функция **//создает ячейки на поле**
3. Функция **//создание появление рандомных кубиков на после**
4. Функция **//присваивание цвета класс .cube**
5. Функция **//рандомный выбор цвета**
6. Функция **//удаление куба по клику**
7. Функция **//создает рандомное количество кубиков от 0 до 2**
8. Функция **//удаление куба по истечению времени или рестарте аптимизация функции**
9. Функция **//добавление таблицы**

#### HTML code ####

```html
<div class="container game">
  <div class="row gema-content">
    <div class="col-7">
      <div class="field"></div>
    </div>
    <div class="col-3">
      <div id="table">
        <h3>Result Table</h3>
        <table></table>
      </div>
    </div>
  </div>
</div>
```

#### Javascript ####

```javascript
const field = document.querySelector(".field");
const table = document.querySelector("table");

let timeInterval;

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
function setColorToElement() {
  let cube = document.querySelectorAll(".cube");
  const color = getRandomColor();
  cube.forEach((i) => {
    if (i.style.backgroundColor == "silver") {
      i.style.backgroundColor = color;
    }
  });
}

//рандомный выбор цвета
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

//удаление куба по клику
function deletCube(e) {
  if (e.target.classList.contains("cube")) {
    e.target.style.backgroundColor = "silver";
    e.target.classList.remove("cube");
    counterGame.innerHTML = `${score}`; //счетчик
    score++;
    rendomCube();
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
}

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

//добавление таблицы
const tableStoreg = (i) => {
  table.innerHTML += `
        <tr class="tr">
            <td class="name-info">${tournament[i].name}</td>
            <td class="result-info">${tournament[i].result}</td>
            <td>
        </tr>
    `;
};

tournament.forEach((element, i) => {
  tableStoreg(i);
});
```

- **Модальное окно:**

#### HTML code ####

```html
<div class="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header"></div>
      <div class="result-block">
        <div class="modal-body">Your score:</div>
        <div class="counter-score"></div>
      </div>
      <div class="form-group row">
        <label for="inputName" class="col-sm-2 col-form-label"> Name: </label>
        <div class="col-sm-10 input-name">
          <input
            type="text"
            class="form-control"
            id="inputName"
            title="Имя должно состоять мин., из 2 и макс., 15 букв, символов ввод цифр доступен"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-modal" disabled>
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### Javascript ####

```javascript
const modal = document.querySelector(".modal");
const btnModal = document.querySelector(".btn-modal");
const counterResult = document.querySelector(".counter-score");
const nameValue = document.querySelector("#inputName");

btnModal.addEventListener("click", modalHide);

//скрытие модального окна
function modalHide() {
  storage();
  cleaningForNewGame();
}

//валидация inputa
nameValue.addEventListener("input", () => {
  let value = nameValue.value;
  let regularExpression = /^(([A-Za-z0-9]|[А-Яа-я0-9]){2,15})$/;

  if (regularExpression.test(value)) {
    nameValue.classList.add("valid");
    nameValue.classList.remove("invalid");
    btnActive();
  } else {
    nameValue.classList.add("invalid");
    nameValue.classList.remove("valid");
    btnActive();
  }
});

//доступ к кнопке только если имя валидное
function btnActive() {
  let valid = document.querySelector(".valid");

  if (valid) {
    btnModal.disabled = false;
  } else {
    btnModal.disabled = true;
  }
}
```

- **Также реализован localStorage**

#### Javascript ####

```javascript
//сохранение с локальное хранилище
function storage() {
  tournament.push(new CreateTournament((result = score - 1), nameValue.value));
  localStorage.setItem("tournament", JSON.stringify(tournament));
  tableStoreg(tournament.length - 1);
}

//Работа с localStorage и Выводом в таблицу
localStorage.length < 1
  ? (tournament = [])
  : (tournament = JSON.parse(localStorage.getItem("tournament")));

function CreateTournament(result, name) {
  this.result = result;
  this.name = name;
}
```

# Напутственное слово #

Не претендую на игру года :D

### End ###
