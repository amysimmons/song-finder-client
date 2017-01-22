const React = require('react');

const Recorder = React.createClass({

  getInitialState(){
    let recordedChunks = [];
    return{
      recordedChunks: recordedChunks
    };
  },

  handleRecording (stream) {
    const recordedChunks = this.state.recordedChunks;
    const mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'})

    mediaRecorder.start();

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0){
        recordedChunks.push(e.data);
        this.setState({recordedChunks:recordedChunks});
      }
    }

    mediaRecorder.onstop = (e) => {
      if(recordedChunks.length > 0) {
        const blob = new Blob(recordedChunks);
        this.blobToBase64(blob);
      }
    }

    this.setState({mediaRecorder:mediaRecorder});
  },

  blobToBase64 (blob) {
    const reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
    const base64 = reader.result.split('data:;base64,')[1]
      this.findSongs(base64);
    }
  },

  startRecording () {
    this.props.setRecording(true);

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(this.handleRecording);
  },

  stopRecording () {
    this.props.setRecording(false);

    const mediaRecorder = this.state.mediaRecorder;

    mediaRecorder.stop();
    this.setState({mediaRecorder:mediaRecorder});
  },

  findSongs (base64) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var myInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({"base64":base64})
    };

    fetch("http://localhost:3000/recognise", myInit)
      .then((response) => {
      return response.json()
    }).then((dataAsJson) => {
      console.log(dataAsJson)
    }).catch(function(error) {
      console.log(error.message);
    });
  },

  handleClick() {
    this.props.recording ? this.stopRecording() : this.startRecording();
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

module.exports = Recorder;

// navigator.getUserMedia =
//   navigator.getUserMedia ||
//   navigator.webkitGetUserMedia ||
//   navigator.mozGetUserMedia ||
//   navigator.msGetUserMedia;

// hasGetUserMedia () {
//   return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
//   navigator.mozGetUserMedia || navigator.msGetUserMedia);
// },
