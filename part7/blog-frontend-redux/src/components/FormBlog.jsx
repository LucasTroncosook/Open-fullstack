import { useState } from "react"
import { useFiled } from "../hooks"

const FormBlog = ({ createBlog }) => {
    const title = useFiled('text')
    const author = useFiled('text')
    const url = useFiled('text')

    const addBlog = (e) => {
        e.preventDefault()

        createBlog({
            title: title.value,
            author: author.value,
            url: url.value
        })

        title.res()
        author.res()
        url.res()
    }

    return(
        <>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    <span>title: </span>
                    <input 
                        type={title.type}
                        value={title.value}
                        onChange={title.onChange}
                        placeholder="ingrese el title"
                        data-testid = "title"
                    />
                </div>
                <div>
                    <span>author: </span>
                    <input 
                        type={author.type}
                        value={author.value}
                        onChange={author.onChange}
                        placeholder="ingrese el author"
                        data-testid = "author"
                    />
                </div>
                <div>
                    <span>url: </span>
                    <input 
                        type={url.type}
                        value={url.value}
                        onChange={url.onChange}
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