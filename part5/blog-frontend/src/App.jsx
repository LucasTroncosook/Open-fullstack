import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import FormBlog from "./components/FormBlog";
import Message from "./components/Message";
import Togglabel from "./components/Togglabel";
import blogServices from "./services/blog";
import LoginServices from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const createBlogRef = useRef()

  useEffect(() =>{
    blogServices.getAll()
    .then(blogs => setBlogs(blogs))
  },[])

  useEffect(() => {
    const userLogin = JSON.parse(window.localStorage.getItem('loggedUser'))
    if(userLogin){
      blogServices.setToken(userLogin.token)
      setUser(userLogin)
    }
  }, [])

  const loggin = async (user) => {
    try {
      const userLogin = await LoginServices.login(user)
  
      window.localStorage.setItem('loggedUser', JSON.stringify(userLogin))
      blogServices.setToken(userLogin.token)
      setUser(userLogin)
    } catch (error) {
      setMessage({message: error.response.data.error, status: false})
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }

  const closeLoggin = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async (blog) => {
    setMessage({message: `a new blog ${blog.title} ${blog.author}`, status: true})
    setTimeout(() => {setMessage(null)}, 5000)
    
    createBlogRef.current.togglabelVisible()
    const newBlog = await blogServices.createBlog(blog)
    setBlogs(blogs.concat(newBlog))
  }

  const updateBlog = async (id, blog) => {
    const blogToUpdate = await blogServices.updateBlog(id, blog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : blogToUpdate))
  }

  const deleteBlog = async (id) => {
    await blogServices.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  return(
    <>
       <h2>{ user === null ? 'log in to application' : 'blogs'}</h2>
      <Message messageObj={message}/>
      {user === null
        ? 
        <div>
          <LoginForm 
            login={loggin}
          />
        </div>
        :
        <div>
          <h3>{user.name} logged in</h3>
          <button onClick={closeLoggin}>loggout</button>
          <Togglabel label="new blog" ref={createBlogRef}>
            <FormBlog
              createBlog={createBlog}
            />
          </Togglabel>
          {
            [...blogs].sort((a,b) => b.likes - a.likes).map(blog => (
              <Blog 
                key={blog.id} 
                blog={blog} 
                user={user}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            ))
          }
        </div>  
      }
    </>
  )
}

export default App