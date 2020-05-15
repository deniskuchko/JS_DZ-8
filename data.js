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
dataCreateNew = ((new Date()).format('yyyy/mm/dd hh:MM:ss'));

function showTime(el){
    console.log(el.options[el.selectedIndex].value);
    let buttons = document.createElement('button');
    
    if(el.options[el.selectedIndex].value == 'Часовой пояс ru'){
        buttons.className = 'time_ru';
        buttons.innerHTML = dataCreateNew;
    } else {
        buttons.className = 'time_en';
        buttons.innerHTML = dataCreateNew;
    }
    console.log(buttons);
    document.getElementById('vivod_time').append(buttons);
    
    for (var i = 0; i < 2; i++)
    buttons[i].parentNode.removeChild(buttons[i]);
} ;