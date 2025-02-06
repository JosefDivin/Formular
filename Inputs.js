export default class Inputs {
  constructor(data) {
    this.json = data;

    this.mainTab = data.mainTab;
  
    this.inputsHTML = document.createElement("div");
    this.inputsHTML.classList.add("inputs")
    this.input = this.inputs();

    this.inputsHTML.appendChild(this.input.inputsDIV);
  }

  inputs() {
    const inputsDIV = document.createElement("div");
    const inputs_usage = this.inputsUsage();
    const inputs_apartments = this.inputsAppartments()

    const inputs_hpp = this.inputsHpp();
    const inputs_production = this.inputsProduction();

    const input_others = this.input_others();


    inputsDIV.appendChild(inputs_usage);
    inputsDIV.appendChild(inputs_apartments.inputs_appartments_div);
    inputsDIV.appendChild(inputs_hpp.inputs_hpp_div);
    
    inputsDIV.appendChild(inputs_production.inputs_production_div);
    inputsDIV.appendChild(input_others.input_others_div);
    return {
      inputsDIV: inputsDIV,
      inputs_usage: inputs_usage,
      inputs_apartments: inputs_apartments,
      inputs_hpp: inputs_hpp,
      inputs_production: inputs_production,
      input_others: input_others
    };
  }

  inputsUsage() {
    // Create selector by usage
    const inputs_usage = document.createElement("select");
    inputs_usage.classList.add("inputs_usage");
    const createOption = (name, id, i) => {
      let option = document.createElement("option");

      option.innerHTML = id + " - " + name;
      option.value = id + " - " + name;
      changeColor(option, i);
      inputs_usage.appendChild(option);
    };

    const changeColor = (option, num) => {
      if (isOdd(num) === 0) {
        option.classList.add("opptionColor_grey");
      }
    };

    const isOdd = (num) => {
      return num % 2;
    };

    this.objectArray = [];
    let counter = 0;
    let selector = 0;
    for (let i = 0; i < this.mainTab.length; i++) {
      for (let k = 0; k < this.mainTab[i].usage.length; k++) {

        this.objectArray.push(this.mainTab[i].usage[k]);
        if (counter !== 1) {
          createOption(this.mainTab[i].usage[k].name, this.mainTab[i].id, i);
          selector++;
        }
        counter++;
      }
    }

    return inputs_usage;
  }

  inputsHpp() {
    const inputs_hpp = document.createElement("div");
    const input = document.createElement("input");
    inputs_hpp.classList.add("inputs_hpp");
    let p = document.createElement("p");
    p.innerHTML = "Navržená HPP [m2]";

    input.type = "number";
    input.value = 0;

    inputs_hpp.appendChild(p);
    inputs_hpp.appendChild(input);

    return {
      inputs_hpp_div: inputs_hpp,
      input: input,
    };
  }

  inputsAppartments() {
    const inputs_appartments = document.createElement("div");
    const input = document.createElement("input");
    inputs_appartments.classList.add("inputs_appartments");
    let p = document.createElement("p");
    p.innerHTML = "Počet bytů (při uplanění max. 2 stání na byt)";

    input.type = "number";
    input.value = 0;

    inputs_appartments.appendChild(p);
    inputs_appartments.appendChild(input);

    return {
      inputs_appartments_div: inputs_appartments,
      input: input,
    };
  }

  inputsProduction() {
    const inputs_production = document.createElement("div");
    const p = document.createElement("p");
    const select = document.createElement("select");
    const inputsValues = [800, 600, 400, 200];

    inputs_production.classList.add("inputs_production");

    p.innerHTML = "HPP / 1 stání [m2]";

    const createOption = (value) => {
      const option = document.createElement("option");
      option.value = value;
      option.innerHTML = value;
      select.appendChild(option);
    };

    for (let i = 0; i < inputsValues.length; i++) {

      createOption(inputsValues[i]);
    }

    inputs_production.appendChild(p);
    inputs_production.appendChild(select);
    return {
      inputs_production_div: inputs_production,
      select: select,
    };
  }

  input_others() {
    const input_others = document.createElement("div");
    input_others.classList.add("input_others");
    const h4 = document.createElement("h4");

    h4.innerHTML = "Základní počet stání";
    input_others.appendChild(h4)
    const inputOthers = (cssSelector) => {
      const h5 = document.createElement("h5");

      const title =
        cssSelector === "input_others__car"
          ? "Osobní automobily"
          : "Jízdní kola";

      h5.innerHTML = title;
      input_others.appendChild(h5);

      const inputsType = (type) => {
        const wraper = document.createElement("div");
        const p = document.createElement("p");
        const input = document.createElement("input");
        input.classList.add(cssSelector + type);
        const title = type === "Bound" ? "Vázaná" : "Návštěvnická";
        p.innerHTML = title;

        wraper.appendChild(p);
        wraper.appendChild(input);
        return {
          wraper: wraper,
          input: input,
        };
      };

      const visitors = inputsType("Visitors");
      const bound = inputsType("Bound");

      input_others.appendChild(visitors.wraper);
      input_others.appendChild(bound.wraper);

      return {
        input_others_bound: bound.input,
        input_others_visitors: visitors.input,
        
      };
    };

    const car = inputOthers("input_others__car");
    const bike = inputOthers("input_others__bike");

    return {
      input_others_div: input_others,
      input_others__carBound: car.input_others_bound,
      input_others__carVisitors: car.input_others_visitors,
      input_others__bikeBound: bike.input_others_bound,
      input_others__bikeVisitors: bike.input_others_visitors,
    };
  }
}
