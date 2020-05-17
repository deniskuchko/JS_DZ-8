/* const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
 */const IS_SPEECH_REC_SUPPORTED = /* false */ !!SpeechRecognition ;
const QUESTIONS = [
  `Вам больше 20 лет?`,
  `Вы мужчина?`,
  `Имеете высше образование?`,
  `Имеете постоянное место работы?`,
  `Есть ли в имуществе автомобиль?`,
  `Больше двух раз  в год бываете за пределами РБ?`,
  `Есть ли пожелания?`
];
const YES_STRING = 'да';
const NO_STRING = 'нет';
const ANSWERS = new Array(QUESTIONS.length).fill('');
const CARD_WRAPPER = document.querySelector('#card-wrapper');
const speechRecognition = new SpeechRecognition();

speechRecognition.lang = 'ru'

function speechButtonHandler(index) {
  speechRecognition.start();
  speechRecognition.onresult = function (event) {
    ANSWERS[index] = event.results[0][0].transcript;
    console.log(ANSWERS[index]);
    speechRecognition.stop();

    updateCard(index);
  }
}

function yesNoButtonHandler(index, value) {
  ANSWERS[index] = value;

  updateCard(index);
}

function cardFactory(index) {
  const card = document.createElement('div');
  card.className = 'questions';
  const questionElement = document.createElement('p');
  questionElement.innerText = QUESTIONS[index];

  let answerElement;

  if (IS_SPEECH_REC_SUPPORTED) {
    answerElement = document.createElement('button');
    answerElement.className = 'say';

    answerElement.innerText = 'Говорите';
    answerElement.addEventListener('click', speechButtonHandler.bind(answerElement, index));
  } else {
    answerElement = document.createElement('div');
    answerElement.className = 'container';

    const yesButton = document.createElement('button')
    yesButton.className = 'da';
    const noButton = document.createElement('button');
    noButton.className = 'net';

    yesButton.innerText = 'YES';
    noButton.innerText = 'NO';
    yesButton.addEventListener('click', yesNoButtonHandler.bind(yesButton, index, YES_STRING));
    noButton.addEventListener('click', yesNoButtonHandler.bind(noButton, index, NO_STRING));

    answerElement.appendChild(yesButton);
    answerElement.appendChild(noButton);
  }

  card.appendChild(questionElement);
  card.appendChild(answerElement);

  return card;
}

function renderResult() {
  const result = document.createElement('div');
  result.className = 'result';

  const { yes, no } = ANSWERS.reduce((acc, val) => {
    if (val === YES_STRING) {
      acc.yes += 1;
    }
    if (val === NO_STRING) {
      acc.no += 1;
    }

    return acc;
  }, { yes: 0, no: 0 })

  result.innerText = `Ответов ДА: ${yes} | Ответов НЕТ: ${no}`;

  return result;
}

function updateCard(currentIndex) {
  if (CARD_WRAPPER.firstChild) {
    CARD_WRAPPER.firstChild.remove();
  }

  const nextIndex = currentIndex + 1;
  const toRender = nextIndex > QUESTIONS.length - 1 ? renderResult() : cardFactory(nextIndex);

  CARD_WRAPPER.appendChild(toRender);
}


updateCard(-1);
