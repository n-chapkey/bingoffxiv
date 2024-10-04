import { createServer } from 'http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        handle(req, res);
    });

    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
        
        socket.on('joinMatch', (matchId) => {
            socket.join(matchId);
            console.log(`Player joined match: ${matchId}`);
        });

        socket.on('taskComplete', (matchId, taskId) => {
            io.to(matchId).emit('taskComplete', taskId);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        }); 
    });



    server.listen(3000, () => {
        if(err) throw err;
        console.log('listening on http://localhost:3000');
    });
});