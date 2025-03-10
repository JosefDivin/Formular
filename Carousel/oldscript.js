const variantsWidth = 560;



function getVariantsInfo() {

    
  let scrollLeft = document.querySelector(".carousel").scrollLeft;
  console.log(scrollLeft)
  if(Number.isInteger(scrollLeft/ variantsWidth)===false){
    scrollLeft -=getScrollbarWidth();
  }
  return {
    length: document.querySelectorAll(".variants").length,
    scrolPosition: scrollLeft,
    currentVersion: scrollLeft / variantsWidth,
  };
}

let variants_slider__next = document.querySelector(".variants_slider__next");
let variants_slider__previous = document.querySelector(
  ".variants_slider__previous"
);

function variantsAddd() {
  let scrollLeft =
    getVariantsInfo().length === 0
      ? 0
      : getVariantsInfo().length * variantsWidth;

  // Scroll all to left when add variants
  document.querySelector(".carousel").scrollLeft = scrollLeft;

  // Set varints number
  document.querySelector(".variants_number").innerHTML =
    getVariantsInfo().length;

  togleRemoveButon(getVariantsInfo().length);
}

function variantsRemove(){
    console.log(getVariantsInfo());
    const variantsInfo = getVariantsInfo()
    const variants = document.querySelectorAll(".variants");
    variants[variantsInfo.currentVersion].remove()
      // Set varints number
  document.querySelector(".variants_number").innerHTML =
  getVariantsInfo().length;

togleRemoveButon(getVariantsInfo().length);
}

function togleRemoveButon(variantsLength) {
  const variants_button__add = document.querySelector(".variants_button__add");
  const variants_button__remove = document.querySelector(
    ".variants_button__remove"
  );
  if (variantsLength === 0) {
    variants_button__add.style.width = "100%";
    variants_button__remove.style.display = "none";
    variants_button__remove.style.width = "0";
  } else {
    variants_button__add.style.width = "50%";
    variants_button__remove.style.display = "block";
    variants_button__remove.style.width = "50%";
  }
}

// CLICK LEFT
variants_slider__previous.addEventListener("click", () => {
  document.querySelector(".carousel").scrollLeft -= variantsWidth;
  const variantsInfo = getVariantsInfo();
  // Set varints number
  document.querySelector(".variants_number").innerHTML =
    variantsInfo.currentVersion + 1;
  console.log(variantsInfo);

  if (variantsInfo.currentVersion === 0) {
    variants_slider__previous.style.display = "none";
  } else {
    variants_slider__previous.style.display = "inline-block";
  }
  if (variantsInfo.currentVersion === variantsInfo.length - 2) {
    variants_slider__next.style.display = "inline-block";
  }
});

// CLICK RIGHT
variants_slider__next.addEventListener("click", () => {
  document.querySelector(".carousel").scrollLeft += variantsWidth;
  const variantsInfo = getVariantsInfo();
  // Set varints number
  document.querySelector(".variants_number").innerHTML =
    variantsInfo.currentVersion + 1;
  console.log(variantsInfo);
  if (variantsInfo.currentVersion + 1 === variantsInfo.length) {
    variants_slider__next.style.display = "none";
  } else {
    variants_slider__next.style.display = "inline-block";
  }

  if (variantsInfo.currentVersion === 1) {
    variants_slider__previous.style.display = "inline-block";
  }
});

function switchVariantArrors(rightArrow, leftArror) {
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

function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

/***********************/
/* adding variants*/
/***********************/

const variants_button__add = document.querySelector(".variants_button__add");

variants_button__add.addEventListener("click", () => {
  addData();
});
let variantsID = 0
function addData() {
  const carousel = document.querySelector(".carousel");
  const variants = document.createElement("div");
  const variantsWraper = document.createElement("div");

  
  variants.classList.add("variants");

  variants.innerHTML = `<h1> Varianta verze ${variantsID} </h1>`

  carousel.appendChild(variants);

  variantsAddd();
  variantsID++
}
/***********************/
/* adding variants*/
/***********************/
const variants_button__remove = document.querySelector(
  ".variants_button__remove"
);
variants_button__remove.addEventListener("click", () => {
  removeData();
});
function removeData() {
 

  variantsRemove()
}
