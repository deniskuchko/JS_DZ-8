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
