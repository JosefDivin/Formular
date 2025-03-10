export default class MainBloks{
    constructor(){

    }

    mainElement(title){
        const activSection = document.createElement("div")
        const activSection_activ = document.createElement("div")
        const activSection_pasiv = document.createElement("div")
        const activSection_activ__arrow = document.createElement("div")
        const activSection_activ__title = document.createElement("p")

        activSection_activ__title.innerHTML = title;

        activSection.appendChild(activSection_activ)
        activSection_activ.appendChild(activSection_activ__title)
        activSection_activ.appendChild(activSection_activ__arrow)
        activSection.appendChild(activSection_pasiv)

        activSection.classList.add("activSection")
        activSection_activ.classList.add("activSection_activ")
        activSection_pasiv.classList.add("activSection_pasiv")
        activSection_activ__arrow.classList.add("activSection_activ__arrow")
        activSection_activ__arrow.classList.add("esri-icon-up")
        activSection_activ__title.classList.add("activSection_activ__title")

        this.addListener(activSection_activ__arrow, activSection_pasiv)
        return {
            mainElemnt: activSection,
            activButton: activSection_activ__arrow,
            activSection_pasiv: activSection_pasiv
        }

    }

    addListener(activElement, pasiveELement){
        activElement.addEventListener("click", ()=>{
            if(activElement.classList.contains("esri-icon-up")){
                pasiveELement.style.display = "none";
                activElement.classList.remove("esri-icon-up")
                activElement.classList.add("esri-icon-down")
            }else{
                pasiveELement.style.display = "block";
                activElement.classList.add("esri-icon-up")
                activElement.classList.remove("esri-icon-down")
            }
        })
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

      createColumns(inputArray, type) {
        const wrapper_columns = document.createElement("div")

        wrapper_columns.classList.add("wrapper_columns")
        let values = []
        for (let i = 0; i < inputArray.length; i++) {
            const p = document.createElement("p")
            p.innerHTML = inputArray[i]
            p.classList.add("columnValue")
            values.push(p)
            wrapper_columns.appendChild(p)
        }

        if (type === "title") {
            wrapper_columns.classList.add("wrapper_columns__title")
        } else if (type === "subTitle") {
            wrapper_columns.classList.add("wrapper_columns__subTitle")
        } else {
            wrapper_columns.classList.add("wrapper_columns__value")
        }

        return {
            mainElement: wrapper_columns,
            values: values
        }
    }
    createTable(title, subtitleArray, valuesArray) {
        let titleEl = this.createColumns([title], "title")
        let wraper_table = document.createElement("div")
        wraper_table.classList.add("wraper_table")

        wraper_table.appendChild(titleEl.mainElement)
        let subtitleEl = this.createColumns(subtitleArray, "subTitle")
        wraper_table.appendChild(subtitleEl.mainElement)

        let valueEl = this.createColumns(valuesArray, "value")
        wraper_table.appendChild(valueEl.mainElement)

        return {
            mainElement: wraper_table,
            title: titleEl,
            subTitles: subtitleEl,
            values: valueEl
        }
    }

    createTogleElement(inputHTML, activeElClass, pasivElClass, title){
        function togleElement(activElement,pasiveElement){
            activElement.addEventListener("click", ()=>{
                if(arrow.classList.contains("esri-icon-up-arrow")){
                    pasiveElement.style.display="none"
                    arrow.classList.remove("esri-icon-up-arrow")
                    arrow.classList.add("esri-icon-down-arrow")
                    arrow.title = "Otevřít panel";
                }else{
                    pasiveElement.style.display="block"
                    arrow.classList.add("esri-icon-up-arrow")
                    arrow.classList.remove("esri-icon-down-arrow")
                    arrow.title = "Zavři panel";
                }
            })
        }
        let activElement = document.createElement("div")
        let p = document.createElement("p")
        let arrow = document.createElement("div")
        let pasiveElement =  document.createElement("div")
        p.innerHTML = title;
        // If it's subresource count
        if(title === "Mezivýpočet"){
            arrow.classList.add("esri-icon-down-arrow")
            pasiveElement.style.display = "none"
        }else{
            arrow.classList.add("esri-icon-up-arrow")
        }

        activElement.classList.add(activeElClass)
        activElement.appendChild(p)
        activElement.appendChild(arrow)
        pasiveElement.classList.add(pasivElClass)

        inputHTML.appendChild(activElement)
        inputHTML.appendChild(pasiveElement)

        togleElement(arrow,pasiveElement)
        return {
            activElement: activElement,
            pasiveElement: pasiveElement,
            activButton: arrow
        }
    }
}