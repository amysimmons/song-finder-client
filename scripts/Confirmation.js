const React = require('react');

const Confirm = React.createClass({

  getInitialState(){
    let confirmed = false;
    return{
      confirmed: confirmed
    };
  },

  render(){
    let transcription = this.props.transcription;

    return(
      <div>
      <span>Did you say {transcription}?</span>
      <button>Yes</button>
      <button>No</button>
      </div>
    );
  }
});

module.exports = Confirm;
