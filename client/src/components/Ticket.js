import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { set } from 'object-path';


function Ticket() {
const [list, setList] = useState(0)


  useEffect(() => {
  async function fetchData() {
  const data = await axios.get('/api/tickets');
  const array = data.data
  makeTickets(array)
  }
  fetchData()}, );

const makeTickets = (array) => {

const tickets = array.map((e) => {
let date = new Date(e.creationTime)
let x = [];

if(e.labels){
x = e.labels
}

 return  (
<div className="ticket" key={e.id}>
<h3>{e.title}</h3>
<p>{e.content}</p>
<p>By {e.userEmail} |
      {date.toISOString().substr(0, 19).replace('T', ', ')}
      {Number(date.toISOString().substr(11, 2)) > 11 ? 'PM' : 'AM'}
      {x.map(e => <p className="label">{e}</p>)}
</p>
</div>
);

})
setList(tickets)
}

  return (
    <main>
      {list}
    </main>
  );
}


export default Ticket;
