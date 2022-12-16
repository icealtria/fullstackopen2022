var _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs, most) => {
    const blog = blogs.pop()
    if (!blog) {
        return most
    } if (!most || blog.likes > most.likes) {
        most = blog
    }
    return favoriteBlog(blogs, most)
}

const mostBlogs = (blogs) => {
    const countByAuthor = _.countBy(blogs, (blogs) => blogs.author)
    count = _.max(Object.values(countByAuthor))
    return {
        "author": _.findKey(countByAuthor, i => i === count),
        "blogs": count
    }
}

const mostLikes = (blogs) => {

}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}