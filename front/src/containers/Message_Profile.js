import React from 'react';
import '../styles/myProfile.css';
import { Link } from 'react-router-dom';

export class MessageProfile extends React.Component {
	constructor(props) {
		super(props);
		this.insider = [];
		this.numberofmes = 1;
		this.picfolder='';
		this.state = {hattext: '',picturesrc: '',
			valuefullname: '',valueusername: '',valuebio: '', comp: ''};
		// this.clickSendButton = this.clickSendButton.bind(this);
		this.handleChangefullname = this.handleChangefullname.bind(this);
		this.handleChangeusername = this.handleChangeusername.bind(this);
		this.handleChangebio = this.handleChangebio.bind(this);
		this.clickBackButton =this.clickBackButton.bind(this);
		this.clickOkButton=this.clickOkButton.bind(this);
	}
	componentDidMount(){
		fetch(`http://localhost/back/users/`, {
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
					var answer = data.answer;
					var backprofile = {
						id: answer.id,
						nick: answer.nick,
						avatar: answer.avatar,
						usernameback: answer.username,
						first: answer.first,
						last: answer.last,
					}
					var tempusername=answer.first+' '+answer.last;
					this.setState({back: backprofile, valueusername: tempusername})
				});
		  });
	}
	componentWillMount(props) {
		this.curprof = localStorage.getItem('CurrentProfile');
		this.data = JSON.parse(this.curprof);
		this.picfolder=this.data.prof.image;
		this.setState({hattext: '',picturesrc: require(`../build/static/images/${this.picfolder}`),
			valuefullname: this.data.prof.fullname,valueusername: this.data.prof.username,valuebio: this.data.prof.bio, comp: ''});
	}
	clickOkButton()
	{
		const dataprofile={};
		dataprofile.prof = {
			fullname: this.state.valuefullname,
			username: this.state.valueusername,
			image: this.picfolder,
			bio: this.state.valuebio,
		};
		localStorage.setItem('CurrentProfile', JSON.stringify(dataprofile));
		const datacur = {
			frame: {
				id: '1',
				number: '0',
			}
		};
		localStorage.setItem('CurrentForm', JSON.stringify(datacur));
	}
	clickBackButton()
	{
		const datacur = {
			frame: {
				id: '1',
				number: '0',
			}
		};
		localStorage.setItem('CurrentForm', JSON.stringify(datacur));
	}
	handleChangefullname(event)
	{
		this.setState({valuefullname: event.target.value});
	}
	handleChangeusername(event)
	{
		this.setState({valueusername: event.target.value});
	}
	handleChangebio(event)
	{
		this.setState({valuebio: event.target.value});
	}
	render(){return(
		<div className="wrap">
			<div className="headerprof">
				<Link to="/">
					<button className="buttonback" onClick={this.clickBackButton}/>
				</Link>
				<div className="hatedit">Edit Profile</div>
				<Link to="/">
					<button className="profileok" onClick={this.clickOkButton}/>
				</Link>
			</div>
			<div className="contents" >
				<img className='profilepicture' src={this.state.picturesrc} alt={this.state.picturesrc}/>
				<div className='profilebox'>
					<div className="fullname">Full name</div>
					<input className="inputfn" type="text" value={this.state.valuefullname} onChange={this.handleChangefullname}
						placeholder="Введите полное имя"/>
				</div>
				<div className='profilebox'>
					<div className="username">Username</div>
					<input className="inputun" type="text" value={this.state.valueusername} onChange={this.handleChangeusername}
						placeholder="Введите имя пользователя"/>
				</div>
				<div className='profilebiobox'>
					<div className="bio">Bio</div>
					<input className="inputbio" type="text" value={this.state.valuebio} onChange={this.handleChangebio}
						placeholder="О себе"/>
				</div>
			</div>
		</div>
	);}
}
export default MessageProfile;