export default class Count {
  constructor(inputs, variantsHTMLElement) {
    console.log(inputs);
    this.inputs = inputs;
    if (inputs) {
      this.variantsHTMLElement = variantsHTMLElement;
      this.containers = this.crateContainers();
      this.changeUseType();
      this.addButton();
    }
    this.type = "housing";
  }

  crateContainers() {
    let butonContainer = document.createElement("div");
    let subResoults = document.createElement("div");
    let resoults = document.createElement("div");
    let button = document.createElement("button");
    button.innerHTML = "Přidat";

    butonContainer.classList.add("addButton");
    subResoults.classList.add("subResoults");
    subResoults.classList.add("resoults");
    butonContainer.appendChild(button);

    this.variantsHTMLElement.appendChild(butonContainer);
    this.variantsHTMLElement.appendChild(subResoults);
    this.variantsHTMLElement.appendChild(resoults);
    return {
      addButton: button,
      subResoults: subResoults,
      resoults: resoults,
    };
  }

  createTitleElement(title) {
    let results_title = document.createElement("div");
    let p = document.createElement("p");
    let trash = document.createElement("div");
    let arrow = document.createElement("div");
    results_title.classList.add("subresults_title");
    trash.classList.add("esri-icon-trash");
    arrow.classList.add("esri-icon-up-arrow");
    trash.classList.add("pointer");
    arrow.classList.add("pointer");

    trash.classList.add("layerList_ikons");
    arrow.classList.add("layerList_ikons");
    trash.classList.add("div--hover");
    arrow.classList.add("div--hover");

    trash.title = "Odstranit";
    arrow.title = "Zavřít podrobný popis";

    const searchTerm = "(";
    const indexOfFirst = title.indexOf(searchTerm);
    if (indexOfFirst !== -1) {
      p.innerHTML = title.slice(0, indexOfFirst);
      p.title = title.slice(indexOfFirst);
      p.style.cursor = "help";
    } else {
      p.innerHTML = title;
    }

    results_title.appendChild(p);
    results_title.appendChild(trash);
    results_title.appendChild(arrow);

    return {
      titleElement: results_title,
      text: p,
      trash: trash,
      arrow: arrow,
    };
  }

  addButton() {
    this.containers.addButton.addEventListener("click", () => {
      console.log(this.inputs.input.inputs_usage.selectedIndex);
      let mainLement = document.createElement("div");
      const selectedIndex = this.inputs.input.inputs_usage.selectedIndex;
      const options = this.inputs.input.inputs_usage.childNodes;
      mainLement.classList.add("subResource_usage");
      mainLement.style.order = selectedIndex;
      let title = this.createTitleElement(this.inputs.input.inputs_usage.value);

      mainLement.appendChild(title.titleElement);
      this.containers.subResoults.appendChild(mainLement);

      let bodyContainer = this.subrsourceBody();

      title.arrow.addEventListener("click", () => {
        if (title.arrow.classList.contains("esri-icon-up-arrow")) {
          title.arrow.classList.add("esri-icon-down-arrow");
          title.arrow.classList.remove("esri-icon-up-arrow");
          title.arrow.title = "Otevři podrobný popis";
          bodyContainer.style.display = "none";
        } else {
          title.arrow.classList.add("esri-icon-up-arrow");
          title.arrow.classList.remove("esri-icon-down-arrow");
          title.arrow.title = "Zavři podrobný popis";
          bodyContainer.style.display = "block";
        }
      });

      mainLement.appendChild(bodyContainer);

      options[selectedIndex].hidden = true;

      this.removeElement(title.trash, mainLement, selectedIndex);
      this.selectFirstUnhideLine();
    });
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

    return div;
  }
  removeElement(trashButton, mainLement, selectedIndex) {
    trashButton.addEventListener("click", () => {
      const options = this.inputs.input.inputs_usage.childNodes;
      mainLement.remove();
      options[selectedIndex].hidden = false;
      this.selectFirstUnhideLine();
    });
  }

