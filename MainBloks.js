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
}