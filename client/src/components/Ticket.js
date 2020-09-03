/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import PaginationList from 'react-pagination-list';
import axios from 'axios';
import PopUp from './PopUp';

function Ticket(props) {
  const [list, setList] = useState('');
  const [length, setLength] = useState(0);
  const [hidden, setHidden] = useState(0);
  const [search, setSearch] = useState('');
  const [fresh, setFresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState('Loading Tickets');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(0);

  if (props.reset && hidden !== 0) {
    setHidden(0);
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/tickets?searchText=${search}`);
      makeTickets(data);
      setLoading(false);
      let i = 0;
      for (const ticket of data) {
        if (ticket.hide) {
          i += 1;
        }
      }
      setHidden(i);
    }; fetchData();
  }, [fresh, search, props.reset]);

  const markHide = async (e) => {
    await axios.post(`/api/tickets/${e.id}/hide`)
      .then(() => {
        setFresh((x) => x + 1);
      });
  };

  const markDone = async (e) => {
    if (!e.done) {
      await axios.post(`/api/tickets/${e.id}/done`);
      setFresh((x) => x + 1);
    } else {
      await axios.post(`/api/tickets/${e.id}/undone`);
      setFresh((x) => x + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((x) => `${x} .`);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(() => 'Loading Tickets');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const makeTickets = (array) => {
    const tickets = array.map((e) => {
      if (!e.hide) {
        const date = new Date(e.creationTime);
        let x = [];
        if (e.labels) {
          x = e.labels;
        }
        const background = (e.done ? '#D0D0CE' : 'rgb(223, 233, 175)');
        const color = (e.done ? '#444' : 'green');
        return (
          <div style={{ background }} className="ticket" key={e.id} id={e.id}>
            <button className="hideTicketButton" onClick={() => markHide(e)}> Hide [x] </button>
            <p
              className="mark"
              style={{
                width: '110px', cursor: 'pointer', color, position: 'absolute', marginLeft: '555px', marginTop: '200px',
              }}
              onClick={() => markDone(e)}
            >
              {e.done ? 'Mark unread' : 'Mark read'}
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
              {x.map((e) => <span key={e} className="label">{e}</span>)}
              {' '}
            </div>
          </div>
        );
      }
    });
    const newTickets = [];
    for (const ticket of tickets) {
      if (ticket) {
        newTickets.push(ticket);
      }
    }
    setList(newTickets);
    setLength(newTickets.length);
  };

  function showMore(title, content) {
    setTitle(title);
    setContent(content);
    setCount((x) => x + 1);
  }

  useEffect(() => {
    const passProps = () => {
      props.length(length);
      props.hidden(hidden);
    }; passProps();
  }, [length, hidden]);

  return (
    <div>
      <div className="input">
        <input id="searchInput" placeholder="Search tickets..." onChange={(event) => { setSearch(event.target.value); }} />
      </div>
      <div className="loading">
        {loading ? dots : ''}
      </div>
      <PaginationList
        data={list}
        pageSize={6}
        renderItem={(item) => item}
      />
      <PopUp title={title} content={content} count={count} />
    </div>
  );
}

export default Ticket;
