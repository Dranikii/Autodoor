window.addEventListener("load",()=>{
    let id_car = localStorage.getItem("car")
    let car = JSON.parse(id_car)


    fetch("../hbs/3d.hbs")
        .then((res) =>res.text())
        .then((temp)=>{
            temp = Handlebars.compile(temp)
            temp = temp({car, id_car})
            document.querySelector("main").innerHTML = temp
        })
})
    




