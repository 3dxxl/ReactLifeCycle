import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Animation } from "./Animation";

import { loader } from "./animation.css";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  //Die Methode wird aufgerufen, wenn die Komponente neue props bekommmt,
  //Beim ersten rendern wird die Methode nicht ausgeführt
  //Wichtig react kann diese Methode aufrufen auch wenn sich die 
  //die props nicht geändert haben!!
  //Die Prüfung auf Veränderung muss ich selbst manuel erstellen in der Methode
  componentWillReceiveProps(nextProps) {
    console.log(
      "componentWillReceiveProps(nextProps: ${JSON.stringify(nextProps)})"
    );
    this.setState({ counter: nextProps.initialCount });
  }

  

  //Hier sollte wie in render() {...} kein setState ausgeführt werden,
  //das könnte zur entlosschleife führen
  //Die Methode wird kurz vor dem rendering aufgerufen
  //ideal für Animationen..
  componentWillUpdate(nextProps, nextState) {
    if (nextState.counter) {
      console.log("componentWillUpdate wurde ausgeführt ")

    }
  }

  render() {
    //in render sollte nicht setState aufgerufen werden, wegen der endlosschleife
    return (
      <div>
        Child Componente:
        {this.state.counter}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      loader: false
    };

    // This binding is necessary to make `this` work in the callback
  }

  // Wird vor dem erstmaligen rendern ausgeführt
  //Die Methode wird auf dem Client & auf der Server ausgeführt
  //Hier kann ich also z.b. den Zustand einer Komponente schon
  //vor dem rendern neu festlegen
  
  componentWillMount() {
    this.setState({ counter: 2 });
    console.log("componentWillMount wurde ausgeführt ")

  }

  //Wird nach dem erstmaligen rendern ausgeführt
  //Die Methode wird nur auf dem Client ausgeführt
  //Hier kann ich also nachträglich z.b. einen Zustand
  //festlegen
  
  componentDidMount() {
    this.setState({ counter: 4 });
    console.log("componentDidMount wurde ausgeführt")

  }

  // Die Methode wird in diesem Beispiel nur ausgeführt 
  //sobald sich die nächste Zustandänderung auf das Objekt loader befindet
  //das bedeutet wenn loader wirklich den nächsten Zustand bekommt,
  //dann führe die Methode aus ansonsten nicht.
  //wichtig hier muss in der Methode immer return true zurück gegeben 
  // werden
   shouldComponentUpdate(nextProps, nextState) {
    if(nextState.loader) {
    setTimeout(() => {
      this.setState({ loader: false });
    }, 1000)
      console.log(JSON.stringify("shouldComponentUdate wurde ausgeführt"));
    }
    return true;
  } 


//Die Methode wird nach der Aktualisierung der Komponente & dem Rendering ausgeführt
//ideal für http requests um. z.b. Daten zu speichern
//Wichtig hier auch kein setState wegen der endlosschleife
componentDidUpdate() {
console.log("componentDidUpdate wurde ausgeführt")
}
  

  handleClick = () => {
    this.setState({ counter: this.state.counter , loader: true});
    console.log("handler event ausgeführt")

  };

  

  render() {
    //in render sollte nicht setState aufgerufen werden, wegen der endlosschleife
    console.log("renderausgeführt")

    return (
  <div>
    {
      //!this.state.loader bedeutet wenn der loader nicht true ist, also false
      //dann führe aus  was in der runden klammer steht
      //!this.state.loader && (....)
          
          !this.state.loader && 
        (
      <div>
        <button onClick={this.handleClick}>{this.state.counter}</button>
          {/*Hier wird der Komonente Counter ein prop übergeben
        welches den Zustand von counter besitzt, jetzt kann 
        ich in der externen Counter Komponente die Methode 
        componentWillReceiveProps anwenden*/}
          <Counter initialCount={this.state.counter} />
        </div>
      )
    }
    {/*{this.state.loader && (..)} bedeutet das wenn loader true ist
        also nicht false, dann für in diesem Beispiel die externe Komponente
        Animation aus*/}
        {this.state.loader && ( <Animation />) }
  </div>
    );
  }
}



const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
