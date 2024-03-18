const posts = [];


module.exports = class Post {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    savePost() {
        posts.push(this);
        return this;
    }

    static getPost(id) {
        const [post] = posts.filter(item=>item.id===id);

        if(!post) {
            throw new Error("Post doesn't exist!");
        }
    
        return post;
    }

    static getPosts() {
        return posts;
    }

}