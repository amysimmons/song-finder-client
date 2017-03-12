const React = require('react');
const FontAwesome = require('react-fontawesome');

const Recorder = React.createClass({

  getInitialState(){
    let recognition = new webkitSpeechRecognition();
    return{
      recognition: recognition
    };
  },

  startRecording () {
    this.props.setRecording(true);
    this.state.recognition.start();

    console.log('speech recognition started')

    this.state.recognition.onspeechstart = (event) => {
      console.log('speech detected')
    }

    this.state.recognition.onspeechend = (event) => {
      console.log('speech end detected')
    }

    this.state.recognition.onresult = (event) => {
      console.log('speech result detected')
      this.stopRecording();
      const transcription = event.results[0][0].transcript;
      this.props.setTranscription(transcription);
    }
  },

  stopRecording () {
    this.props.setRecording(false);
    this.state.recognition.stop();
    console.log('speech recognition stoppped');
  },

  handleClick() {
    this.props.recording ? this.stopRecording() : this.startRecording();
  },

  render(){
    const icon = this.props.recording ? 'stop-circle-o' : 'microphone';

    return(
      <div onClick={this.handleClick}>
        <FontAwesome
                className='super-crazy-colors'
                name={icon}
                size='2x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              />
      </div>
    );
  }
});

module.exports = Recorder;

