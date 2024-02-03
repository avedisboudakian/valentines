document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const message = document.getElementById('message');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const modal = document.getElementById('myModal');
    const span = document.querySelector('.close');
    const animatedMessage = document.getElementById('animatedMessage');
    const romanticMusic = document.getElementById('romanticMusic'); // Get the audio element
    const sadMusic = document.getElementById('sadMusic');
    let createHearts = true; // Flag to control heart creation
    let currentRomanticTrackIndex = 0;
    let isModalOpen = false;
    const originalRomanticTracks = [
        'sounds/sexysax.mp3', 
    'sounds/sevenpositions.mp3', 
    'sounds/iwasneverthere.mp3', 
    'sounds/justthewayyouare.mp3', 
    'sounds/iwannaknowwhatloveis.mp3', 
    'sounds/dj.mp3', 
    'sounds/lovestory.mp3'
    ]; // Add your track names here
    let romanticTracks = [...originalRomanticTracks]; // Clone the original array to keep it intact for resets

    // Function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }

    // Function to play the next track
    function playNextRomanticTrack() {
        if (romanticTracks.length === 0) {
            romanticTracks = [...originalRomanticTracks]; // Reset to a full list of tracks
            shuffleArray(romanticTracks); // Shuffle the tracks for a new random order
        }
        const nextTrack = romanticTracks.shift(); // Get the next track and remove it from the list
        romanticMusic.src = nextTrack;
        romanticMusic.play();
        sadMusic.pause();
        sadMusic.currentTime = 0;
    }
    
    yesButton.addEventListener('click', function() {
        
        isModalOpen = true;
        modal.style.display = "block";
        animatedMessage.innerHTML = ""; // Clear previous message
        typeMessage("Every moment with you is a treasure. Will you be mine forever?", animatedMessage);
        playNextRomanticTrack(); // Change and play a random romantic track
    });

    let noClickCount = 0;

    noButton.addEventListener('click', function() {
        
        isModalOpen = true;
        romanticMusic.pause();
        romanticMusic.currentTime = 0;
        currentRomanticTrackIndex = 0;
        isModalOpen = true;
        noClickCount++;
        modal.style.display = "block";
        sadMusic.currentTime = 0; // Reset to start
        sadMusic.play(); // Play the sad music

        switch (noClickCount) {
            case 1:
                typeMessage("Oops! That must have been a mistake. Try again? 😄", animatedMessage);
                break;
            case 2:
                typeMessage("Hmm, still not right. I'm sure you meant 'Yes'! 😁", animatedMessage);
                break;
            case 3:
                typeMessage("Third time's the charm! 'Yes' is just a click away! 🥰", animatedMessage);
                break;
            default:
                typeMessage("All jokes aside, I hope your day is as wonderful as you are! Click 'Yes' when you're ready. 😊", animatedMessage);
                break;
        }
    });

    

    span.onclick = function() {
        modal.style.display = "none";
        
        romanticMusic.pause(); // Stop any playing romantic music
        romanticMusic.currentTime = 0; // Reset playback
        sadMusic.pause(); // Also stop sad music if playing
        sadMusic.currentTime = 0; // Reset playback
        isModalOpen = false;
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            romanticMusic.pause();
            romanticMusic.currentTime = 0;
            sadMusic.pause();
            sadMusic.currentTime = 0;
            isModalOpen = false; // Reset modal open flag
        }
    };

    document.addEventListener('mousemove', function(e) {
        if (!createHearts) return;
        createHeart(e.clientX, e.clientY);
    });

    mainContent.addEventListener('mouseenter', function() {
        createHearts = false;
    });

    mainContent.addEventListener('mouseleave', function() {
        createHearts = true;
    });

    function createHeart(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${x - 25}px`; // Offset to center the heart
        heart.style.top = `${y - 25}px`; // Offset to center the heart
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000); // Remove after 2 seconds
    }

    let typingTimer;

    function typeMessage(message, element) {
        clearInterval(typingTimer);
        element.innerHTML = "";

        const words = message.split(' ');
        let index = 0;

        const addWord = () => {
            if (index < words.length) {
                const wordSpan = document.createElement('span');
                wordSpan.classList.add('text-animate');
                wordSpan.textContent = words[index] + ' ';
                element.appendChild(wordSpan);
                index++;
            } else {
                clearInterval(typingTimer);
            }
        };

        typingTimer = setInterval(addWord, 100);
    }
 
    document.getElementById('yes-button').addEventListener('click', function() {
        const modal = document.getElementById('myModal');
        const animatedMessage = document.getElementById('animatedMessage');
        modal.style.display = "block";
        typeMessage("Every moment with you is a treasure. Will you be mine forever?", animatedMessage);
    });
});
