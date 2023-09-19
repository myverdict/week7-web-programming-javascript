// API documentation: https://8ball.delegator.com
const magic8BallUrl = "https://8ball.delegator.com/magic/JSON/";
// const magic8BallUrl = "https://eightballapi.com/api";

let questionInputEl = document.querySelector("#question");
let askQuestionButton = document.querySelector("#ask-question");

let answerDisplayEl = document.querySelector("#answer");
let errorDisplayEl = document.querySelector("#error");

askQuestionButton.addEventListener("click", submitQuestion);

document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    submitQuestion();
  }
});

// when the user starts typing a question, remove the previous answer
questionInputEl.addEventListener("keyup", function () {
  answerDisplayEl.style.opacity = "0"; // Remove the previous answer
});

function submitQuestion() {
  // Clear any previous answer or error
  answerDisplayEl.innerHTML = "";
  errorDisplayEl.innerHTML = "";

  let question = questionInputEl.value;

  // No question? Ignore.
  if (!question) {
    return;
  }

  // Encode question - replace special characters with codes
  // so that spaces and ? etc. can be send as part of the URL
  let questionEncoded = encodeURIComponent(question);

  // Add the question to the end of the URL.
  let url = magic8BallUrl + questionEncoded;

  fetch(url)
    .then((res) => res.json())
    .then((apiData) => {
      console.log(apiData); // debug

      let answer = apiData.magic.answer;
      answerDisplayEl.innerHTML = answer;
      answerDisplayEl.style.opacity = 1;
    })
    .catch((err) => {
      console.log(err);
      errorDisplayEl.innerHTML = "Your question cannot be answered today";
    });
}
