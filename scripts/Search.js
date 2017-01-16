const React = require('react');

const Search = React.createClass({

  getInitialState(){
    let recording = false;
    let track = null;
    let recordedChunks = [];
    return{
      recording: recording,
      track: track,
      recordedChunks: recordedChunks
    };
  },

  hasGetUserMedia () {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
  },

  errorCallback (e) {
    console.log('Reeeejected!', e);
  },

  handleRecording (stream) {
    const recordedChunks = this.state.recordedChunks;
    const mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'})
    const _this = this;

    mediaRecorder.start();

    mediaRecorder.ondataavailable = function(e) {
      if (e.data.size > 0){
        recordedChunks.push(e.data);
        _this.setState({recordedChunks:recordedChunks});
      }
    }

    mediaRecorder.onstop = function(e) {
      if (recordedChunks){
        if(recordedChunks.length > 0) {
          var audio = document.querySelector('audio');
          audio.controls = true;
          var blob = new Blob(recordedChunks, { 'type' : 'audio/ogg; codecs=opus' });
          var audioURL = window.URL.createObjectURL(blob);
          audio.src = audioURL;
        }
      }
    }

    this.setState({mediaRecorder:mediaRecorder});
  },

  startRecording () {
    const recording = true;
    this.setState({recording:recording});

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(this.handleRecording);
  },

  stopRecording () {
    const recording = false;
    const mediaRecorder = this.state.mediaRecorder;

    mediaRecorder.stop();
    this.setState({recording:recording, mediaRecorder:mediaRecorder});
  },

  findSongs () {
    // fetch('http://localhost:3000/recognise').then((response) => {
    //   console.log(response)
    //   return response.json()
    // }).then((dataAsJson) => {
    //   console.log(dataAsJson)
    // }).catch(function(error) {
    //   console.log('There has been a problem with your fetch operation: ' + error.message);
    // });
  },

  handleClick() {
    this.state.recording ? this.stopRecording() : this.startRecording();
  },

  render(){
    return(
      <div>
        <div onClick={this.handleClick}>Sing to me</div>
        <div>
          <audio id="player" controls></audio>
        </div>
      </div>
    );
  }
});

module.exports = Search;


// navigator.getUserMedia =
//   navigator.getUserMedia ||
//   navigator.webkitGetUserMedia ||
//   navigator.mozGetUserMedia ||
//   navigator.msGetUserMedia;
