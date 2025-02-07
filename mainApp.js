import Inputs from "./Inputs";
import Carousel from "./carousel";
import variables from "./variables";
import Count from "./Count";

export default class MainApp {
  constructor(data) {
    this.json = data;
    this.mainTab = data.mainTab;
    const variants_button__add = document.querySelector(
      ".variants_button__add"
    );
    const variants_button__remove = document.querySelector(
      ".variants_button__remove"
    );
    variants_button__add.addEventListener("click", () => {
      this.addData();
    });

    variants_button__remove.addEventListener("click", () => {
      this.removeData();
    });
    this.carousel = new Carousel();
     this.data = data

     this.inputs =new Inputs(this.json);
  }
  addData() {
    let inputs = this.inputs.addAllInputs();
    
    const carousel = document.querySelector(".carousel");
    const variants = document.createElement("div");
    variants.classList.add("variants");

    // Add imputs form to main element
    variants.appendChild(inputs.inputsHTML);


    new Count( this.data ,inputs, variants)
    // Add carousel to main element
    carousel.appendChild(variants);

    this.checkVariantsNumberAddData();
  }

  removeData() {
    let variants_number = document.querySelector(".variants_number");
    const variants = document.querySelectorAll(".variants");
    if (confirm(variables.text.removeVariant) == true) {
      variants[Number(variants_number.innerHTML)-1].remove()  
    } 
   
    this.checkVariantsNumberRemove()
  }


  checkVariantsNumberRemove(){
    let variants_slider = document.querySelector(".variants_number");
    const variants = document.querySelectorAll(".variants");
    const variants_button__add = document.querySelector(
      ".variants_button__add"
    );
    const variants_button__remove = document.querySelector(
      ".variants_button__remove"
    );

    variants_slider.innerHTML = variants.length;
    
    if(variants.length === 0){
      variants_button__add.style.width = "100%";
      variants_button__remove.style.display = "none";
      variants_button__remove.style.width = "0";
    }else{
      variants_button__add.style.width = "50%";
      variants_button__remove.style.display = "block";
      variants_button__remove.style.width = "50%";
      this.carousel.uptadeCarousel(variants.length);
    }

    if (variants.length === 0 || variants.length === 1) {
      this.carousel.switchVariantArrors(false, false);
    } else {
      {
        this.carousel.switchVariantArrors(true, false);
      }
    }
  }

  checkVariantsNumberAddData() {
    let variants_slider = document.querySelector(".variants_number");
    const variants = document.querySelectorAll(".variants");
    const variants_button__add = document.querySelector(
      ".variants_button__add"
    );
    const variants_button__remove = document.querySelector(
      ".variants_button__remove"
    );

    variants_button__add.style.width = "50%";
    variants_button__remove.style.display = "block";
    variants_button__remove.style.width = "50%";
    variants_slider.innerHTML = variants.length;
    this.carousel.uptadeCarousel(variants.length);
    if (variants.length === 1) {
      this.carousel.switchVariantArrors(false, false);
    } else {
      {
        this.carousel.switchVariantArrors(true, false);
      }
    }
  }
}
