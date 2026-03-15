const BASE = 'http://localhost:8000'

export interface AccidentParams {
  date_from?: string
  date_to?: string
  accident_type?: string
  only_dead?: boolean
}

export async function fetchAccidents(p: AccidentParams) {
  const url = new URL(`${BASE}/api/accidents`)
  Object.entries(p).forEach(([k, v]) => v != null && url.searchParams.set(k, String(v)))
  const res = await fetch(url)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
