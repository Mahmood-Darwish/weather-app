import { render, screen, waitFor } from '@testing-library/react'
import Home from '../pages/Home'

test('Check that home page is being rendered correctly', async () => {
    render(<Home />)

    const articleCount = await screen.findAllByRole("article")
    expect(articleCount).toHaveLength(2)
})
