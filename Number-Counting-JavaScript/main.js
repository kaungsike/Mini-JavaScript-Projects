import './style.css'

let valueDisplays = document.querySelectorAll(".num");

valueDisplays.forEach((valueDisplay) => {
  let start = 0;
  const end = parseInt(valueDisplay.getAttribute("count"));
  // let duration = Math.floor(300 / end);
  const counter = setInterval(function (){
    start += 1;
    valueDisplay.textContent = start+ "+";
    if(start===end){
      clearInterval(counter);
    }
  },0)
    
})
