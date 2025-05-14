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
	element?.classList.add("close");
	// if (element?.classList.contains('close')) {
	// 	console.log('element has close')
		
	// }  
	// element?.addEventListener("click", closeMenu);
}

function listenerFunction(this: HTMLElement, ev: Event) {
	// ev.preventDefault();
	console.log("i have been clicked and I know this")
	const mobileNav = (<HTMLInputElement>document.getElementById("overlayToggleMenu"))
	const mobileOverlay = (<HTMLInputElement>document.getElementById("fixed_menu"))
	mobileNav.classList.add("menu_active");
	mobileOverlay.classList.toggle("mobile_overlay");
	
  }

  function closeMenu(this: HTMLElement, ev: Event) {
	// ev.preventDefault();
	console.log("i have been clicked and I know this")
	const mobileNav = (<HTMLInputElement>document.getElementById("overlayToggleMenu"))
	const mobileOverlay = (<HTMLInputElement>document.getElementById("fixed_menu"))
	// mobileNav.style.display = "none";
	// mobileOverlay.classList.remove("mobile_overlay");
	
  }