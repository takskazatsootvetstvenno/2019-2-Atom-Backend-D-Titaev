const dataprofile={};
if (!(localStorage.getItem('CurrentProfile'))) {
	dataprofile.prof = {
		fullname: 'James Marshall Hendrix',
		username: 'Jimi Hendrix',
		image: 'guitar.png',
		bio: 'guitarist',
	};
	localStorage.setItem('CurrentProfile', JSON.stringify(dataprofile));
}
const datacur={};
if (!(localStorage.getItem('CurrentForm'))) {
	datacur.frame = {
		id: '0',
		number: '1',
	};
	localStorage.setItem('CurrentForm', JSON.stringify(datacur));
}
const data1 = {};
if (!(localStorage.getItem('Messages1'))) {
	data1.ind0 = {
		name: 'Dark Anonymous',
		image: 'Anonymous.svg.png',
		checked: 'no',
		id: '1',
	};
	data1.ind1 = {
		text: 'Hello!',
		time: '10:46',
		href: 'No',
		position: 'l',
	};
	data1.ind2 = {
		text: 'Ку!',
		time: '13:07',
		href: 'No',
		position: 'r',
	};
	data1.ind3 = {
		text: 'test!',
		time: '15:07',
		href: 'No',
		position: 'r',
	};
	localStorage.setItem('Messages1', JSON.stringify(data1));
}
const data2 = {};
if (!(localStorage.getItem('Messages2'))) {
	data2.ind0 = {
		name: 'Главный Электрик',
		image: 'lamp.png',
		checked: 'yes',
		id: '2',
	};
	data2.ind1 = {
		text: 'Привет!',
		time: '12:46',
		href: 'No',
		position: 'l',
	};
	data2.ind2 = {
		text: 'Ку!',
		time: '13:07',
		href: 'No',
		position: 'r',
	};
	localStorage.setItem('Messages2', JSON.stringify(data2));
}
const data3 = {};
if (!(localStorage.getItem('Messages3'))) {
	data3.ind0 = {
		name: 'TrashChat',
		checked: 'yes',
		id: '3',
		trashchat: 'yes',
	};
	data3.ind1 = {
		text: 'This is a best Trash Chat!',
		time: '00:00',
		href: 'No',
		position: 'l',
	};
	localStorage.setItem('Messages3', JSON.stringify(data3));
}
const data4 = {};// order to view on message list
if (!(localStorage.getItem('Messages_order'))) {
	data4.Messages_order = {
		1: '1',
		2: '2',
		3: '3',
	};
	localStorage.setItem('Messages_order', JSON.stringify(data4));
}
