let tableElements;
let tableResourceBike;
import MainBloks from "./MainBloks.js";
export default class Resource {
  constructor(variantCounter, inputs, data) {
    this.variantCounter = variantCounter;
    this.inputs = inputs;
    this.data = data;
    this.mainBloks = new MainBloks();
  }

  recouseTableTitle() {
    const tr = document.createElement("tr");
    const titleName = ["", "Vázaná", "Návštěvnická", "Celkem"];

    for (let i = 0; i < titleName.length; i++) {
      const th = document.createElement("th");
      th.innerHTML = titleName[i];
      tr.appendChild(th);
    }
    return tr;
  }

  recouseTableRow(type) {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    const bound = document.createElement("td");
    const vistiors = document.createElement("td");
    const sum = document.createElement("td");

    name.innerHTML = type;
    bound.innerHTML = 0.0;
    vistiors.innerHTML = 0.0;

    if (
      type === "Minimální požadovaný počet stání" ||
      type === "Maximální přípustný počet stání"
    ) {
      sum.innerHTML = 0.0;
    } else {
      if (type.slice(0, 10) === "Koeficient") {
        name.innerHTML =
          type +
          `<span class = subresurce_table__zone_${this.variantCounter}></span>`;
      }
      sum.classList.add("subresults_sum");
      sum.innerHTML = "";
    }

    tr.appendChild(name);
    tr.appendChild(bound);
    tr.appendChild(vistiors);
    tr.appendChild(sum);

    return {
      mainElement: tr,
      name: name,
      bound: bound,
      vistiors: vistiors,
      sum: sum,
    };
  }

  createSubresourcetable(inputHTML) {
    const resourceTitles = [
      "Základní počet stání",
      "Koeficient MIN dle zóny ",
      "Minimální požadovaný počet stání",
      "Koeficient MAX dle zóny ",
      "Maximální přípustný počet stání",
    ];

    const table = document.createElement("table");
    table.classList.add("resource_table");
    const tableTitle = this.recouseTableTitle();
    table.appendChild(tableTitle);
    inputHTML.appendChild(table);
    let objektArray = [];
    for (let i = 0; i < resourceTitles.length; i++) {
      const tableRow = this.recouseTableRow(resourceTitles[i]);
      table.appendChild(tableRow.mainElement);
      objektArray.push({
        tableRow: tableRow,
        name: resourceTitles[i],
      });
    }

    return {
      table: table,
      objektArray: objektArray,
    };
  }

  mainCount() {
    let largeStore_hpp = document.querySelector(
      ".resource_largeStore__visitors_" + this.variantCounter
    );
    let healthcare = document.querySelector(
      ".resource_healthcare__visitors_" + this.variantCounter
    );

    let resource_carOthers__bound__bound = document.querySelectorAll(
      ".resource_carOthers__bound_" + this.variantCounter
    );
    let selectorHousing = ".resource_carHousing__bound_" + this.variantCounter;

    let resource_carHousing__bound = document.querySelector(selectorHousing);
    let resource_carHousing__visitors = document.querySelector(
      ".resource_carHousing__visitors_" + this.variantCounter
    );

    if (largeStore_hpp || healthcare) {
      this.childernResoulds(tableElements);
    } else {
      tableElements.resource[4].values.values[1].innerHTML = 0;
      tableElements.resource[4].values.values[2].innerHTML = 0;
    }
    if (resource_carHousing__visitors) {
      this.buildingSubresults(tableElements.subResourceCarHousingTable);

      this.housingResource(tableElements, resource_carHousing__visitors);
    } else {
      tableElements.resource[2].values.values[0].innerHTML = "-";
    }
    if (resource_carOthers__bound__bound) {
      this.othersSubresults(tableElements.subResourceCarOthersTable);
    }
    this.maxStaniCount(tableElements);
    this.minStaniCount(tableElements);

    this.disabilityResource(tableElements);
    this.calculateBike(tableElements);
  }

