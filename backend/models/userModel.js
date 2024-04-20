const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Post = require('./postModel');
const validator = require('validator');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    avatarNum: {
        type: Number,
        required: true,
    },
    bookmarks:  [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    notifications: [{
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        commentId: {
            type: Schema.Types.ObjectId,
            ref: 'Post', // Reference to the Post model
        },
        createdAt: {
            type: Date,
            default: Date.now // Set the default value to the current date and time
        }
    }],
    uncheckedNotifications: {
        type: Number
    },
    upvotes:  [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    downvotes:  [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
}, {timestamps:true});

userSchema.methods.addToBookmarks = function(post) {

    const bookmarkPostIndex = this.bookmarks.findIndex(bp=>{
        return bp.toString() === post._id.toString();
    });

    
    let updatedPosts;

    if(bookmarkPostIndex > -1) {
        updatedPosts = this.bookmarks.filter(postId=>{
            return postId.toString() !== post._id.toString();
        })
    } else {
        updatedPosts = [...this.bookmarks, post._id];
    }
    
    this.bookmarks = updatedPosts;

    return this.save();
}

userSchema.methods.addPostIdToUpvotes = function(postId) {

    const upvoteUserIndex = this.upvotes.findIndex(upvotePostId=>{
        return upvotePostId.toString() === postId.toString();
    });
    
    let updatedUpvotes;

    if(upvoteUserIndex > -1) {
        updatedUpvotes = this.upvotes.filter(PID => {
            return PID.toString() !== postId.toString();
        })
    } else {
        updatedUpvotes = [...this.upvotes, postId];
    }
    
    this.upvotes = updatedUpvotes;

    return this.save();

}

userSchema.methods.addPostIdToDownvotes = function(postId) {

    const downvotePostIndex = this.downvotes.findIndex(downvotePostId=>{
        return downvotePostId.toString() === postId.toString();
    });
    
    let updatedDownvotes;

    if(downvotePostIndex > -1) {
        updatedDownvotes = this.downvotes.filter(PID => {
            return PID.toString() !== postId.toString();
        })
    } else {
        updatedDownvotes = [...this.downvotes, postId];
    }
    
    this.downvotes = updatedDownvotes;

    return this.save();

}

userSchema.statics.addToNotifications = function(comment, postCreatorId) {
    //comment = {commentId, postId}

    return this.findById(postCreatorId)
        .then(user => {
            const updatedNotifications = [...user.notifications, comment];
            user.notifications = updatedNotifications;
            user.uncheckedNotifications += 1;
            return user.save();
        })
}

userSchema.statics.deleteNotifications = function(userId, commentIds) {

    const commentIdsString = commentIds.map(commentId => {
        return commentId.toString();
    })

    return this.findById(userId)
        .then(user => {
            const updatedNotifications = user.notifications.filter(note => {
                return !commentIdsString.includes(note.commentId.toString());
            })
            user.notifications = updatedNotifications;
            return user.save();
        })

}

userSchema.statics.signup = function(username, email, password, bio, avatarNum) {

    const validateSignup = () => {
        return new Promise((resolve, reject) => { 
            if (!username || !email || !password || !bio) {
                reject(Error('All fields must be filled.'));
            }
            if (username.length < 6 || username.length > 15) {
                reject(Error('Username must be between 6 and 15 characters long.'));
            }
            if(!(avatarNum>=0 && avatarNum<=9)){
                reject(Error('Avatar number has to be between 0 and 9.'));
            }
            if (!validator.isEmail(email)) {
                reject(Error('Email is not valid.'));
            }
            if (!validator.isStrongPassword(password)) {
                reject(Error('Make the password strong by including at least one uppercase letter, one number, and one special character (!, @, #, etc.).'));
            }
            resolve();
        });
    };

    return validateSignup()
        .then(() => {
            return this.findOne({ email });
        })
        .then(response => {
            if (response) {
                throw Error('Email already exists.');
            }
            return this.findOne({ username });
        })
        .then(response => {
            if (response) {
                throw Error('Username already exists.');
            }
            return bcrypt.genSalt();
        })
        .then(salt => {
            return bcrypt.hash(password, salt);
        })
        .then(hashedPassword => {
            return this.create({ 
                username, 
                email, 
                password: hashedPassword, 
                bio, 
                avatarNum, 
                bookmarks: [], 
                notifications: [],
                upvotes: [],
                downvotes: [],
                uncheckedNotifications: 0
             });
        });
};

userSchema.statics.login = function(email, password) {

    const validateLogin = () => {
        return new Promise((resolve, reject) => {
            if (!email || !password) {
                reject(Error('All fields must be filled.'));
            }
            resolve();
        });
    };

    return validateLogin()
        .then(() => {
            return this.findOne({email});
        }) 
        .then(user=>{
            if(!user) {
                throw Error("Email doesn't exist.");
            }

            return bcrypt.compare(password, user.password.toString())
                .then(match => {
                    if(!match) {
                        throw Error("Incorrect password.");
                    }
                    return user;
                });
        })
        
}


module.exports = mongoose.model('User', userSchema);
