import variables from "./variables";
export default class Carousel {
  constructor(data) {
    this.data = data;
    this.switchVariants();
  }

  switchVariants() {
    this.switchVariantsLeft();
    this.switchVariantsRight();
  }

  variantsScroll() {
    let variants_number = document.querySelector(".variants_number");

    let count = Math.round(
      document.querySelector(".carousel").scrollLeft / 197 + 1
    );
    variants_number.innerHTML = count;
  }
  switchVariantsLeft() {
    const button = document.querySelectorAll(".variants_slider > div");
    const variants_number = document.querySelector(".variants_number");
    button[0].onclick = () => {
      this.changeCarouselValue(true);

      if (variants_number.innerHTML == 1) {
        this.switchVariantArrors(false, true);
      } else {
        this.switchVariantArrors(true, true);
      }
    };
  }
  switchVariantsRight() {
    const button = document.querySelectorAll(".variants_slider > div");
    button[1].onclick = () => {
      this.changeCarouselValue(false);
      let variants_number = document.querySelector(".variants_number");
      let variants = document.querySelectorAll(".variants");
      const inputValue = Number(variants_number.innerHTML);
      console.log(inputValue)
    if (inputValue === variants.length) {
        this.switchVariantArrors(true, false);
      } else {
        this.switchVariantArrors(true, true);
      }
    };
  }

  changeCarouselValue(swithLeft) {
    let variants = document.querySelector(".variants");
    var style = variants.currentStyle || window.getComputedStyle(variants),
      margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);

    if (swithLeft) {
      document.querySelector(".carousel").scrollLeft -=
        variants.offsetWidth + margin;
    } else {
      document.querySelector(".carousel").scrollLeft +=
        variants.offsetWidth + margin;
    }
    this.variantsScroll();
  }

  uptadeCarousel(variantsLength) {
    let variants = document.querySelector(".variants");
    var style = variants.currentStyle || window.getComputedStyle(variants),
      margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);

    const lastElement = (variantsLength - 1) * (variants.offsetWidth + margin);
    document.querySelector(".carousel").scrollLeft = lastElement;
  }

  switchVariantArrors(rightArrow, leftArror) {
    const variantsSlider = document.querySelectorAll(".variants_slider > div");
    if (rightArrow === true) {
      variantsSlider[0].style.opacity = 1;
      variantsSlider[0].title = variables.text.leftArrow;
      variantsSlider[0].style.cursor = "pointer";
    } else if (rightArrow === false) {
      variantsSlider[0].style.opacity = 0;
      variantsSlider[0].title = "";
      variantsSlider[0].style.cursor = "auto";
    }

    if (leftArror === true) {
      variantsSlider[1].style.opacity = 1;
      variantsSlider[1].title = variables.text.rightArrow;
      variantsSlider[1].style.cursor = "pointer";
    } else if (leftArror === false) {
      variantsSlider[1].style.opacity = 0;
      variantsSlider[1].title = "";
      variantsSlider[1].style.cursor = "auto";
    }
  }
}
