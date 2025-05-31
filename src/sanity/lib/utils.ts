export function count(
	arr: Array<any>,
	singular: string = 'item',
	plural?: string,
) {
	return `${arr?.length || 0} ${arr?.length === 1 ? singular : plural || singular + 's'}`
}

export function mobileOverlayToggle() {
	const mobileNav = document.getElementById("overlayToggleMenu");
	const mobileOverlay = document.getElementById("fixed_menu");
	
	if (mobileNav && mobileOverlay) {
		if (mobileNav.classList.contains("menu_active")) {
			mobileNav.classList.remove("menu_active");
			mobileOverlay.classList.remove("mobile_overlay");
		} else {
			mobileNav.classList.add("menu_active");
			mobileOverlay.classList.add("mobile_overlay");
		}
	}
}


