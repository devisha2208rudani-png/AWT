const http = require('http');
const fs = require('fs');
const EventEmitter = require('events');

const userEvents = new EventEmitter();

const eventCount = {
    'user-login': 0,
    'user-logout': 0,
    'user-purchase': 0,
    'profile-update': 0
};

let logData = '';

userEvents.on('user-login', (username) => {
    eventCount['user-login']++;
    logData += `Login: ${username}\n`;
});

userEvents.on('user-logout', (username) => {
    eventCount['user-logout']++;
    logData += `Logout: ${username}\n`;
});

userEvents.on('user-purchase', (username, item) => {
    eventCount['user-purchase']++;
    logData += `Purchase: ${username} bought ${item}\n`;
});

userEvents.on('profile-update', (username) => {
    eventCount['profile-update']++;
    logData += `Profile Updated: ${username}\n`;
});

userEvents.on('summary', () => {
    logData += `\n--- Event Summary ---\n`;
    for (let event in eventCount) {
        logData += `${event}: ${eventCount[event]} times\n`;
    }
});

userEvents.emit('user-login', 'Devisha');
userEvents.emit('user-login', 'Amit');
userEvents.emit('user-purchase', 'Devisha', 'Laptop');
userEvents.emit('profile-update', 'Amit');
userEvents.emit('user-logout', 'Devisha');
userEvents.emit('user-purchase', 'Amit', 'Phone');
userEvents.emit('profile-update', 'Devisha');
userEvents.emit('summary');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.createReadStream('index.html').pipe(res);
    } else if (req.url === '/events') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(logData);
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
