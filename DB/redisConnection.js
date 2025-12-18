import { createClient } from 'redis';

const client = createClient({
    username: process.env.REDIS_USER_NAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.SOCKET_HOST,
        port: process.env.SOCKET_PORT
    }
});

export default client;






