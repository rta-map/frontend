export let bodyLockStatus = true
export let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay)
	} else {
		bodyLock(delay)
	}
}
export let bodyUnlock = (delay = 500) => {
	if (bodyLockStatus) {
		const lockPaddingElements = document.querySelectorAll<HTMLElement>("[data-lp]");
		setTimeout(() => {
			lockPaddingElements.forEach(lockPaddingElement => {
				lockPaddingElement.style.paddingRight = ''
			});
			document.body.style.paddingRight = ''
			document.documentElement.classList.remove("lock")
		}, delay)
		bodyLockStatus = false
		setTimeout(function () {
			bodyLockStatus = true
		}, delay)
	}
}
export let bodyLock = (delay = 500) => {
	if (bodyLockStatus) {
		const lockPaddingElements = document.querySelectorAll<HTMLElement>("[data-lp]")
		const lockPaddingValue = window.innerWidth - document.body.offsetWidth + 'px'
		lockPaddingElements.forEach(lockPaddingElement => {
			lockPaddingElement.style.paddingRight = lockPaddingValue
		});

		document.body.style.paddingRight = lockPaddingValue
		document.documentElement.classList.add("lock")

		bodyLockStatus = false
		setTimeout(function () {
			bodyLockStatus = true
		}, delay)
	}
}
export function menuToggle(): void {
	if (bodyLockStatus) {
		bodyLockToggle();
		document.documentElement.classList.toggle("menu-open");
	}
}
export function menuOpen(): void {
	bodyLock();
	document.documentElement.classList.add("menu-open");
}
export function menuClose(): void {
	bodyUnlock();
	document.documentElement.classList.remove("menu-open");
}

export const ACCIDENT_TYPE_MAP = {
	other: "Այլ պատահար",
	collision: "Բախում",
	animal: "Կենդանու վրաերթ",
	pedestrian: "Հետիոտնի վրաերթ",
	bicycle: "Հեծանվորդի վրաերթ",
	tow_vehicle: "Լծկան տրանսպորտային միջոցի վրաերթ",
	traffic_jam: "Խոչընդոտի վրաերթ",
	rollover: "Շրջում",
	parking: "Կանգնած տրանսպորտային միջոցի վրաերթ",
	passenger: "Ուղևորի վայր ընկնել",
} as const

export type AccidentTypeKey = keyof typeof ACCIDENT_TYPE_MAP