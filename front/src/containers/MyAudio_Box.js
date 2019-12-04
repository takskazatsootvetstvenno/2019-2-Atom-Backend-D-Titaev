import React from 'react';  
import '../styles/myAudioBox.css';

const ImgStop = require('../build/static/images/stop.png');
const ImgPlay = require('../build/static/images/play.png');

export class MyAudioBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {played: 'Yes', picturesrc: ImgPlay,'blob': props.blob};

		this.clickfunction = this.clickfunction.bind(this);
		this.endplayfunc=this.endplayfunc.bind(this);
	}
	clickfunction(id)
	{
		if(this.state.played==='No'){
			if(this.refs.myaudioref.ended===false) this.refs.myaudioref.pause();
			this.setState({'picturesrc': ImgPlay});
			this.setState({'played': 'Yes'});
		}
		else{
			const reader = new FileReader();
			reader.onload = function(e) {
				const srcUrl = e.target.result;
				this.refs.myaudioref.src = srcUrl;
				this.refs.myaudioref.play();
			}.bind(this);
			reader.readAsDataURL(this.state.blob);
			this.setState({'picturesrc': ImgStop});
			this.setState({'played': 'No'});
		}
	}
	endplayfunc()
	{
		this.setState({'picturesrc': ImgPlay});
		this.setState({'played': 'Yes'});
	}
	render(){return(
		<div className='Overdiv'>
			<img className='myaudioPicture' onClick={this.clickfunction}
				src={this.state.picturesrc} alt={this.state.picturesrc} />
			<audio className='myaudio' ref='myaudioref' onEnded={this.endplayfunc}/>
		</div>
	);};
}
export default MyAudioBox;
