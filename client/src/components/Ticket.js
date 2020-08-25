import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { set } from 'object-path';
import Modal from 'react-modal';

function PopUp(props){
  const [isOpen,setIsOpen] = useState(false);
  const [title, setTitle] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
  const showAll = async () => {
  if (props.count !== count){
  setIsOpen(true)
  setCount(props.count)
  }
  }; showAll()}, );


function handleClose(){
  setIsOpen(false)
}
    return (
      <div>
        <Modal className="modal"
          animation='true'
          isOpen={isOpen}
        >
          <h4>{props.title}</h4>
          <div>{props.content}</div>
          <br/>
            <button onClick={() => handleClose()}>Close [x]</button>
        </Modal>
      </div>
    );
}

Modal.setAppElement('#root')

function Ticket(props) {
const [list, setList] = useState('')
const [length, setLength] = useState(0)
const [hidden, setHidden] = useState(0)
const [search, setSearch] = useState('')

const [content, setContent] = useState('')
const [title, setTitle] = useState('')
const [count, setCount] = useState(0)

if(props.reset && hidden !== 0){
setHidden(0)
}

  useEffect(() => {
  const fetchData = async () => {
  const { data } = await axios.get(`/api/tickets?searchText=${search}`);
  makeTickets(data)
  }; fetchData()}, [search]);


function handleHidden(e){
document.getElementById(e).className = 'hiddenTicket'
setHidden(hidden => hidden + 1)
}

function showMore(title, content){
setTitle(title)
setContent(content)
setCount(e => e + 1)
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
<h4>{e.title}</h4>
<p className="content">{e.content}</p>
<p onClick={() => showMore(e.title, e.content)} style={{color: '#397eaf', fontWeight:'bold', cursor:'pointer'}}> See more...</p>
<p>By {e.userEmail} | {date.toISOString().substr(0, 19).replace('T', ', ')}
      {Number(date.toISOString().substr(11, 2)) > 11 ? ' PM' : ' AM'}
</p>
{x.map(e => <span className="label">{e}</span>)}
</div>
);

})
setList(tickets)
setLength(tickets.length)
}

props.length(length)
props.hidden(hidden)

  return (
    <div>
      <input id="searchInput" placeholder="Search tickets.." onChange={(event) => {setSearch(event.target.value)}}/>
      <div className="grid-container">
      {list}
      </div>
      <PopUp title={title} content={content} count={count}/>
    </div>
  );
}


export default Ticket;
