import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { set } from 'object-path';


function Ticket(props) {
const [list, setList] = useState('')
const [length, setLength] = useState(0)
const [hidden, setHidden] = useState(0)

if(props.reset && hidden !== 0){
setHidden(0)
}

  useEffect(() => {
  async function fetchData() {
  const data = await axios.get('/api/tickets');
  const array = data.data
  makeTickets(array)
  }
  fetchData()}, []);



function handleHidden(e){
document.getElementById(e).className = 'hiddenTicket'
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
<button className="hideTicketButton" onClick={() => handleHidden(e.id)}> Hide </button>
<h3>{e.title}</h3>
<p>{e.content}</p>
<p>By {e.userEmail} | {date.toISOString().substr(0, 19).replace('T', ', ')}
      {Number(date.toISOString().substr(11, 2)) > 11 ? ' PM' : ' AM'}
      {x.map(e => <span className="label">{e}</span>)}
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
