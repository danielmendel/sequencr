function Sound( source, level ) {
  if (!window.audioContext) {
    audioContext = new webkitAudioContext();
  }

  var that = this;
  that.source = source;
  that.buffer = null;
  that.isLoaded = false;

  that.volume = audioContext.createGainNode();

  var getSound = new XMLHttpRequest();
  if (!level) {
    that.volume.gain.value = 1;
  } else {
    that.volume.gain.value = level;
  }

  that.panner = audioContext.createPanner();

  getSound.open("get",that.source,true);
  getSound.responseType = 'arraybuffer';

  getSound.onload = function() {
    audioContext.decodeAudioData(getSound.response, function(buffer) {
      that.buffer = buffer;
      that.isLoaded = true;
    });
  };

  getSound.send();
}

Sound.prototype.play = function( time ) {
  if (this.isLoaded === true) {
    var playSound = audioContext.createBufferSource();
    playSound.buffer = this.buffer;
    playSound.connect(this.panner);
    this.panner.connect(this.volume);
    this.volume.connect(audioContext.destination);
    playSound.noteOn( time ) ;
  }
};

Sound.prototype.setVolume = function( level ) {
  this.volume.gain.value = level;
};

Sound.prototype.setPan = function( xValue ) {
  this.panner.setPosition( xValue, 0, 0 );
};















