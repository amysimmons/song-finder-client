const React = require('react');
const Recorder = require('./Recorder');
const Confirmation = require('./Confirmation');

const SongFinder = React.createClass({

  getInitialState(){
    let recording = false;
    let recordedChunks = [];
    let translatingSpeech = false;
    let findingSongs = false;
    let translationConfirmed = false;
    let matches = [];

    return{
      recording: recording,
      recordedChunks: recordedChunks,
      translatingSpeech: translatingSpeech,
      findingSongs: findingSongs,
      translationConfirmed: translationConfirmed,
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

  render(){
    let recording = this.state.recording;

    return(
      <div>
        <Recorder
          recording={recording}
          setRecording={this.setRecording}/>
      </div>
    );
  }
});

module.exports = SongFinder;
