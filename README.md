# Remove the cubes #
WEBGame

Суть игры заключается в следующем: на странице есть поле, на котором расположены в случайном порядке разноцветные блоки. Кубики убираются с поля наведением курсора на кубик и последующим кликом левой кнопкой мышки. Даётся время - 1 минута. По мере убирания с поля кубиков, на поле появляются новые кубики (случайное количество от 0, 1 или 2). Уборка каждого кубика приносит 1* очко игроку. Цель игры - за 1 минуту набрать наибольшее количество очков..

*-  Кубик "red" очков +2, время -10 сек<br>
    Кубик "yellow" очков +1<br>
    Кубик "green" очков -2, время +5 сек<br>
    Кубик "blue" очков +1<br>
    Кубик "aqua" очков +4<br>
    Кубик "olive" очков +1<br>
    Кубик "purple" очков +3<br>

## Проект написан на: ##
![](https://webformyself.com/wp-content/uploads/premium/2016/6/1.jpg) 
![](https://webformyself.com/wp-content/uploads/premium/2015/30/1.jpg) 
![](https://webformyself.com/wp-content/uploads/premium/2017/14/1.jpg)


# Реализован функционал #

- **Старт/стоп, Новая игра кнопки, инфо:**

#### HTML code ####

```html
<div class="col-3">
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
</div>
<div class="col-3">
  <button type="button" 
    class="btn btn-primary info" 
    data-toggle="modal" 
    data-target="#staticBackdrop"
  >
    Info
  </button>
</div>
```

#### Javascript ####

```javascript
const btnStart = document.querySelector(".start");
const btnRestart = document.querySelector(".restart");
const btnInfoModal = document.querySelector('.info');

btnStart.onclick = startGame;
btnRestart.onclick = restartGame;
btnInfoModal.onclick = modalInfoShow;

//функция старта игры и вызова функции создания кубика
function startGame() {
  const excelBlock = document.querySelectorAll(".excel");

  excelBlock.forEach((el) => (el.onclick = deletCube));

  if (btnStart.dataset.active == "false") {
    btnStart.dataset.active = "true";

    timeInterval = setInterval(updataTimeDown, 1000);
    switch (time) {
      case 60:
        cubeBlock(3);
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
function restartGame() {
  time = 60;
  removeCube();
  startGame();
  cleaningForNewGame();
}

//очищает данные для новой игры
function cleaningForNewGame() {
  modal.style.display = "none";
  score = 0;
  counterGame.innerHTML = 0;
}

//открвть окно
function modalInfoShow() {
  modalInfo.style.opacity = 1;
  modalInfo.style.display = "block";
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
let score = null;
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

1. Функция **/Конец игры если истекло время или закончились кубики**
2. Функция **//создание поля**
3. Функция **//создает ячейки на поле**
4. Функция **//создание появление рандомных кубиков на после**
5. Функция **//присваивание цвета класс .cube**
6. Функция **//рандомный выбор цвета**
7. Функция: 
- **//удаление куба по клику так же настроена логика изменения очков**
- **//кубики разных цветов приносят разное количество очков и некоторые сокращают время и добавляют**
8. Функция **//создает рандомное количество кубиков от 0 до 2**
9. Функция **//удаление куба по истечению времени или рестарте аптимизация функции**
10. Функция **//добавление таблицы**

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

const colors = ["red", "yellow", "green", "blue", "aqua", "olive", "purple"];

let timeInterval;

//Конец игры если истекло время или закончились кубики
function gameOver() {
    if (time <= -1 || document.querySelectorAll('.cube').length == 0) {
        if (btnStart.dataset.active == "true") {
          btnStart.dataset.active = "false";
          field.style.filter = "blur(10px)";
          field.style.pointerEvents = "none";
          modal.style.display = "block";
          counterResult.innerHTML = `${score}`;
          removeCube();
        }
        return (time = 60);
      }
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

//удаление куба по клику так же настроена логика изменения очков
//кубики разных цветов приносят разное количество очков и некоторые сокращают время и добавляют
function deletCube(e){
    if (e.target.classList.contains('cube')){
      
      if(e.target.style.backgroundColor == "red"){
        time-= 10;
        score+= 2;
      }else if(e.target.style.backgroundColor == "yellow"){
        score++;
      }else if(e.target.style.backgroundColor == "green"){
        time+= 5;
        score-= 2;
      }else if(e.target.style.backgroundColor == "blue"){
        score++;
      }else if(e.target.style.backgroundColor == "aqua"){
        score+= 4;
      }else if(e.target.style.backgroundColor == "olive"){
        score++;
      }else if(e.target.style.backgroundColor == "purple"){
        score+=3;
      }

      e.target.classList.remove('cube');
      e.target.style.backgroundColor = "silver";
      counterGame.innerHTML = `${score}`; //счетчик
      newRendomCube();
    }
} 

//создает рандомное количество кубиков от 0 до 2
function newRendomCube() {
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

//удаление куба по истечению времени или рестарте оптимизация функции
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
const tableResolveTournament = (i) => {
  table.innerHTML += `
        <tr class="tr">
            <td class="name-info">${tournament[i].name}</td>
            <td class="result-info">${tournament[i].result}</td>
            <td>
        </tr>
    `;
};

tournament.forEach((element, i) => {
  tableResolveTournament(i);
});
```

- **Модальное окно:**

#### HTML code ####

```html
<!--modal result-->
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

<!--modal info-->
<div class="modal fade" 
  id="staticBackdrop" 
  data-backdrop="static" 
  data-keyboard="false" 
  tabindex="-1" 
  aria-labelledby="staticBackdropLabel" 
  aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Сonditions of the game</h5>
          <button type="button" 
            class="close" 
            data-dismiss="modal" 
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body info">
          <p>
            Суть игры заключается в следующем: на HTML-странице есть поле, на котором расположены в случайном порядке “кубики” - разноцветные блоки. Кубики убираются с поля наведением курсора на кубик и последующим кликом левой кнопкой мышки. Даётся время - 1 минута. По мере убирания с поля кубиков, на поле появляются новые кубики (случайное количество от 0, 1 или 2).
          </p>
          <p>
            Цель игры - за 1 минуту набрать наибольшее количество очков.
          </p>
          <p>
            Кубик "red" очков +2, время -10 сек<br>
            Кубик "yellow" очков +1<br>
            Кубик "green" очков -2, время +5 сек<br>
            Кубик "blue" очков +1<br>
            Кубик "aqua" очков +4<br>
            Кубик "olive" очков +1<br>
            Кубик "purple" очков +3<br>
          </p>
        </div>
        <div class="modal-footer">

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
const modalInfo = document.querySelector(".modal.fade");
const closeInfo = document.querySelector('.close');

closeInfo.onclick = modalInfoHide;
btnModal.addEventListener("click", modalHide);

//скрытие модального окна
function modalHide() {
  storage();
  cleaningForNewGame();
}

//скрыть окна
function modalInfoHide() {
  modalInfo.style.opacity = 0;
  modalInfo.style.display = "none";
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
  tournament.push(new CreateNewResolveTournament(result = score, nameValue.value));
  localStorage.setItem("tournament", JSON.stringify(tournament));
  tableResolveTournament(tournament.length - 1);
}

//Работа с localStorage и Выводом в таблицу
localStorage.length < 1
  ? (tournament = [])
  : (tournament = JSON.parse(localStorage.getItem("tournament")));

function CreateNewResolveTournament(result, name) {
  this.result = result;
  this.name = name;
}
```

# Напутственное слово #

Не претендую на игру года :D

### End ###
