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
    ],
    upvotes:  [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    downvotes:  [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
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
        .then(post => {
            const updatedComments = [...post.comments, {comment, userId}];
            post.comments = updatedComments;
            return post.save();
        })

}

postSchema.statics.deleteComment = function(postId, commentId, userId) {

    return this.findOne({_id:postId})
        .then(post => {

            const comment = post.comments.find(comment => {
                return comment._id.toString() === commentId.toString();
            })

            if(!comment) {
                throw Error('Comment does not exist.');
            }

            if(comment.userId.toString() !== userId.toString()) {
                throw Error('Not authorized to delete comment.');
            }

            const updatedComments = post.comments.filter(comment => {
                return comment._id.toString() !== commentId.toString();
            })

            post.comments = updatedComments;
            
            return post.save();
        })
        
}

postSchema.methods.addUserIdToUpvotes = function(userId) {

    const upvoteUserIndex = this.upvotes.findIndex(upvoteUserId => {
        return upvoteUserId.toString() === userId.toString();
    });
    
    let updatedUpvotes;

    if(upvoteUserIndex > -1) {
        updatedUpvotes = this.upvotes.filter(UID => {
            return UID.toString() !== userId.toString();
        })
    } else {
        updatedUpvotes = [...this.upvotes, userId];
    }
    
    this.upvotes = updatedUpvotes;

    return this.save();

}

postSchema.methods.addUserIdToDownvotes = function(userId) {

    const downvoteUserIndex = this.downvotes.findIndex(downvoteUserId=>{
        return downvoteUserId.toString() === userId.toString();
    });
    
    let updatedDownvotes;

    if(downvoteUserIndex > -1) {
        updatedDownvotes = this.downvotes.filter(UID => {
            return UID.toString() !== userId.toString();
        })
    } else {
        updatedDownvotes = [...this.downvotes, userId];
    }
    
    this.downvotes = updatedDownvotes;

    return this.save();

}

module.exports = mongoose.model('Post', postSchema);