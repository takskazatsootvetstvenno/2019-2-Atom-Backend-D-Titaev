import React from 'react';
import { Link } from 'react-router-dom';
import MyChatbox from '../containers/MyChat_Box';
import '../styles/messageList.css';

export class MessageList extends React.Component {
	constructor(props) {
		super(props);// ≡🔍✎
		this.insider = [];
		this.data={};
		this.backuserid = 0;
		this.numberofmes = 1;
		this.chatinfo = [];
		this.state = {hattext: '',picturesrc: '', value: '', comp: ''};
		this.clickprofilebutton=this.clickprofilebutton.bind(this);
	}
	
	getallmessagesfromchat(topic,id,index,backuserid,member_id,checked)
	{
		fetch(`http://localhost/back/message/chat_messages?id=${id}`, {
		    method: 'GET',
		    mode: 'cors',
		    //body: JSON.stringify({'not': 'not'}),
		    headers: { 'Content-Type': 'application/json' }
		  }).then(response => {
		    if (response.status >= 400) {
		      // !response.ok
		      return response.json().then(errResData => {
		        const error = new Error('Something went wrong!');
		        error.data = errResData;
		        throw error;
		      });
		    }
		    return response.json().then(data=>{
		    	var answer=data.answer;
					this.data['ind0'] = {
						name: topic,
						image: 'Anonymous.svg.png',
						checked: checked,
						id: index+1,
						chat_id: id,
						user_id: backuserid,
						member_id: member_id,
						date: new Date(),
					};

					
					for(var i = 0;i<answer.length;i++){
						if(answer[i].user === backuserid){
							this.data[`ind${i+1}`]= {
								text: answer[i].content,
								position: 'r',
								href: 'No',
								time: answer[i].added_at.substr(11, 5),
							};
						}else{
							this.data[`ind${i+1}`]= {
								text: answer[i].content,
								position: 'l',
								href: 'No',
								time: answer[i].added_at.substr(11, 5),
							};							
						}
						//this.data.ind0.checked = 'no';
						
					}
					localStorage.setItem(`Messages${index+1}`, JSON.stringify(this.data));
		    });

			});
	}
	drawlist(){
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
	componentDidMount() {
			fetch(`http://localhost/back/chats/member_list`, {
		    method: 'GET',
		    mode: 'cors',
		    //body: JSON.stringify({'not': 'not'}),
		    headers: { 'Content-Type': 'application/json' }
		  }).then(response => {
		    if (response.status >= 400) {
		      return response.json().then(errResData => {
		        const error = new Error('Something went wrong!');
		        error.data = errResData;
		        throw error;
		      });
		    }
		    if (response.redirected === true) {
		    	this.drawlist();
		    }
		    return response.json().then(data=>{
		    		console.log('succes')
					//for( var i=0;i<data.answer.length;i++){
					var answer = data.answer;
					this.backuserid=data.answer.your_name_id;
					 for(var i =0;i<answer.length;i++){
					 	var checked='no';
					 	if(answer[i].chat_info.last_message===answer[i].member_info.new_messages)
					 		checked='yes';
							/*this.chatinfo.push({
								topic: answer[i].chat_info.topic,
								last_message:  answer[i].chat_info.last_message,
								id:  answer[i].chat_info.id,
							});*/
							this.getallmessagesfromchat(answer[i].chat_info.topic,
								answer[i].chat_info.id,i,answer[i].your_name_id,
								answer[i].member_info.member_id,checked);
						}
						setTimeout(()=> {
							this.drawlist();
						},200)
				});
		  });
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