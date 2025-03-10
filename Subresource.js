import Inputs from "./Inputs.js";
import Resource from "./Resource.js";
import MainBloks from "./MainBloks.js";

export default class Subresource {
  constructor(data, type, inputs, variantCounter, subrsourceHTML) {
    this.variantCounter = variantCounter;
    this.type = type;
    this.inputs = inputs;
    this.data = data;
    this.inputsClass = new Inputs(this.data);
    this.mainBloks = new MainBloks();
    this.subrsourceHTML = subrsourceHTML;

    this.resource = new Resource(variantCounter, this.inputs, this.data);
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
    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("subersources__description");
    descriptionContainer.appendChild(number.mainElement);
    descriptionContainer.appendChild(name.mainElement);

    const subresourcInput = this.subresourceInput();

    const subresourcResource = this.subresourceResource(subresourcInput);
    bodyContainer.appendChild(descriptionContainer);

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

    arrow.classList.add("pointer");
    p.innerHTML = title;
    titleEl.appendChild(p);
    titleEl.appendChild(arrow);
    console.log(title)

            // If it's subresource count
            if(title === "Mezivýpočet"){
              arrow.classList.add("esri-icon-down-arrow")
              bodyEl.style.display = "none"
          }else{
              arrow.classList.add("esri-icon-up-arrow")
          }
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

    let subresource_input_container = document.createElement("div");
    subresource_input_container.classList.add("subresource_input_container");

    subresource_input_container.classList.add("inputType_" + this.type);

    const inputElements = this.subresourceTogleElement("Vstupní parametry");
    inputElements.body.appendChild(subresource_input_container);
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
      subresource_input_container.appendChild(input_others.input_others_div);
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
        subresource_input_container.appendChild(
          inputs_appartments.inputs_appartments_div
        );

        // Adding class to element
        inputs_appartments.input.classList.add("input_aprtments_" + this.variantCounter);
      }

      // CREATE INPUT HPPP
      hppInput = this.inputsClass.inputsHpp();
      subresource_input_container.appendChild(hppInput.inputs_hpp_div);
      // Adding class to element
      hppInput.input.classList.add("input_hpp");

      // CREATE INPUT PRODUCTION
      if (this.type === "production") {
        inputs_production = this.inputsClass.inputsProduction();
        inputs_production.inputs_production_div.style.display = "block";
        subresource_input_container.appendChild(
          inputs_production.inputs_production_div
        );
        // Adding class to element
        inputs_production.select.classList.add("input_production_" + this.variantCounter);
      }

