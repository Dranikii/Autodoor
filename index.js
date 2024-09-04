window.addEventListener("load",()=>{
    fetch("../data/car.json")
        .then((res)=>res.json())
        .then((car)=>{
            fetch("../hbs/car.hbs")
            .then((res)=>res.text())
            .then((res)=>{
                res = Handlebars.compile(res)
                res = res(car)
                document.querySelector(".cards").innerHTML = res

            })
        })
})

