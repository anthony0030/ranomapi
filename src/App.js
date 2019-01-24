import React, { Component } from 'react';
import axios from "axios";
import './App.sass';
class App extends Component {

  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    this.state = {
      results: [],
      bonus: "",
      id: ""
    };
  }


opap = () => {
  axios({
    method:'get',
    url: 'https://api.opap.gr/draws/v3.0/1100/last-result-and-active?includeAnimation=true&status=results&status=pendingResults'
  })
  .then( (response) => {
    this.setState({
      results: response.data.last.winningNumbers.list.sort((a, b) => a - b),
      bonus: response.data.last.winningNumbers.bonus[0],
      id: response.data.last.drawId
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
    const { results, bonus, id } = this.state;
    return (
      <div className="App">
        <h1>{id}</h1>
        <ul>
         {
           results.map((item, i) =>
            <li key={i} className={item === bonus? "bonus" : null}> {item} </li>
        )}
        </ul>
      </div>
    );
  }
}

export default App;
