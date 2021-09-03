
const server = require('./api/server.js');
//Declare the port logic, assign to port
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})