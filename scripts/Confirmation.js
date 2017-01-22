const React = require('react');

const Confirm = React.createClass({

  getInitialState(){
    let confirmed = false;
    return{
      confirmed: confirmed
    };
  },

  render(){
    return(
      <div>
      Did you say X?
      <button>Yes</button>
      <button>No</button>
      </div>
    );
  }
});

module.exports = Confirm;
