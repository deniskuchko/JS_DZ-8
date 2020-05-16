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
    
 
    if (n < voprosi.size && result.split(' ')[0] === 'нет'  ) {
        result = event.results[(n)][0].transcript;
        console.log(result.split(' ')[0]);

        otvetNet +=1;
        n++;
        h_vopros.innerText = `Вопрос №` + n;
        p_vopros.innerText = voprosi.get('p_'+n);
        console.log(`ответ нет:` + otvetNet);
        
    } 
    if(n < voprosi.size && result === 'да') {
        result = event.results[(n)][0].transcript;
        console.log( result.split(' ')[0]);
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
