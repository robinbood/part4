const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return !blogs ? 0 : blogs.reduce((sum,item) => sum + item.likes,0) 
}
const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 1) {
        return blog[0]
    }
    return blogs.reduce((initial,current) => initial.likes > current.likes ? initial : current , blogs[0])
}
const mostBlogs = (blogs) => {
    if (blogs.length ===1 ) {
        return blogs[0].author
    }
    return blogs.reduce((initial,current) => initial.author === current.author ? initial.author: current.author)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    
}