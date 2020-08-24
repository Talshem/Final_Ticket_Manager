import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { set } from 'object-path';


function Ticket(props) {
const [list, setList] = useState('')
const [length, setLength] = useState(0)
const [hidden, setHidden] = useState(0)

  useEffect(() => {
  async function fetchData() {
  const data = await axios.get('/api/tickets');
  const array = data.data
  makeTickets(array)
  }
  fetchData()}, []);



function handleHidden(e){
document.getElementById(e).style.display = 'none'
setHidden(hidden => hidden + 1)
}

const makeTickets = (array) => {
const tickets = array.map((e) => {
let date = new Date(e.creationTime)
let x = [];
if(e.labels){
x = e.labels
}

 return  (
<div className="ticket" key={e.id} id={e.id}>
<button className="hide" onClick={() => handleHidden(e.id)}> Hide </button>
<h3>{e.title}</h3>
<p>{e.content}</p>
<p>By {e.userEmail} | {date.toISOString().substr(0, 19).replace('T', ', ')}
      {Number(date.toISOString().substr(11, 2)) > 11 ? ' PM' : ' AM'}
      {x.map(e => <p className="label">{e}</p>)}
</p>
</div>
);

})
setList(tickets)
setLength(tickets.length)
}

props.length(length)
props.hidden(hidden)



  return (
    <main>
      {list}
    </main>
  );
}


export default Ticket;
