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
    }
}, {timestamps:true});

postSchema.statics.deletePost = function(postId, userId) {
    // if(this.userId === )
    return this.findOne({_id:postId})
        .then(post=> {
            if(post.userId.toString() !== userId.toString()) {
                throw Error('Not authorized to delete post.');
            }
            return this.findByIdAndDelete(postId);
        });

}

module.exports = mongoose.model('Post', postSchema);