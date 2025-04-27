document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const generateBtn = document.getElementById('generate-btn');
    const usernameInput = document.getElementById('username');
    const statusText = document.querySelector('.status-text');
    const statusProgress = document.querySelector('.status-progress');
    const generatorContainer = document.getElementById('generator-container');
    const trollContainer = document.getElementById('troll-container');
    const trollVideo = document.getElementById('troll-video');
    
    // Add event listener to generate button
    generateBtn.addEventListener('click', startGenerator);
    
    // Function to start the fake generator process
    function startGenerator() {
        // Validate username (just for show)
        if (!usernameInput.value.trim()) {
            alert('Please enter your Roblox username');
            return;
        }
        
        // Disable the button during "generation"
        generateBtn.disabled = true;
        generateBtn.textContent = 'GENERATING...';
        
        // Update status text
        statusText.textContent = 'Connecting to Roblox servers...';
        
        // Animate progress bar
        animateProgressBar(0, 20, 1500, function() {
            statusText.textContent = 'Verifying username...';
            
            animateProgressBar(20, 40, 1000, function() {
                statusText.textContent = 'Bypassing security...';
                
                animateProgressBar(40, 65, 1500, function() {
                    statusText.textContent = 'Generating Robux...';
                    
                    animateProgressBar(65, 90, 2000, function() {
                        statusText.textContent = 'Finalizing...';
                        
                        animateProgressBar(90, 100, 1000, function() {
                            // Show the troll screen after "completion"
                            showTrollScreen();
                        });
                    });
                });
            });
        });
    }
    
    // Function to animate progress bar
    function animateProgressBar(from, to, duration, callback) {
        const start = performance.now();
        
        function updateProgress(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(from + (to - from) * (elapsed / duration), to);
            
            statusProgress.style.width = progress + '%';
            
            if (progress < to) {
                requestAnimationFrame(updateProgress);
            } else if (callback) {
                callback();
            }
        }
        
        requestAnimationFrame(updateProgress);
    }
    
    // Function to show the troll screen
    function showTrollScreen() {
        // Hide the generator container
        generatorContainer.style.display = 'none';
        
        // Show the troll container
        trollContainer.style.display = 'flex';
        
        // Play the video
        trollVideo.play();
        
        // Make the video unpausable and unmutable
        trollVideo.onpause = function() {
            trollVideo.play();
        };
        
        // Prevent right-click menu on video
        trollVideo.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
        
        // Prevent keyboard shortcuts for pausing/muting
        document.addEventListener('keydown', function(e) {
            // Space, K (pause), M (mute), arrow keys, etc.
            const keyCodes = [32, 75, 77, 37, 38, 39, 40];
            if (keyCodes.includes(e.keyCode)) {
                e.preventDefault();
            }
        });
        
        // Loop the video
        trollVideo.loop = true;
        
        // Set volume to max
        trollVideo.volume = 1;
        
        // Prevent muting
        trollVideo.onvolumechange = function() {
            if (trollVideo.muted) {
                trollVideo.muted = false;
            }
            if (trollVideo.volume < 1) {
                trollVideo.volume = 1;
            }
        };
    }
    
    // Prevent F12 and other developer tools shortcuts
    document.addEventListener('keydown', function(e) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || 
            (e.ctrlKey && e.keyCode === 85)) {
            e.preventDefault();
        }
    });
});
