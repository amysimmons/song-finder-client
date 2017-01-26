const React = require('react');

const Loader = React.createClass({
  loadState(){
    return this.props.transcribingSpeech ? 'Transcribing your recording' : 'Finding songs';
  },

  render(){
    let loadState = this.loadState();
    return(
      <div>
        {loadState}
      </div>
    );
  }
});

module.exports = Loader;
