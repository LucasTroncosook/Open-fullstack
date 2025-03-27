const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikesBlog = Math.max(...blogs.map(b => b.likes))
    const blog = blogs.find(b => b.likes === maxLikesBlog)
    return blog
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return null

    const authorCounts = _.countBy(blogs, 'author')

    const authorList = _.map(authorCounts, (blogs, author) => ({author, blogs}))

    return _.maxBy(authorList, 'blogs')
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) return null

    const authorLikes = _.map(_.groupBy(blogs, 'author'), (authorBlogs, author) => ({
        author,
        likes: _.sumBy(authorBlogs, 'likes'),
    }));
    
    return _.maxBy(authorLikes, 'likes');
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}