$(document).ready(function() {

  var currentStep = 1;

  // populate the `sounds` object
  sounds = {};
  sounds.num1 = new Sound("audio/num1.mp3", 0.5);
  sounds.num2 = new Sound("audio/num2.mp3", 0.5);
  sounds.num3 = new Sound("audio/num3.mp3", 0.5);
  sounds.num4 = new Sound("audio/num4.mp3", 0.5);
  sounds.num5 = new Sound("audio/num5.mp3", 0.5);

  // populate the `steps` object
  // steps[ stepNumber ] is a jQuery object containing the div of the button
  steps = {};
  for ( var i = 1; i <=4; i++) {
    steps[i] = $('.sequencer-button:nth-child(' + i + ')');
  }

  // keeps track of whether sequencer is playing or stopped
  var player = -1;

  function onPlay() {
    if ( steps[currentStep].hasClass('on') ) {
      sounds[ "num1" ].play(audioContext.currentTime);
    }

    console.log(currentStep);

    currentStep = currentStep === 4 ? 1 : currentStep + 1;

  }


  $('.play').click( function() {

    if ( player > 0 ) {
      console.log("STOP!");
      $('.play h2').replaceWith('<h2>PLAY!</h2>');

      clearInterval ( player );
      player = -1;
      currentStep = 1;

    }
    
    else {

      console.log("play!!!");
      $('.play h2').replaceWith('<h2>STOP!</h2>');

      onPlay();

      player = setInterval( function() {

        onPlay();

      }, 250 );
    }

  });

  // handles sequencer button click events
  $('.sequencer-button').click(function() {
    var $this = $(this);
    
    if ($this.hasClass('off')) {
      $this.addClass('on');
      $this.removeClass('off');
    }
    else {
      $this.addClass('off');
      $this.removeClass('on');
    }
  });


});




// setTimeout

// setInterval


// var timer - setTimeout( function (){}, 100);
// clearTimeout ( timer);

// var player = setInterval( function() {}, 100);

// clearInterval( player) ;
