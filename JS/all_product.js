//функція завантажити шаблон та додати до сторінки 
function loadTemplateAdd(nameTmp, nameDiv, data){
    
            fetch(nameTmp)
            .then((res)=>res.text())
            .then((res)=>{
                res = Handlebars.compile(res)
                res = res(data)
                document.querySelector(nameDiv).innerHTML += res
            })
                
}
//функція завантажити шаблон та вставити на сторінку
function loadTemplate(nameTmp, nameDiv, data){
    //додаємо Проміс, щоб відстежити коли шаблон вже буде додано на сторінку
    return new Promise((resolve,reject)=>{
    fetch(nameTmp)
    .then((res)=>res.text())
    .then((res)=>{
        res = Handlebars.compile(res)
        res = res(data)
        document.querySelector(nameDiv).innerHTML = res
    })
    .then((dt)=>{
        resolve()
    })
})
        
}


//анімація приховати блок - функція
function animeHide(nameDiv){
    anime ({
        targets:nameDiv,
        
        translateX:"200%",
        duration:3000,
        
    })
    nameDiv.style.display = "none"
}
//функція анімація показати блок
function anumeShow(nameDiv){
    nameDiv.style.display = "flex"
    anime ({
        targets:nameDiv,
        translateX:"0%",
        duration:3000,
        right:0
        
    })
}

//підключаємо до заватаження сторінки
window.addEventListener("load",()=>{
    //спрешу зчитуємо джісон усіх моделей
    fetch("../data/model.json")
    .then((res)=>res.json())
    .then((model)=>{
            //завантажуємо шаблон0картку для відображення моделі
            loadTemplate("../hbs/model.hbs",".container-backgrounds",model)
            //коли ми вже додали шаблон на сторінку
            .then((res)=>{
                //зчитуємо усі картки моделей, щоб відстежити клік по нім
                let models = document.querySelectorAll(".models")
                for(let model of models){
                    //підключаємо кдік до картик-моделі
                    model.addEventListener("click",function(){
                        //ховаємо картик -моделі
                        animeHide(document.querySelector(".container-backgrounds"))
                        //зчитуємо назву марки модели з картик по якій ми клікнули
                        let mark = this.querySelector(".mark").innerHTML
                        //зчитуємо відповідний файл джисон з машинами відповідно моделі-марки
                        fetch(`../data/${mark}.json`)
                            .then((res)=>res.json())
                            .then((cars)=>{
                                //додаємо до об1єктів машин поле з 
                                //інформацією про машину у вигляді рядка
                                for(let car of cars){
                                    car["car"]= JSON.stringify(car)
                                    }
                                //грузимо шаблон картки-машини
                                loadTemplate("../hbs/card.hbs",".container-cars",cars)
                                    //після завантаження да додавання карток-машин на сторінку
                                    //підключаємо ці картки до кліку
                                    .then((dt)=>{
                                        let click_car = document.querySelectorAll(".click_car")
                                        for(let click of click_car){
                                            click.addEventListener("click",function(){ 
                                                let onecar =this.attributes['data-car'].value
                                                localStorage.setItem("car",onecar)
                                                })  
                                            }
                                        anumeShow(document.querySelector(".container-cars"))
                                        anumeShow(document.querySelector(".arrow"))
                                        document.querySelector(".container-cars").style.display = "flex"
                                    })
                                    //підключаємо стрілу до функції нахад до моделей
                                    .then((dt)=>{
                                        document.querySelector(".arrow").addEventListener("click",()=>{
                                            anumeShow(document.querySelector(".container-backgrounds"))
                                            animeHide(document.querySelector(".container-cars"))
                                            animeHide(document.querySelector(".arrow"))
                                                        })
                                    })
                    })
                })//close clicke model
            
            }//close for models
            })//close then loadTemp

    })//close then fetch model
})//close window listner


    