import { render, screen, fireEvent } from '@testing-library/react'
import Register from '../pages/Register'
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

test('Check that register page is being rendered correctly', async () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    )

    const headingCount = await screen.findAllByRole("heading")
    expect(headingCount).toHaveLength(1)
    const buttonCount = await screen.findAllByRole("button")
    expect(buttonCount).toHaveLength(2)
    const textboxCount = await screen.findAllByRole("textbox")
    expect(textboxCount).toHaveLength(1)
    const contentinfoCount = await screen.findAllByRole("contentinfo")
    expect(contentinfoCount).toHaveLength(1)
})

test('Check that login button is working', () => {
    let history = createBrowserHistory();
    history.push("/weather_app/register")
    let { getByText } = render(
        <HistoryRouter history={history} initialEntries={["/weather_app/register"]}>
            <Register />
        </HistoryRouter>
    );

    fireEvent.click(getByText('Already have an account? Log in.'));
    expect(history.location.pathname).toBe('/weather_app/login');
});