  calculateBike(tableElements) {
    let bikeVisitors = ".resource_bike__visitors_" + this.variantCounter;
    let bikeBound = ".resource_bike__bound_" + this.variantCounter;
    let resource_bike__visitors = document.querySelectorAll(bikeVisitors);
    let resource_bike__bound = document.querySelectorAll(bikeBound);


    if (resource_bike__visitors.length !== 0) {
      let boundCount = 0;
      let visitorsCount = 0;
      for (let i = 0; i < resource_bike__visitors.length; i++) {
        boundCount += Number(resource_bike__bound[i].innerHTML);
        visitorsCount += Number(resource_bike__visitors[i].innerHTML);
      }

      tableElements.bikeSubresoults.values.values[0].innerHTML = boundCount;
      tableElements.bikeSubresoults.values.values[1].innerHTML = visitorsCount;

      tableElements.bikeResoults.values.values[0].innerHTML =
        Math.ceil(boundCount);
      tableElements.bikeResoults.values.values[1].innerHTML =
        Math.round(visitorsCount);
      tableElements.bikeResoults.values.values[2].innerHTML =
        Math.round(visitorsCount) + Math.ceil(boundCount);
    }
  }

  maxStaniCount(tableElements) {
    let boundInnerCar =
      tableElements.subResourceCarHousingTable.objektArray[4].tableRow.bound
        .innerHTML;
    let boundInnerOther =
      tableElements.subResourceCarOthersTable.objektArray[4].tableRow.bound
        .innerHTML;

    if (boundInnerCar !== "-" || boundInnerOther !== "-") {
      if (boundInnerCar === "-") {
        boundInnerCar = 0;
      }
      if (boundInnerOther === "-") {
        boundInnerOther = 0;
      }

      // Round resource to next whole number
      tableElements.resource[0].values.values[0].innerHTML = Math.ceil(
        Number(boundInnerCar) + boundInnerOther
      );
    } else {
      tableElements.resource[0].values.values[0].innerHTML = "-";
    }

    let boundInnerCarVisitors =
      tableElements.subResourceCarHousingTable.objektArray[4].tableRow.vistiors
        .innerHTML;
    let boundInnerOtherVisitors =
      tableElements.subResourceCarOthersTable.objektArray[4].tableRow.vistiors
        .innerHTML;
    if (boundInnerCarVisitors != "-" || boundInnerOtherVisitors != "-") {
      if (boundInnerCarVisitors === "-") {
        boundInnerCarVisitors = 0;
      }
      if (boundInnerOtherVisitors === "-") {
        boundInnerOtherVisitors = 0;
      }
      // Round number
      const resourceCount = Math.round(
        Number(boundInnerCarVisitors) + Number(boundInnerOtherVisitors)
      );
      tableElements.resource[0].values.values[1].innerHTML = resourceCount;
    } else {
      tableElements.resource[0].values.values[1].innerHTML = "-";
    }
  }

  minStaniCount(tableElements) {
    let boundInnerCar =
      tableElements.subResourceCarHousingTable.objektArray[2].tableRow.bound
        .innerHTML;
    let boundInnerOther =
      tableElements.subResourceCarOthersTable.objektArray[2].tableRow.bound
        .innerHTML;

    if (boundInnerCar != "-" || boundInnerOther !== "-") {
      if (boundInnerCar === "-") {
        boundInnerCar = 0;
      }
      if (boundInnerOther === "-") {
        boundInnerOther = 0;
      }
      // Round resource to next whole number
      tableElements.resource[1].values.values[0].innerHTML = Math.ceil(
        Number(boundInnerCar) + Number(boundInnerOther)
      );
    } else {
      tableElements.resource[1].values.values[0].innerHTML = "-";
    }

    let boundInnerCarVisitors =
      tableElements.subResourceCarHousingTable.objektArray[2].tableRow.vistiors
        .innerHTML;
    let boundInnerOtherVisitors =
      tableElements.subResourceCarOthersTable.objektArray[2].tableRow.vistiors
        .innerHTML;

    if (boundInnerCarVisitors != "-" || boundInnerOtherVisitors != "-") {
      if (boundInnerCarVisitors === "-") {
        boundInnerCarVisitors = 0;
      }
      if (boundInnerOtherVisitors === "-") {
        boundInnerOtherVisitors = 0;
      }
      // Round number
      const resourceCount = Math.round(
        Number(boundInnerCarVisitors) + Number(boundInnerOtherVisitors)
      );
      tableElements.resource[1].values.values[1].innerHTML = resourceCount;
    } else {
      tableElements.resource[1].values.values[1] = "-";
    }

    const countSum =
      Number(tableElements.resource[1].values.values[0].innerHTML) +
      Number(tableElements.resource[1].values.values[1].innerHTML);
    tableElements.resource[1].values.values[2].innerHTML = countSum;
  }

