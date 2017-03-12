const React = require('react');

const Confirm = React.createClass({

  getInitialState(){
    let confirmed = false;
    return{
      confirmed: confirmed
    };
  },

  handleClick(value){
    if(value === "yes"){
      this.props.setTranscriptionCorrect(true);
    }else {
      this.props.setTranscriptionCorrect(false);
    }
  },

  render(){
    let transcription = this.props.transcription;

    return(
      <div>
      <span>Did you say {transcription}?</span>
      <button onClick={() => this.handleClick("yes")}>Yes</button>
      <button onClick={() => this.handleClick("no")}>No</button>
      </div>
    );
  }
});

module.exports = Confirm;
