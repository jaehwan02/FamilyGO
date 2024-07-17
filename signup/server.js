const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, onValue } = require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyChO4p-YiYqvmb2Yf-V0b5G5RP5WRRmq8s",
    authDomain: "familygo-afbda.firebaseapp.com",
    databaseURL: "https://familygo-afbda-default-rtdb.firebaseio.com",
    projectId: "familygo-afbda",
    storageBucket: "familygo-afbda.appspot.com",
    messagingSenderId: "932382997950",
    appId: "1:932382997950:web:fcfddfc4931eb6d8988def",
    measurementId: "G-C32Y7LF0SH"
};

const app = express();
const port = 3000;
const hostname = '127.0.0.1';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Firebase 초기화
initializeApp(firebaseConfig);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const { nickname, id, password } = req.body;

    const db = getDatabase();
    set(ref(db, 'users/'), {
        nickname: nickname,
        id: id,
        password: password,
    }).then(() => {
        res.send('등록 완료');
    }).catch((error) => {
        console.error('Error writing to database', error);
        res.status(500).send('Internal Server Error');
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

/**
 * 
 * $ node server.js
 * 127.0.0.1:3000/
 */