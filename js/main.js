$(document).ready(function() {

  var i,j;
  var currentStep = 1;
  var time;
  var NUM_OF_STEPS = 16;
  var NUM_OF_TRACKS = 3;
  var SIXTEENTH_NOTE_TIME = 150; // ms

  // populate the `sounds` object
  sounds = {};
  sounds.kick  = new Sound("audio/kick.wav", 0.3);
  sounds.snare = new Sound("audio/snare.wav", 0.3);
  sounds.hihat = new Sound("audio/hihat.wav", 0.1); // hi-hat is pretty loud at 0.3

  // insert the html elements of the sequencer tracks and buttons
  for ( i = 1; i <= NUM_OF_TRACKS; i++) {

      for ( j = 1; j <= NUM_OF_STEPS; j++) {

        if ( j % 4 === 1 ) {
          $('.sequencer').append('<div class="sequencer-button off quarter"></div>');
        }
        else {
          $('.sequencer').append('<div class="sequencer-button off"></div>');
        }
      }
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
      sounds.hihat.play(time + 0.1);
    }
    if ( buttons[2][currentStep].hasClass('on') ) {
      sounds.snare.play(time + 0.1);
    }
    if ( buttons[3][currentStep].hasClass('on') ) {
      sounds.kick.play(time + 0.1);
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
      $this.addClass('on').removeClass('off');
    }
    else {
      $this.addClass('off').removeClass('on');
    }
  });

  // handles clear button event
  $('.clear').click(function() {
    $('.sequencer-button').removeClass('on').addClass('off');
  });


});


