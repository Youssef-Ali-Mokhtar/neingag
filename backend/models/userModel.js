const getDb = require('../util/database').getDb;
const {ObjectId} = require('mongodb');

module.exports = class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    save(cb) {
        const db = getDb();
        db.collection('users').insertOne(this)
        .then(result=>{
            const id = result.insertedId.toString();
            cb(id);
        }).catch(err=>{
            console.log(err);
            cb(err.message);
        });
    }

    static getUser(cb, id) {
        const db = getDb();
        const objectId = ObjectId.createFromHexString(id);

        db.collection('users').findOne({_id: objectId})
            .then(response=>{
                cb(response);
            })
            .catch(err=>{
                console.log(err);
                cb(err);
            })
    }

    static fetchAll(cb) {
        const db = getDb();
        db.collection('users').find({}).toArray()
            .then(response=>{
                cb(response);
            })
            .catch(err=>{
                console.log(err);
                cb(err);
            })
    }
}