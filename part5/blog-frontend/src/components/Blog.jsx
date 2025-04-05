import TogglabelBlog from "./TogglableBlog"
import PropTypes from "prop-types"

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
    const styleButtonDelete = {
        backgroundColor: "#646cffaa"
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
        }
    }

    return(
        <TogglabelBlog label="show" title={blog.title} >
            <div>
                <p>{blog.url}</p>
                <div>
                    <span className="likes-count">likes: {blog.likes} <button onClick={() => handleLike(blog.id)}>like</button></span>
                </div>
                <p>{blog.author}</p>
                <div>
                    {user.username === blog.user.username && (<button className="remove-item" onClick={() => handleDelete(blog)} style={styleButtonDelete}>remove</button>)}
                </div>
            </div>
        </TogglabelBlog>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired
}
export default Blog