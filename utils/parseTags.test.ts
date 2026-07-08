import { describe, it, expect } from 'vitest'
import { parseTags } from './parseTags'

describe('parseTags', () => {
  it('returns an empty array for falsy input', () => {
    expect(parseTags(undefined)).toEqual([])
    expect(parseTags(null)).toEqual([])
    expect(parseTags('')).toEqual([])
  })

  it('returns a single tag when there is no separator', () => {
    expect(parseTags('社畜')).toEqual(['社畜'])
  })

  it('splits on English commas', () => {
    expect(parseTags('社畜,開心')).toEqual(['社畜', '開心'])
  })

  it('splits on full-width commas', () => {
    expect(parseTags('社畜，開心')).toEqual(['社畜', '開心'])
  })

  it('trims whitespace around each tag', () => {
    expect(parseTags(' 社畜 , 開心 ')).toEqual(['社畜', '開心'])
  })

  it('drops empty segments from consecutive separators', () => {
    expect(parseTags('社畜,,開心')).toEqual(['社畜', '開心'])
  })

  it('coerces non-string input to a string first', () => {
    expect(parseTags(123)).toEqual(['123'])
  })
})
