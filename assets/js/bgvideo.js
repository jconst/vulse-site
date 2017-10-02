// Mute button
function toggleMute() {
  var button = $('#mute');
  var soundOn = button.hasClass('sound-on');
  $("#html5-embed").prop('muted', soundOn);
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

$('video').each(function(i, vid) {
  $(vid).scrollex({
    enter: function() {
      vid.play();
    }
  })
});

function loaded() {
  var mobile = isMobile.any();
  var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
  var smallSafari = isSafari && !isMobile.iPad();


  if (mobile) {
    $('#banner, .content').addClass('mobile');
    $('.video-background').addClass('mobile');
    if (smallSafari) {
      $('#banner').addClass('mobilesafari');
      $('.video-background').addClass('mobilesafari');
    }
  } 

  var videoMuted = mobile || isSafari;
  if (!videoMuted) {
    $('#html5-embed').prop('muted', false);
  }
  redrawMuteButton(videoMuted);
}
loaded();

