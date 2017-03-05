const React = require('react');
const FontAwesome = require('react-fontawesome');

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
      console.log('media recorder stopped')
      console.log(recordedChunks.length);
      if(recordedChunks.length > 0) {
        const blob = new Blob(recordedChunks);

        //validating the recording
        var audio = document.createElement('audio');
        audio.setAttribute('controls', '');
        var audioURL = URL.createObjectURL(blob);
        audio.src = audioURL;
        document.querySelector('body').append(audio);

        this.blobToBase64(blob);
      }
    }

    this.setState({mediaRecorder:mediaRecorder});
  },

  blobToBase64 (blob) {
    console.log('blob', blob)
    const reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      console.log('reader result', reader.result)
      const base64 = reader.result.split('data:;base64,')[1]
      console.log('base64', base64)
      this.transcribeRecording(base64);
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

  transcribeRecording (base64) {
    console.log('transcribeRecording')
    this.props.setTranscribingSpeech(true);

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
      this.props.setTranscription(dataAsJson);
      this.props.setTranscribingSpeech(false);
    }).catch(function(error) {
      console.log('error', error.message);
    });
  },

  handleClick() {
    this.props.recording ? this.stopRecording() : this.startRecording();
  },

  render(){
    const icon = this.props.recording ? 'stop-circle-o' : 'microphone';

    return(
      <div>
        <div onClick={this.handleClick}>

        <FontAwesome
                className='super-crazy-colors'
                name={icon}
                size='2x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              />
        </div>

        <div className="audio"></div>

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
