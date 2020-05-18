/* const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
 */const IS_SPEECH_REC_SUPPORTED = false /* !!SpeechRecognition */ ;
const QUESTIONS = [
  `Вам больше 20 лет?`,
  `Вы мужчина?`,
  `Имеете высше образование?`,
  `Имеете постоянное место работы?`,
  `Есть ли в имуществе автомобиль?`,
  `Больше двух раз  в год бываете за пределами РБ?`,
  `Есть ли пожелания?`
];
let YES_STRING = 'да';
let NO_STRING = 'нет';
let lang;
let places;
let langSpeach;
const ANSWERS = new Array(QUESTIONS.length).fill('');
const CARD_WRAPPER = document.querySelector('#card-wrapper');
let place = document.querySelector("#start-text");
let words = document.querySelector("#start-text").innerText;
const speechRecognition = new SpeechRecognition();


/* Перевод страницы на  голосовые ответы  */
const MY_KEY = 'trnsl.1.1.20200513T181152Z.4d4e85ca50535b2d.6b5a939dabd11a5f247e618137da5ca57ae3beea';

console.log(words);
function showLang(el){
    console.log(el.options[el.selectedIndex].value);
    
    if(el.options[el.selectedIndex].value === 'en') {
        lang = 'ru-en';
        langSpeach = 'en';
        YES_STRING = 'yes';
        NO_STRING = 'no';
    }
    else{
        lang = 'en-ru';
        langSpeach = 'ru';
        YES_STRING = 'да';
        NO_STRING = 'нет';
    } 
    speechRecognition.lang = langSpeach;
    return fetchLang(lang, words, places, place);
};


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
  questionElement.className = 'questionsNumber';
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

    yesButton.innerText = YES_STRING;
    noButton.innerText = NO_STRING;
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
/*   showLang(el);
  fetchLang(lang, toRender); */
  
}


updateCard(-1);
console.log(showLang(el));