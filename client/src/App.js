import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import Ticket from './components/Ticket'
import Counter from './components/Counter'
import Search from './components/Search'
import './App.css';

function App(props) {
const [length, setLength] = useState(0)
const [hidden, setHidden] = useState(0)
const [reset, setReset] = useState(false)

function handleHidden(e){
setReset(false)
setHidden(e)
}

function resetHidden(){
setReset(true)
}

function handleLength(e){
setLength(e)
}

  return (
    <main>
<Counter length={length} hidden={hidden} reset={() => resetHidden()}/>
<Ticket length={(e) => handleLength(e)} hidden={(e) => handleHidden(e)}  reset={reset}/>
    </main>
  );
}

export default App;
