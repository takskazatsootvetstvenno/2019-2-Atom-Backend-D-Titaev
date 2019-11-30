import React from 'react';
import { Link } from 'react-router-dom';  
import MyMessagebox from '../containers/MyMessage_box';
import MyAudioBox from '../containers/MyAudio_Box';
import '../styles/messageForm.css';

export class MessageForm extends React.Component {
	constructor(props) {
		super(props);
		this.insider = [];
		this.chunks=[];
		this.numberofmes = 1;
		this.state = {hattext: '',picturesrc: '', value: '', comp: '', played: 'No',
			buttonname: 'microbutton', opac: '', contentfill: 'null', contentname: 'content'};
		this.clickSendButton = this.clickSendButton.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.clickBackButton =this.clickBackButton.bind(this);
		this.clickGeoButton =this.clickGeoButton.bind(this);
		this.functionpos =this.functionpos.bind(this);
		this.functiondragenter=this.functiondragenter.bind(this);
		this.functiondragleave=this.functiondragleave.bind(this);
		this.functiondrop=this.functiondrop.bind(this);
		this.funcprevent=this.funcprevent.bind(this);
	}

	componentDidMount() {

		this.myid = this.props.location.pathname.match(/\d+/);
		const templs = localStorage.getItem(`Messages${this.myid}`);
		if (templs) {
			this.data = JSON.parse(templs);
		} else { this.setState({hattext: 'Такого чата не существует'}); return; }
		this.setState({hattext: this.data.ind0.name});
		try {
			this.setState({picturesrc: require(`../build/static/images/${this.data.ind0.image}`)});
		}
		catch {
			this.setState({picturesrc: 'nope'});
		}
		for (;this.numberofmes < Object.keys(this.data).length; this.numberofmes++) {
			if(this.data[`ind${this.numberofmes}`].href === 'No')
				this.insider.push(<MyMessagebox 
					text = {this.data[`ind${this.numberofmes}`].text}
					position={this.data[`ind${this.numberofmes}`].position}
					time={this.data[`ind${this.numberofmes}`].time} />);
			else
				this.insider.push(<MyMessagebox 
					text = {<a href={this.data[`ind${this.numberofmes}`].text}>
						{this.data[`ind${this.numberofmes}`].text}</a>}
					position={this.data[`ind${this.numberofmes}`].position}
					time={this.data[`ind${this.numberofmes}`].time} />);
		}
		this.setState({comp: this.insider});
	}

	clickBackButton()
	{
		const datacur={};
		datacur.frame = {
			id: '1',
			number: '1',
		};
		localStorage.setItem('CurrentForm', JSON.stringify(datacur));
	}

	functionpos(position) {
		const temptext = `https://www.openstreetmap.org/#map=18/${  position.coords.latitude}/${position.coords.longitude}`;
		this.setState({value: temptext});
		
		const str = this.state.value.replace(/^\s*(.*)\s*$/, '$1');
		if (str !== '' && str !== null) {
			const lt = new Date();
			this.data[`ind${this.numberofmes}`] = {
				text: str,
				position: 'r',
				href: 'Yes',
				time: lt.toLocaleTimeString().substr(0, 5),
			};
			this.data.ind0.checked = 'no';
			localStorage.setItem(`Messages${this.myid}`, JSON.stringify(this.data));
			this.insider.push(<MyMessagebox 
				text = {<a href={this.data[`ind${this.numberofmes}`].text}>
					{this.data[`ind${this.numberofmes}`].text}</a>
				}
				position = {this.data[`ind${this.numberofmes}`].position}
				key={this.numberofmes}
				time = {this.data[`ind${this.numberofmes}`].time} />);
			this.setState({comp: this.insider});
			this.setState({value: ''});
			this.numberofmes++;
		}
	}
	clickGeoButton()
	{
		navigator.geolocation.getCurrentPosition(this.functionpos);
	}

