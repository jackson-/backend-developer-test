module.exports = {
  listenCallback(port){
    console.log("+---------------------------------------+");
    console.log("|                                       |");
    console.log(`|  [\x1b[34mSERVER\x1b[37m] Listening on port: \x1b[36m${port} 🤖  \x1b[37m |`);
    console.log("|                                       |");
    console.log("\x1b[37m+---------------------------------------+");
  }
}