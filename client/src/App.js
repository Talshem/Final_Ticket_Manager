import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import Ticket from './components/Ticket'
import Counter from './components/Counter'
import './App.css';

function App(props) {
const [length, setLength] = useState(0)
const [hidden, setHidden] = useState(0)

function handleHidden(e){
setHidden(e)
}

function handleLength(e){
setLength(e)
}

  return (
    <main>
<Counter length={length} hidden={hidden}/>
<Ticket length={(e) => handleLength(e)} hidden={(e) => handleHidden(e)}/>
    </main>
  );
}

export default App;
