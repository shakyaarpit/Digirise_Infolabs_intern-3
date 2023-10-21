const start_btn = document.querySelector(".start button");
const info_box = document.querySelector(".info");
const exit_btn = document.querySelector(".btns .quit");
const continue_btn = document.querySelector(".btns .restart");
const quiz_box = document.querySelector(".quiz_Q");

const option_list = document.querySelector(".option");

const timeCount = quiz_box.querySelector(".second-app .timer");

start_btn.onclick = () => {
  info_box.classList.add("activeinfo");
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeinfo");
};

continue_btn.onclick = () => {
  info_box.classList.remove("activeinfo");
  quiz_box.classList.add("activeQuiz");
  showQuestions(0);
  queCounter(1);
  startTimer(15);
};

let que_count = 0;

let que_numb = 1;

let counter;

let timeValue = 15;

let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");

const result_box = document.querySelector(".result");

const replay_quiz = result_box.querySelector(".icon .replay_quiz");
const quit_quiz = result_box.querySelector(".icon .quit_quiz");

replay_quiz.onclick = () => {
  window.location.reload();
};

quit_quiz.onclick = () => {
  window.location.reload();
};

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
  } else {
    console.log("complte");
    showResultBox();
  }
};

function showQuestions(index) {
  const que_text = document.querySelector(".question");

  let que_tag =
    "<h3>" + questions[index].numb + ". " + questions[index].question + "</h3>";

  let option_tag =
    '<p class="option-para">' +
    questions[index].option[0] +
    "</p>" +
    '<p class="option-para">' +
    questions[index].option[1] +
    "</p>" +
    '<p class="option-para">' +
    questions[index].option[2] +
    "</p>" +
    '<p class="option-para">' +
    questions[index].option[3] +
    "</p>";

  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option-para");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  clearInterval(counter);

  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOption = option_list.children.length;

  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("correct");
  } else {
    answer.classList.add("incorrect");
    console.log("wrong");

    //if answer is correct then autometically selected  the correct answer
    for (let i = 0; i < allOption; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
      }
    }
  }

  //user selected one option disable all option
  for (let i = 0; i < allOption; i++) {
    option_list.children[i].classList.add("disabled");
  }
}

function showResultBox() {
  info_box.classList.remove("activeinfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".scoreTax");
  if (userScore > 3) {
    let scoreTag =
      "<span> You Have Complete The Quiz! And Congrats! You Got <b>" +
      userScore +
      "</b> out Of <b>" +
      questions.length +
      "</b></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span> You Have Complete The Quiz!  And nice! You Got <b>" +
      userScore +
      "</b> out Of <b>" +
      questions.length +
      "</b></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span> You Have Complete The Quiz!  And Sorry. You Got <b>" +
      userScore +
      "</b> out Of <b>" +
      questions.length +
      "</b></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
    }
  }
}

function queCounter(index) {
  const que_counter = quiz_box.querySelector(".foot-1");
  let totleQueCounterTag =
    "<p><b> " + index + " </b>of<b> " + questions.length + " </b>Question</p>";
  que_counter.innerHTML = totleQueCounterTag;
}