  housingResource(tableElements) {
    const boundCar = Number(
      tableElements.subResourceCarHousingTable.objektArray[0].tableRow.bound
        .innerHTML
    );
    const boundCarKoeficient = Number(
      tableElements.subResourceCarHousingTable.objektArray[1].tableRow.bound
        .innerHTML
    );
    tableElements.resource[2].values.values[0].innerHTML = Math.ceil(
      boundCar * boundCarKoeficient
    );
  }

  disabilityResource(tableElements) {
    const minStani = Number(
      tableElements.resource[1].values.values[1].innerHTML
    );
    let disabilityCount = 0;
    if (minStani > 500) {
      disabilityCount = Math.floor(minStani * 0.02);
    } else {
      disabilityCount = returnCoeficient(minStani);
    }
    tableElements.resource[3].values.values[1].innerHTML = disabilityCount;
    tableElements.resource[3].values.values[2].innerHTML = disabilityCount;
    function returnCoeficient(inputValue) {
      let countArray = [0, 2, 21, 41, 61, 81, 101, 151, 201, 301, 401];
      for (let i = 0; i < countArray.length; i++) {
        if (countArray[i] > inputValue) {
          return countArray[i - 1];
        }
        if (i === countArray.length - 1) {
          return countArray[countArray.length - 1];
        }
      }
    }
  }

  childernResoulds(tableElements) {
    let largeStore_hpp = document.querySelector(
      ".largeStore_hpp_" + this.variantCounter
    );
    let largeStore_visitors = document.querySelector(
      ".resource_largeStore__visitors_" + this.variantCounter
    );
    let healthcare_visitors = document.querySelector(
      ".resource_healthcare__visitors_" + this.variantCounter
    );
    let largeStoreVisitors = 0;
    if (largeStore_visitors) {
      largeStoreVisitors = Number(largeStore_visitors.innerHTML);
    }
    let helthcareVisitors = 0;
    if (healthcare_visitors) {
      helthcareVisitors = Number(healthcare_visitors.innerHTML);
    }

    let coeficint = 0;
    if (largeStore_hpp.value > 5000) {
      coeficint = largeStoreVisitors;
    }
    const visitors = Number(
      tableElements.subResourceCarOthersTable.objektArray[1].tableRow.vistiors
        .innerHTML
    );

    let childernResoults = ((coeficint + helthcareVisitors) * visitors) / 100;

    tableElements.resource[4].values.values[1].innerHTML =
      Math.floor(childernResoults);
    tableElements.resource[4].values.values[2].innerHTML =
      Math.floor(childernResoults);
  }

