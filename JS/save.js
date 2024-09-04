class Product{
    constructor(pr,count){
        this.pr = pr
        this.count = count
        this.total = this.count * this.pr.prise
    }

}
class Basket {
    constructor(basket=null){
        if(basket){
        this.total = basket.total
        this.prs = basket.prs
    }
    else{
        this.total = 0
        this.prs = []

    }
  }
  calcTotal(){
    this.total = 0
    for(let p of this.prs){
        this.total += p.total
    }
  }
  addPr(pr){
    let flag = true
    pr = new Product(pr,1)
    for(let p of this.prs){
        if ((p.pr.id == pr.pr.id) && (p.pr.model == pr.pr.model)){
            p.count += 1
            p.total += p.prise
            flag = false
            break
        }
    }
    if (flag ){
        this.prs.push(pr)
    }
    this.calcTotal()
  }
  delPr(id , model){
    let index 
    for(let i = 0;i<this.prs.length; i++){
        if ((id == this.prs[i].pr.id) && (model == this.prs[i].pr.model)){
            index = i
            break

        }
    }
    this.total -= this.prs[index].total
    this.prs.splice(index , 1)
  }
  minPr(id , model){
    let index 
    for(let i = 0;i<this.prs.length; i++){
        if ((id == this.prs[i].pr.id) && (model == this.prs[i].pr.model)){
            index = i
            break

        }
    }
    if(this.prs[index].count == 1){
    this.total -= this.prs[index].total
    this.prs.splice(index , 1)
  }else{
    this.total -= this.prs[index].pr.prise
    this.prs[index].total -= this.prs[index].pr.prise
    this.prs[index].count -= 1
  }
}
plusPr(id , model){
    let index 
    for(let i = 0;i<this.prs.length; i++){
        if ((id == this.prs[i].pr.id) && (model == this.prs[i].pr.model)){
            index = i
            break

        }
    }
    this.total += this.prs[index].pr.prise
    this.prs[index].total += this.prs[index].pr.prise
    this.prs[index].count += 1
}
}

function loadBusket(){
    let basket 
    try{
        basket = localStorage.getItem("basket")
        basket = JSON.parse(basket)
        basket = new Basket(basket)
        
    }catch{
        basket = new Basket()
    }
    return basket
}

function Buy(car){
    let basket = loadBusket()
    basket.addPr(car)
    basket = JSON.stringify(basket)
    localStorage.setItem("basket",basket)
    window.location.href="../HTML/save.html"
    

    
}
function Delete(id , model){
    let basket = loadBusket()
    basket.delPr(id , model)
    basket = JSON.stringify(basket)
    localStorage.setItem("basket",basket)
    window.location.href="../HTML/save.html"
}

function Min(id , model){
    let basket = loadBusket()
    basket.minPr(id , model)
    basket = JSON.stringify(basket)
    localStorage.setItem("basket",basket)
    window.location.href="../HTML/save.html"
}
function Plus(id , model){
    let basket = loadBusket()
    basket.plusPr(id , model)
    basket = JSON.stringify(basket)
    localStorage.setItem("basket",basket)
    window.location.href="../HTML/save.html"
}