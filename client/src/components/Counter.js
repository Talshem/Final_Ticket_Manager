import React, {useEffect, useState} from 'react';


function Counter(props) {
const [hidden, setHidden] = useState(-1)

  useEffect(() => {
 function hiddenUpdate() {
setHidden(props.hidden)
} hiddenUpdate()}, [props.hidden]);



function resetDisplay(){
let elements = document.getElementsByClassName('ticket')
for (let i=0; i < elements.length; i++){
elements[i].style.display = 'block';
}
props.reset()
}

const singular = ' hidden ticket - '
const plural = ' hidden tickets - '
const hiddenBar = (hidden > 1 ? plural : singular)
const restore = <button id="restoreHideTickets" onClick={() => resetDisplay()} className="restore">restore</button>

const resultsBar = <span className="results">
<span id="hideTicketsCounter"> ( {hidden}</span>
{hidden > 0 ? hiddenBar : ''}
{restore} )
</span>

  return (
    <div style={{color: 'grey', textAlign: 'center'}}>
Showing {props.length} results 
{hidden > 0 ? resultsBar : ''}
    </div>
  );
}






export default Counter;