  buildingSubresults(table) {
    let resource_carHousing__bound = document.querySelector(
      ".resource_carHousing__bound_" + this.variantCounter
    );
    let resource_carHousing__visitors = document.querySelector(
      ".resource_carHousing__visitors_" + this.variantCounter
    );
    table.objektArray[0].tableRow.bound.innerHTML =
      resource_carHousing__bound.innerHTML;
    table.objektArray[0].tableRow.vistiors.innerHTML =
      resource_carHousing__visitors.innerHTML;

    const minHousingBound =
      Number(table.objektArray[0].tableRow.bound.innerHTML) *
      Number(table.objektArray[1].tableRow.bound.innerHTML);
    const minHousingVisitors =
      Number(table.objektArray[0].tableRow.vistiors.innerHTML) *
      Number(table.objektArray[1].tableRow.vistiors.innerHTML);
    table.objektArray[2].tableRow.bound.innerHTML =
      Math.round(minHousingBound * 100) / 100;
    table.objektArray[2].tableRow.vistiors.innerHTML =
      Math.round(minHousingVisitors * 100) / 100;
    table.objektArray[2].tableRow.sum.innerHTML =
      Math.round((minHousingBound + minHousingVisitors) * 100) / 100;

    table.objektArray[4].tableRow.vistiors.innerHTML = "-";
    table.objektArray[4].tableRow.bound.innerHTML = "-";
    table.objektArray[4].tableRow.sum.innerHTML = "-";

    if (table.objektArray[3].tableRow.vistiors.innerHTML !== "-") {
      const visitorsMax =
        Number(table.objektArray[3].tableRow.vistiors.innerHTML) *
        Number(table.objektArray[0].tableRow.vistiors.innerHTML);
      table.objektArray[4].tableRow.vistiors.innerHTML =
        Math.round(visitorsMax * 100) / 100;
    }
  }

