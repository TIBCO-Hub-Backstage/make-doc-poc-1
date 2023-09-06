/*
 * Adds function startsWith(str)
 */
String.prototype.startsWith = function (str) {
	return (this.match("^" + str) == str)
}

/**
 * Shows only first IMAGE in html document
 */
function TabbedFormImages() {
	var isFormDocumentation, p, ExpandAllElement, ExpandAll;
	var pCollection = document.getElementsByTagName("p");
	for (var i = 0; i < pCollection.length; i++) {
		p = pCollection[i];
		if ((p.className.search("nomargin") != -1)) {
			if (p.innerHTML.startsWith("Section contains description of Form ")) {
				isFormDocumentation = true;
				break;
			}
		}
	}

	if (isFormDocumentation && !isExpanded()) {
		///find images with imagemaps and show only first image
		var div, imgCollection, img, alt, str, MapCollection, map, mapLength, AreaCollection, areaObj;
		var numberOfImage = 0;
		var divCollection = document.getElementsByTagName("div");

		for (var i = 0; i < divCollection.length; i++) {
			div = divCollection[i];
			if ((div.className.search("imageBox") != -1) || (div.className.search("imageMapBox") != -1)) {

				if (numberOfImage != 0) {
					div.style.display = 'none';
					//div.innerHTML = "";
				}
				numberOfImage = numberOfImage + 1;
			}
		}
	}
}

/**
 * Changes image of Tab by ID
 */
function changeImage(fileName) {
	var actualdiv, imgColl, selectedDiv, source, divsForShowColl, divForShow;

	var divColl = document.getElementsByTagName("div");
	for (var i = 0; i < divColl.length; i++) {
		if (!isExpanded()) {
			actualdiv = divColl[i];
			if ((actualdiv.className.search("imageBox") != -1) || (actualdiv.className.search("imageMapBox") != -1)) {
				actualdiv.style.display = 'none';
			}
		}
	}
	document.getElementById(fileName).style.display = '';
	if (isExpanded()) {
		window.location.hash = fileName;
	}
}

/**
 * Action for expand/collapse all
 */
function ExpandAllClicked() {
	var expandAllElement = document.getElementById("Diagram__ExpandAll");
	var aCollection = expandAllElement.getElementsByTagName("a");

	var aElement;
	for (var i = 1; i < aCollection.length; i++) {
		aElement = aCollection[i];
		if (aElement.innerHTML.startsWith("Expand")) {
			aElement.innerHTML = "Collapse all";
			break;
		}
		if (aElement.innerHTML.startsWith("Collapse")) {
			aElement.innerHTML = "Expand all";
			break;
		}
	}
}

/**
 * Tests if images are expanded or not
 */
function isExpanded() {
	var expandAllElement = document.getElementById("Diagram__ExpandAll");
	if (expandAllElement == null) {
		return false;
	}
	var aCollection = expandAllElement.getElementsByTagName("a");

	var aElement;
	for (var i = 1; i < aCollection.length; i++) {
		aElement = aCollection[i];
		if (aElement.innerHTML.startsWith("Expand")) {
			return false;
		}

		if (aElement.innerHTML.startsWith("Collapse")) {
			return true;
		}
	}
}
