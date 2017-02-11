const React = require('react');
const FontAwesome = require('react-fontawesome');

const Loader = React.createClass({
  loadState(){
    return this.props.transcribingSpeech ? 'Transcribing your recording' : 'Finding songs';
  },

  render(){
    let loadState = this.loadState();
    return(
      <div>
        <div className="loader">
          <FontAwesome
                  className='super-crazy-colors'
                  name='spinner'
                  size='2x'
                  spin
                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />
        </div>
        <div className="load-state">
          {loadState}
        </div>
      </div>
    );
  }
});

module.exports = Loader;
