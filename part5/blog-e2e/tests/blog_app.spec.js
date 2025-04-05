const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('api/testing/reset')
        await request.post('/api/users', {
            data:{
                username: "Usuario Test",
                name: "testing playwright",
                password: "123456789"
            }
        })
        await request.post('/api/users', {
            data:{
                username: "Usuario Test 2",
                name: "testing 2 playwright",
                password: "123456789"
            }
        })
        await page.goto('/')
    })
    
    test('Login form is shown', async ({ page }) => {
        const loginForm = page.locator('.loginTest')
        await expect(loginForm).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId('username').fill('Usuario Test')
            await page.getByTestId('password').fill('123456789')
            await page.getByRole('button', {name: "login"}).click()

            const loggin = page.getByText('testing playwright logged in')
            await expect(loggin).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('Usuario Test')
            await page.getByTestId('password').fill('123456')
            await page.getByRole('button', {name: "login"}).click()

            const loginError = page.getByText('invalid username or password')
            await expect(loginError).toBeVisible()
            await expect(page.getByText('testing playwright logged in')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('Usuario Test')
            await page.getByTestId('password').fill('123456789')
            await page.getByRole('button', {name: "login"}).click()

            await page.getByRole('button', {name: "new blog"}).click()
            await page.getByTestId('title').fill('creando un blog con playwright')
            await page.getByTestId('author').fill('Usuario Test')
            await page.getByTestId('url').fill('https://fullstackopen.com/es/part5/pruebas_de_extremo_a_extremo_playwright#ejercicios-5-17-5-23')
            await page.getByRole('button', {name: "create"}).click()
        })

        test('a new blog can be created', async ({ page }) => {
            const divBlog = page.locator('.divBlog')
            await expect(divBlog).toBeVisible()
            await expect(divBlog).toContainText('creando un blog con playwright')
        })

        
        describe('blog', () => {
            beforeEach(async ({ page }) => {
                const blog = page.locator('.divBlog')
                
                await blog.getByRole('button', {name: "show"}).click()
            })
            test('likes is 0 to likes is 1', async ({ page }) => {
    
                await page.getByRole('button', {name: "like"}).click()
    
                await expect(page.locator(".likes-count")).toContainText("likes: 1")
            })

            test('delete blog for user', async ({ page }) => {

                page.on('dialog', async dialog => {
                    await dialog.accept()
                })
            
                const blog = page.locator('.divBlog')
            
                await expect(blog).toBeVisible()
            
                await blog.getByRole('button', { name: 'remove' }).click()
            
                await expect(blog).not.toBeAttached()
            })
            
        })

    })

    describe('Button remove visible for user create blog', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('Usuario Test')
            await page.getByTestId('password').fill('123456789')
            await page.getByRole('button', {name: "login"}).click()

            await page.getByRole('button', {name: "new blog"}).click()
            await page.getByTestId('title').fill('creando un blog con playwright')
            await page.getByTestId('author').fill('Usuario Test')
            await page.getByTestId('url').fill('https://fullstackopen.com/es/part5/pruebas_de_extremo_a_extremo_playwright#ejercicios-5-17-5-23')
            await page.getByRole('button', {name: "create"}).click()
        })

        test('Test User only sees visible to btn remove is the creando un blog con playwright', async ({ page }) => {
            await page.getByRole('button', {name: "loggout"}).click()

            await page.getByTestId('username').fill('Usuario Test 2')
            await page.getByTestId('password').fill('123456789')
            await page.getByRole('button', {name: "login"}).click()
           
            const blog = page.locator('.divBlog')
            await blog.getByRole('button', {name: "show"}).click()
            
            expect(page.getByText('remove')).not.toBeVisible()
        })
    })

    describe('order for likes blogs', () => {
        test('blogs are ordered by likes in descending order', async ({ page }) => {

            await page.getByTestId('username').fill('Usuario Test')
            await page.getByTestId('password').fill('123456789')
            await page.getByRole('button', { name: 'login' }).click()
          
            const blogs = [
              { title: 'Primer Blog', author: 'Martin', url: 'Primer Blog' },
              { title: 'Segundo Blog', author: 'Sergio', url: 'Segundo Blog' },
              { title: 'Tercer Blog', author: 'Raul', url: 'Tercer Blog' }
            ]
          
            for (const blog of blogs) {
              await page.getByRole('button', { name: 'new blog' }).click()
              await page.getByTestId('title').fill(blog.title)
              await page.getByTestId('author').fill(blog.author)
              await page.getByTestId('url').fill(blog.url)
              await page.getByRole('button', { name: 'create' }).click()
              await page.waitForTimeout(550) 
            }
          
            const showButtons = await page.locator('button', { hasText: 'show' }).all()
            for (const btn of showButtons) {
              await btn.click()
            }
          
            const likeButtons = await page.locator('button', { hasText: 'like' }).all()
          
            await likeButtons[2].click()
            await page.waitForTimeout(750)
            await likeButtons[2].click()
            await page.waitForTimeout(800)
            await likeButtons[2].click()
            await page.waitForTimeout(850)
          
            // Segundo Blog
            await likeButtons[1].click()
            await page.waitForTimeout(900)
            await likeButtons[1].click()
            await page.waitForTimeout(950)
          
            await likeButtons[0].click()
            await page.waitForTimeout(1000)
          
            const blogsDivs = await page.locator('.divBlog').allTextContents()
          
            expect(blogsDivs[0]).toContain('Tercer Blog')
            expect(blogsDivs[1]).toContain('Segundo Blog')
            expect(blogsDivs[2]).toContain('Primer Blog')
          })
    })
})