(function (document, feature, element) {
	element = document.createElement("main");
	element.style.display = feature;
	if ("querySelector" in document && "classList" in element && element.style.display === feature) {
		document.getElementsByTagName("html")[0].classList.add("v");
	}
}(document, "flex"));
