/* eslint-disable quotes */
/* eslint-disable no-plusplus */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Counter(props) {
  const [hidden, setHidden] = useState(-1);

  useEffect(() => {
    function hiddenUpdate() {
      setHidden(props.hidden);
    } hiddenUpdate();
  }, [props.hidden]);

  const resetDisplay = async () => {
    await axios.post(`/api/tickets/unhide`);
    props.reset();
  };

  const singular = ' hidden ticket - ';
  const plural = ' hidden tickets - ';
  const hiddenBar = (hidden > 1 ? plural : singular);
  const restore = <button id="restoreHideTickets" onClick={() => resetDisplay()} className="restore">restore</button>;

  const resultsBar = (
    <span className="results">
      {' '}
      (
      {' '}
      <span id="hideTicketsCounter">{hidden}</span>
      {hidden > 0 ? hiddenBar : ''}
      {restore}
      {' '}
      )
    </span>
  );

  return (
    <div className="showing">
      Showing
      {' '}
      {props.length}
      {' '}
      results
      {hidden > 0 ? resultsBar : ''}
    </div>
  );
}

export default Counter;
