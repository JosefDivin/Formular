let tableElements;
let tableResourceBike;
export default class Resource{
constructor(){
console.log("pikacu utoci")


}

mainCount(){
    let largeStore_hpp = document.querySelector(".largeStore_hpp");
    console.log("Mafian utoci")
    console.log(largeStore_hpp)
    this.calculateBike()
    if(largeStore_hpp){
        console.log(largeStore_hpp.value)
       
    }


}

crateElements(){
  this.createBikeElement()
}

createBikeElement(){
    let resoults = document.querySelector(".resoults")
    const h1 =  document.createElement("h1")
    const h2 =  document.createElement("h2")
/*     const table =  document.createElement("table") */
    h1.innerHTML = "Výsledky"
    resoults.appendChild(h1)

    h2.innerHTML = "Jízdní kola"
    resoults.appendChild(h2)
    tableElements = this.subResouldsElement(3, "Základní počet stání")
    tableResourceBike = this.subResouldsElement(3, "<p><span>MINIMÁLNÍ</span> PŘÍPUSTNÝ POČET STÍNÍ</p>")
    resoults.appendChild(tableElements.mainDiv)
    resoults.appendChild(tableResourceBike.mainDiv)

    return {
      table: tableElements
    }

}


calculateBike(){
 let resource_bike__bound = document.querySelectorAll(".resource_bike__bound")
 let resource_bike__visitors = document.querySelectorAll(".resource_bike__visitors")
 
let boundCount = 0
let visitorsCount = 0
 for(let i =0; i<resource_bike__visitors.length; i++){

  boundCount+=Number(resource_bike__bound[i].innerHTML)
  visitorsCount+=Number(resource_bike__visitors[i].innerHTML)
 }
 console.log("**********************")
console.log(boundCount)
console.log(visitorsCount)

 console.log(tableElements)
 console.log("_____________________")
 tableElements.bound.innerHTML = boundCount
 tableElements.visitors.innerHTML = visitorsCount
 tableElements.sum.innerHTML = boundCount + visitorsCount
 tableResourceBike.bound.innerHTML = Math.round(boundCount)
 tableResourceBike.visitors.innerHTML = Math.round(visitorsCount)
 tableResourceBike.sum.innerHTML = Math.round(boundCount) + Math.round(visitorsCount)


 tableResourceBike.bound.classList.add("boltText")
 tableResourceBike.visitors.classList.add("boltText")
}

createDescriptionText(title, text) {
    const div = document.createElement("div");
    const titleEl = document.createElement("p");
    const textEl = document.createElement("p");
    div.classList.add("descriptionText");

    titleEl.innerHTML = title;
    textEl.innerHTML = text;
    div.appendChild(titleEl);
    div.appendChild(textEl);

    return {
      mainElement: div,
      title: titleEl,
      text: textEl,
    };
  }


  subResouldsElement(numberOfColom, title){
    const div = document.createElement("div");
    const titleDiv = document.createElement("div");
    const colomnTitle = document.createElement("div");
    const valueElement = document.createElement("div");
    div.classList.add("resoulds")
    const nemeOfColomn = ["Vázana", "Návštěvnická", "Celkem"]
    titleDiv.innerHTML = title
    div.appendChild(titleDiv)
    div.appendChild(colomnTitle)
    div.appendChild(valueElement)

    titleDiv.classList.add("resource_table__title")
    colomnTitle.classList.add("resource_table__colomnTitle")
    valueElement.classList.add("resource_table__colomnValue")
    let valueArray = []
    for(let i =0; i<numberOfColom; i++){

        let titleColom = document.createElement("p")
        let value = document.createElement("p")
        titleColom.innerHTML = nemeOfColomn[i]
        value.innerHTML = "-"
        colomnTitle.appendChild(titleColom)
        valueElement.appendChild(value)
        valueArray.push(value)
        
    }

    let sum = null;
    if(numberOfColom > 2){
      sum = valueArray[2]
    }
    return{
        mainDiv: div,
        titleDiv: titleDiv,
        bound: valueArray[0],
        visitors: valueArray[1],
        sum: sum,

    }

  }
}