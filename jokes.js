const forms = document.querySelector(".to-jokes");
const yesInput = document.querySelector("#yay");
const noInput = document.querySelector("#nay");
const yayResponse = document.querySelector("#yay-response");
const form = document.querySelector("#form");
noInput.addEventListener("click", (event) => {
  event.preventDefault();

  const homepage = document.createElement("a");

  homepage.setAttribute("href", "index.html");

  homepage.click();
});

yesInput.addEventListener("click", (event) => {
  event.preventDefault();

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "208eb556b4msh8ff1b0dd806212fp119535jsn7b790899f268",
      "X-RapidAPI-Host": "jokes34.p.rapidapi.com",
    },
  };

  fetch("https://jokes34.p.rapidapi.com/v1/jokes?limit=20&page=1", options)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      form.remove();
      const questionAnswer = [];

      for (let element of data) {
        // console.log(element.joke);

        let { joke } = element;
        // console.log(text);

        if (joke.includes("?")) {
          const [question, answer] = joke.split("?");
          const newElement = {
            question: question.trim(),
            answer: answer.trim(),
          };
          questionAnswer.push(newElement);
        } else {
          const obj = {
            joke: joke,
          };
          questionAnswer.push(obj);
        }
      }

      console.log(questionAnswer);

      function showAnswer(questionAnswer) {
        let questionIndex = 0;
        let currentQuestion = questionAnswer[questionIndex];
        let hasAnswered = false;

        function newQuestion() {
          const question = document.createElement("P");
          question.innerText = currentQuestion.question;
          question.setAttribute("id", "quest-paragraph");
          const answerInput = document.createElement("input");
          answerInput.type = "text";

          answerInput.setAttribute("id", "answerInput");
          const submitBttn = document.createElement("input");
          submitBttn.setAttribute("type", "button");
          submitBttn.setAttribute("Value", "what you think?");
          submitBttn.setAttribute("id", "submitBttn");
          const answer = document.createElement("p");
          answer.setAttribute("id", "answer");

          submitBttn.addEventListener("click", () => {
            if (hasAnswered) {
              return;
            }
            const userAnswer = answerInput.value.trim().toLowerCase();
            const correctAnswer = currentQuestion.answer.toLowerCase();

            if (userAnswer === correctAnswer) {
              answer.innerText = "correct";
            } else {
              answer.innerText = `Wrong, the correct answer is "${correctAnswer}"`;
            }

            hasAnswered = true;
          });

          const nextQuestionbutton = document.createElement("button");
          nextQuestionbutton.innerText = "Next Question";
          nextQuestionbutton.setAttribute("id", "Next-quest-bttn");
          nextQuestionbutton.addEventListener("click", () => {
            questionIndex++;
            currentQuestion = questionAnswer[questionIndex];
            hasAnswered = false;

            if (currentQuestion) {
              newQuestion();
              const newNextQuestionbutton = document.createElement("button");
              newNextQuestionbutton.innerText = "Next Question";
              newNextQuestionbutton.setAttribute("id", "Next-quest-bttn");
              newNextQuestionbutton.addEventListener("click", () => {
                questionIndex++;
                currentQuestion = questionAnswer[questionIndex];
                hasAnswered = false;
              });
            }

            if (currentQuestion) {
              newQuestion();
            } else {
              yayResponse.innerHTML = "No more Questions";
            }
          });

          const otherPageButton = document.createElement("button");
          otherPageButton.innerText = "Go to home page";
          otherPageButton.setAttribute("id", "other-pg-bttn");
          otherPageButton.addEventListener("click", () => {
            const homepage = document.createElement("a");

            homepage.setAttribute("href", "index.html");

            homepage.click();
          });

          yayResponse.innerHTML = "";
          yayResponse.append(question);
          yayResponse.append(answerInput);
          yayResponse.append(submitBttn);
          yayResponse.append(answer);
          yayResponse.append(otherPageButton);
          yayResponse.append(newNextQuestionbutton);
        }

        newQuestion();

        const nextQuestionbutton = document.createElement("button");
        nextQuestionbutton.innerText = "Next Question";
        nextQuestionbutton.setAttribute("id", "Next-quest-bttn");
        nextQuestionbutton.addEventListener("click", () => {
          questionIndex++;
          currentQuestion = questionAnswer[questionIndex];
          hasAnswered = false;

          if (currentQuestion) {
            newQuestion();
          } else {
            yayResponse.innerHTML = "No more Questions";
          }
        });

        yayResponse.append(nextQuestionbutton);
      }
      showAnswer(questionAnswer);
    })

    .catch((error) => {
      console.log(error);
      const body = document.querySelector("body");
      const div = document.createElement("div");
      div.setAttribute("id", "api-error");
      body.append(div);
      div.append((document.createElement("p").textContent = "API Wildin RN"));

      const errorButton = document.createElement("input");
      errorButton.setAttribute("value", "Back to Homepage");
      errorButton.setAttribute("type", "button");
      errorButton.setAttribute("id", "errorbttn");
      div.append(errorButton);

      errorButton.addEventListener("click", (event) => {
        event.preventDefault();

        const homepage = document.createElement("a");

        homepage.setAttribute("href", "index.html");

        homepage.click();
      });
    });

  yesInput.innerHTML = "";
});
