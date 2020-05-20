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

async function fetchLang(){
    let url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+MY_KEY+'&text='+words+'&lang='+lang;

    let data = (await fetch(url).then(handleOk));
   /*  let dataCatch = await (await fetch(url).catch(handleErr)).json();
    if (dataCatch.code && dataCatch.code === 400 ){
        return;
    } */
    
}

function handleOk(response){
    response.json().then(
        Mymessage => {
            console.log(Mymessage.text[0]);
            places = Mymessage.text[0];
            place.innerText = places;
            console.log(place);
        }
    )
}
/* function handleErr(err){
    console.warn(err);
    let resp = new Response(
        JSON.stringify({
            code: 400,
            message: "Status Errorf 1111111111111"
        })
    );
    return resp;
} */