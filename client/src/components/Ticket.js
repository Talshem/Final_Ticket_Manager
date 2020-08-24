import React, {useEffect, useState} from 'react';
import axios from 'axios';


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
const tickets = array.map(e =>
<div className="ticket" key={e.id}>
<h3>{e.title}</h3>
<p>{e.content}</p>
<p>By {e.userEmail} | {e.creationTime}</p>
<p></p>
</div>
)
setList(tickets)
}

  return (
    <main>
      {list}
    </main>
  );
}

export default Ticket;
