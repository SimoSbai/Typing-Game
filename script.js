let selectLevel = document.querySelector("#level");
let currentLevel = document.querySelector(".lvl");
let secondsForEachLevel = document.querySelector(".seconds");
let startButton = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upComingWords = document.querySelector(".upcoming-words");
let timeLeft = document.querySelector(".time span");
let lineProgress = document.querySelector(".lineProgress");
let yourScore = document.querySelector(".score .got");
let total = document.querySelector(".score .total");
let finalMessage = document.querySelector(".finish");
let theContainer = document.querySelector(".container");

const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

currentLevel.append(selectLevel.options[0].textContent);
secondsForEachLevel.append(7);
timeLeft.append(7);

selectLevel.oninput = function () {
  currentLevel.innerHTML = "";
  secondsForEachLevel.innerHTML = "";
  let yourCurrentLevel = selectLevel.options[selectLevel.selectedIndex];
  let yourCurrentLevelText = yourCurrentLevel.textContent;
  currentLevel.append(yourCurrentLevelText);
  yourCurrentLevelText === "Easy"
    ? secondsForEachLevel.append(7)
    : yourCurrentLevelText === "Medium"
    ? secondsForEachLevel.append(5)
    : yourCurrentLevelText === "Hard"
    ? secondsForEachLevel.append(3)
    : "Not Found";

  timeLeft.innerHTML = secondsForEachLevel.textContent;
};

total.append(words.length);

input.onpaste = function () {
  return false;
};

startButton.addEventListener("click", function () {
  selectLevel.disabled = true;
  this.remove();
  input.style.cssText = "display : block";
  input.focus();
  GenWords();
});

function GenWords() {
  let generateWords = words[Math.floor(Math.random() * words.length)];
  let selectedIndex = words.indexOf(generateWords);
  theWord.innerHTML = "";
  theWord.append(generateWords);
  words.splice(selectedIndex, 1);
  upComingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    div.append(words[i]);
    upComingWords.appendChild(div);
  }
  lineProgress.style.cssText = "width : 100%";
  startGame();
}

let finalContainer = document.createElement("div");
let resultPara = document.createElement("p");
let rePlay = document.createElement("button");
finalMessage.appendChild(resultPara);

rePlay.innerHTML = "Replay Now";
rePlay.style.cssText =
  "padding:16px 12px;cursor : pointer; background-color:#009688; color:white; border-radius:4px; border : none; font-size:18px; font-weight : 600; width: fit-content";

function startGame() {
  let startCountingGame = setInterval(() => {
    timeLeft.textContent--;
    lineProgress.style.cssText = `width : 0; transition : ${timeLeft.textContent}s linear`;
    if (timeLeft.textContent <= 0) {
      clearInterval(startCountingGame);

      if (theWord.innerHTML === input.value) {
        resultPara.innerHTML = "";
        resultPara.innerHTML = "Great Job";
        resultPara.classList.add("good");
        finalMessage.style.cssText = "display : block; margin-top : 24px";
        yourScore.innerHTML++;
        timeLeft.innerHTML = secondsForEachLevel.textContent;
        input.value = "";

        if (words.length === 0) {
          input.disabled = true;
          timeLeft.textContent = 0;
          theWord.innerHTML = "";
          resultPara.innerHTML = "";
          let winningContainer = document.createElement("div");
          let mainContainer = document.createElement("div");
          let winningImage = document.createElement("img");
          let winningMsg = document.createElement("span");
          let scoreMsg = document.createElement("span");

          winningContainer.style.cssText =
            "position: absolute; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center;";
          mainContainer.classList.add("finishContainer");
          winningImage.src = "images/Congratz-96.png";
          winningMsg.innerHTML = "Amazing Work You Won!";
          winningMsg.classList.add("winningSpan");
          scoreMsg.innerHTML = `You have full score : ${yourScore.innerHTML}`;
          scoreMsg.style.cssText =
            "border:1px solid black; padding: 8px 16px; border-radius : 50px";

          mainContainer.appendChild(winningImage);
          mainContainer.appendChild(winningMsg);
          mainContainer.appendChild(scoreMsg);
          mainContainer.appendChild(rePlay);

          winningContainer.appendChild(mainContainer);
          theContainer.appendChild(winningContainer);
        } else {
          GenWords();
        }
      } else {
        input.disabled = true;
        let wrongName = document.createElement("span");
        let rightName = document.createElement("span");
        wrongName.innerHTML = `Your Input : ${input.value}`;
        rightName.innerHTML = `Right Word : ${theWord.innerHTML}`;
        wrongName.classList.add("yourInput");
        rightName.classList.add("rightWord");
        let interjection = document.createElement("img");
        interjection.src = "images/interjection.png";
        finalMessage.style.cssText =
          "display : block; position: absolute; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center;";
        finalContainer.classList.add("finishContainer");
        resultPara.innerHTML = "Wrong word please try again";
        resultPara.classList.add("bad");
        finalContainer.appendChild(interjection);
        finalContainer.appendChild(resultPara);
        finalContainer.appendChild(wrongName);
        finalContainer.appendChild(rightName);
        finalContainer.append(`Your Score Is : ${yourScore.innerHTML}`);
        finalContainer.appendChild(rePlay);
        finalMessage.appendChild(finalContainer);
      }
      rePlay.onclick = function () {
        location.reload();
      };
    }
  }, 1000);
}
