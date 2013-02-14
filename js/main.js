var tracks;

// tracks = [
//   {
//     name: hihat,
//     sound: new Sound ("audio/hihat.wav", 0.3);
//     buttons: [
//       $($($('.sequencer-track')[0]).children()[0]),
//       ...
//       ]
//   },
//   {
//     name: snare,
//     sound: new Sound ("audio/snare.wav", 0.3);
//     buttons: [
//       $($($('.sequencer-track')[0]).children()[0]),
//       ...
//       ]
//   }
// ]
// 

$(document).ready(function() {

  // var trackIndex, buttonIndex;
  var i,j;
  var currentStep = 1;
  var time;
  var NUM_OF_STEPS = 16;
  var NUM_OF_TRACKS = 3;
  var SIXTEENTH_NOTE_TIME = 150; // ms

  var $sequencerButton = $('.sequencer-track div');


  // we want to be able to check the status of each button like this:
  // tracks[2].buttons[2].hasClass('on');
  // right now the tracks are zero-indexed while the buttons start at 1

  tracks = [];



  $.each( $('.sequencer-track'), function(trackIndex, trackElement) {

    tracks[trackIndex] = {};
    tracks[trackIndex].buttons = [];

    $(trackElement).children().each(function(bIndex, buttonElement) {

      buttonIndex = bIndex + 1;

      tracks[trackIndex].buttons[buttonIndex] = $(buttonElement);
    });
  });

  tracks[0].name = "hihat";
  tracks[0].sound = new Sound("audio/hihat.wav", 0.3);
  tracks[1].name = "snare";
  tracks[1].sound = new Sound("audio/snare.wav", 0.3);
  tracks[2].name = "kick";
  tracks[2].sound = new Sound("audio/kick.wav", 0.3);



  // keeps track of whether sequencer is playing or stopped
  var player = -1;

  // function that checks to see if the current step has notes on, and plays them if so
  function onPlay() {

    console.log(currentStep);

    time = audioContext.currentTime;

    $.each(tracks, function(index, trackElement) {

      trackIndex = index + 1;

      if ( trackElement.buttons[ currentStep ].hasClass('on') ) {

        trackElement.sound.play(time + 0.1);
      }
    });

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
  $sequencerButton.click(function() {
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


