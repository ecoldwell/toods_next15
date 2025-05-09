export function count(
	arr: Array<any>,
	singular: string = 'item',
	plural?: string,
) {
	return `${arr?.length || 0} ${arr?.length === 1 ? singular : plural || singular + 's'}`
}

export function mobileOverlayToggle() {
	const element = (<HTMLInputElement>document.getElementById("menuToggle"))
	element?.addEventListener("click", listenerFunction);
}

function listenerFunction(this: HTMLElement, ev: Event) {
	ev.preventDefault();
	console.log("i have been clicked and I know this")
	const mobileNav = (<HTMLInputElement>document.getElementById("overlayToggleMenu"))
	mobileNav.style.display = "flex";
  }