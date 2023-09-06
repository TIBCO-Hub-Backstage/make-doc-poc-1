var frameSet, pageMenuFrame;
var typeTitle = 0;

function showPageTitle() {
	
	var h1Element = document.getElementsByTagName("h1")[0];

	if (h1Element != null) {
		var pageTitleFrame = parent.frames["title-page"];
		if (pageTitleFrame != null) {
			try {
				var pageTitleElement = pageTitleFrame.document.getElementById("pageTitle");
				if (pageTitleElement != null) {
					pageTitleElement.innerHTML = h1Element.innerHTML;
				}
			} catch (err) {
			}
		}
	}
}

function hideTitle() {
	
	try {
		
		if (typeTitle == 0) {		

			frameSet = parent.document.getElementById('main');
			frameSet.rows = "0,40,*";

			document.btnHideTitle.src = "images/btnShowTitle.png";
			document.btnHideTitle.title = "Show title";
			typeTitle = 1;		
		}
		else {
			
			frameSet = parent.document.getElementById('main');
			frameSet.rows = "109,40,*";

			document.btnHideTitle.src = "images/btnHideTitle.png";
			document.btnHideTitle.title = "Hide title";
			typeTitle = 0;		
		}
		
		pageMenuFrame = parent.frames["menu"];
		pageMenuFrame.setMenuHeight();
		
	} catch (err) {
	}	
}
