let searchForm = document.querySelector('#search-form');
let searchFormInput = document.querySelector('input');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;



if(SpeechRecognition){
  
    searchForm.insertAdjacentHTML('beforeend', '<button type="button"><i class="fas fa-microphone"></i></button>');

    const microBtn = document.querySelector('button');
    const microIcon = document.querySelector('i');

    console.log('Hi, Chrome');

    let recognition = new SpeechRecognition();

/*     recognition.continuous = true; */

    microBtn.addEventListener('click', () =>{
        if(microIcon.classList.contains('fa-microphone')){
            recognition.start();
            
        } else{
            
            recognition.stop();
        }
    });

    recognition.addEventListener('start', ()=>{
        console.log('Record Start');
        microIcon.classList.remove('fa-microphone');
        microIcon.classList.add('fa-microphone-slash');
    });

    recognition.addEventListener('end', ()=>{
        console.log('Record Finish');
        microIcon.classList.add('fa-microphone');
        microIcon.classList.remove('fa-microphone-slash');
    });

    recognition.addEventListener('result', (event) =>{
        console.log(event);
        let resultCurrent = event.results[0][0].transcript;

        if (resultCurrent.includes(`найти`) == true){
            searchFormInput.value = resultCurrent.slice(0, -5);
            console.log(searchFormInput.value);
            setTimeout(()=>{
                searchForm.submit();
            }, 500)
        };
    })

    
} else{
    console.log('no')
}


const MY_KEY = 'trnsl.1.1.20200513T181152Z.4d4e85ca50535b2d.6b5a939dabd11a5f247e618137da5ca57ae3beea';
let words = document.querySelector("#start-text").innerText;
fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key='+MY_KEY+'&text='+words+'&lang=ru-en')
.then(
    response => {
        /* console.log(response.json()); */
        response.json().then(
            data => {
                console.log(data.text[0]);
                document.querySelector('#end-text').innerText = data.text[0];
            }
        )

    }
)
.catch(
    () => {
        console.log('Status Error');
    }
)

/* Создание опросника */

let numberQuestion =  document.querySelector(".questions");
let p_vopros = numberQuestion.querySelector("p");
let h_vopros = numberQuestion.querySelector("h1");
let opros = document.getElementById('opros');
let voprosi = new Map([
    ['p_1', `Вам больше 20 лет?`],
    ['p_2', `Вы мужчина?`],
    ['p_3', `Имеете высше образование?`],
    ['p_4', `Есть дети до 18 лет?`],
    ['p_5', `Имеете постоянное место работы?`],
    ['p_6', `Есть ли в имуществе автомобиль?`],
    ['p_7', `Больше двух раз  в год бываете за пределами РБ?`],
    ['p_8', `Есть ли пожелания?`]
]);


let n = 0;
h_vopros.innerText = `Вопрос №` + 1;
p_vopros.innerText = voprosi.get('p_' + 1);
let otvetNet = 0;
let otvetDa = 0;
let a = 0;
let b = 0;
n = 1;
opros.insertAdjacentHTML('beforeend', '<button id="button_opros" type="button"><i id="i_opros" class="fas fa-microphone"></i></button>');

    const Btn = document.getElementById('button_opros');
    const Icon = document.getElementById('i_opros');

let otvetGolosom = new SpeechRecognition();
otvetGolosom.continuous = true;

Btn.addEventListener('click', () =>{
    if(Icon.classList.contains('fa-microphone')){
        otvetGolosom.start();
        
    } else{
        
        otvetGolosom.stop();
    }
});

otvetGolosom.addEventListener('start', ()=>{
    console.log('Record Start');
    Icon.classList.remove('fa-microphone');
    Icon.classList.add('fa-microphone-slash');
});

otvetGolosom.addEventListener('end', ()=>{
    console.log('Record Finish');
    Icon.classList.add('fa-microphone');
    Icon.classList.remove('fa-microphone-slash');
});
otvetGolosom.addEventListener('result', (event) =>{
    console.log(event);
    let result = event.results[0][0].transcript;
    if (n < voprosi.size && result.includes(`нет`) == true  ) {
        result = event.results[(n-1)][0].transcript;

        otvetNet +=1;
        n++;
        h_vopros.innerText = `Вопрос №` + n;
        p_vopros.innerText = voprosi.get('p_'+n);
        console.log(`ответ нет:` + otvetNet);
        
    } 
    if(n < voprosi.size && result.includes(`да`) == true  ) {
        result = event.results[n-1][0].transcript;
        otvetDa +=1; 
        n++;
        h_vopros.innerText = `Вопрос №` + n;
        p_vopros.innerText = voprosi.get('p_'+n);
        console.log(`ответ да:` + otvetDa);

        
    } 
    else{

        otvetNet +=1;
        h_vopros.innerText = `Ответов Да/Нет`;
        p_vopros.innerText = otvetDa+'/'+ otvetNet;
        otvetGolosom.stop();
        alert(`Опрос окончен. Посмотрите результат!`);
    }
    
})

/* 
document.querySelector(".net").addEventListener('click',() => {
    if(n < voprosi.size) {

        otvetNet +=1;
        n++;
        h_vopros.innerText = `Вопрос №` + n;
        p_vopros.innerText = voprosi.get('p_'+n);
        
        
    } 
    else{

        otvetNet +=1;
        h_vopros.innerText = `Ответов Да/Нет`;
        p_vopros.innerText = otvetDa+'/'+ otvetNet;
        alert(`Опрос окончен. Посмотрите результат!`);
    }
    
})

document.querySelector(".da").addEventListener('click',() => {
    if(n < voprosi.size) {

        otvetDa +=1; 
        n++;
        h_vopros.innerText = `Вопрос №` + n;
        p_vopros.innerText = voprosi.get('p_'+n);
        
        
    } else{
        otvetDa +=1; 
        h_vopros.innerText = `Ответов Да/Нет`;
        p_vopros.innerText = otvetDa+'/'+ otvetNet;
        alert(`Опрос окончен. Посмотрите результат!`);
    }
    
})
 */
/* привязка к опроснику голосового управления */

