import React, { Component } from 'react';
import axios from "axios";
import './App.sass';
class App extends Component {

  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    this.state = {
      results: []
    };
  }


opap = () => {
  axios({
    method:'get',
    url: 'https://api.opap.gr/draws/v3.0/1100/last-result-and-active?includeAnimation=true&status=results&status=pendingResults'
  })
  .then( (response) => {
    this.setState({
      results: response.data.last.winningNumbers.list.sort((a, b) => a - b)
    });
    console.log(response.data.last.winningNumbers.list)
  });
}

componentDidMount() {
  this.opap()
  setInterval( () => {
    this.opap();
  }, 500);
}


  render() {
    const { results } = this.state;
    return (
      <div className="App">
        <ul>
         {
           results.map((item, i) => <li key={i}> {item} </li>)
         }
        </ul>
      </div>
    );
  }
}

export default App;
