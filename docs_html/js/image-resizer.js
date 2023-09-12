var maxWidth = 750;
var maxHeight = 750;

function zoom(image, elDiv) {

	var width = image.getAttribute("data-zoom-width");
	var height = image.getAttribute("data-zoom-height");

	if (width == null || height == null) {
		return false;
	}

	var zoomState = image.getAttribute("data-zoom-state");

	var mapName = image.getAttribute("useMap");

	image.setAttribute("data-zoom-width", image.getAttribute("width"));
	image.setAttribute("data-zoom-height", image.getAttribute("height"));

	elDiv.className = "imageMapOdkaz";
	if (zoomState == "zoomed") {
		image.setAttribute("data-zoom-state", "");
		elDiv.className += ' image-zoom image-zoom-in';
	} else {
		image.setAttribute("data-zoom-state", "zoomed");
		elDiv.className += ' image-zoom image-zoom-out';
	}

	image.setAttribute("width", width);
	image.setAttribute("height", height);

	if (mapName != null) {

		if (zoomState == "zoomed") {
			mapName += "-small";
		} else {
			mapName = mapName.substring(0, mapName.length - 6);
		}

		image.useMap = mapName;
	}

	elDiv.style.width = (parseInt(width) + 10) + 'px';

	return false;
}

function imageResize(parent, image, map) {

	if (image.width <= maxWidth && image.height <= maxHeight) {

		image.style.display = "block";
		if (image.height <= 40 && image.width <= 40) {
			image.setAttribute("align", "left");
			image.style.marginRight = "5px";
		}

		return;  // resizing not required
	}

	var imageLongerSize = (image.width >= image.height) ? "width" : "height";
	var coefficient, newWidth, newHeight;

	if (imageLongerSize == "width") {

		coefficient = image.width / image.height;
		newWidth = maxWidth;
		newHeight = Math.round(newWidth / coefficient);
		if (newHeight > maxHeight) {
			newWidth = Math.round(coefficient * maxHeight);
			newHeight = maxHeight;
		}
	} else {

		coefficient = image.height / image.width;
		newHeight = maxHeight;
		newWidth = Math.round(newHeight / coefficient);		
	}

	var elZoomer = document.createElement("a");
	elZoomer.href = '#';
	elZoomer.title = 'Zoom image';
	elZoomer.style.display = "block";

	var elDiv = document.createElement("div");
	elDiv.className = 'imageMapOdkaz';
	elDiv.className += ' image-zoom image-zoom-in';
	elDiv.style.width = newWidth + 10 + 'px';

	var elImage = document.createElement("img");
	elImage.src = image.src;
	elImage.alt = image.alt;
	elImage.setAttribute("width", newWidth);
	elImage.setAttribute("height", newHeight);
	elImage.setAttribute("data-zoom-width", image.width);
	elImage.setAttribute("data-zoom-height", image.height);
	elImage.className += " map";
	elImage.useMap = image.useMap;

	var mapName = null;
	if (map != null) {

		var elNewMap = document.createElement("map");
		elNewMap.id = map.id + "-small";
		elNewMap.name = map.name + "-small";
		mapName = map.name;

		var areaCollection = map.getElementsByTagName("area");
		var mapCoefficient = image.width / newWidth;

		for (var i = 0; i < areaCollection.length; i++) {
			var area = areaCollection[i];
			var elNewArea = document.createElement("area");
			elNewArea.href = area.href;
			elNewArea.alt = area.alt;
			elNewArea.title = area.title;
			elNewArea.shape = area.shape;

			var newCoords = "";
			var coords = area.coords.split(",");
			for (var j = 0; j < coords.length; j++) {
				newCoords += Math.round(coords[j] / mapCoefficient);
				if (j != (coords.length - 1)) {
					newCoords += ',';
				}
			}
			elNewArea.coords = newCoords;

			elNewMap.appendChild(elNewArea);
		}

		parent.appendChild(elNewMap);
		elImage.useMap = "#" + elNewMap.name;
	}

	elZoomer.onclick = function (event) {
		return zoom(elImage, elDiv);
	};

	elZoomer.appendChild(elDiv);

	parent.removeChild(image);
	parent.appendChild(elZoomer);
	parent.appendChild(elImage);
}

function checkImages() {

	var divCollection = document.getElementsByTagName("div");
	for (var i = 0; i < divCollection.length; i++) {

		var div = divCollection[i];
		if ((div.className.search("imageBox") != -1) || (div.className.search("imageMapBox") != -1)) {

			var imgCollection = div.getElementsByTagName("img");
			var mapCollection = div.getElementsByTagName("map");

			if (imgCollection.length != 0) {
				var image = imgCollection[0];
				var map = null;
				if (mapCollection.length != 0) {
					map = mapCollection[0];
				}
				imageResize(div, image, map);
			}
		}
	}
}
