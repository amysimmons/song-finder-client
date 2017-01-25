const React = require('react');
const Recorder = require('./Recorder');
const Confirmation = require('./Confirmation');
const Loader = require('./Loader');
const Song = require('./Song');

const SongFinder = React.createClass({

  getInitialState(){
    let recording = false;
    let transcribingSpeech = false;
    let transcription = null;
    let transcriptionCorrect = null;
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

  setTranscriptionCorrect (transcriptionCorrect) {
    if(transcriptionCorrect){
      this.setState({transcriptionCorrect:true});
    } else {
      this.setState({transcriptionCorrect:false});
    }
  },

  setTranscribingSpeech (transcribing) {
    if(transcribing){
      this.setState({transcribingSpeech:true});
    } else {
      this.setState({transcribingSpeech:false});
    }
  },

  render(){
    let recording = this.state.recording;
    let transcribingSpeech = this.state.transcribingSpeech;
    let transcription = this.state.transcription;
    let transcriptionCorrect = this.state.transcriptionCorrect;
    let findingSongs = this.state.findingSongs;
    let matches = this.state.matches;

    if (transcription === null || transcriptionCorrect === false){
     return(
       <div>
         <Recorder
           recording={recording}
           setRecording={this.setRecording}
           setTranscribingSpeech={this.setTranscribingSpeech}
           setTranscription={this.setTranscription}/>
       </div>
     );
    }

    if (transcription !== null && transcriptionCorrect === null) {
      return (
        <div>
          <Confirmation
            transcription={transcription}
            transcriptionCorrect={transcriptionCorrect}
            setTranscriptionCorrect={this.setTranscriptionCorrect}/>
        </div>
      );
    }

    if (transcribingSpeech || findingSongs) {
      return (
        <div>
          <Loader/>
        </div>
      )
    }

    if (matches.length > 0) {
      return (
        <div>
          <Song/>
        </div>
      )
    }



    // if ()

  /*
  if transcription is null show recorder
  if transcribingSpeech show loader
  if transcription incorrect show recorder
  if findingSongs show loader
  if matches.length > 0 show song /  results
  */

    // return(
    //   <div>
    //     <Recorder
    //       recording={recording}
    //       setRecording={this.setRecording}
    //       setTranscription={this.setTranscription}/>
    //     <Confirmation
    //       transcription={transcription}/>
    //   </div>
    // );
  }
});

module.exports = SongFinder;
