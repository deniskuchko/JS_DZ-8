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

/* async function fetchLang(lang, words, places, place){
    let response = await fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key='+MY_KEY+'&text='+words+'&lang='+lang);
    let data = await response.json();
    place.innerText = places;

    return data;
}
fetchLang(lang, words, places, place)
    .then(
        data => {
        /* console.log(response.json()); 
        data.json().then(
            data => {
                console.log(data.text[0]);
                places = data.text[0];
                console.log(place);
            }
        )

    }
    )
    .catch(
        () => {
            console.log('Status Error');
        }
    ) */

function fetchLang(lang, words, places, place){
    fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key='+MY_KEY+'&text='+words+'&lang='+lang)
.then(
    response => {
        /* console.log(response.json()); */
        response.json().then(
            data => {
                console.log(data.text[0]);
                places = data.text[0];
                place.innerText = places;
                console.log(place);
            }
        )

    }
)
.catch(
    () => {
        console.log('Status Error');
    }
)
}
