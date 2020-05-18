
 
function fetchLang(lang, words, places, place){
    fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key='+MY_KEY+'&text='+words+'&lang='+lang)
.then(
    response => {
        /* console.log(response.json());*/ 
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
