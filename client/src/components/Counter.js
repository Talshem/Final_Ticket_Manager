import React, {useEffect, useState} from 'react';


function Counter(props) {
const [hidden, setHidden] = useState(0)

useEffect(() => { function passData(){
setHidden(props.hidden)
}
passData()}, []);

const hiddenTickets = '( ' + (props.hidden > 1 ? props.hidden + ' hidden tickets - ' : props.hidden + ' hidden ticket - ')
const restore = <button className="restore">restore</button>

  return (
    <div style={{color: 'grey'}}>
Showing {props.length} results <span className="results">{props.hidden > 0 ? hiddenTickets : ''}
                                                        {props.hidden > 0 ? restore : ''}
                                                        {props.hidden > 0 ? ' )' : ''}
                               </span>
    </div>
  );
}






export default Counter;
