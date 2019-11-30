import React from 'react';
import { Link } from 'react-router-dom';  
import MyMessagebox from '../containers/MyMessage_box';
import '../styles/trashmessageForm.css';

const TrashIcon = require('../build/static/images/trash.png');


export class TrashMessage_Form extends React.Component {
	constructor(props) {
		super(props);
		this.insider = [];
		this.numberofmes = 1;
		this.lasttimecheck = new Date(2010,11,2,0,0,0);
		this.state = {hattext: '',picturesrc: '', value: '',
					valueautor: '','placehautor': 'Имя в чате','placeh': 'Сообщение', comp: ''};
		this.clickSendButton = this.clickSendButton.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeAutor=this.handleChangeAutor.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.clickBackButton =this.clickBackButton.bind(this);
		this.LocalAddMessage =this.LocalAddMessage.bind(this);
	}
	componentDidMount() {
		//console.log(this.lasttimecheck);
		this.read_all_messages_from_server();
		//console.log(this.lasttimecheck);
		this.t = setInterval(()=>
			{
			var mytime = {
				'ye': this.lasttimecheck.getUTCFullYear(),
				'mo': this.lasttimecheck.getUTCMonth(),
				'da': this.lasttimecheck.getUTCDate(),
				'ho': this.lasttimecheck.getUTCHours(),
				'mi': this.lasttimecheck.getUTCMinutes(),
				'sec': this.lasttimecheck.getUTCSeconds(),
				'micsec': (this.lasttimecheck.getUTCMilliseconds()*1000),
			}
			this.read_new_messages_from_server(mytime);
			}
			,3000);
		
	}
	clickBackButton()
	{
		clearInterval(this.t);
		const datacur={};
		datacur.frame = {
			id: '1',
			number: '1',
		};
		localStorage.setItem('CurrentForm', JSON.stringify(datacur));
	}
	read_new_messages_from_server(mytime)
	{
		return fetch(`http://localhost/back/trashchat/new_messages?ye=${mytime.ye}&mo=${
			mytime.mo+1}&da=${mytime.da}&ho=${mytime.ho}&mi=${mytime.mi}&sec=${mytime.sec}&micsec=${mytime.micsec}`, {
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
					//for( var i=0;i<data.answer.length;i++){
						this.lasttimecheck = new Date();
						this.LocalAddMessage(data.answer);
						//console.log(data.answer.length);
						//console.log(data.answer);
						//console.log(data[i].answer.content);
					//	}
				});
		  });
	}
	read_all_messages_from_server()
	{
			return fetch('http://localhost/back/trashchat/messages_list', {
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
					//for( var i=0;i<data.answer.length;i++){
						this.lasttimecheck=new Date();
						this.LocalAddMessage(data.answer);
						//console.log(data.answer.length);
						//console.log(data.answer);
						//console.log(data[i].answer.content);
					//	}
				});
		  });
	}

	send_message_to_server(obj){
		if (obj[0].content==null || obj[0].user==null)return;
			//let obj = {
			//	user: {text},
			//	autor: {autor},
			//}
			//debugger;
			


			clearInterval(this.t);
			var data = new FormData();
			data.append( "user", obj[0].user );
			data.append( "content", obj[0].content );

			return fetch('http://localhost/back/trashchat/send_message', {
		    	method: 'POST',
 				body: data,
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
					//for( var i=0;i<data.answer.length;i++){
						//this.lasttimecheck=new Date();
						
						var mytime = {
							'ye': this.lasttimecheck.getUTCFullYear(),
							'mo': this.lasttimecheck.getUTCMonth(),
							'da': this.lasttimecheck.getUTCDate(),
							'ho': this.lasttimecheck.getUTCHours(),
							'mi': this.lasttimecheck.getUTCMinutes(),
							'sec': this.lasttimecheck.getUTCSeconds(),
							'micsec': (this.lasttimecheck.getUTCMilliseconds()*1000),
						}
						this.read_new_messages_from_server(mytime);
						this.lasttimecheck=new Date();
						
						setTimeout(()=> {
							this.lasttimecheck=new Date();
							this.t = setInterval(()=>
						{
						var mytime = {
							'ye': this.lasttimecheck.getUTCFullYear(),
							'mo': this.lasttimecheck.getUTCMonth(),
							'da': this.lasttimecheck.getUTCDate(),
							'ho': this.lasttimecheck.getUTCHours(),
							'mi': this.lasttimecheck.getUTCMinutes(),
							'sec': this.lasttimecheck.getUTCSeconds(),
							'micsec': (this.lasttimecheck.getUTCMilliseconds()*1000),
						}
						this.read_new_messages_from_server(mytime);
						}
						,3000);
						},100)
						
						
				
						//this.read_new_messages_from_server(mytime);
						//console.log(data.answer.length);
						//console.log(data.answer);
						//console.log(data[i].answer.content);
					//	}
				});
		  });
	}

	LocalAddMessage(obj,pos='l'){// send message to local_storage
		for(var i =0;i<obj.length;i++){
			const str = obj[i].content.replace(/^\s*(.*)\s*$/, '$1');
			const strautor = obj[i].user.replace(/^\s*(.*)\s*$/, '$1');
			const strtime = obj[i].added_at.slice(11, 16);
			if (strautor ==='' || strautor === null || str ==='' || str === null)
			{
				if (str ==='' || str === null)
					this.setState({'placeh': 'ЗДЕСЬ ДОЛЖНО БЫТЬ СООБЩЕНИЕ!!!'});
				if (strautor ==='' || strautor === null)
					this.setState({'placehautor': 'ЗДЕСЬ ДОЛЖНО БЫТЬ ИМЯ!!!'});
				return;
			}
			
			// THIS.DATA[`IND${THIS.NUMBEROFMES}`] = {
			// 	TEXT: STR,
			// 	POSITION: 'R',
			// 	TIME: LT.TOLOCALETIMESTRING().SUBSTR(0, 5),
			// };
			//this.data.ind0.checked = 'no';
			//localStorage.setItem(`Messages${this.myid}`, JSON.stringify(this.data));
			if (strautor!==this.state.valueautor){
				this.insider.push(<MyMessagebox 
				text = {str}
				position = 'l'
				autor = {strautor}
				key={this.numberofmes}
				time = {strtime} />);
			}
			else
			{
				this.insider.push(<MyMessagebox 
				text = {str}
				position = 'r'
				autor = {strautor}
				key={this.numberofmes}
				time = {strtime} />);
			}
			this.setState({comp: this.insider});
			this.setState({value: ''});
			this.numberofmes++;
			//console.log(send_message_to_server(str,strautor));
		}
	}

	clickSendButton(text) {
		const lt = new Date();
			var obj = [{'content': this.state.value,
					'user': this.state.valueautor,
					'added_at': '          '+lt.toLocaleTimeString().substr(0, 5),}]
		//this.LocalAddMessage(obj,'r');
		this.send_message_to_server(obj);
	}

	handleChange(event) {
		
		if(event.target.value.length<200)
		this.setState({value: event.target.value});
	}

	handleChangeAutor(event) {
		if(event.target.value.length<15){
		for(var i =0;i<this.insider.length;i++){
			var tempprops=this.insider[i].props;
			if(this.insider[i].props.autor===event.target.value)
				this.insider[i]=<MyMessagebox 
					text = {tempprops.text}
					position = 'r'
					autor = {tempprops.autor}
					key={this.insider[i].key}
					time = {tempprops.time} />;
			else
				this.insider[i]=<MyMessagebox 
					text = {tempprops.text}
					position = 'l'
					autor = {tempprops.autor}
					key={this.insider[i].key}
					time = {tempprops.time} />;
		}
		this.setState({comp: this.insider});
		this.setState({valueautor: event.target.value});
		}	

	}

	handleKeyPress(event) {

		if(event.key==='Enter'){
			const lt = new Date();
			var obj = [{'content': this.state.value,
					'user': this.state.valueautor,
					'added_at': '          '+lt.toLocaleTimeString().substr(0, 5),}]
		//this.LocalAddMessage(obj,'r');
		this.send_message_to_server(obj);
		}
	}

	render() {
		return (
			<div className="wrap">
				<div className="header">
					<Link to="/">
						<button className="button" onClick={this.clickBackButton} />
					</Link>
					<img className='trashpicture' src={TrashIcon} alt={this.state.picturesrc}/>
					<div className="hattext">>Trash Chat!</div>
				</div>
				<div className="content">
					{this.state.comp}
				</div>
				<div className="footer">
					<input className='autorimput' type="text" value={this.state.valueautor} onChange={this.handleChangeAutor} onKeyPress={this.handleKeyPress} placeholder={this.state.placehautor}/>
					<input type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} placeholder={this.state.placeh}/>
					<button className="sendbutton" onClick={this.clickSendButton}  />
				</div>
			</div>
		);
	}
}
export default TrashMessage_Form;
