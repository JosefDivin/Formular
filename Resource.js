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
    let largeStore_hpp = document.querySelector(".largeStore_hpp");
    console.log("ZMENI<LOOS DSE SOTJSEOTS ETJIO F");
    let resource_carOthers__bound__bound = document.querySelectorAll(
      ".resource_carOthers__bound_" + this.variantCounter
    );
    let selectorHousing = ".resource_carHousing__bound_" + this.variantCounter;
    console.log(selectorHousing);
    let resource_carHousing__bound = document.querySelector(selectorHousing);
    let resource_carHousing__visitors = document.querySelector(
      ".resource_carHousing__visitors_" + this.variantCounter
    );
    console.log(tableElements);
    console.log(".resource_carHousing__visitors_" + this.variantCounter);

    if (largeStore_hpp) {
      console.log(largeStore_hpp.value);

      console.log(tableElements);
    }
    if (resource_carHousing__visitors) {
      console.log(resource_carHousing__visitors.innerHTML);
      console.log(resource_carHousing__bound.innerHTML);

      this.buildingSubresults(tableElements.subResourceCarHousingTable);
    }
    if (resource_carOthers__bound__bound) {
      this.othersSubresults(tableElements.subResourceCarOthersTable);
    }
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

    if (table.objektArray[3].tableRow.vistiors.innerHTML === "0.15") {
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
    console.log(countBoun);

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

    if (table.objektArray[3].tableRow.vistiors.innerHTML === "0.15") {
      const visitorsMax =
        Number(table.objektArray[3].tableRow.vistiors.innerHTML) *
        Number(countVisitors);
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
      "Osobní automobil"
    );
    // SUBRESUTS
    let subResourceCar = this.mainBloks.createTogleElement(
      Car.pasiveElement,
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
    let resoultsCar = this.mainBloks.createTogleElement(
      Car.pasiveElement,
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
        console.log(this.inputs.input.input_zone.value);
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
        iEl.innerHTML = this.maxCoeficient(this.inputs.input.input_zone.value);
        resoultsCar.pasiveElement.appendChild(iEl);
      }
    }

    tableElements = {
      subResourceCarHousingTable: subResourceCarHousingTable,
      subResourceCarOthersTable: subResourceCarOthersTable,
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

  setZone() {

    const selectedZonID = his.inputs.input.input_zone.selectedIndex;
    const objectArrayHaus = tableElements.subResourceCarHousingTable.objektArray
    const objectArrayOthers = tableElements.subResourceCarOthersTable.objektArray
    objectArrayHaus[1].tableRow.bound.innerHTML =
      this.data.zons[Number(selectedZonID)].related.min;
    objectArrayHaus[1].tableRow.vistiors.innerHTML =
      this.data.zons[Number(selectedZonID)].visitors.min;

    objectArrayHaus[3].tableRow.bound.innerHTML =
      this.data.zons[Number(selectedZonID)].related.max;
    objectArrayHaus[3].tableRow.vistiors.innerHTML =
      this.data.zons[Number(selectedZonID)].visitors.max;

    objectArrayOthers[1].tableRow.bound.innerHTML =
      this.data.zons[Number(selectedZonID)].related.min;
    objectArrayOthers[1].tableRow.vistiors.innerHTML =
      this.data.zons[Number(selectedZonID)].visitors.min;

    objectArrayOthers[3].tableRow.bound.innerHTML =
      this.data.zons[Number(selectedZonID)].related.max;
    objectArrayOthers[3].tableRow.vistiors.innerHTML =
      this.data.zons[Number(selectedZonID)].visitors.max;

    this.mainCount();
  }

  maxCoeficient(zon) {
    const selectedZon = this.data.zons[zon];
    if (selectedZon === "00") {
      return `*koeficient MAX dle zóny ${zon} činí 0.15`;
    } else {
      return `*koeficient MAX dle zóny ${zon} není určen`;
    }
  }

  createBikeElement(resourceHTML) {
    console.log(resourceHTML);
    let resoults = resourceHTML;
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");

    h1.innerHTML = "Výsledky";
    resoults.appendChild(h1);

    h2.innerHTML = "Jízdní kola";
    resoults.appendChild(h2);
    tableElements = this.subResouldsElement(3, "Základní počet stání");
    tableResourceBike = this.subResouldsElement(
      3,
      "<p><span>MINIMÁLNÍ</span> PŘÍPUSTNÝ POČET STÍNÍ</p>"
    );
    resoults.appendChild(tableElements.mainDiv);
    resoults.appendChild(tableResourceBike.mainDiv);

    return {
      table: tableElements,
    };
  }

  calculateBike() {
    let resource_bike__bound = document.querySelectorAll(
      ".resource_bike__bound_" + this.variantCounter
    );
    let resource_bike__visitors = document.querySelectorAll(
      ".resource_bike__visitors_" + this.variantCounter
    );

    let boundCount = 0;
    let visitorsCount = 0;
    for (let i = 0; i < resource_bike__visitors.length; i++) {
      boundCount += Number(resource_bike__bound[i].innerHTML);
      visitorsCount += Number(resource_bike__visitors[i].innerHTML);
    }

    tableElements.bound.innerHTML = boundCount;
    tableElements.visitors.innerHTML = visitorsCount;
    tableElements.sum.innerHTML = boundCount + visitorsCount;
    tableResourceBike.bound.innerHTML = Math.round(boundCount);
    tableResourceBike.visitors.innerHTML = Math.round(visitorsCount);
    tableResourceBike.sum.innerHTML =
      Math.round(boundCount) + Math.round(visitorsCount);

    tableResourceBike.bound.classList.add("boltText");
    tableResourceBike.visitors.classList.add("boltText");
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
