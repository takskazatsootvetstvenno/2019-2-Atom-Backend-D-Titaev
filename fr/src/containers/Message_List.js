import React from 'react';
import { Link } from 'react-router-dom';
import MyChatbox from '../containers/MyChat_Box';
import '../styles/messageList.css';

export class MessageList extends React.Component {
	constructor(props) {
		super(props);// ≡🔍✎
		this.insider = [];
		this.numberofmes = 1;
		this.state = {hattext: '',picturesrc: '', value: '', comp: ''};
		this.clickprofilebutton=this.clickprofilebutton.bind(this);
	}
	
	componentDidMount() {
		for (let i = 0; i < localStorage.length; i++) {
			const templs = localStorage.getItem(`Messages${i}`);
			if (templs) {
				this.data = JSON.parse(templs);
				const templast = `ind${Object.keys(this.data).length - 1}`;
				var temptext;
				if (this.data[templast].text.length < 100) temptext= this.data[templast].text;
				else temptext = '...';
				var tempicon;
				if (this.data.ind0.checked === 'no')
					try {
						tempicon=require('../build/static/images/check_mark.png');
					}
					catch{
						tempicon='../build/static/images/check_mark.png';
					}
				else
				{
					try {
						tempicon=require('../build/static/images/double_check_mark.png');
					}
					catch{
						tempicon='../build/static/images/double_check_mark.png';
					}
				}
				var tempsrc;
				try {
					tempsrc = require(`../build/static/images/${this.data.ind0.image}`);
				}
				catch { tempsrc = '';}
					this.insider.push(<MyChatbox 
						src={tempsrc}
						id={this.data.ind0.id}
						dialogname={this.data.ind0.name}
						dialoglastchat={temptext}
						key={i}
						trash={this.data.ind0.trashchat}
						icon={tempicon}
						time={this.data[`ind${Object.keys(this.data).length - 1}`].time} />);
			}
		}
		this.setState({comp: this.insider});
	}

	clickprofilebutton()
	{
		const datacur = {
			frame: {
				id: '2',
				number: `${0}`,
			}
		};
		localStorage.setItem('CurrentForm', JSON.stringify(datacur));
	}

	render() {
		return (
			<div className="wrap">
				<div className="headerlist">
					<Link to="MessageProfile">
						<button className="button1" onClick={this.clickprofilebutton}/>
					</Link>
					<div className="hattextlist">Messenger</div>
					<button className="lupa" />
				</div>
				<div className="content" >
					{this.state.comp}
				</div>
				<button className="pensilbutton" />
			</div>
		);
	}
}
export default MessageList;