import './style.css'

const playBtn = document.querySelector("#playBtn");
const userInput = document.querySelector("#userInput");
const voiceSelect = document.querySelector("#voiceSelect");

let speech = new SpeechSynthesisUtterance();
let voices = [];

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];

  voices.forEach((voice,i) => (voiceSelect.options[i] = new Option(voice.name,i)))
}

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value]
})

playBtn.addEventListener("click" , () => {
    speech.text = userInput.value;
    window.speechSynthesis.speak(speech)
})
