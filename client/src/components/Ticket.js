/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */

import React, { useEffect, useState } from 'react';
import PaginationList from 'react-pagination-list';
import axios from 'axios';
import SideNav, {
  Toggle, Nav, NavItem, NavIcon, NavText,
} from '@trendmicro/react-sidenav';
import PopUp from './PopUp';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

function Ticket(props) {
  const [list, setList] = useState([]);
  const [length, setLength] = useState(0);
  const [hidden, setHidden] = useState(0);
  const [search, setSearch] = useState('');
  const [fresh, setFresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState('Loading Tickets');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [tickets, setTickets] = useState('');

  if (props.reset && hidden !== 0) {
    setHidden(0);
  }

  function fetchAll() {
    makeTickets(tickets);
    handleMargin();
  }
  function fetchDone() {
    const array = [];
    for (const person of tickets) {
      if (person.done) {
        array.push(person);
      }
    }
    makeTickets(array);
    handleMargin();
  }

  function fetchUndone() {
    const array = [];
    for (const person of tickets) {
      if (!person.done) {
        array.push(person);
      }
    }
    makeTickets(array);
    handleMargin();
  }

  function fetchUnhidden() {
    setFresh((e) => e + 1);
    handleMargin();
  }

  function fetchHidden() {
    const array = [];
    for (const person of tickets) {
      if (person.hide) {
        array.push(person);
      }
    }
    makeTickets(array);
    handleMargin();
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/tickets?searchText=${search}`);
      setTickets(data);
      const array = [];
      for (const person of data) {
        if (!person.hide) {
          array.push(person);
        }
      }
      makeTickets(array);
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
    await axios.post(`/api/tickets/${e.id}/done`)
      .then(() => {
        e.done = !e.done;
        if (e.done) {
          document.getElementById(e.id).style.background = '#D0D0CE';
          document.getElementById(`mark${e.id}`).style.color = '#444';
          document.getElementById(`mark${e.id}`).textContent = 'Mark unread';
        } else {
          document.getElementById(e.id).style.background = 'rgb(223, 233, 175)';
          document.getElementById(`mark${e.id}`).style.color = 'green';
          document.getElementById(`mark${e.id}`).textContent = 'Mark read';
        }
      });
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
    const newArray = array.map((e) => {
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
            id={`mark${e.id}`}
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
    });
    setList(newArray);
    setLength(newArray.length);
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

  function handleMargin() {
    if (expanded) {
      document.querySelector('body').style.transition = 'all 0.2s';
      document.querySelector('body').style.marginLeft = '54px';
      setExpanded(false);
    } else {
      document.querySelector('body').style.transition = 'all 0.2s';
      document.querySelector('body').style.marginLeft = '230px';
      setExpanded(true);
    }
  }

  return (
    <div className="appBody">
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
      <SideNav
        expanded={expanded}
        className="sideNav"
        onToggle={handleMargin}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home" onClick={() => fetchAll()}>
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              All Tickets
            </NavText>
          </NavItem>
          <NavItem eventKey="1" onClick={() => fetchHidden()}>
            <NavIcon>
              <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Hidden Tickets
            </NavText>
          </NavItem>
          <NavItem eventKey="2" onClick={() => fetchUnhidden()}>
            <NavIcon>
              <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Unhidden Tickets
            </NavText>
          </NavItem>
          <NavItem eventKey="3" onClick={() => fetchDone()}>
            <NavIcon>
              <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Read Tickets
            </NavText>
          </NavItem>
          <NavItem eventKey="4" onClick={() => fetchUndone()}>
            <NavIcon>
              <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Unread Tickets
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
}

export default Ticket;
