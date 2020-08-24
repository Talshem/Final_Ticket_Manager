import React, {useEffect, useState} from 'react';


function Counter(props) {
const [hidden, setHidden] = useState(-1)

  useEffect(() => {
 function hiddenUpdate() {
 setHidden(e => e + 1)
} hiddenUpdate()}, [props.hidden]);

function resetDisplay(){
let elements = document.getElementsByClassName('ticket')
for (let i=0; i < elements.length; i++){
elements[i].style.display = 'block';
}
setHidden(0)
}

const hiddenTickets = '( ' + (hidden > 1 ? hidden + ' hidden tickets - ' : hidden + ' hidden ticket - ')
const restore = <button onClick={() => resetDisplay()} className="restore">restore</button>



  return (
    <div style={{color: 'grey', textAlign: 'center'}}>
Showing {props.length} results <span className="results">{hidden > 0 ? hiddenTickets : ''}
                                                        {hidden > 0 ? restore : ''}
                                                        {hidden > 0 ? ' )' : ''}
                               </span>
    </div>
  );
}






export default Counter;
