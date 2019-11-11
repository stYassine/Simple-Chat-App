import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './TextContainer.css';

import Join from './pages/join/Join';
import Chat from './pages/chat/Chat';

function App() {
  return (
    <div className="App">
        <Router>
          <Route exact path="/" component={Join} />
          <Route path="/chat" component={Chat} />
        </Router>
    </div>
  );
}

export default App;
