$(document).ready(function() {

  var i,j;
  var currentStep = 1;
  var time;
  var NUM_OF_STEPS = 16;
  var NUM_OF_TRACKS = 2;
  var SIXTEENTH_NOTE_TIME = 150; // ms

  // populate the `sounds` object
  sounds = {};
  sounds.num1 = new Sound("audio/num1.mp3", 0.3);
  sounds.num2 = new Sound("audio/num2.mp3", 0.3);

  // these are not yet used
  sounds.num3 = new Sound("audio/num3.mp3", 0.3);
  sounds.num4 = new Sound("audio/num4.mp3", 0.3);
  sounds.num5 = new Sound("audio/num5.mp3", 0.3);

  // insert the html elements of the sequencer tracks and buttons
  for ( i = 1; i <= NUM_OF_TRACKS; i++) {

    $('.sequencer').append('<div class="sequencer-track off">');

      for ( j = 1; j <= NUM_OF_STEPS; j++) {

        if ( j % 4 === 1 ) {
          $('.sequencer').append('<div class="sequencer-button off quarter"></div>');
        }
        else {
          $('.sequencer').append('<div class="sequencer-button off"></div>');
        }
      }
    $('.sequencer').append('</div>');
  }

  // populate the `buttons` object
  // buttons[ buttonNumber ] is a jQuery object containing the div of the button
  buttons = {};

  for ( i = 1; i <= NUM_OF_TRACKS; i++) {

    buttons[i] = {};

    for ( j = 1; j <= NUM_OF_STEPS; j++) {

      buttons[i][j] = $('.sequencer-button:nth-child(' + (j + ((i-1) * 16)) + ')');
    }
  }

  // keeps track of whether sequencer is playing or stopped
  var player = -1;

  // function that checks to see if the current step has notes on, and plays them if so
  function onPlay() {
    time = audioContext.currentTime;

    if ( buttons[1][currentStep].hasClass('on') ) {
      sounds[ "num1" ].play(time + 0.1);
    }
    if ( buttons[2][currentStep].hasClass('on') ) {
      sounds[ "num2" ].play(time + 0.1);
    }

    console.log(currentStep);

    currentStep = currentStep === NUM_OF_STEPS ? 1 : currentStep + 1;

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

      // play the first note immediately, then setInterval waits 1 sixteenth note to check the next step
      onPlay();

      player = setInterval( function() {

        onPlay();

      }, SIXTEENTH_NOTE_TIME );
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


