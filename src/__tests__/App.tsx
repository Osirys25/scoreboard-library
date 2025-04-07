import {render} from '@testing-library/react'
import {App} from '../App'

describe('src', () => {
    it('should render the component with correct text', () => {
        const {getByText} = render(<App />)
        const headingElement = getByText(/Boilerplate/i)
        expect(headingElement).toBeInTheDocument()
    })

    it('should apply correct class names', () => {
        const {getByText} = render(<App />)
        const headingElement = getByText(/Boilerplate/i)
        expect(headingElement).toHaveClass('text-3xl')
        expect(headingElement).toHaveClass('font-bold')
        expect(headingElement).toHaveClass('underline')
    })
})
