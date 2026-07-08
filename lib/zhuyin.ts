const TONE_MARKS = ['ˊ', 'ˇ', 'ˋ', '˙']

const FUZZY_PAIRS: [string, string][] = [
  ['ㄈ', 'ㄏ'],
]

function stripTones(input: string): string {
  return [...input].filter(ch => !TONE_MARKS.includes(ch)).join('')
}

function normalizeZhuyin(input: string): string {
  let result = stripTones(input.trim())
  for (const [a, b] of FUZZY_PAIRS) {
    result = result.split(b).join(a)
  }
  return result
}

export function zhuyinIncludes(target: string, query: string): boolean {
  if (!query) return false
  return normalizeZhuyin(target).includes(normalizeZhuyin(query))
}
