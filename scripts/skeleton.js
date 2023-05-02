// This if function to load skeletons
// (navbar, footer, and other things) into html.
function loadSkeleton() {
	$('#navbarPlaceholder').load('./text/navbar.html');
	$('#footerPlaceholder').load('./text/footer.html');
}
loadSkeleton();
