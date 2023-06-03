require('dotenv/config');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const Io = require('./utils/Io');
const Comments = new Io('./db/commments.json');

const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static(process.cwd() + '/uploads'));

app.use(router);

const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

app.use(express.static(__dirname + '/public'));

// const commments = Comments.read();

io.on('connection', (socket) => {
	console.log('A user connected');

	socket.on('newComment', (data) => {
		Comments.write(data);
		io.emit('newComment', data);
	});

	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(PORT);
});