      if (this.type === "largeStore") {
        // Adding class to element
        hppInput.input.classList.add("largeStore_hpp_" + this.variantCounter);
      }
    }
    return {
      mainElement: subresource_input,
      others: input_others,
      housingApparments: inputs_appartments,
      hppInput: hppInput,
      production: inputs_production,
    };
  }

  subresourceResource(subresourcInput) {
    let subresource_resource = document.createElement("div");
    subresource_resource.classList.add("subresource_resource");
    const inputElements = this.subresourceTogleElement("Mezivýpočet");
    subresource_resource.appendChild(inputElements.title);
    subresource_resource.appendChild(inputElements.body);

    let selectedIndex = this.inputs.input.inputs_usage.selectedIndex;
    if (selectedIndex > 0) {
      selectedIndex = selectedIndex + 1;
    }

    let carElement = this.mainBloks.createTable(
      "Osobní atuomobil",
      ["Vázana", "Návštěvnická", "Celkem"],
      [0, 0, 0]
    );

    inputElements.body.appendChild(carElement.mainElement);

    let appartmentsValues;
    if (this.type === "housing") {

      let appartmentsSubtitle = this.mainBloks.createColumns(
        ["<i>Po přepočtu max. 2 stání na byt</i>"],
        "subTitle"
      );
      appartmentsValues = this.mainBloks.createColumns([0, 0, 0], "value");
      const inputValue = appartmentsValues

      this.addingResourceCssClass(
        inputValue.values,
        inputValue.values,
        "Apartments"
      );
      carElement.mainElement.appendChild(appartmentsSubtitle.mainElement);
      carElement.mainElement.appendChild(appartmentsValues.mainElement);


    }else{
      this.addingResourceCssClass(
        carElement.values,
        carElement.values,
        "Osobní atuomobil"
      );

    }
    let bikeElement = this.mainBloks.createTable(
      "Jízdní kola",
      ["Vázana", "Návštěvnická", "Celkem"],
      [0, 0, 0]
    );


    this.addingResourceCssClass(
      bikeElement.values,
      bikeElement.values,
      "Jízdní kola"
    );

    inputElements.body.appendChild(bikeElement.mainElement);

    this.subresourceChange(
      this.type,
      bikeElement.values,
      carElement.values,
      selectedIndex,
      subresourcInput,
      appartmentsValues
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

    if(type === "production"){

      subresourcInput.production.select.addEventListener("change", () => {
        this.calculateOnChange(
          bikeElement,
          carElement,
          selectedIndex,
          subresourcInput,
          carApartmentElement
        );
      });
    }
    if (type === "housing") {
      subresourcInput.housingApparments.input.addEventListener("change", () => {
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
  }

  calculateOnChange(
    bikeElement,
    carElement,
    selectedIndex,
    subresourcInput,
    carApartmentElement
  ) {
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

    bikeElement.values[0].innerHTML = bike.bound;
    bikeElement.values[1].innerHTML = bike.visitors;
    bikeElement.values[2].innerHTML = bike.sum;

    carElement.values[0].innerHTML = car.bound;
    carElement.values[1].innerHTML = car.visitors;
    carElement.values[2].innerHTML = car.sum;

    if (carApartmentElement) {
      carApartmentElement.values[0].innerHTML = car.carToApartments.bound;
      carApartmentElement.values[1].innerHTML = car.carToApartments.visitors;
      carApartmentElement.values[2].innerHTML = car.carToApartments.sum;
    }
  }


  addingResourceCssClass(bound, visitors, title) {
    // Adding class for Resourece count

    if (title === "Jízdní kola") {
      bound.values[0].classList.add(
        "resource_bike__bound_" + this.variantCounter
      );
      visitors.values[1].classList.add(
        "resource_bike__visitors_" + this.variantCounter
      );
    }

    if (title === "Apartments") {
      
      bound[0].classList.add(
        "resource_carHousing__bound_" + this.variantCounter
      );
      visitors[1].classList.add(
        "resource_carHousing__visitors_" + this.variantCounter
      );
    }
    if(title === "Osobní atuomobil"){

      if(this.type !== "housing"){
        bound.values[0].classList.add(
          "resource_carOthers__bound_" + this.variantCounter
        );
        visitors.values[1].classList.add(
          "resource_carOthers__visitors_" + this.variantCounter
        );
      }

      if(this.type === "healthcare"){

        visitors.values[1].classList.add(
          "resource_healthcare__visitors_" + this.variantCounter
        );
      }
      if(this.type === "largeStore"){
        visitors.values[1].classList.add(
          "resource_largeStore__visitors_" + this.variantCounter
        );
      }
     
    }
  }

  subresourceInputChange(car, bike, selectedIndex, subresourcInput) {
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

      car.values[0].innerHTML = Math.round(carBound * 100) / 100;
      car.values[1].innerHTML = Math.round(carVisitors * 100) / 100;
      bikevalues[0].innerHTML = Math.round(bikeBound * 100) / 100;
      bike.values[1].innerHTML = Math.round(bikeVisitors * 100) / 100;

      car.values[2].innerHTML = Math.round(sumCar * 100) / 100;
      bike.values[2].innerHTML = Math.round(sumBike * 100) / 100;

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
        ((subresourcInput.hppInput.input.value /
          subresourcInput.production.select.value) *
          usage[selectedIndex].values_1.bounded) /
        100;
      carVisitors =
        ((subresourcInput.hppInput.input.value /
          subresourcInput.production.select.value) *
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

      let sumCarApartments = boundApartment + visitorsApartment;

      carToApartments = {
        bound: Math.round(boundApartment * 100) / 100,
        visitors: Math.round(visitorsApartment * 100) / 100,
        sum: Math.round(sumCarApartments * 100) / 100,
      };
    }

    let sumCar = Number(carBound) + Number(carVisitors);
    setTimeout(() => {
      this.resource.mainCount();
    }, 50);
    return {
      bound: Math.round(carBound * 100) / 100,
      visitors: Math.round(carVisitors * 100) / 100,
      sum: Math.round(sumCar * 100) / 100,
      carToApartments: carToApartments,
    };
  }
  subresourceCalculationBike(selectedIndex, subresourcInput) {
    const usage = this.inputs.input.objectArray;
    let bikeBound;
    let bikeVisitors;
    if (this.type === "others") {
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
