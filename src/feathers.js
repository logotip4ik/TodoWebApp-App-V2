import feathers from '@feathersjs/client';
import io from 'socket.io-client';
import soketio from '@feathersjs/socketio-client';

const socket = io('https://todowebapp-f.herokuapp.com/');
const client = feathers();

client.configure(soketio(socket));
client.configure(feathers.authentication({}));

export default client;
