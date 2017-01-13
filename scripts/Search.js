const React = require('react');

const Search = React.createClass({

  handleClick() {

    fetch('http://localhost:3000/recognise').then((response) => {
      console.log(response)
      return response.json()
    }).then((dataAsJson) => {
      console.log(dataAsJson)
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });

  },

  render(){
    return(
      <div onClick={this.handleClick}>Sing to me</div>
    );
  }
});

module.exports = Search;