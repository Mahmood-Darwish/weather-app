import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../components/Navbar'
import { BrowserRouter, Route, MemoryRouter } from "react-router-dom";
import React from 'react';

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
})

test('Check that buttons work in Navbar', () => {
    let mockHistory, mockLocation;
    let { getByText } = render(
        <MemoryRouter initialEntries={["/weather_app"]}>
            <Navbar />
        </MemoryRouter>
    );
    // navigate here on event
    //userEvent.click(screen.getByRole('button', { name: /Save/ }));
    //expect(mockLocation.pathname).toBe("/expectedUri");


    expect(history.location.pathname).toBe('/weather_app');
    fireEvent.click(getByText('About'));
    expect(history.location.pathname).toBe('/About');
    fireEvent.click(getByText('weather_app'));
    expect(history.location.pathname).toBe('/weather_app');
});