function load(name, div) {
	if ((document.getElementById(div).getElementsByTagName("ul")).length == 0 && (document.getElementById(div).getElementsByTagName("li")).length == 0) {
		var obj = document.getElementById(div);
		var ajax = new Ajax.Ajax();
		ajax.setPagePath(name);
		ajax.startRequest();
		ajax.onRequestComplete = function () {
			obj.innerHTML = ajax.getResponseText();
		}
	}
}

var Ajax = new Object();
Ajax.Ajax = function () {

	// Private members
	var xmlHttp;
	var responseText = "";
	var responseXml;
	var url = "";
	var http = "";
	var method = "GET";
	var isAsynchronous = true;
	var requestData = "";
	var elementID = "";
	var thisObj = this;
	var pagePath = "";
	var isXml = false;
	var isMozilla = false;
	var formObject;

	// Properties

	//Gets the method to be invoked.
	this.getMethod = function () {
		return method;
	}
	//Sets the method to be invoked.
	this.setMethod = function (inparam) {
		method = inparam;
	}
	//Gets a value that indicates whether or not the call is asynchronous.
	this.getIsAsynchronous = function () {
		return isAsynchronous;
	}
	//Sets a value that indicates whether or not the call is asynchronous.
	this.setIsAsynchronous = function (inparam) {
		isAsynchronous = inparam;
	}
	//Gets the query string of the post method.
	this.getRequestData = function () {
		return requestData;
	}
	//Sets the query string of the post method.
	this.setRequestData = function (inparam) {
		requestData = inparam;
	}
	//Sets the ID of the element that will display the server's response.
	this.setElementID = function (inparam) {
		elementID = inparam;
	}
	//Gets the text reponse of the server.
	this.getResponseText = function () {
		return responseText;
	}
	//Gets the text reponse of the server.
	this.getResponseXml = function () {
		return responseXml;
	}
	//
	this.setPagePath = function (inparam) {
		pagePath = inparam;
	}
	//
	this.setIsXml = function (inparam) {
		isXml = inparam;
	}

	// Events
	this.onRequestComplete = function () {
	}

	// Methods

	// Starts the request to server.
	this.startRequest = function () {
		createXMLHttpRequest();
		if (method.toUpperCase() == "GET") {
			sendGetRequest();
		} else if (method.toUpperCase() == "POST") {
			sendPostRequest();
		}
		xmlHttp.onreadystatechange = handleServerResponse;
	}

	// Sends a get request.
	function sendGetRequest() {
		var ampersand = "&";
		if (requestData == "") ampersand = "";
		xmlHttp.open(method, pagePath + "?" + requestData + ampersand + createTimestamp(), isAsynchronous);
		if (isXml) {
			if (isMozilla) xmlHttp.overrideMimeType('text/xml');
			xmlHttp.setRequestHeader("Content-Type", "text/xml");
		}
		xmlHttp.send(null);
	}

	// Sends a post request.
	function sendPostRequest() {
		xmlHttp.open(method, pagePath + "?" + createTimestamp(), isAsynchronous);
		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlHttp.setRequestHeader("Content-length", requestData.length);
		xmlHttp.setRequestHeader("Connection", "close");
		if (isXml) {
			xmlHttp.setRequestHeader("Content-Type", "text/xml");
		}
		xmlHttp.send(requestData);
	}

	// Creates a timestamp for querystring.
	function createTimestamp() {
		return "timestamp=" + new Date().getTime().toString();
	}

	// Creates the XMLHttpRequest object.
	function createXMLHttpRequest() {
		if (window.ActiveXObject) {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			if (xmlHttp == null) {
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			}
		} else if (window.XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();
			isMozilla = true;
		} else {
			alert("The XMLHttpRequest nor ActiveXObject object could not be created.");
		}
	}

	// Handles server's response
	function handleServerResponse() {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) {
				responseText = xmlHttp.responseText;
				responseXml = xmlHttp.responseXML;
				if (window.ActiveXObject) {
					responseXml.load(xmlHttp.responseStream);
				}
			}
			thisObj.onRequestComplete();
		}
	}
}

function getNewHref() {
	var pagePageFrame = parent.frames["page"];
	var newHref = pagePageFrame.location.href;
	var partitionSign = /#/;    //when we click on href in somethink page,viewer add at lacation#id_number and this id_number we must separate
	var splitnewHref = newHref.split(partitionSign, 1);
	newHref = splitnewHref[0];

	if (newHref == "") {
		// parameter was not set
		return;
	} else {
		return newHref;
	}
}

