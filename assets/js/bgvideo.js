var player = {};
function onYouTubeIframeAPIReady() {
  if (isMobile.any()) {
    return;
  }
  var videoId = 'kjkjmTm0XD4';
  player = new YT.Player('yt-embed', {
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
  $("#html5-embed").prop('muted', soundOn);
  if (soundOn) {
    player.mute && player.mute();
  } else {
    player.unMute && player.unMute();
  }
  redrawMuteButton(soundOn);
}

function redrawMuteButton(shouldMute) {
  var button = $('#mute');
  if (shouldMute) {
    button.removeClass('sound-on');
    button.addClass('sound-off');
  } else {
    button.removeClass('sound-off');
    button.addClass('sound-on');
  }
}

function loaded() {
  var mobile = isMobile.any();
  var smallSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) && !isMobile.iPad();

  if (mobile) {
    $('#yt-frame-api').remove();
    $('#yt-embed').remove();
    $('#banner, .content').addClass('mobile');
    $('.video-background').addClass('mobile');
    if (smallSafari) {
      $('#banner').addClass('mobilesafari');
      $('.video-background').addClass('mobilesafari');
    }
  } else {
    $('#html5-embed').remove();
  }
  redrawMuteButton(mobile);
}
window.onload = loaded;

