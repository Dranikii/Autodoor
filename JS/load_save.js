function loadPageBasket(){
    let basket = localStorage.getItem("basket")
    basket = JSON.parse(basket)
    fetch("../hbs/save.hbs")
    .then((res)=>res.text())
    .then((tmp)=>{
        tmp = Handlebars.compile(tmp)
        tmp = tmp(basket)
        document.querySelector(".table_price").innerHTML += tmp
    })
    
}


window.addEventListener("load",()=>{
    loadPageBasket()
})