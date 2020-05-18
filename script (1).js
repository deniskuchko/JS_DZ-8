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

