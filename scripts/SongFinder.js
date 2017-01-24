const React = require('react');
const Recorder = require('./Recorder');
const Confirmation = require('./Confirmation');

const SongFinder = React.createClass({

  getInitialState(){
    let recording = false;
    let transcription = null;
    let transcriptionCorrect = false;
    let transcribingSpeech = false;
    let findingSongs = false;
    let matches = [];

    return{
      recording: recording,
      transcription: transcription,
      transcribingSpeech: transcribingSpeech,
      findingSongs: findingSongs,
      transcriptionCorrect: transcriptionCorrect,
      matches: matches
    };
  },

  setRecording (recording) {
    if(recording){
      this.setState({recording:true});
    } else {
      this.setState({recording:false});
    }
  },

  setTranscription (transcription) {
    this.setState({transcription:transcription});
  },

  render(){
    let recording = this.state.recording;
    let transcription = this.state.transcription;

  /*
  if transcription is null show recorder
  if transcriptionCorrect yes && transcribingSpeech show loader
  if transcription correct no show recorder
  if findingSongs show loader
  if matches.length > 0 show song /  results
  */

    return(
      <div>
        <Recorder
          recording={recording}
          setRecording={this.setRecording}
          setTranscription={this.setTranscription}/>
        <Confirmation
          transcription={transcription}/>
      </div>
    );
  }
});

module.exports = SongFinder;
