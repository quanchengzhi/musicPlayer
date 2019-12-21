(function($, root) {
    function AudioManager() {
        this.audio = new Audio();
        this.status = "pause";
        this.audio.setAttribute("id", "musicPlay");
        $("#musicPlay").removeAttr("autoplay");
        document.body.appendChild(this.audio);
    }
    AudioManager.prototype = {
        play: function() {
            this.audio.play();
            this.status = "play";
        },
        pause: function() {
            this.audio.pause();
            this.status = "pause";
        },
        setAudioSource: function(src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumptoPlay: function(duration) {
            this.audio.currentTime = duration;
            this.play();
        }
    }
    root.AudioManager = AudioManager;
}(window.Zepto, window.player || (window.player = {})))