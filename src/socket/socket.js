import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

const stockUpdate = (stock) => {
	socket.emit('updating', stock);
};

const stockListen = () => {
	socket.on('update', (data) => {
		console.log(data);
	});
};

export { stockUpdate, stockListen };