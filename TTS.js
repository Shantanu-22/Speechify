document.querySelector("input")
      .addEventListener("change", function () {
        var fr = new FileReader();
        fr.readAsText(this.files[0]);
        fr.onload = function (e) {
          var textArea = document.querySelector("textarea");
          textArea.value = e.target.result;
        };
      });

    const voiceList = document.getElementById("sel");
    let synth = speechSynthesis;

    function setGoogleVoice() {
      let selectedVoice = null;

      for (let voice of synth.getVoices()) {
        if (voice.name === "Google US English") {
          selectedVoice = voice;
          break;
        }
      }

      if (selectedVoice) {
        speech.voice = selectedVoice;
      }
    }

    function voices() {
      for (let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} </option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
      }
    }

    synth.addEventListener("voiceschanged", () => {
      voices();
      setGoogleVoice();
    });

    var isSpeaking = false;
    var speech = new SpeechSynthesisUtterance();

    function speakInputText() {
      isSpeaking = true;
      speech.text = document.querySelector("textarea").value;
      speechSynthesis.speak(speech);
    }

    function stopSpeech() {
      isSpeaking = false;
      speechSynthesis.cancel();
    }

    speech.rate = 1;

    function changeVoiceSpeed(voiceSpeed) {
      if (voiceSpeed == "0.5") {
        speech.rate = 0.5;
      } else if (voiceSpeed == "1") {
        speech.rate = 1;
      } else if (voiceSpeed == "1.25") {
        speech.rate = 1.25;
      } else if (voiceSpeed == "1.5") {
        speech.rate = 1.5;
      }
    }

    setGoogleVoice(); 