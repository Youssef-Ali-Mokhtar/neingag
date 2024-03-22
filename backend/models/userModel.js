const getDb = require('../util/database').getDb;
const {ObjectId} = require('mongodb');

module.exports = class User {
    constructor(username, email, bookmarks, id) {
        this.username = username;
        this.email = email;
        this.bookmarks = bookmarks;
        this._id = id;
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

    addToBookmarks = (cb, post)=> {
        
        const bookmarkPostIndex = this.bookmarks.postIds.findIndex(bp=>{
            return bp.toString() === post._id.toString();
        });

        let updatedPosts;
        
        if(bookmarkPostIndex > -1) {
            updatedPosts = this.bookmarks.postIds.filter(postId=>{
                return postId.toString() !== post._id.toString();
            })
        } else {
            updatedPosts = [...this.bookmarks.postIds, post._id];

        }

        const updatedBookmarks = {
            postIds: updatedPosts
        }

        const db = getDb();
        db.collection('users').updateOne(
            {_id: this._id},
            {$set: { bookmarks: updatedBookmarks }}
        )
            .then(response=> {
                cb(response);
            })
            .catch(err=>{
                cb(err);
            });

    }

    fetchAllBookmarks = (cb)=> {
        
        const postIds = this.bookmarks.postIds;
        const db = getDb();

        db.collection('posts')
            .find({ _id: { $in: postIds } })
            .toArray()
            .then(posts=>{
                cb(posts);
            })
            .catch(err=>{
                cb(err);
            })
    }
}