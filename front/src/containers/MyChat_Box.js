import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/mychatBox.css';

const TrashIcon = require('../build/static/images/TrashIcon.jpg');
const trashinv = require('../build/static/images/trash.png');

function onMyChatClickContent(index)
{
	const datacur = {
		frame: {
			id: '0',
			number: `${index}`,
		}
	};
	localStorage.setItem('CurrentForm', JSON.stringify(datacur));
}
function MyChatBox(props){
	var state = {
		dialogname: props.dialogname,
		picturesrc: props.src,
		icon: props.icon,
		time: props.time,
		dialoglastchat: props.dialoglastchat,
		id: props.id,
		trash: props.trash,
	};
	var linking='MessageForm/'+state.id;
	if(state.trash==='yes'){linking='TrashMessageForm/';
		state.picturesrc = TrashIcon;
		state.dialoglastchat='';
		state.icon=trashinv
		state.time='';
	}
	return(
		<Link to={linking}>
			<div className='contentBox' onClick={() => onMyChatClickContent(props.id)}>
				<img className='pictureBox' src={state.picturesrc} alt = 'g'/>
				<div className='dialog'>
					<div className='dialogname'>{state.dialogname}</div>
					<div className='dialoglastchat'>{state.dialoglastchat}</div>
				</div>
				<div className="time-check">
					<img className='icon' alt='nope' src={state.icon}/>
					<div className='mytimechatbox'>{state.time}</div>
				</div>
			</div>
		</Link>
	);
}
export default MyChatBox;