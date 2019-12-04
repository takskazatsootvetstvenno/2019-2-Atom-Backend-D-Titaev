import React from 'react';
import { BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { render } from 'react-dom';
import MessageForm from './containers/Message_Form';
import MessageList from './containers/Message_List';
import MessageProfile from './containers/Message_Profile';
import TrashMessageForm from './containers/TrashMessage_Form';
import './containers/MyMessage_box';
import './containers/MyChat_Box';
import './containers/Message_Profile';
import './containers/MyAudio_Box';
import './styles/globalStyles.css';
import './presets/preset.js';


//const array={'0': 'MessageForm','1': '/','2': 'MessageProfile'};
export class Foundation extends React.Component {
	/*constructor(props){
		super(props);
		this.clickf = this.clickf.bind(this);
		this.state={comp: 'hk',indexer:'0'};
		//this.indexer=1;
		//this.arr = array[this.state.indexer];
		this.curfrom = localStorage.getItem(`CurrentForm`);
		this.data = JSON.parse(this.curfrom);
	}
	*/
render() {return (
	<Router>
		<div className='Window'>
		<Switch>
			<Route path="/MessageForm" component = {MessageForm}/>
			<Route path="/TrashMessageForm" component = {TrashMessageForm}/>
			<Route path="/MessageProfile">
				<MessageProfile key='3' />
			</Route>
			<Route path="/">
				<MessageList key='2' />
			</Route>
		</Switch>
		</div>
	</Router>
);
}
}
render(
	<Foundation/>,
	document.getElementById('root')
);