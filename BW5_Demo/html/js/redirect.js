function getParamFromURL(strParamName) {
	var strReturn = "";
	var strHref = parent.location.href;
	if (strHref.indexOf("?") > -1) {
		var strQueryString = strHref.substr(strHref.indexOf("?") + 1);

		var aQueryString = strQueryString.split("&");
		for (var iParam = 0; iParam < aQueryString.length; iParam++) {

			if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1) {

				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				return unescape(strReturn);
			}
		}
	}

	return strReturn;
}

function setPageLocationFromURL() {
	var newHref = getParamFromURL('go');
	if (newHref == "") {
		// parameter was not set
		return;
	}
	// update frame content
	window.frames["page"].location = getParamFromURL('go');
	var menuNode = window.frames["menu"].document.getElementById("menu");
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
				window.frames["menu"].expandCollapseSubmenu(liId, img);
				currNode = currNode.parentNode.parentNode;
			}
			break;
		}
	}
}

function setTitlePage() {
	var pageHeaderFrame = parent.frames["header"];
	var projectName = pageHeaderFrame.document.getElementById("projectName");
	window.document.title = projectName.innerHTML + " - MakeDoc for TIBCO";
}
