import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormBlog from "./FormBlog";

describe('<FormBlog />', () => {
    test('create new blog', async () => {
        const user = userEvent.setup()
        const createBlog = vi.fn()

        render(<FormBlog createBlog={createBlog}/>)
        
        const inputTitle = screen.getByPlaceholderText('ingrese el title')
        const inputAuthor = screen.getByPlaceholderText('ingrese el author')
        const inputUrl = screen.getByPlaceholderText('ingrese la url')

        const btnSubmit = screen.getByText('create')

        await user.type(inputTitle, 'Aprendiendo a como hacer Test desde el frontEnd')
        await user.type(inputAuthor, 'Lucas Troncoso')
        await user.type(inputUrl, 'https://fullstackopen.com/es/part5/probando_aplicaciones_react#probando-los-formularios')

        await user.click(btnSubmit)

        expect(createBlog.mock.calls[0][0].title).toBe('Aprendiendo a como hacer Test desde el frontEnd')
        expect(createBlog.mock.calls[0][0].author).toBe('Lucas Troncoso')
        expect(createBlog.mock.calls[0][0].url).toBe('https://fullstackopen.com/es/part5/probando_aplicaciones_react#probando-los-formularios')
    })
})