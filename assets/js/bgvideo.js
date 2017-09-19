var player;
function onYouTubeIframeAPIReady() {
    var videoId = 'kjkjmTm0XD4';
    player = new YT.Player('video-background', {
        videoId: videoId, // YouTube Video ID
        playerVars: {
            autoplay: 1, // Auto-play the video on load
            controls: 0, // Show pause/play buttons in player
            showinfo: 0, // Hide the video title
            modestbranding: 1, // Hide the Youtube Logo
            loop: 1, // Run the video in a loop
            fs: 0, // Hide the full screen button
            cc_load_policy: 0, // Hide closed captions
            iv_load_policy: 3, // Hide the Video Annotations
            autohide: 0, // Hide video controls when playing
            rel: 0,
            playlist: videoId
        }
    });
}

// Mute button
function toggleMute() {
	var button = $('#mute');
	var soundOn = button.hasClass('sound-on');
	if (soundOn) {
		button.removeClass('sound-on');
		button.addClass('sound-off');
		player.mute();
	} else {
		button.removeClass('sound-off');
		button.addClass('sound-on');
		player.unMute();
	}
}