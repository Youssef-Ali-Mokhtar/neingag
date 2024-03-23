const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);

// module.exports = class Post {
//     constructor(title, description, userId) {
//         this.title = title;
//         this.description = description;
//         this.userId = userId;
//     }

//     save(cb) {
//         const db = getDb();
//         db.collection('posts').insertOne(this)
//         .then(result=>{
//             const id = result.insertedId.toString();
//             cb(id);
//         }).catch(err=>{
//             console.log(err);
//             cb(err.message);
//         });
//     }

//     static getPost(cb, id) {
//         const db = getDb();
//         const objectId = ObjectId.createFromHexString(id);
        
//         db.collection('posts').findOne({_id: objectId})
//             .then(response=>{
//                 cb(response);
//             })
//             .catch(err=>{
//                 console.log(err)
//                 cb(err);
//             })
//     }

//     static fetchAll(cb) {
//         const db = getDb();
//         db.collection('posts').find({}).toArray()
//             .then(response=>{
//                 cb(response);
//             })
//             .catch(err=>{
//                 console.log(err);
//                 cb(err);
//             });
//     }

//     static delete(cb, id) {
//         const db = getDb();
//         const objectId = ObjectId.createFromHexString(id);
//         db.collection('posts').deleteOne({_id: objectId})
//             .then(response=>{
//                 console.log(response);
//                 cb(response);
//             })
//             .catch(err=>{
//                 console.log(err);
//                 cb(err);
//             })
//     }

// }