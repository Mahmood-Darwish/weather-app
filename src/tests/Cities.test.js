import { Cities, capitalize } from "../pages/Cities"
import { render, screen } from '@testing-library/react'
import { QueryClientProvider, QueryClient } from "react-query"


test('Check that my cities page is being rendered correctly', async () => {
    const queryClient = new QueryClient()

    render(
        <QueryClientProvider client={queryClient}>
            <Cities />
        </QueryClientProvider>
    )

    const buttonCount = await screen.findAllByRole("button")
    expect(buttonCount).toHaveLength(1)
    const textboxCount = await screen.findAllByRole("textbox")
    expect(textboxCount).toHaveLength(1)
})


test('Check that text discription capitalization is working correctly', async () => {

    let test1 = "This is a test"
    let test2 = "this Is aLSO A tEst"
    let test3 = "jdfasjadsfhj"
    let test4 = "Thsidh hdjsklaHTHT HTIHIO"

    expect(capitalize(test1) === "This Is A Test").toBeTruthy()
    expect(capitalize(test2) === "This Is Also A Test").toBeTruthy()
    expect(capitalize(test3) === "Jdfasjadsfhj").toBeTruthy()
    expect(capitalize(test4) === "Thsidh Hdjsklahtht Htihio").toBeTruthy()
})