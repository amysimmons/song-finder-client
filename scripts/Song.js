const React = require('react');

const Song = React.createClass({
  render(){
    const src = `https://www.youtube.com/embed/${this.props.id}?autoplay=1`

    return(
      <div>
        <iframe width="420" height="315" src={src}></iframe>
      </div>
    );
  }
});

module.exports = Song;
