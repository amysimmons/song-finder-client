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
      this.findSongs();
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

  findSongs() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var myInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({"transcription":"plant a seed plant a flower plant a rose"})
    };

    fetch("http://localhost:3000/findsongs", myInit)
      .then((response) => {
      return response.json()
    }).then((dataAsJson) => {
      const tracks = dataAsJson.message.body.track_list
      this.setState({matches: tracks})
    }).catch(function(error) {
      console.log('error', error.message);
    });
  },

  render(){
    let recording = this.state.recording;
    let transcribingSpeech = this.state.transcribingSpeech;
    let transcription = this.state.transcription;
    let transcriptionCorrect = this.state.transcriptionCorrect;
    let findingSongs = this.state.findingSongs;
    let matches = this.state.matches;

    this.findSongs();

    if (transcribingSpeech || findingSongs) {
      return (
        <Loader
          transcribingSpeech={transcribingSpeech}
          findingSongs={findingSongs}/>
      )
    }

    if (transcription === null || transcriptionCorrect === false){
      // this.getInitialState()
      // reset the state here

     return(
       <Recorder
         recording={recording}
         setRecording={this.setRecording}
         setTranscribingSpeech={this.setTranscribingSpeech}
         setTranscription={this.setTranscription}/>
     );
    }

    if (transcription !== null && transcriptionCorrect === null) {
      return (
        <Confirmation
          transcription={transcription}
          transcriptionCorrect={transcriptionCorrect}
          setTranscriptionCorrect={this.setTranscriptionCorrect}/>
      );
    }

    if (matches.length > 0) {
      return (
        <Song/>
      )
    }


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
