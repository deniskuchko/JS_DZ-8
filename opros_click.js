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