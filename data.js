Date.prototype.format = function(format = 'yyyy-mm-dd') {
    const replaces = {
        yyyy: this.getFullYear(),
        mm: ('0'+(this.getMonth() + 1)).slice(-2),
        dd: ('0'+this.getDate()).slice(-2),
        hh: ('0'+this.getHours()).slice(-2),
        MM: ('0'+this.getMinutes()).slice(-2),
        ss: ('0'+this.getSeconds()).slice(-2)
    };
    let result = format;
    for(const replace in replaces){
        result = result.replace(replace,replaces[replace]);
    }
    return result;
};
var date = new Date();

var options = {
 
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};


dataCreateNewRu = ((new Date()).format('yyyy/mm/dd hh:MM:ss'));
dataCreateNewEn = date.toLocaleString("en-US", options);

let button = document.createElement('button');
    button.className = 'time_ru';
    button.innerHTML = dataCreateNewRu +'    1';


function showTime(el){
    
    console.log(el.options[el.selectedIndex].value);
    button.remove();

    if(el.options[el.selectedIndex].value === 'ru_time'){
        button.className = 'time_ru';
        button.innerHTML = dataCreateNewRu;
    } if(el.options[el.selectedIndex].value === 'en_time') {
        button.className = 'time_en';
        button.innerHTML = dataCreateNewEn;
    }
    document.getElementById('vivod_time').prepend(button);
} ;


