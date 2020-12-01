import feathers from '@feathersjs/client';
import io from 'socket.io-client';
import soketio from '@feathersjs/socketio-client';

const socket = io('http://localhost:3030/');
const client = feathers();

client.configure(soketio(socket));
client.configure(feathers.authentication({}));

export default client;
