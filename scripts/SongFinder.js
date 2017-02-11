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

    return{
      recording: recording,
      transcription: transcription,
      transcribingSpeech: transcribingSpeech,
      findingSongs: findingSongs,
      transcriptionCorrect: transcriptionCorrect
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
      this.setState({transcription: null})
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
      body: JSON.stringify({"transcription":this.state.transcription})
    };

    fetch("http://localhost:3000/findsongs", myInit)
      .then((response) => {
      return response.json()
    }).then((dataAsJson) => {
      const songMatchYouTubeId = dataAsJson.bestMatchVideo;
      this.setState({songMatchYouTubeId: songMatchYouTubeId})
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
    let songMatchYouTubeId = this.state.songMatchYouTubeId;

    if (transcribingSpeech || findingSongs) {
      return (
        <Loader
          transcribingSpeech={transcribingSpeech}
          findingSongs={findingSongs}/>
      )
    }else if(transcription === null || transcriptionCorrect === false){
      return(
       <Recorder
         recording={recording}
         setRecording={this.setRecording}
         setTranscribingSpeech={this.setTranscribingSpeech}
         setTranscription={this.setTranscription}/>
      );
    }else if (transcription !== null && transcriptionCorrect === null) {
      return (
        <Confirmation
          transcription={transcription}
          transcriptionCorrect={transcriptionCorrect}
          setTranscriptionCorrect={this.setTranscriptionCorrect}/>
      );
    }else if (songMatchYouTubeId) {
      return (
        <Song
          id={songMatchYouTubeId}/>
      )
    }else {
      return (
        <div>say what?!</div>
      )
    }

  }
});

module.exports = SongFinder;
