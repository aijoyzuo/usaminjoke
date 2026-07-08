import { describe, it, expect } from 'vitest'
import { zhuyinIncludes } from './zhuyin'

describe('zhuyinIncludes', () => {
  it('matches identical zhuyin strings', () => {
    expect(zhuyinIncludes('ㄊㄨˋㄊㄨˋ', 'ㄊㄨˋㄊㄨˋ')).toBe(true)
  })

  it('returns false for an empty query', () => {
    expect(zhuyinIncludes('ㄊㄨˋㄊㄨˋ', '')).toBe(false)
  })

  it('ignores tone mark differences', () => {
    expect(zhuyinIncludes('ㄊㄨˋ', 'ㄊㄨˊ')).toBe(true)
  })

  it('treats ㄈ and ㄏ as the same sound in the target', () => {
    expect(zhuyinIncludes('ㄏㄨˋㄌㄜˋ', 'ㄈㄨˋㄌㄜˋ')).toBe(true)
  })

  it('treats ㄈ and ㄏ as the same sound in the query', () => {
    expect(zhuyinIncludes('ㄈㄨˋㄌㄜˋ', 'ㄏㄨˋㄌㄜˋ')).toBe(true)
  })

  it('returns false when the query is not a substring', () => {
    expect(zhuyinIncludes('ㄊㄨˋㄊㄨˋ', 'ㄋㄧˇ')).toBe(false)
  })

  it('matches a substring in the middle of a longer target', () => {
    expect(zhuyinIncludes('ㄐㄧㄣㄊㄧㄢㄊㄧㄢˋㄑㄧˋ', 'ㄊㄧㄢㄊㄧㄢˋ')).toBe(true)
  })

  it('trims surrounding whitespace from the query', () => {
    expect(zhuyinIncludes('ㄊㄨˋㄊㄨˋ', '  ㄊㄨˋ  ')).toBe(true)
  })
})
