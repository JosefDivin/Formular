import Inputs from "./Inputs";
import Resource from "./Resource";

export default class Subresource {
  constructor(data, type, inputs) {
    this.type = type;
    this.inputs = inputs;
    this.data = data;
    this.inputsClass = new Inputs(this.data);

    this.resource = new Resource();
   
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
    setTimeout(() => {
      this.resource.mainCount();
    }, 50);

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
      input_others = this.inputsClass.input_others();
      inputElements.body.appendChild(input_others.input_others_div);
      // Unable element default is none
      input_others.input_others_div.style.display = "block";

      // Adding class to elements
      input_others.input_others__carBound.classList.add(
        "input_others__carBound"
      );
      input_others.input_others__carVisitors.classList.add(
        "input_others__carVisitors"
      );
      input_others.input_others__bikeBound.classList.add(
        "input_others__bikeBound"
      );
      input_others.input_others__bikeVisitors.classList.add(
        "input_others__bikeVisitors"
      );
    } else {
      // CREATE INPUT HOUSE APPARTMENT
      if (this.type === "housing") {
        inputs_appartments = this.inputsClass.inputsAppartments();
        inputElements.body.appendChild(
          inputs_appartments.inputs_appartments_div
        );

        // Adding class to element
        inputs_appartments.input.classList.add("input_aprtments");
      }

      // CREATE INPUT HPPP
      hppInput = this.inputsClass.inputsHpp();
      inputElements.body.appendChild(hppInput.inputs_hpp_div);
      // Adding class to element
      hppInput.input.classList.add("input_hpp");

      // CREATE INPUT PRODUCTION
      if (this.type === "production") {
        inputs_production = this.inputsClass.inputsProduction();
        inputs_production.inputs_production_div.style.display = "block";
        inputElements.body.appendChild(inputs_production.inputs_production_div);
        // Adding class to element
        inputs_production.select.classList.add("input_production");
      }

      if (this.type === "largeStore") {
        // Adding class to element
        hppInput.input.classList.add("largeStore_hpp");
      }
    }
    this.coppyInputValue(
      inputs_appartments,
      hppInput,
      input_others,
      inputs_production
    );
    return {
      mainElement: subresource_input,
      others: input_others,
      housingApparments: inputs_appartments,
      hppInput: hppInput,
      production: inputs_production,
    };
  }

  coppyInputValue(
    inputs_appartments,
    hppInput,
    input_others,
    inputs_production
  ) {
    if (this.type === "others") {
      // Copy value from input OTHERS
      input_others.input_others__carVisitors.value =
        this.inputs.input.input_others.input_others__carVisitors.value;
      input_others.input_others__carBound.value =
        this.inputs.input.input_others.input_others__carBound.value;
      input_others.input_others__bikeVisitors.value =
        this.inputs.input.input_others.input_others__bikeVisitors.value;
      input_others.input_others__bikeBound.value =
        this.inputs.input.input_others.input_others__bikeBound.value;
    } else {
      // Copy value from input HPP
      const inputValue = this.inputs.input.inputs_hpp.input.value;
      hppInput.input.value = inputValue;

      if (this.type === "housing") {
        // Copy value from input appartments to car
        inputs_appartments.input.value =
          this.inputs.input.inputs_apartments.input.value;
      }

      // CREATE INPUT PRODUCTION
      if (this.type === "production") {
        inputs_production.select.value =
          this.inputs.input.inputs_production.select.value;
      }
    }
  }

  subresourceResource(subresourcInput) {
    let subresource_resource = document.createElement("div");
    subresource_resource.classList.add("subresource_resource");
    const inputElements = this.subresourceTogleElement("Mezi výpočet");
    subresource_resource.appendChild(inputElements.title);
    subresource_resource.appendChild(inputElements.body);

    let selectedIndex = this.inputs.input.inputs_usage.selectedIndex;
    if (selectedIndex > 0) {
      selectedIndex = selectedIndex + 1;
    }

    let bike = this.subresourceCalculation("bike", selectedIndex, subresourcInput);
    let car = this.subresourceCalculation("car", selectedIndex, subresourcInput);

    let carElement = this.createSubresourceElements(car, "Osobní automobil");
    inputElements.body.appendChild(carElement.mainElement);
    let carApartmentElement;
    if(this.type === "housing"){

      carApartmentElement = this.createSubresourceElements(car.carToApartments, "Po přepočtu max. 2 stání na byt");
      inputElements.body.appendChild(carApartmentElement.mainElement);
    }

    let bikeElement = this.createSubresourceElements(bike, "Jízdní kola");
    inputElements.body.appendChild(bikeElement.mainElement);



    this.subresourceChange(
      this.type,
      bikeElement,
      carElement,
      selectedIndex,
      subresourcInput,
      carApartmentElement

    );
    return {
      mainElement: subresource_resource,
    };
  }

  subresourceChange(
    type,
    bikeElement,
    carElement,
    selectedIndex,
    subresourcInput,
    carApartmentElement
  ) {
    if(type === "housing"){
      console.log(subresourcInput)
      subresourcInput.housingApparments.input.addEventListener("change", () => {
        console.log("update")
        this.calculateOnChange(
          bikeElement,
          carElement,
          selectedIndex,
          subresourcInput,
          carApartmentElement
        );
      }); 
    }
    if (type !== "others") {
      console.log(subresourcInput.hppInput.input);

      subresourcInput.hppInput.input.addEventListener("change", () => {
        this.calculateOnChange(
          bikeElement,
          carElement,
          selectedIndex,
          subresourcInput,
          carApartmentElement
        );
      });
    } else {
      subresourcInput.others.input_others__carBound.addEventListener(
        "change",
        () => {
          this.calculateOnChange(
            bikeElement,
            carElement,
            selectedIndex,
            subresourcInput,
            carApartmentElement
          );
        }
      );
      subresourcInput.others.input_others__carVisitors.addEventListener(
        "change",
        () => {
          this.calculateOnChange(
            bikeElement,
            carElement,
            selectedIndex,
            subresourcInput,
            carApartmentElement
          );
        }
      );
      subresourcInput.others.input_others__bikeBound.addEventListener(
        "change",
        () => {
          this.calculateOnChange(
            bikeElement,
            carElement,
            selectedIndex,
            subresourcInput,
            carApartmentElement
          );
        }
      );
      subresourcInput.others.input_others__bikeVisitors.addEventListener(
        "change",
        () => {
          this.calculateOnChange(
            bikeElement,
            carElement,
            selectedIndex,
            subresourcInput,
            carApartmentElement
          );
        }
      );
    }

    console.log(type);
  }

  calculateOnChange(bikeElement, carElement, selectedIndex, subresourcInput,carApartmentElement) {
    let bike = this.subresourceCalculation(
      "bike",
      selectedIndex,
      subresourcInput
    );
    let car = this.subresourceCalculation(
      "car",
      selectedIndex,
      subresourcInput
    );
    console.log(selectedIndex);

    bikeElement.bound.text.innerHTML = bike.bound;
    bikeElement.visitors.text.innerHTML = bike.visitors;
    bikeElement.sum.text.innerHTML = bike.sum;

    carElement.bound.text.innerHTML = car.bound;
    carElement.visitors.text.innerHTML = car.visitors;
    carElement.sum.text.innerHTML = car.sum;

    if(carApartmentElement){
      carApartmentElement.bound.text.innerHTML = car.carToApartments.bound;
      carApartmentElement.visitors.text.innerHTML = car.carToApartments.visitors;
      carApartmentElement.sum.text.innerHTML = car.carToApartments.sum;
    }
  }

  createSubresourceElements(count, title) {
    let div = document.createElement("div");
    if(title ==="Po přepočtu max. 2 stání na byt"){
      let p = document.createElement("p");
      p.innerHTML = title;
      p.classList.add("appartments_title")
      div.appendChild(p);
    }else{
      let h2 = document.createElement("h2");
      h2.innerHTML = title;
      div.appendChild(h2);
    }

    let bound = this.createDescriptionText("Vázana:", count.bound);
    let visitors = this.createDescriptionText("Navštěvnická:", count.visitors);
    let sum = this.createDescriptionText("Celkem:", count.sum);
    div.appendChild(bound.mainElement);
    div.appendChild(visitors.mainElement);
    div.appendChild(sum.mainElement);
    this.addingResourceCssClass(bound,visitors, title)

    return {
      mainElement: div,
      bound: bound,
      visitors: visitors,
      sum: sum,
    };
  }

  addingResourceCssClass(bound,visitors, title){
    if(title === "Jízdní kola"){
      bound.text.classList.add("resource_bike__bound")
      visitors.text.classList.add("resource_bike__visitors")
    }

  }

  subresourceInputChange(car, bike, selectedIndex, subresourcInput) {
    console.log(subresourcInput);
    subresourcInput.hppInput.input.addEventListener("change", () => {
      const usage = this.inputs.input.objectArray;
      let carBound =
        ((subresourcInput.hppInput.input.value /
          usage[selectedIndex].values_1.hpp) *
          usage[selectedIndex].values_1.bounded) /
        100;
      let carVisitors =
        ((subresourcInput.hppInput.input.value /
          usage[selectedIndex].values_1.hpp) *
          usage[selectedIndex].values_1.visitors) /
        100;
      let bikeBound =
        ((subresourcInput.hppInput.input.value /
          usage[selectedIndex].values_2.hpp) *
          usage[selectedIndex].values_2.bounded) /
        100;
      let bikeVisitors =
        ((subresourcInput.hppInput.input.value /
          usage[selectedIndex].values_2.hpp) *
          usage[selectedIndex].values_2.visitors) /
        100;
      let sumCar = carBound + carVisitors;
      let sumBike = bikeBound + bikeVisitors;

      car.bound.text.innerHTML = Math.round(carBound * 100) / 100;
      car.visitors.text.innerHTML = Math.round(carVisitors * 100) / 100;
      bike.bound.text.innerHTML = Math.round(bikeBound * 100) / 100;
      bike.visitors.text.innerHTML = Math.round(bikeVisitors * 100) / 100;

      car.sum.text.innerHTML = Math.round(sumCar * 100) / 100;
      bike.sum.text.innerHTML = Math.round(sumBike * 100) / 100;

      setTimeout(() => {
        this.resource.mainCount();
      }, 50);
    });
  }

  subresourceCalculation(type, selectedIndex, subresourcInput) {
    if (type === "bike") {
      return this.subresourceCalculationBike(selectedIndex, subresourcInput);
    } else if (type === "car") {
      return this.subresourceCalculationCar(selectedIndex, subresourcInput);
    }
  }
  subresourceCalculationCar(selectedIndex, subresourcInput) {
    const usage = this.inputs.input.objectArray;
    let carBound;
    let carVisitors;

    if (this.type === "production") {
      carBound =
        ((subresourcInput.inputsProduction.select.value /
          usage[selectedIndex].values_1.hpp) *
          usage[selectedIndex].values_1.bounded) /
        100;
      carVisitors =
        ((subresourcInput.inputsProduction.select.value /
          usage[selectedIndex].values_1.hpp) *
          usage[selectedIndex].values_1.visitors) /
        100;
    } else if (this.type === "others") {
      carBound = subresourcInput.others.input_others__carBound.value;
      carVisitors = subresourcInput.others.input_others__carVisitors.value;
    } else {
      carBound =
        ((subresourcInput.hppInput.input.value /
          usage[selectedIndex].values_1.hpp) *
          usage[selectedIndex].values_1.bounded) /
        100;
      carVisitors =
        ((subresourcInput.hppInput.input.value /
          usage[selectedIndex].values_1.hpp) *
          usage[selectedIndex].values_1.visitors) /
        100;
    }
let carToApartments;
    if (this.type === "housing") {
      const boundApartment = this.countCarToApartment(
        subresourcInput.housingApparments.input.value,
        carBound + carVisitors,
        usage[selectedIndex].values_1.bounded,
        carBound
      );
      const visitorsApartment = this.countCarToApartment(
        subresourcInput.housingApparments.input.value,
        carBound + carVisitors,
        usage[selectedIndex].values_1.visitors,
        carVisitors
      );


      let sumCarApartments = boundApartment + visitorsApartment

      carToApartments = {
        bound: Math.round(boundApartment * 100) / 100,
        visitors: Math.round(visitorsApartment * 100) / 100,
        sum: Math.round(sumCarApartments * 100) / 100
      }
    }

    let sumCar = Number(carBound) + Number(carVisitors);
    setTimeout(() => {
      this.resource.mainCount();
    }, 50);
    return {
      bound: Math.round(carBound * 100) / 100,
      visitors: Math.round(carVisitors * 100) / 100,
      sum: Math.round(sumCar * 100) / 100,
      carToApartments: carToApartments
    };
  }
  subresourceCalculationBike(selectedIndex, subresourcInput) {
    const usage = this.inputs.input.objectArray;
    let bikeBound;
    let bikeVisitors;
    if (this.type === "others") {
      console.log(subresourcInput);
      bikeBound = subresourcInput.others.input_others__bikeBound.value;
      bikeVisitors = subresourcInput.others.input_others__bikeVisitors.value;
    } else {
      bikeBound =
        ((subresourcInput.hppInput.input.value /
          usage[selectedIndex].values_2.hpp) *
          usage[selectedIndex].values_2.bounded) /
        100;
      bikeVisitors =
        ((subresourcInput.hppInput.input.value /
          usage[selectedIndex].values_2.hpp) *
          usage[selectedIndex].values_2.visitors) /
        100;
    }

    let sumBike = Number(bikeBound) + Number(bikeVisitors);

    return {
      bound: Math.round(bikeBound * 100) / 100,
      visitors: Math.round(bikeVisitors * 100) / 100,
      sum: Math.round(sumBike * 100) / 100,
    };
  }


  countCarToApartment(
    carToApartments,
    carSum,
    boudnOrVisitors,
    boudnOrVisitorsCount
  ) {
    let resource;
    if (carToApartments > 0 && carToApartments * 2 < carSum) {
      resource = (carToApartments * 2 * boudnOrVisitors) / 100;
    } else {
      resource = boudnOrVisitorsCount;
    }

    return resource;
  }

}
