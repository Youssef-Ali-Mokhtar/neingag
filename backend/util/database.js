const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb+srv://youssef96mokhtar:LinuxLinux96@cluster0.aqpb7ct.mongodb.net/neingag?retryWrites=true&w=majority&appName=Cluster0'
        )
          .then(client=>{
            console.log('Connected!');
            callback();
            _db = client.db();
          })
          .catch(err=>{
            console.log(err);
            throw err;
          });
}

const getDb = ()=> {
    if(_db){
        return _db;
    }
    throw "No database found!";
}

module.exports = {
    mongoConnect,
    getDb
};