  othersSubresults(table) {
    let resource_carOthers__bound__bound = document.querySelectorAll(
      ".resource_carOthers__bound_" + this.variantCounter
    );
    let resource_carOthers__visitors = document.querySelectorAll(
      ".resource_carOthers__visitors_" + this.variantCounter
    );

    let countBoun = 0;
    let countVisitors = 0;
    for (let i = 0; i < resource_carOthers__bound__bound.length; i++) {
      countBoun =
        countBoun + Number(resource_carOthers__bound__bound[i].innerHTML);
      countVisitors =
        countVisitors + Number(resource_carOthers__visitors[i].innerHTML);
    }

    table.objektArray[0].tableRow.bound.innerHTML =
      Math.round(countBoun * 100) / 100;
    table.objektArray[0].tableRow.vistiors.innerHTML =
      Math.round(countVisitors * 100) / 100;

    const minHousingBound =
      Number(countBoun) * Number(table.objektArray[1].tableRow.bound.innerHTML);
    const minHousingVisitors =
      Number(countVisitors) *
      Number(table.objektArray[1].tableRow.vistiors.innerHTML);
    table.objektArray[2].tableRow.bound.innerHTML =
      Math.round(minHousingBound * 100) / 100;
    table.objektArray[2].tableRow.vistiors.innerHTML =
      Math.round(minHousingVisitors * 100) / 100;
    table.objektArray[2].tableRow.sum.innerHTML =
      Math.round((minHousingBound + minHousingVisitors) * 100) / 100;

    table.objektArray[4].tableRow.vistiors.innerHTML = "-";
    table.objektArray[4].tableRow.bound.innerHTML = "-";
    table.objektArray[4].tableRow.sum.innerHTML = "-";

    if (table.objektArray[3].tableRow.vistiors.innerHTML !== "-") {
      const visitorsMax =
        Number(table.objektArray[3].tableRow.vistiors.innerHTML) *
        Number(table.objektArray[0].tableRow.vistiors.innerHTML);
      table.objektArray[4].tableRow.vistiors.innerHTML =
        Math.round(visitorsMax * 100) / 100;
    }
  }
  crateElements(resourceHTML) {
    /********************/
    /* SUBRESOURCE CAR */
    /********************/
    // MAINELEMENT
    let Car = this.mainBloks.createTogleElement(
      resourceHTML,
      "togle_h1__title",
      "togle_h1__container",
      "Osobní automobilz"
    );

    /* BIke */
    let Bike = this.mainBloks.createTogleElement(
      resourceHTML,
      "togle_h1__title",
      "togle_h1__container",
      "Jízdní kola"
    );
    // SUBRESUTS
    /* Car */
    let subResourceCar = this.mainBloks.createTogleElement(
      Car.pasiveElement,
      "togle_h2__title",
      "togle_h2__container",
      "Mezivýpočet"
    );

    console.log(subResourceCar)
   
    /*  BIke */
    let subResourceBike = this.mainBloks.createTogleElement(
      Bike.pasiveElement,
      "togle_h2__title",
      "togle_h2__container",
      "Mezivýpočet"
    );

    // HAUSING
    let subResourceCarHousing = this.mainBloks.createTogleElement(
      subResourceCar.pasiveElement,
      "togle_h3__title",
      "togle_h3__container",
      "Bydlení"
    );
    let subResourceCarHousingTable = this.createSubresourcetable(
      subResourceCarHousing.pasiveElement
    );
    // OTHERS
    let subResourceCarOthers = this.mainBloks.createTogleElement(
      subResourceCar.pasiveElement,
      "togle_h3__title",
      "togle_h3__container",
      "Ostatní"
    );
    let subResourceCarOthersTable = this.createSubresourcetable(
      subResourceCarOthers.pasiveElement
    );

    // RESULTS
    /* Car */
    let resoultsCar = this.mainBloks.createTogleElement(
      Car.pasiveElement,
      "togle_h2__title",
      "togle_h2__container",
      "Výsledky"
    );

    /*  BIke */
    let resoultsBike = this.mainBloks.createTogleElement(
      Bike.pasiveElement,
      "togle_h2__title",
      "togle_h2__container",
      "Výsledky"
    );

    let resourceTitleArray = [
      "MAXIMÁLNÍ PŘÍPUSTNÝ POČET STÁNÍ",
      "MINIMÁLNÍ POŽADOVANÝ POČET STÁNÍ",
      "Z TOHO PRO ÚČELY BYDLENÍ (k § 26 odst. 5)",
      "Z TOHO VYHRAZENÝCH PRO TĚŽCE  POHYBOVĚ POSTIŽENÉ",
      "Z TOHO VYHRAZENÝCH PRO DĚTI V KOČÁRKU",
    ];
    let iEl;
    let elementArray = [];
    for (let i = 0; i < resourceTitleArray.length; i++) {
      let titleText = resourceTitleArray[i];
      if (i === 0) {
        titleText = resourceTitleArray[i] + "*";
      }

      let element = this.mainBloks.createTable(
        titleText,
        ["Vázaná", "Návštěvnická", "Celkem"],
        ["-", "-", "-"]
      );
      elementArray.push(element);
      resoultsCar.pasiveElement.appendChild(element.mainElement);
      if (i === 0) {
        iEl = document.createElement("i");
        iEl.innerHTML = this.maxCoeficient(
          this.inputs.input.input_zone.selectedIndex
        );
        resoultsCar.pasiveElement.appendChild(iEl);
      }
    }

    let bikeSubresoutls = this.mainBloks.createTable(
      "Základní počet stání",
      ["Vázaná", "Návštěvnická"],
      ["-", "-"]
    );
    subResourceBike.pasiveElement.appendChild(bikeSubresoutls.mainElement);

    let bikeResoults = this.mainBloks.createTable(
      "MINIMÁLNÍ POŽADOVANÝ POČET STÁNÍ",
      ["Vázaná", "Návštěvnická", "Celkem"],
      ["-", "-", "-"]
    );
    resoultsBike.pasiveElement.appendChild(bikeResoults.mainElement);

    let boldArray = [
      ...bikeResoults.values.values,
      ...elementArray[0].values.values,
      ...elementArray[1].values.values,
      ...elementArray[2].values.values,
      ...elementArray[3].values.values,
      ...elementArray[4].values.values,
    ];

    this.setBold(boldArray);

    tableElements = {
      subResourceCarHousingTable: subResourceCarHousingTable,
      subResourceCarOthersTable: subResourceCarOthersTable,
      resource: elementArray,
      bikeSubresoults: bikeSubresoutls,
      bikeResoults: bikeResoults,
    };
    this.inputs.input.input_zone.addEventListener("change", () => {
      iEl.innerHTML = this.maxCoeficient(
        this.inputs.input.input_zone.selectedIndex
      );
      this.setZone();
    });
    // Set zone in star of app
    this.setZone();
  }

