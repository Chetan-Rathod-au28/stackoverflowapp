import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import Question from './components/Ask-Question/Question';
import Header from './components/Header/Header';
import Main from './components/Main';
import ViewQuestion from './components/ViewQuestion'

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <Switch><Route path="/ask-question" component ={Question} />
      <Route path="/question" component ={ViewQuestion} />
      <Route path="/" component ={Main} />
      </Switch>
      </Router>
      
    </div>
  );
}

export default App;
