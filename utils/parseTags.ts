export function parseTags(input: unknown): string[] {
  if (!input) return []
  return String(input).split(/[,，]/).map(t => t.trim()).filter(Boolean)
}
