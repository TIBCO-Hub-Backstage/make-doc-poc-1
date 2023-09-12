var frameSet, pageMenuFrame, widthMenu;
var typeTitle = 0;

function hideMenu() {
	
	try {
		
		if (typeTitle == 0) {			

			pageMenuFrame = parent.frames["menu"];

			frameSet = parent.document.getElementById('frameMenu');
			widthMenu = frameSet.cols;
			frameSet.cols = "0,*";
			frameSet = parent.document.getElementById('frameTitle');
			frameSet.cols = "115,*";
			
			document.btnHideMenu.src = "images/btnShowMenu.png";
			document.btnHideMenu.title = "Show menu";
			typeTitle = 1;
		}
		else {

			pageMenuFrame = parent.frames["menu"];

			frameSet = parent.document.getElementById('frameMenu');
			frameSet.cols = widthMenu;
			frameSet = parent.document.getElementById('frameTitle');
			frameSet.cols = "329,*";
			
			document.btnHideMenu.src = "images/btnHideMenu.png";
			document.btnHideMenu.title = "Hide menu";
			typeTitle = 0;
		}
	} catch (error) {
	}
}