  selectFirstUnhideLine() {
    const usageSelector = this.inputs.input.inputs_usage;
    const options = this.inputs.input.inputs_usage.childNodes;

    for (let i = 0; i < options.length; i++) {
      if (options[i].hidden === false) {
        usageSelector.value = options[i].value;
        break;
      }
    }
  }

  subrsourceBody() {
    const bodyContainer = document.createElement("div");
    bodyContainer.classList.add("subresources_body");
    const usegeType = this.inputs.input.inputs_usage.value;
    const cislo = usegeType.slice(0, usegeType.indexOf(" "));
    const type = usegeType.slice(usegeType.indexOf("-") + 2);
    const number = this.createDescriptionText("Číslo:", cislo);
    const name = this.createDescriptionText("Účel užívání:", type);

    const subresourcInput = this.subresourceInput();

    const subresourcResource=this.subresourceResource()
    bodyContainer.appendChild(number);
    bodyContainer.appendChild(name);
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

    if (this.type === "others") {
      let input_others_div = this.sublayersInptuCopy(
        this.inputs.input.input_others.input_others_div
      );
      inputElements.body.appendChild(input_others_div);
    } else {
      if (this.type === "housing") {
        let inputs_appartments_div = this.sublayersInptuCopy(
          this.inputs.input.inputs_apartments.inputs_appartments_div
        );
        inputElements.body.appendChild(inputs_appartments_div);
      }
      let hppInptu = this.sublayersInptuCopy(
        this.inputs.input.inputs_hpp.inputs_hpp_div
      );
      inputElements.body.appendChild(hppInptu);

      if (this.type === "production") {
        let inputs_production_div = this.sublayersInptuCopy(
          this.inputs.input.inputs_production.inputs_production_div
        );

        inputs_production_div.childNodes[1].value =
          this.inputs.input.inputs_production.select.value;
        inputElements.body.appendChild(inputs_production_div);
      }
    }

    return {
      mainElement: subresource_input,
    };
  }

  subresourceResource(){
    let subresource_resource = document.createElement("div");
    subresource_resource.classList.add("subresource_resource");
    const inputElements = this.subresourceTogleElement("Mezi výpočet");
    subresource_resource.appendChild(inputElements.title);
    subresource_resource.appendChild(inputElements.body);
    return {
      mainElement: subresource_resource,
    };
  }

  sublayersInptuCopy(inputElement) {
    let elementCopy = inputElement.cloneNode(true);

    return elementCopy;
  }

  changeUseType() {
    let slect = this.inputs.input.inputs_usage;
    let input__apartmentNumbet =
      this.inputs.input.inputs_apartments.inputs_appartments_div;
    let inputs_hpp = this.inputs.input.inputs_hpp.inputs_hpp_div;
    let input_hppStani =
      this.inputs.input.inputs_production.inputs_production_div;
    let input_others = this.inputs.input.input_others.input_others_div;
    slect.addEventListener("click", () => {
      this.type = "remian";
      if (slect.selectedIndex === 0) {
        input__apartmentNumbet.style.display = "block";
        this.type = "housing";
      } else {
        input__apartmentNumbet.style.display = "none";
      }

      if (slect.selectedIndex === 4) {
        this.type = "largeStore";
      }
      if (slect.selectedIndex === 23) {
        this.type = "healthcare";
      }

      if (slect.selectedIndex === 28) {
        this.type = "production";
        input_hppStani.style.display = "block";
      } else {
        input_hppStani.style.display = "none";
      }

      if (slect.selectedIndex > 29) {
        this.type = "others";
        input_others.style.display = "block";
        inputs_hpp.style.display = "none";
      } else {
        input_others.style.display = "none";
        inputs_hpp.style.display = "block";
      }

      console.log(this.type);
    });
  }
}
