import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Ticket() {
const [id, setId] = useState(0)

  useEffect(() => {
  async function fetchData() {
  const data = await axios.get('/api/tickets');
  const array = data.data
  makeTickets(array)
  }
  fetchData()}, );


const makeTickets = (array) => {
const tickets = array.map(e =>
<div>
<p>{e.id}</p>
<p>{e.title}</p>
<p>{e.content}</p>
<p>{e.userEmail}</p>
<p>{e.labels}</p>
</div>
)
setId(tickets)
}

  return (
    <main>
      <p>{id}</p>
    </main>
  );
}

export default Ticket;
