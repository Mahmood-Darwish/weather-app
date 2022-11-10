import { render, screen, waitFor } from '@testing-library/react'
import About from '../pages/About'

test('Check that about page is being rendered correctly', async () => {
    render(<About />)

    const articleCount = await screen.findAllByRole("article")
    expect(articleCount).toHaveLength(1)
})
