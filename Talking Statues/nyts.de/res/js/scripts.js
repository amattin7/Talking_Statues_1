//
// Show "rotate phone" message when landscaped
// ============================================================================
function resizeHandler() {
  var overlay = $('#turn-phone-overlay');
  if ($(window).width() / $(window).height() > 1) {
    overlay.fadeIn();
  } else {
    overlay.fadeOut();
  }
}



//
// Format time, seconds -> mm:ss
// ============================================================================
function formatTime(t) {
  t = Math.floor(t);
  var m = '' + Math.floor(t / 60);
  var s = '' + (t % 60);

  if (m.length == 1) m = '0' + m;
  if (s.length == 1) s = '0' + s;

  return m + ':' + s;
}


// track width, set to window width
var width = $(window).width(); 

// fire on window resize
$(window).resize(function() {
    // do nothing if the width is the same
    if ($(window).width()==width) return; 
    // ... your code
});
  

$(function() {
  //
  // Handle audio
  // ==========================================================================
  var snd_ringtone = document.getElementById('audio-ringtone');

  var snd_voice_01  = document.getElementById('audio-feature_01');

  var snd_voice_02  = document.getElementById('audio-feature_02');

  [].forEach.call(document.querySelectorAll('startText'), function (el) {
    el.style.visibility = 'hidden';
  });

	var isSnd01 = false
	var isSnd02 = false
  
  snd_voice_01.addEventListener('canplay', function() {
    $('#btn-start-call_01 .center-text')
	  
	  
	var list = document.getElementsByClassName("spinner");
	 for(var i = list.length - 1; 0 <= i; i--)
	 if(list[i] && list[i].parentElement)
	 list[i].parentElement.removeChild(list[i]);
    
	  [].forEach.call(document.querySelectorAll('startText'), function (el) {
	    el.style.visibility = 'visible';
	  });
    //
    // Start call handler
    // ======================================================================== 
    $('#btn-start-call_01').on('click', function(e) {
		isSnd01 = true
		isSnd02 = false
		var list = document.getElementsByClassName("text02");
		 for(var i = list.length - 1; 0 <= i; i--)
		 if(list[i] && list[i].parentElement)
		 list[i].parentElement.removeChild(list[i]);
		
      e.preventDefault();
      snd_ringtone.play();

      $('body').on('touchmove', function(e) { 
        e.preventDefault();
      });
	  
      $('.splash-screen').addClass('animated slideOutLeft');
      $('.call-screen').show().addClass('animated slideInRight');
    });
});

snd_voice_02.addEventListener('canplay', function() {
    //$('#btn-start-call_02 .center-text').html('Inizio');

    $('#btn-start-call_02').on('click', function(e) {
		isSnd01 = false
		isSnd02 = true
		var list = document.getElementsByClassName("text01");
		 for(var i = list.length - 1; 0 <= i; i--)
		 if(list[i] && list[i].parentElement)
		 list[i].parentElement.removeChild(list[i]);
		
      e.preventDefault();
      snd_ringtone.play();

      $('body').on('touchmove', function(e) { 
        e.preventDefault();
      });

      $('.splash-screen').addClass('animated slideOutLeft');
      $('.call-screen').show().addClass('animated slideInRight');
    });
  });
  
  snd_voice_01.load();
  snd_voice_02.load();	
  snd_ringtone.load();

  snd_ringtone.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  });

  snd_voice_01.addEventListener('timeupdate', function(e) {
    $('.call-time').text(formatTime(this.currentTime));
  });
  
  snd_voice_02.addEventListener('timeupdate', function(e) {
    $('.call-time').text(formatTime(this.currentTime));
  });

  snd_voice_01.addEventListener('ended', function() {
    $('.replay-buttons').show().addClass('animated fadeInUp');
  });

  snd_voice_02.addEventListener('ended', function() {
    $('.replay-buttons').show().addClass('animated fadeInUp');
  });
  //
  // Show "rotate phone" message when landscaped
  // ==========================================================================
  $(window).on('resize', resizeHandler); 
  resizeHandler();

  //
  // Call accepted handler
  // ==========================================================================
  $('#btn-accept-call').on('click', function(e) {
    e.preventDefault();
    snd_ringtone.pause();
	if (isSnd01 == true) {
		snd_voice_01.play()
	}else{
		snd_voice_02.play()
	}

    $('.footer-screen-1').addClass('animated slideOutLeft');
    $('.footer-screen-2').show().addClass('animated slideInRight');

    $('.call-info').addClass('animated slideOutLeft');
    $('.call-time').show().addClass('animated slideInRight');
  });

  var goToEndScreen = function () {
    snd_ringtone.pause();
    snd_voice_01.pause();
	snd_voice_02.pause();
    $('.call-screen').removeClass('animated slideInRight').addClass('animated slideOutLeft');
    $('.end-screen').show().addClass('animated slideInRight');
  }

  //
  // Call declined handler
  // ==========================================================================
  $('.btn-decline-call').on('click', goToEndScreen);

  //
  // Replay button handler
  // ==========================================================================
  $('#btn-end-replay').on('click', function(e) {
    e.preventDefault();
    snd_voice.currentTime = 0;
	if (isSnd01 == true) {
		snd_voice_01.play()
		document.getElementById('incommingText02').remove();
	}else{
		document.getElementById('incommingText01').remove();
		snd_voice_02.play()
	}
    $('.replay-buttons').removeClass('animated fadeInUp').addClass('animated fadeOut');
  });

  //
  // Read more button handler
  // ==========================================================================
  $('#btn-end-readmore').on('click', goToEndScreen);

});