function preFindInMenu() {
	collapseFromId("menu");
	var newHref = getNewHref();
	// update frame content

	var menuNode = parent.frames["menu"].document.getElementById("menu");
	var linkCollection, linkHref, linkSubstr, imgCollection, img, imgSearchNode, currNode, found = false;
	linkCollection = menuNode.getElementsByTagName("a");
	for (var i = 0; i < linkCollection.length; i++) {
		linkHref = linkCollection[i].href.toString();
		linkSubstr = linkHref.substr(linkHref.length - newHref.length);
		if (linkSubstr == newHref) {
			found = true;
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
	if (!found) ajxFindInMenuOld(newHref);
}

function ajxFindInMenu() {
	collapseFromId("menu");
	var pagePageFrame = parent.frames["page"];
	var newHref = pagePageFrame.location.href;
	var partitionSign = /#/;                              //when we click on href in somethink page,viewer add at lacation#id_number and this id_number we must separate
	var splitnewHref = newHref.split(partitionSign, 1);
	newHref = splitnewHref[0];
	var relDocHTMLPath = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);
	relDocHTMLPath = relDocHTMLPath.substring(1);
	var server = location.protocol + "//" + location.host + "/";
	var fullDocHTMLPath = server + relDocHTMLPath;
	var webAppPath = server + relDocHTMLPath.substring(0, relDocHTMLPath.indexOf("/") + 1);
	newHref = newHref.replace(fullDocHTMLPath, "");
	relDocHTMLPath = relDocHTMLPath.substring(relDocHTMLPath.indexOf("/"));
	var params = "htmlDocPath=" + relDocHTMLPath + "&href=" + newHref;
	var ajax = new Ajax.Ajax();
	ajax.setMethod("POST");
	ajax.setRequestData(params);
	ajax.setPagePath(webAppPath + "find-in-menu");
	ajax.startRequest();
	ajax.onRequestComplete = function () {
		var response = ajax.getResponseText();
		if (response == "") {
			return;
		}
		var submenuId = response.substring(response.indexOf("\"") + 6, response.indexOf("\" class"));
		submenuId = submenuId.substring(0, submenuId.indexOf("-"));
		var menuAjax = parent.frames["menu"].document;
		var ulNode = menuAjax.getElementById("submenu_" + submenuId);
		var img = ulNode.parentNode.getElementsByTagName("img")[0];
		if (window.ActiveXObject) {
			img.setAttribute("src", "images/menu-opened-arrow.png");
		} else {
			img.src = "images/menu-opened-arrow.png";
		}
		img.setAttribute("title", "Click to collapse");
		ulNode.style.display = "block";
		ulNode.innerHTML = response;
	}
}

function ajxFindInMenuOld(href) {
	// get DOM document from menu_normal.html
	var ajax = new Ajax.Ajax();
	ajax.setPagePath("./menu_normal.html");
	ajax.setIsXml("true");
	ajax.startRequest();
	ajax.onRequestComplete = function () {
		var pagePageFrame = parent.frames["page"];
		var newHref = pagePageFrame.location.href;
		var partitionSign = /#/;                              //when we click on href in somethink page,viewer add at lacation#id_number and this id_number we must separate
		var splitnewHref = newHref.split(partitionSign, 1);
		newHref = splitnewHref[0];

		if (newHref == "") {
			// parameter was not set
			return;
		}
		// update submenu content

		var menuAjax = parent.frames["menu"].document;
		var menuFull = ajax.getResponseXml().documentElement;
		var linkCollectionFromFull, linkHref, linkSubstr, img, currNode, menuLocation;
		menuLocation = parent.frames["menu"].location.href;
		linkCollectionFromFull = menuFull.getElementsByTagName("a");
		for (var i = 0; i < linkCollectionFromFull.length; i++) {
			linkHref = linkCollectionFromFull[i].getAttribute("href");
			linkHref = absPath(linkHref, menuLocation);
			linkSubstr = linkHref.substr(linkHref.length - newHref.length);
			if (linkHref == newHref) {
				// go through tree from leaf to root
				// get "UL" submenu node
				// first parent submenu of found hyperlink in general menu
				currNode = linkCollectionFromFull[i].parentNode.parentNode.parentNode.parentNode;
				var id = currNode.getAttribute("id");
				var splitId = id.split("-");
				var count = splitId.length - 1;
				var submenu = splitId[0];
				var ulNode = menuAjax.getElementById(submenu);
				// finding of empty submenu in ajax menu - go through tree from hyperlink to root node of menu
				while (ulNode != null) {
					if (count == 0) {
						break;
					}
					submenu = submenu + "-" + splitId[splitId.length - count];
					ulNode = menuAjax.getElementById(submenu);
					count = count - 1;
				}
				// first empty submenu in ajax menu to which it must load content
				submenu = submenu.substr(0, submenu.lastIndexOf("-"));
				count = 0;
				while (id != submenu) {
					id = id.substr(0, id.lastIndexOf("-"));
					count = count + 1;
				}
				for (var j = 0; j < count; j++) {
					currNode = currNode.parentNode.parentNode;
				}
				var nodes = currNode.childNodes;
				var html = "";
				for (var j = 0; j < nodes.length; j++) {
					if (window.ActiveXObject) {
						html = html + nodes[j].xml;
					} else {
						html = html + (new XMLSerializer()).serializeToString(nodes[j]);
					}
				}
				menuAjax.getElementById(submenu).innerHTML = html;

				currNode = menuAjax.getElementById(linkCollectionFromFull[i].parentNode.parentNode.parentNode.parentNode.getAttribute("id"));
				while (currNode.nodeName == "UL" && currNode.id != "menu") {
					currNode.style.display = "block";
					img = currNode.parentNode.getElementsByTagName("img")[0];
					if (window.ActiveXObject) {
						img.setAttribute("src", "images/menu-opened-arrow.png");
					} else {
						img.src = "images/menu-opened-arrow.png";
					}
					img.setAttribute("title", "Click to collapse");
					currNode = currNode.parentNode.parentNode;
				}
				break;
			}
		}
	}
}

function absPath(url, location) {
	//clean url from off jumping to upper level in web folder tree
	var splitUrl = url.split("/../");
	var newUrl = "";
	if (splitUrl.length > 1) {
		for (var i = 0; i < splitUrl.length; i++) {
			if (i % 2 == 0) {
				splitUrl[i] = splitUrl[i].substr(0, splitUrl[i].lastIndexOf("/") + 1);
			}
			newUrl = newUrl + splitUrl[i];
		}
	} else {
		newUrl = splitUrl[0];
	}
	//make absolute path
	location = location.substring(0, location.lastIndexOf('/'));
	return location + '/' + newUrl;
}
