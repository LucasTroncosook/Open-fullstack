import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";


describe('<Blog />', () => {
    let container
    let updateBlog

    beforeEach(() => {
        const blog = {
            title: "Blog de prueba con jsdom",
            likes: 10,
            url: "https://fullstackopen.com/es/part5/probando_aplicaciones_react#ejercicios-5-13-5-16",
            user:{
                username: "agenteTest"
            }
        }
    
        const user = {
            username: "agenteTest"
        }

        updateBlog = vi.fn()
        
        container = render(<Blog blog={blog} updateBlog={updateBlog} user={user}/>).container
    })
    test('render toBeDefined title, children display none', () => {

        const div = container.querySelector('.testDiv')
        
        const title = screen.getByText('Blog de prueba con jsdom')
        
        expect(title).toBeDefined()
        expect(div).toHaveStyle('display: none')
    })

    test('click btn show', async () => {
        const user = userEvent.setup()
        const btnShow = screen.getByText('show')
        await user.click(btnShow)

        const div = container.querySelector('.testDiv')

        const url = screen.getByText("https://fullstackopen.com/es/part5/probando_aplicaciones_react#ejercicios-5-13-5-16")
        const likes = screen.getByText('10')

        expect(div).not.toHaveStyle('display: none')
        expect(url).toHaveTextContent("https://fullstackopen.com/es/part5/probando_aplicaciones_react#ejercicios-5-13-5-16")
        expect(likes).toHaveTextContent("10")
    })

    test('Two clicks btn like', async () => {
        const user = userEvent.setup()
        const btnOneLike = screen.getByText('like')
        await user.click(btnOneLike)
        await user.click(btnOneLike)

        expect(updateBlog.mock.calls).toHaveLength(2)
    })
})