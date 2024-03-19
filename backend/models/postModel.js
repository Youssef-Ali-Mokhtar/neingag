const getDb = require('../util/database').getDb;

const posts = [];


module.exports = class Post {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    save(cb) {
        const db = getDb();
        db.collection('posts').insertOne(this)
        .then(result=>{
            const id = result.insertedId.toString();
            console.log(id);
            cb(id);
        }).catch(err=>{
            console.log(err);
            cb(err.message);
        });
    }

    static getPost(cb, id) {
        const db = getDb();
        db.collection('posts').findOne({_id: id})
            .then(response=>{
                console.log(response);
                cb(response);
            })
            .catch(err=>{
                console.log(err)
                cb(err);
            })
    }

    static fetchAll(cb) {
        const db = getDb();
        db.collection('posts').find({}).toArray()
            .then(response=>{
                console.log(response);
                cb(response);
            })
            .catch(err=>{
                console.log(err);
                cb(err);
            });
    }

}