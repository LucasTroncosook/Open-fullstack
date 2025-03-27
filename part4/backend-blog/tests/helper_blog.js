const User = require('../models/user')

const initialBlogs = [
    {
      title: 'Creando una App',
      author: 'Lucas Troncoso',
      likes: 1,
      id: '67dde35fd010db6903faf561'
    },
    {
      title: 'Creando una app test',
      author: 'Lucas Troncoso',
      likes: 1,
      link: 'http://localhost:3005/api/blogs',
      id: '67ddeddab6a71da2650b8948'
    }
]

const usersInId = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    usersInId
}