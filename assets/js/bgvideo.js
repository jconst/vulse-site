// Mute button
function toggleMute(muteBtnSel) {
  var muteBtn = $(muteBtnSel);
  var muted = muteBtn.hasClass('sound-off');
  var shouldMute = !muted;

  if (shouldMute === false) { // if unmuting this video
    // mute all videos first
    $('.mute').each(function(i, otherMute) {
      var otherBtn = $(otherMute);
      applyMute(otherBtn, true);
    });
  }

  applyMute(muteBtn, shouldMute);
}

function applyMute(button, shouldMute) {
  var vidId = button.attr('mutee');
  $(vidId).prop('muted', shouldMute);
  redrawMuteButton(button, shouldMute);
}

function redrawMuteButton(muteBtn, shouldMute) {
  if (shouldMute) {
    muteBtn.removeClass('sound-on');
    muteBtn.addClass('sound-off');
  } else {
    muteBtn.removeClass('sound-off');
    muteBtn.addClass('sound-on');
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

  redrawMuteButton($('#banner-mute'), true);
}
loaded();

