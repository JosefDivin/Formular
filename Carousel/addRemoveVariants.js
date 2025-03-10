export default class VariantsControler{

constructor(){
    
}

    addData() {
        const carousel = document.querySelector(".carousel");
        const variants = document.createElement("div");
        const variantsWraper = document.createElement("div");
      
        
        variants.classList.add("variants");
      
        variants.innerHTML = `<h1> Varianta verze ${variantsID} </h1>`
      
        carousel.appendChild(variants);
      
        
        variantsID++
      }

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
