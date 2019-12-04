const dataprofile={};
if (!(localStorage.getItem('CurrentProfile'))) {
	dataprofile.prof = {
		fullname: 'James Marshall Hendrix',
		username: 'Jimi Hendrix(default profile without authorization)',
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
