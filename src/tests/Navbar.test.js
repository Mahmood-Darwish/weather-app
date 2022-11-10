import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../components/Navbar'
import { BrowserRouter } from "react-router-dom";
import React from 'react';
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { authContext } from "../utils/auth"

test('Check that Navbar is being rendered correctly', async () => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    )
})

test('Check that number of buttons in Navbar when the user is not signed in is correct', async () => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    )

    const linkList = await screen.findAllByRole('link')
    expect(linkList).toHaveLength(3)
    const buttonList = screen.queryAllByRole('button')
    expect(buttonList).toHaveLength(0)
})

test('Check that number of buttons in Navbar when the user is signed in is correct', () => {
    let history = createBrowserHistory();
    history.push("/weather_app")
    let { getByText } = render(
        <HistoryRouter history={history} initialEntries={["/weather_app"]}>
            <Navbar />
        </HistoryRouter>
    );

    expect(history.location.pathname).toBe('/weather_app');
    fireEvent.click(getByText('About'));
    expect(history.location.pathname).toBe('/weather_app/about');
    fireEvent.click(getByText('Weather App'));
    expect(history.location.pathname).toBe('/weather_app');
    fireEvent.click(getByText('Login'));
    expect(history.location.pathname).toBe('/weather_app/login');
    fireEvent.click(getByText('Weather App'));
    expect(history.location.pathname).toBe('/weather_app');
});

test('Check that number of buttons in Navbar when the user is signed in is correct', async () => {
    const values = {
        user: "asd",
        setUser: jest.fn(),
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn()
    };

    render(
        <BrowserRouter>
            <authContext.Provider value={values}>
                <Navbar />
            </authContext.Provider>
        </BrowserRouter>
    );

    const linkList = await screen.findAllByRole('link')
    expect(linkList).toHaveLength(3)
    const buttonList = await screen.findAllByRole('button')
    expect(buttonList).toHaveLength(1)
})

test('Check that logging out works', async () => {
    let values = {
        user: "asd",
        setUser: jest.fn(),
        login: jest.fn(),
        logout() { this.user = null },
        register: jest.fn()
    };

    let { getByText } = render(
        <BrowserRouter>
            <authContext.Provider value={values}>
                <Navbar />
            </authContext.Provider>
        </BrowserRouter>
    );

    const linkList = await screen.findAllByRole('link')
    expect(linkList).toHaveLength(3)
    const buttonList = await screen.findAllByRole('button')
    expect(buttonList).toHaveLength(1)

    fireEvent.click(getByText('Log out'));

    expect(values.user).toBe(null)
})