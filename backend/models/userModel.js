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
    bookmarks:  [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ]
    
});

userSchema.methods.addToBookmarks = function(post) {

    console.log(this);

    const bookmarkPostIndex = this.bookmarks.findIndex(bp=>{
        console.log("Inside loop:", bp);
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

userSchema.statics.signup = function(username, email, password) {

    const validateSignup = () => {
        return new Promise((resolve, reject) => { 
            if (!username || !email || !password) {
                reject(Error('All fields must be filled.'));
            }
            if (username.length < 6 || username.length > 15) {
                reject(Error('Username must be between 6 and 15 characters long.'));
            }
            if (!validator.isEmail(email)) {
                reject(Error('Email is not valid.'));
            }
            if (!validator.isStrongPassword(password)) {
                reject(Error('Password is not strong enough.'));
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
            return this.create({ username, email, password: hashedPassword, bookmarks: [] });
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
        .then(()=>{
            return this.findOne({email});
        }) 
        .then(user=>{
            if(!user) {
                throw Error("Email doesn't exist.");
            }

            return bcrypt.compare(password, user.password.toString())
                .then(match=>{
                    if(!match) {
                        throw Error("Incorrect password.");
                    }
                    return user;
                });
        })
        
}


module.exports = mongoose.model('User', userSchema);
