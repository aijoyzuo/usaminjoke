import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from './SearchBar'

const push = vi.fn()
const useSearchParams = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => useSearchParams(),
}))

function setParams(params: Record<string, string>) {
  useSearchParams.mockReturnValue(new URLSearchParams(params))
}

describe('SearchBar', () => {
  beforeEach(() => {
    push.mockClear()
    setParams({})
  })

  it('shows the current "q" search param as the initial input value', () => {
    setParams({ q: '兔兔' })
    render(<SearchBar />)
    expect(screen.getByPlaceholderText('搜尋梗圖...')).toHaveValue('兔兔')
  })

  it('navigates to /?q=<value> and clears the input on Enter', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('搜尋梗圖...')

    fireEvent.change(input, { target: { value: '兔兔' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(push).toHaveBeenCalledWith('/?q=%E5%85%94%E5%85%94')
    expect(input).toHaveValue('')
  })

  it('navigates on button click as well', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('搜尋梗圖...')

    fireEvent.change(input, { target: { value: '貓貓' } })
    fireEvent.click(screen.getByRole('button', { name: '搜尋' }))

    expect(push).toHaveBeenCalledWith('/?q=%E8%B2%93%E8%B2%93')
  })

  it('preserves the existing "cat" param when searching', () => {
    setParams({ cat: 'animal' })
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('搜尋梗圖...')

    fireEvent.change(input, { target: { value: '兔兔' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(push).toHaveBeenCalledWith('/?q=%E5%85%94%E5%85%94&cat=animal')
  })

  it('navigates to / when the search text is empty', () => {
    render(<SearchBar />)
    fireEvent.click(screen.getByRole('button', { name: '搜尋' }))
    expect(push).toHaveBeenCalledWith('/')
  })

  it('re-syncs the input when the "q" param changes externally', () => {
    setParams({ q: '兔兔' })
    const { rerender } = render(<SearchBar />)
    expect(screen.getByPlaceholderText('搜尋梗圖...')).toHaveValue('兔兔')

    setParams({ q: '貓貓' })
    rerender(<SearchBar />)
    expect(screen.getByPlaceholderText('搜尋梗圖...')).toHaveValue('貓貓')
  })
})
