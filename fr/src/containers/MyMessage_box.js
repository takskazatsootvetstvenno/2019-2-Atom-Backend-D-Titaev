import React from 'react';  
import '../styles/mymessageBox.css';

function MyMessageBox(props)
{
	var state;
	if(props.position === 'r')
		state = {position: 'content_right', time: 'time_right'};
	else
		state = {position: 'content_left', time: 'time_right'};
	return(
		<div className="Boxline">
			<div className={state.position}>
				<div className='mytext'>{props.text}</div>
				<div className={state.time}>{props.time}</div>
				<div className='autorcaption'>{props.autor}</div>
			</div>
		</div>
	);
}
export default MyMessageBox;
