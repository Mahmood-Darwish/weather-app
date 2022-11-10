import { render, screen, fireEvent } from '@testing-library/react'
import Login from '../pages/Login'
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

test('Check that login page is being rendered correctly', async () => {
    render(
        <BrowserRouter>
            <Login />
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

test('Check that register button is working', () => {
    let history = createBrowserHistory();
    history.push("/weather_app/login")
    let { getByText } = render(
        <HistoryRouter history={history} initialEntries={["/weather_app/login"]}>
            <Login />
        </HistoryRouter>
    );

    fireEvent.click(getByText('Don\'t have an account? Register here.'));
    expect(history.location.pathname).toBe('/weather_app/register');
});
