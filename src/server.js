// requerimento do 'express
const express = require('express');
const route = require('./route');
const path = require('path');

// express ativo
const server = express();

server.set('view engine', 'ejs');

server.use(express.static("public"));//falando para o express usar a pasta 'public'

server.set('views', path.join(__dirname, 'views'));

server.use(express.urlencoded({extended: true}));

server.use(route);

// setando uma porta para o servidor e passando uma arrow function
server.listen(3000, () => console.log("RODANDO"));