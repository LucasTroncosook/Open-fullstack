import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import FormBlog from "./components/FormBlog";
import Message from "./components/Message";
import Togglabel from "./components/Togglabel";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { notification } from "./reducer/notificationReducer";
import { getBlogs, createNewBlog, deleteBlog, updateOneBlog, createComment } from "./reducer/blogsReducer"
import { loginToUser, recoverUser, removeToUser } from "./reducer/loginReducer";
import { getAllUsers } from "./reducer/usersReducer";
import { Routes, Route, Link ,useMatch, useLocation, useNavigate } from "react-router-dom";

const Nav = ({ user, dispatch }) => {

  if(!user){
    return null
  }

  const closeLoggin = () => {
    dispatch(removeToUser())
  }

  const style = {
    backgroundColor: "#000",
    display: "flex",
    gap: "10px",
    color: '#fff',
    paddingBlock: "15px",
    paddingInline: "10px",
    borderRadius: "4px",
    justifyContent: "space-between",
    alignItems: "center"
  }

  const styleDivLink = {
    display: "flex",
    gap: "10px"
  }

  const styleLink = {
    textDecoration: "none",
    color: "#fff"
  }

  const styleButtom = {
    backgroundColor: "#6361fbaa",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px"
  }

  return(
    <div style={style}>
      <div style={styleDivLink}>
        <Link style={styleLink} to="/">blogs</Link>
        <Link style={styleLink} to="/users">users</Link>
      </div>
      <span>{user.name} logged in</span>
      <button style={styleButtom} onClick={closeLoggin}>logout</button>
    </div>
  )
}

const Home = ( { blogs, dispatch } ) => {
  const createBlogRef = useRef()

  const createBlog = async (blog) => {
    dispatch(notification(`a new blog ${blog.title} ${blog.author}`, 5))
    createBlogRef.current.togglabelVisible()
    dispatch(createNewBlog(blog))
  }

  const style = {
    padding: "10px 5px",
    border: "1px solid #000",
    borderRadius: "8px",
    margin: "6px"
  }

  return(
    <div>
      <Togglabel label="new blog" ref={createBlogRef}>
            <FormBlog
              createBlog={createBlog}
            />
      </Togglabel>
      {
        [...blogs].sort((a,b) => b.likes - a.likes).map(blog => (
          <div key={blog.id} style={style}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))
      }
    </div>  
  )
}

const User = ({ user }) => {
  if(!user){
    return null
  }
  
  return(
    <>
      <h2>{user?.username}</h2>
      <h4>added blogs</h4>
      <ul>
        {
          user.blogs.map( blog => (
            <li key={blog?.id}>
              <Link to={`/blogs/${blog.id}`}>{blog?.title}</Link>
            </li>
          ))
        }
      </ul>
    </>
  )
}

const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )

}

const App = () => {
  const user = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  useEffect(() =>{
    dispatch(getBlogs())
  },[])

  useEffect(() => {
    dispatch(recoverUser())
  }, [])

  const loggin = async (user) => {
    try {
      dispatch(loginToUser(user))
    } catch (error) {
      dispatch(notification(error.response.data.error, 5))
    }
  }

  const updateBlog = async (id, blog) => {
    dispatch(updateOneBlog(id, blog))
  }

  const deleteOneBlog = (id) => {
    dispatch(deleteBlog(id))
  }

  const createdComment = (id, comment) => {
    dispatch(createComment(id, comment))
  }

  const match = useMatch('/users/:id')
  const oneUser = match === null
    ? false
    : users.find(u => u.id === match.params.id)

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog === null
    ? false
    : blogs.find(b => b?.id === matchBlog.params.id)  

  return(
    <>
      <Nav user={user} dispatch={dispatch}/>
      <h2>{ user === null ? 'log in to application' : 'blogs'}</h2>
      <Message />
      {user === null
        ? 
        <div>
          <LoginForm 
            login={loggin}
          />
        </div>
        :
        <Routes>
          <Route path="/blogs/:id" element={ <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteOneBlog} createComment={createdComment} user={user} navigate={navigate} /> }/>
          <Route path="/users/:id" element={ <User user={oneUser} /> } />
          <Route path="/" element={ <Home blogs={blogs} dispatch={dispatch} /> } />      
          <Route path="/users" element={ <Users users={users}/> } />   
        </Routes>
      }
    </>
  )
}

export default App