  setBold(inputArray) {
    let counter = 0;
    for (let i = 0; i < inputArray.length; i++) {
      counter++;
      if (counter === 3) {
        counter = 0;
      } else {
        inputArray[i].style.fontWeight = "bold";
      }
    }
  }

  setZone() {
    const selectedZonID = this.inputs.input.input_zone.selectedIndex;
    const objectArrayHaus =
      tableElements.subResourceCarHousingTable.objektArray;
    const objectArrayOthers =
      tableElements.subResourceCarOthersTable.objektArray;
    objectArrayHaus[1].tableRow.bound.innerHTML =
      this.data.zons[Number(selectedZonID)].related.min;
    objectArrayHaus[1].tableRow.vistiors.innerHTML =
      this.data.zons[Number(selectedZonID)].visitors.min;

    objectArrayHaus[3].tableRow.bound.innerHTML =
      this.data.zons[Number(selectedZonID)].related.max;
    objectArrayHaus[3].tableRow.vistiors.innerHTML =
      this.data.zons[Number(selectedZonID)].visitors.max;

    objectArrayOthers[1].tableRow.bound.innerHTML =
      this.data.zons[Number(selectedZonID)].visitors.min;
    objectArrayOthers[1].tableRow.vistiors.innerHTML =
      this.data.zons[Number(selectedZonID)].visitors.min;

    objectArrayOthers[3].tableRow.bound.innerHTML =
      this.data.zons[Number(selectedZonID)].visitors.max;
    objectArrayOthers[3].tableRow.vistiors.innerHTML =
      this.data.zons[Number(selectedZonID)].visitors.max;

    this.mainCount();
  }

  maxCoeficient(zon) {
    const selectedZonMax = this.data.zons[zon].visitors.max;
    const zonSelect = this.data.zons[zon].zon;

    if (selectedZonMax !== "-") {
      return `*koeficient MAX dle zóny ${zonSelect} činí ${selectedZonMax}`;
    } else {
      return `*koeficient MAX dle zóny ${zonSelect} není určen`;
    }
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

  subResouldsElement(numberOfColom, title) {
    const div = document.createElement("div");
    const titleDiv = document.createElement("div");
    const colomnTitle = document.createElement("div");
    const valueElement = document.createElement("div");
    div.classList.add("resoulds");
    const nemeOfColomn = ["Vázana", "Návštěvnická", "Celkem"];
    titleDiv.innerHTML = title;
    div.appendChild(titleDiv);
    div.appendChild(colomnTitle);
    div.appendChild(valueElement);

    titleDiv.classList.add("resource_table__title");
    colomnTitle.classList.add("resource_table__colomnTitle");
    valueElement.classList.add("resource_table__colomnValue");
    let valueArray = [];
    for (let i = 0; i < numberOfColom; i++) {
      let titleColom = document.createElement("p");
      let value = document.createElement("p");
      titleColom.innerHTML = nemeOfColomn[i];
      value.innerHTML = "-";
      colomnTitle.appendChild(titleColom);
      valueElement.appendChild(value);
      valueArray.push(value);
    }

    let sum = null;
    if (numberOfColom > 2) {
      sum = valueArray[2];
    }
    return {
      mainDiv: div,
      titleDiv: titleDiv,
      bound: valueArray[0],
      visitors: valueArray[1],
      sum: sum,
    };
  }
}
