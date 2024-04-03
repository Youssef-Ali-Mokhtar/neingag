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
    category: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments:  [
        {
            comment: {
                type: String,
                required: true
            },
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {timestamps:true});

postSchema.statics.deletePost = function(postId, userId) {

    return this.findOne({_id:postId})
        .then(post=> {
            if(post.userId.toString() !== userId.toString()) {
                throw Error('Not authorized to delete post.');
            }
            return this.findByIdAndDelete(postId);
        });

}

postSchema.statics.postComment = function(postId, userId, comment) {

    return this.findOne({_id:postId})
        .then(post=>{
            const updatedComments = [...post.comments, {comment, userId}];
            post.comments = updatedComments;
            return post.save();
        })

}

module.exports = mongoose.model('Post', postSchema);