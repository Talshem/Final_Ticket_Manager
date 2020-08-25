/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopUp from './PopUp';
import Undone from '../image.png';
import Done from '../imagedone.png';

function Ticket(props) {
  const [list, setList] = useState('');
  const [length, setLength] = useState(0);
  const [hidden, setHidden] = useState(0);
  const [search, setSearch] = useState('');
  const [fresh, setFresh] = useState(0);

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(0);

  if (props.reset && hidden !== 0) {
    setHidden(0);
  }

  const markDone = async (e) => {
    if (!e.done) {
      await axios.post(`/api/tickets/${e.id}/done`);
      setFresh((e) => e + 1);
    } else {
      await axios.post(`/api/tickets/${e.id}/undone`);
      setFresh((e) => e + 1);
    }
  };

  const makeTickets = (array) => {
    const tickets = array.map((e) => {
      const date = new Date(e.creationTime);
      let x = [];
      if (e.labels) {
        x = e.labels;
      }

      const background = (e.done ? Done : Undone);
      const color = (e.done ? 'red' : 'green');

      return (
        <div style={{ backgroundImage: `url(${background})` }} className="ticket" key={e.id} id={e.id}>
          <button className="hideTicketButton" onClick={() => handleHidden(e.id)}> Hide [x] </button>
          <p
            style={{
              width: '80px', cursor: 'pointer', color, position: 'absolute', marginLeft: '550px', marginTop: '200px',
            }}
            onClick={() => markDone(e)}
          >
            {e.done ? '✗ Undone' : '✓ Done'}
          </p>
          <h4 className="title">{e.title}</h4>
          <p className="content">{e.content}</p>
          <p onClick={() => showMore(e.title, e.content)} style={{ color: '#397eaf', fontWeight: 'bold', cursor: 'pointer' }}> See more...</p>
          <p>
            By
            {' '}
            { e.userEmail}
            {' '}
            |
            {' '}
            {date.toISOString().substr(0, 19).replace('T', ', ')}
            {Number(date.toISOString().substr(11, 2)) > 11 ? ' PM' : ' AM'}
          </p>
          <div className="labelGrid">
            {x.map((e) => <span className="label">{e}</span>)}
            {' '}
          </div>
        </div>
      );
    });
    setList(tickets);
    setLength(tickets.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/tickets?searchText=${search}`);
      makeTickets(data);
    }; fetchData();
  }, [fresh, search]);

  function handleHidden(e) {
    document.getElementById(e).className = 'hiddenTicket';
    setHidden((hidden) => hidden + 1);
  }

  function showMore(title, content) {
    setTitle(title);
    setContent(content);
    setCount((e) => e + 1);
  }

  props.length(length);
  props.hidden(hidden);

  return (
    <div>
      <div className="input">
        <input id="searchInput" placeholder="Search tickets..." onChange={(event) => { setSearch(event.target.value); }} />
      </div>
      <div className="grid-container">
        {list}
      </div>
      <PopUp title={title} content={content} count={count} />
    </div>
  );
}

export default Ticket;
