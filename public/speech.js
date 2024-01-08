const synth = window.speechSynthesis;
const textarea = document.getElementById("floatingTextarea");
const play = document.querySelector(".play");
const stopbtn = document.querySelector(".stop");
const voiceSelect = document.getElementById("voiceSelect"); 
const speed = document.querySelector(".speed");
let  utterThis;

let isPaused = false;

function populateVoiceList() {
  if (typeof synth === "undefined") {
    return;
  }

  const voices = synth.getVoices();

  // Clear the existing options
  voiceSelect.innerHTML = '';

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();

if (typeof synth !== "undefined" && synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = populateVoiceList;
}
let xfast=1;
speed.addEventListener("change", function() {
   xfast = parseFloat(this.value);
});

play.addEventListener("click", (event) => {
  event.preventDefault();
  if (synth.speaking) {
    synth.cancel();
  }

  const selectedVoice = voiceSelect.options[voiceSelect.selectedIndex];
  utterThis = new SpeechSynthesisUtterance(textarea.value);
  const voices = synth.getVoices();
  const selectedVoiceObj = voices.find(voice => voice.name === selectedVoice.getAttribute("data-name"));

  utterThis.voice = selectedVoiceObj;
  utterThis.rate = xfast;
  synth.speak(utterThis);
  console.log(utterThis);
  isPaused = false;
  stopbtn.innerText = "Pause";
});

stopbtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (synth.paused) {
    synth.resume();
    isPaused = false;
    stopbtn.innerText = "Pause";
  } else {
    synth.pause();
    isPaused = true;
    stopbtn.innerText = "Resume";
  }
});

var input = document.querySelector(".fname");
const search = document.querySelector(".search");

search.addEventListener("click",async (event)=>{
  event.preventDefault();
  textarea.value = "";
  const question = input.value;
  if(typeof question !== "undefined" && question !== ""){
    try {
      const response = await fetch("/gpt", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: question }),
      })
      const data = await response.json();
      console.log(data);
      textarea.value = data.ans;
    } catch (error) {
      console.log(error);
    }
  }
  else{
    setTimeout(()=>{
      textarea.style.color = "red";
        textarea.value = "Please enter the text you want to search !";
      setTimeout(()=>{
        textarea.style.color = "black";
        textarea.value = "";
      },4000);
    })
  } 
})

const copybtn = document.querySelector(".copy");
copybtn.addEventListener("click",()=>{
  navigator.clipboard.writeText(textarea.value);
  const iconElement = document.createElement('i');
    iconElement.className = 'fa-solid fa-check copy-icon';
    copybtn.innerHTML = '';
    copybtn.appendChild(iconElement);
  setTimeout(()=>{
    iconElement.className = 'fa-regular fa-copy copyicon';
    // Append the icon element to the button
    copybtn.innerHTML = '';
    copybtn.appendChild(iconElement);
  },2000);
});

const clearbtn = document.querySelector(".clear");
clearbtn.addEventListener("click",()=>{
  textarea.value = "";
})

const mic = document.querySelector(".mic");

// Check if the browser supports the Web Speech API
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  mic.addEventListener('click', function () {
    requestMicPermission().then((permissionGranted) => {
      if (permissionGranted) {
        recognition.start();
        mic.style.color = "rgb(255, 85, 85)";
      } else {
        console.error("Microphone permission denied.");
        mic.style.color = "black";
      }
    });
  });

  recognition.onresult = function(event) {
    var result = event.results[0][0].transcript;
    input.value = "";
    input.value = result;
    mic.style.color = "black";
  };

  recognition.onend = function() {
    mic.style.color = "black";
  };
} else {
  mic.disabled = true;
  mic.textContent = "Speech recognition not supported in this browser";
}

// Function to request microphone permission
async function requestMicPermission() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    console.error("Error requesting microphone permission:", error);
    return false;
  }
}





