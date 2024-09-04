window.addEventListener("load",async()=>{

    fetch("../hbs/head.hbs")
        .then((res)=>res.text())
        .then((data)=>{
            document.querySelector("head").innerHTML = data

            fetch("../hbs/header.hbs")
            .then((res)=> res.text())
            .then((data)=>{
                document.querySelector("header").innerHTML = data

            fetch("../hbs/footer.hbs")
            .then((res)=> res.text())
            .then((data)=>{
                document.querySelector("footer").innerHTML = data
                })
            })
        })

})
