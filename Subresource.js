import Inputs from "./Inputs";

export default class Subresource{

    constructor(data,type,inputs){
this.type = type
this.inputs = inputs;
this.data = data
this.inputsClass = new Inputs(this.data)

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
            text: textEl
        };
      }
    subresourceBody() {
        const bodyContainer = document.createElement("div");
        bodyContainer.classList.add("subresources_body");
        const usegeType = this.inputs.input.inputs_usage.value;
        const cislo = usegeType.slice(0, usegeType.indexOf(" "));
        const type = usegeType.slice(usegeType.indexOf("-") + 2);
        const number = this.createDescriptionText("Číslo:", cislo);
        const name = this.createDescriptionText("Účel užívání:", type);
    
        const subresourcInput = this.subresourceInput();
    
        const subresourcResource = this.subresourceResource(subresourcInput);
        bodyContainer.appendChild(number.mainElement);
        bodyContainer.appendChild(name.mainElement);
        bodyContainer.appendChild(subresourcInput.mainElement);
        bodyContainer.appendChild(subresourcResource.mainElement);
    
        return bodyContainer;
      }
    
      subresourceTogleElement(title) {
        const titleEl = document.createElement("div");
    
        const bodyEl = document.createElement("div");
        const p = document.createElement("p");
        const arrow = document.createElement("div");
        titleEl.classList.add("togle_title");
        bodyEl.classList.add("togle_body");
        arrow.classList.add("esri-icon-down-arrow");
        arrow.classList.add("pointer");
        p.innerHTML = title;
        titleEl.appendChild(p);
        titleEl.appendChild(arrow);
    
        arrow.addEventListener("click", () => {
          if (arrow.classList.contains("esri-icon-up-arrow")) {
            arrow.classList.add("esri-icon-down-arrow");
            arrow.classList.remove("esri-icon-up-arrow");
            arrow.title = "Otevři podrobný popis";
            bodyEl.style.display = "none";
          } else {
            arrow.classList.add("esri-icon-up-arrow");
            arrow.classList.remove("esri-icon-down-arrow");
            arrow.title = "Zavři podrobný popis";
            bodyEl.style.display = "block";
          }
        });
    
        return {
          title: titleEl,
          body: bodyEl,
        };
      }
    
      subresourceInput() {
        let subresource_input = document.createElement("div");
        subresource_input.classList.add("subresource_input");
        console.log(this.type);
    
        const inputElements = this.subresourceTogleElement("Vstupní parametry");
        subresource_input.appendChild(inputElements.title);
        subresource_input.appendChild(inputElements.body);
        let input_others;
        let inputs_appartments;
        let hppInput;
        let inputs_production;

        // CREATE OTHERS
        if (this.type === "others") {

            // Create element
          input_others = this.inputsClass.input_others() 
          inputElements.body.appendChild(input_others.input_others_div);
          // Unable element default is none
          input_others.input_others_div.style.display = "block"
  
          
        } else {
            // CREATE INPUT HOUSE APPARTMENT
          if (this.type === "housing") {
            inputs_appartments = this.inputsClass.inputsAppartments()
            inputElements.body.appendChild(inputs_appartments.inputs_appartments_div);
          }

        // CREATE INPUT HPPP
          hppInput = this.inputsClass.inputsHpp()
          inputElements.body.appendChild(hppInput.inputs_hpp_div);
  
          // CREATE INPUT PRODUCTION
          if (this.type === "production") {
            inputs_production = this.inputsClass.inputsProduction()
            inputs_production.inputs_production_div.style.display = "block"
            inputElements.body.appendChild(inputs_production.inputs_production_div);
          }
        }
    this.coppyInputValue(inputs_appartments,hppInput,input_others, inputs_production)
        return {
          mainElement: subresource_input,
          others: input_others,
          housingApparments: inputs_appartments,
          hppInput: hppInput,
          production: inputs_production,
        };
      }

      coppyInputValue(inputs_appartments,hppInput, input_others, inputs_production){
        if (this.type === "others") {
            // Copy value from input OTHERS
            input_others.input_others__carVisitors.value = this.inputs.input.input_others.input_others__carVisitors.value
            input_others.input_others__carBound.value = this.inputs.input.input_others.input_others__carBound.value
            input_others.input_others__bikeVisitors.value = this.inputs.input.input_others.input_others__bikeVisitors.value
            input_others.input_others__bikeBound.value = this.inputs.input.input_others.input_others__bikeBound.value
        } else {
            // Copy value from input HPP
            const inputValue = this.inputs.input.inputs_hpp.input.value
            hppInput.input.value = inputValue
           

            if (this.type === "housing") {
            // Copy value from input appartments to car
                inputs_appartments.input.value = this.inputs.input.inputs_apartments.input.value
            }

            // CREATE INPUT PRODUCTION
          if (this.type === "production") {
            inputs_production.select.value = this.inputs.input.inputs_production.select.value
          }


        }
      }
    
      subresourceResource(subresourcInput) {
        let subresource_resource = document.createElement("div");
        subresource_resource.classList.add("subresource_resource");
        const inputElements = this.subresourceTogleElement("Mezi výpočet");
        subresource_resource.appendChild(inputElements.title);
        subresource_resource.appendChild(inputElements.body);
    
        const selectedIndex = this.inputs.input.inputs_usage.selectedIndex;
    
        let car = this.subresourcesElements(
          "Osobní automobil",
          selectedIndex,
          subresourcInput
        );
        let bike = this.subresourcesElements(
          "Jízdní kola",
          selectedIndex,
          subresourcInput
        );
    
        inputElements.body.appendChild(car.mainElement);
        inputElements.body.appendChild(bike.mainElement);
        this.subresourceInputChange(car,bike,selectedIndex,subresourcInput)
        return {
          mainElement: subresource_resource,
        };
      }

      subresourceInputChange(car,bike,selectedIndex,subresourcInput){
console.log(subresourcInput)
subresourcInput.hppInput.input.addEventListener("change", ()=>{
    const usage = this.inputs.input.objectArray;
    let carBound =subresourcInput.hppInput.input.value / usage[selectedIndex].values_1.hpp * usage[selectedIndex].values_1.bounded/100
    let carVisitors =subresourcInput.hppInput.input.value / usage[selectedIndex].values_1.hpp * usage[selectedIndex].values_1.visitors/100
    let bikeBound =subresourcInput.hppInput.input.value / usage[selectedIndex].values_2.hpp * usage[selectedIndex].values_2.bounded/100
    let bikeVisitors =subresourcInput.hppInput.input.value / usage[selectedIndex].values_2.hpp * usage[selectedIndex].values_2.visitors/100

    car.bound.text.innerHTML = Math.round((carBound* 100) / 100);
    car.visitors.text.innerHTML = Math.round((carVisitors* 100) / 100);
    bike.bound.text.innerHTML = Math.round((bikeBound* 100) / 100);
    bike.visitors.text.innerHTML = Math.round((bikeVisitors* 100) / 100);

    car.sum.text.innerHTM = Math.round(((carBound+carVisitors)* 100) / 100);
    bike.sum.text.innerHTM= Math.round(((bikeBound+bikeVisitors)* 100) / 100);
    bike.log(bike.sum.text.innerHTML)


})
      }
    
      subresourcesElements(type, selectedIndex, subresourcInput) {
        console.log(type);
        console.log(subresourcInput);
       // console.log(subresourcInput.hppInput.input.value);
    
        let div = document.createElement("div");
        let h3 = document.createElement("h2");
    
        const usage = this.inputs.input.objectArray;
        console.log(usage[selectedIndex]);
        
        let countBound;
        let countVisitors;
    
        if (type === "Osobní automobil") {
            countBound = subresourcInput.hppInput.input.value / usage[selectedIndex].values_1.hpp * usage[selectedIndex].values_1.bounded/100
            countVisitors = subresourcInput.hppInput.input.value / usage[selectedIndex].values_1.hpp * usage[selectedIndex].values_1.visitors/100
        } else {
            countBound = subresourcInput.hppInput.input.value / usage[selectedIndex].values_2.hpp * usage[selectedIndex].values_2.bounded/100
            countVisitors = subresourcInput.hppInput.input.value / usage[selectedIndex].values_2.hpp * usage[selectedIndex].values_2.visitors/100
            console.log(usage[selectedIndex].values_2);
        }
    
        const bound = this.createDescriptionText("Vázana:", Math.round(countBound* 100) / 100);
        const visitors = this.createDescriptionText("Navštěvnická:", Math.round(countVisitors* 100) / 100);
        const sum = this.createDescriptionText("Celkem:", Math.round(countBound+countVisitors* 100) / 100);
    
        h3.innerHTML = type;
    
        div.appendChild(h3);
        div.appendChild(bound.mainElement);
        div.appendChild(visitors.mainElement);
        div.appendChild(sum.mainElement);
        return {
            mainElement: div,
            bound: bound,
            visitors: visitors,
            sum: sum
        };
      }
    
       sublayersInptuCopy(inputElement) {
        let elementCopy = inputElement.cloneNode(true);
    
        return elementCopy;
      } 
}