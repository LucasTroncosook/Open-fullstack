import PropTypes from "prop-types"
import { useFiled } from "../hooks"

const Blog = ({ blog, updateBlog, user, deleteBlog, navigate, createComment }) => {
    const comment = useFiled('text')
    if(!blog){
        return null
    }

    const styleBlog = {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    }

    const styleButtonDelete = {
        backgroundColor: "#646cffaa",
        padding: "10px 15px",
        border: "none",
        borderRadius: "8px",
        marginBottom: "5px"
    }

    const styleBtnLike = {
        width: "max-content",
        border: "none",
        backgroundColor: "#1c19b7",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "8px"
    }

    const styleComments = {
        backgroundColor: "#1c19b7",
        color: "#fff",
        paddingLeft: "10px",
        paddingBlock: "10px",
        marginTop: "10px"
    }

    const handleLike = (id) => {
        updateBlog(id, {
            ...blog,
            likes: blog.likes + 1
        })
    }

    const handleDelete = blog => {
        const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
        if(confirm){
            deleteBlog(blog.id)
            navigate('/')
        }
    }

    const handleCreateComment = (e) => {
        e.preventDefault()
        createComment(blog.id, {comment: comment.value})
        comment.res()
    }

    return (
        <div>
          <h2>{blog.title}</h2>
          <a href={blog.url}>{blog.url}</a>
          <div style={styleBlog}>
            <span>{blog.likes}</span>
            <button style={styleBtnLike} onClick={() => handleLike(blog.id)}>like</button>
            <div>
                {blog.user.username === user.username ? <button style={styleButtonDelete} onClick={() => handleDelete(blog)}>delete</button> : null}
            </div>
          </div>
          <span>added by {blog.author}</span>
          <div style={styleComments}>
            <p>comments</p>
            {
                blog.user.username === user.username
                    ? null
                    :
                    <form onSubmit={handleCreateComment}>
                        <input 
                            type={comment.type}
                            value={comment.value}
                            onChange={comment.onChange}
                        />
                        <button type="submit">add comment</button>
                    </form>
            }
            <ul>
                {
                    blog.comments && ( blog.comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    )))
                }
            </ul>
          </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired
}
export default Blog