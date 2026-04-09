const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export interface AccidentParams {
  date_from?: string
  date_to?: string
  accident_type?: string
  only_dead?: boolean
}

export async function fetchAccidents(p: AccidentParams) {
  const url = new URL(`${BASE}/api/accidents`)
  Object.entries(p).forEach(([k, v]) => {
	if (v !== null && v !== undefined && v !== '') {
	  url.searchParams.set(k, String(v))	
	}
  })
  const res = await fetch(url)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
