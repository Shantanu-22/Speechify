var mic = document.getElementById('speechinput');
var textarea = document.getElementById('fname');
var recognition;
var micbox = document.querySelector('.micbox');

// Check if the browser supports the Web Speech API
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    mic.addEventListener('click', function () {
        recognition.start();
        micbox.classList.add('active'); // Add the 'active' class when speech recognition starts
    });

    recognition.onresult = function(event) {
        var result = event.results[0][0].transcript;
        textarea.value = result;
        micbox.classList.remove('active'); // Remove the 'active' class when speech recognition is successful
    };

    recognition.onend = function() {
        micbox.classList.remove('active'); // Remove the 'active' class when speech recognition ends
    };
} else {
    mic.disabled = true;
    mic.textContent = "Speech recognition not supported in this browser";
}

// Add a click event listener to the document to stop speech recognition and reset the mic button
document.addEventListener('click', function(event) {
    if (recognition) {
        recognition.stop(); // Stop speech recognition
    }

    // Remove the 'active' class from .micbox to reset the mic button
    micbox.classList.remove('active');
});

// Add the click event listener to .micbox to stop event propagation
micbox.addEventListener('click', function(event) {
    // Prevent the click event from propagating up to the document
    event.stopPropagation();
    this.classList.toggle('active');
});
