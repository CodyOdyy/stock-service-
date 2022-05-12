const Hapi = require('@hapi/hapi');
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "34.136.166.203",
    port: "3306",
    user: "root",
    password: "Dilanka123",
    database: "users",
    insecureAuth : true
});


const init = async ()=> {
const server = Hapi.server({
port: 8080,
host: '0.0.0.0'
});

server.route({
method: 'GET',
path: '/',
handler: (request, h) => {
return "Welcome to Stock Exchange - Buying and Selling Stocks";
}
});

server.route({
method: 'GET',
path: '/stocks',
handler: async (request, h) => {
const results = await getStocks();
return results;
}
});

server.route({
method: 'GET',
path: '/name',
handler: async (request, h) => {
const uid = request.params.name;
const results = await getStockByName(name);
return results;
}
});

server.route({
method: 'POST',
path: '/',
handler: async (request, h) => {
const email = request.payload.amount;
const name = request.payload.name;
user = {};
user['amount'] = amount;
user['name'] = name;
const results = await getCreateStock(stock);
return results;
}
});

await server.start();
console.log('Server is running in %s', server.info.uri);
};

function getStocks() {
return new Promise((resolve, reject) => {
con.query('SELECT * FROM stock', [], function (error, results) {
if (error) {
return reject(error)
}
console.log(results);
return resolve(results);
})
})
}

function getStockByName() {
return new Promise((resolve, reject) => {
con.query('SELECT * FROM stock WHERE name = ', [], function (error,
results) {
if (error) {
return reject(error)
}
console.log(results);
return resolve(results);
})
})
}

function getCreateStock(stock) {
return new Promise((resolve, reject) => {
con.query('INSERT INTO user ( name, amount) VALUES ("' + stock.name +'","' +
stock.amount + '")', [], function (error, results) {
if (error) {
return reject(error)
}
console.log(results);
return resolve(results);
})
})
}

process.on('unhandledRejection', (err) => {
console.error("Unhandled Error", err);
process.exit(1);
});
init();