	LocalAddMessage(){// send message to local_storage
		const str = this.state.value.replace(/^\s*(.*)\s*$/, '$1');
		if (str !== '' && str !== null) {
			const lt = new Date();
			this.data[`ind${this.numberofmes}`] = {
				text: str,
				position: 'r',
				href: 'No',
				time: lt.toLocaleTimeString().substr(0, 5),
			};
			this.data.ind0.checked = 'no';
			localStorage.setItem(`Messages${this.myid}`, JSON.stringify(this.data));
			this.insider.push(<MyMessagebox 
				text = {this.data[`ind${this.numberofmes}`].text}
				position = {this.data[`ind${this.numberofmes}`].position}
				key={this.numberofmes}
				time = {this.data[`ind${this.numberofmes}`].time} />);
			this.setState({comp: this.insider});
			this.setState({value: ''});
			this.numberofmes++;
		}
	}

	clickSendButton(text) {
		if(this.state.buttonname==='sendbutton'){
			this.LocalAddMessage();
			this.setState({buttonname: 'microbutton'});
		}
		else
		{
			var constraints = { audio: true};
			if(this.state.played==='No'){
				navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
					this.mediaRecorder = new MediaRecorder(mediaStream);
					this.mediaRecorder.start();
				}).catch((err) => {
					console.log(`err!${  err.message}`);
				});
				this.setState({played: 'Yes'});
			} else{

				this.mediaRecorder.stop();
				console.log(this.mediaRecorder.state);
				this.setState({played: 'No'});
				this.mediaRecorder.ondataavailable = function(e) {
					this.chunks.push(e.data);
					const mydata = new FormData();
					mydata.append('audio',e.data);
					fetch('https://tt-front.now.sh/upload', {
						method: 'POST',
						body: mydata,
					});
					this.insider.push(<MyAudioBox
						className='audiomespicture'
						blob={e.data}
					/>
					);
					this.setState({comp: this.insider});
				}.bind(this);
			}
		}
	}
	functiondragenter(event){
		this.setState({contentfill: 'formdragcontent'});
		this.setState({contentname: 'contentopac'});
		event.preventDefault();
	}

	functiondragleave(event){
		this.setState({contentfill: 'null'});
		this.setState({contentname: 'content'});
		event.preventDefault();
	}
	functiondrop(event){
		console.log('drop');
		event.preventDefault();
		event.stopPropagation();
		this.setState({contentfill: 'null'});
		this.setState({contentname: 'content'});
		const files = event.dataTransfer.files;
		const data = new FormData();
		data.append('image',files[0]);
		fetch('https://tt-front.now.sh/upload', {
			method: 'POST',
			body: data,
		});
		var fr = new FileReader();
		fr.onload = function best(e){console.log(files[0]);
			this.insider.push(<img className='sendedpicture' alt={fr.result} src = {fr.result}/>);
			this.setState({comp: this.insider});
		}.bind(this);
		fr.readAsDataURL(files[0]);
	}
	funcprevent(event){
		event.preventDefault();
	}

	handleChange(event) {
		if(event.target.value !== '')
			this.setState({buttonname: 'sendbutton'});
		else
			this.setState({buttonname: 'microbutton'});

		this.setState({value: event.target.value});
	}

	handleKeyPress(event) {
		if(event.key==='Enter' && this.state.buttonname==='sendbutton'){
			this.LocalAddMessage();
			this.setState({buttonname: 'microbutton'});
		}
	}

	render() {
		return (
			<div className="overwrap">

				<div className="wrap" onDragEnter={this.functiondragenter}>
					<div className="header" onDragOver={this.funcprevent} onDragEnter={this.functiondragenter} onDrop={this.functiondrop}>
						<Link to="/"> 
							<button className="button" onClick={this.clickBackButton} />
						</Link>
						<img className='picture' src={this.state.picturesrc} alt={this.state.picturesrc}/>
						<div className="hattext">{this.state.hattext}</div>
					</div>
					<div className={this.state.contentname} onDragLeave={this.funcprevent}>
						{this.state.comp}
					</div>
					<div className="footer" onDrop ={this.functiondrop}>
						<button className='geobutton' onClick={this.clickGeoButton} />
						<input type='text' value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} placeholder="Сообщение"/>
						<button className={this.state.buttonname} onClick={this.clickSendButton} />
					</div>
				</div>
				<div className={this.state.contentfill} onDragLeave={this.functiondragleave} onDrop={this.functiondrop} onDragEnter={this.funcprevent} onDragOver={this.funcprevent}/>
			</div>
		);
	}
}
export default MessageForm;
