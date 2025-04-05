import { useState } from "react"

const FormBlog = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (e) => {
        e.preventDefault()

        createBlog({
            title,
            author,
            url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    <span>title: </span>
                    <input 
                        type="text"
                        name="title"
                        value={title}
                        onChange={({target}) => setTitle(target.value)}
                        placeholder="ingrese el title"
                        data-testid = "title"
                    />
                </div>
                <div>
                    <span>author: </span>
                    <input 
                        type="text"
                        name="author"
                        value={author}
                        onChange={({target}) => setAuthor(target.value)}
                        placeholder="ingrese el author"
                        data-testid = "author"
                    />
                </div>
                <div>
                    <span>url: </span>
                    <input 
                        type="text"
                        name="url"
                        value={url}
                        onChange={({target}) => setUrl(target.value)}
                        placeholder="ingrese la url"
                        data-testid = "url"
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default FormBlog