function getDocumentHeight() {
	var height = 0;

	if (typeof(window.innerHeight) == "number") {
		height = window.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientHeight) {
		height = document.documentElement.clientHeight;
	}
	else {
		height = document.body.clientHeight;
	}
	return height;
}

function setMenuHeight() {
	var height = getDocumentHeight() - 4;

	if (height < 0) {
		height = 0;
	}

	var menuBoxElement = document.getElementById("menuBox");
	if (menuBoxElement != null) {
		menuBoxElement.style.height = height + "px";
		var menuInnerBoxElement = document.getElementById("menuInnerBox");
		if (menuInnerBoxElement != null) {
			if (height < 8) {
				menuInnerBoxElement.style.height = 0 + "px";
			} else {
				menuInnerBoxElement.style.height = (height - 8) + "px";
			}
		}
	}
}

function expandCollapseSubmenu(submenuId, imgElement) {
	var submenu = document.getElementById("submenu_" + submenuId);
	if (submenu != null && submenu.nodeName == "UL") {
		if (submenu.style.display == "none") {
			submenu.style.display = "block";
			imgElement.src = "images/menu-opened-arrow.png";
			imgElement.setAttribute("title", "Click to collapse");
		}
		else {
			submenu.style.display = "none";
			imgElement.src = "images/menu-closed-arrow.png";
			imgElement.setAttribute("title", "Click to expand, DoubleClick to expandAll");
		}
	}
	else {
		return;
	}
}

//This function only for old version
function expandAll() {
	expandFromId("menu");
}

function collapseAll() {
	collapseFromId("menu");
}

function expandFromId(id) {
	if (id == "menu") {
		var rootElement = document.getElementById(id);
	}
	else {
		var rootElement = document.getElementById("submenu_" + id);
		rootElement.style.display = "block";
	}

	if (rootElement != null) {
		var collection = rootElement.getElementsByTagName("ul");
		for (var j = 0; j < collection.length; j++) {
			collection[j].style.display = "block";
		}
		collection = rootElement.getElementsByTagName("img");
		for (var j = 0; j < collection.length; j++) {
			var img = collection[j];
			img.src = "images/menu-opened-arrow.png";
			img.setAttribute("title", "Click to collapse");
		}
	}
}

function collapseFromId(id) {
	var rootElement = document.getElementById(id);
	if (rootElement != null) {
		var collection = rootElement.getElementsByTagName("ul");
		for (var j = 0; j < collection.length; j++) {
			collection[j].style.display = "none";
		}
		collection = rootElement.getElementsByTagName("img");
		for (var j = 0; j < collection.length; j++) {
			var img = collection[j];
			img.src = "images/menu-closed-arrow.png";
			img.setAttribute("title", "Click to expand, DoubleClick to expandAll");
		}
	}
}

//function for find show page in menu
function findInMenu() {
	collapseFromId("menu");
	var pagePageFrame = parent.frames["page"];
	var newHref = pagePageFrame.location.href;
	var partitionSign = /#/;                              //when we click on href in somethink page,viewer add at lacation#id_number and this id_number we must separate
	var splitnewHref = newHref.split(partitionSign, 1);
	newHref = splitnewHref[0];

	if (newHref == "") {
		// parameter was not set
		return;
	}
	// update frame content

	var menuNode = parent.frames["menu"].document.getElementById("menu");
	var linkCollection, linkHref, linkSubstr, imgCollection, img, imgSearchNode, currNode;
	linkCollection = menuNode.getElementsByTagName("a");
	for (var i = 0; i < linkCollection.length; i++) {
		linkHref = linkCollection[i].href.toString();
		linkSubstr = linkHref.substr(linkHref.length - newHref.length);
		if (linkSubstr == newHref) {
			// go through tree from leaf to root
			// get "LI" menuitem node
			currNode = linkCollection[i].parentNode.parentNode.parentNode;
			while (currNode != null && currNode.nodeName == "LI") {
				// find child, for searching for img node
				for (var j = 0; j < currNode.childNodes.length; j++) {
					if (currNode.childNodes[j].nodeName == "DIV") {
						imgSearchNode = currNode.childNodes[j];
						break;
					}
				}
				imgCollection = imgSearchNode.getElementsByTagName("img");
				// collection should consist of 1 node
				for (var j = 0; j < imgCollection.length; j++) {
					img = imgCollection[j];
				}
				var parLi = currNode.id.toString();
				var liId = parLi.substr(parLi.indexOf("_") + 1);
				// expand menu
				parent.frames["menu"].expandCollapseSubmenu(liId, img);
				currNode = currNode.parentNode.parentNode;
			}
			break;
		}
	}
}
