$( document ).ready(function() {
  $( ".popup" ).each(function() {
	  $(this).uniqueId();
	  var divId = "info"+$(this).attr('id');
	  this.title=this.href;
	  var n=this.title.indexOf("#")+1;
	  this.title="<b>PROPERTY NAME:</b>" + $(this).text() + "<br /><b>PROFILES:</b><br />" + decodeURIComponent(this.title.substr(n)).replace(new RegExp(",", 'g'), "<br />");
	  $(this).parent().append("<div id=\""+divId+"\" class=\"propertyinfo\"> "+this.title+"</div>");
	  $("#" + divId).hide();
	  $(this).click(function(el) {
		  var divId = "#info"+$(this).attr('id');
		  $(divId).toggle();
	  });
  });
  $( ".popup" ).tooltip({
    content: function () {
        return this.getAttribute("title");
    },
  });

});

function showHideMappingTable(table) {
	var tableAttr = table.getAttribute('data-mapping-hidden');
	var caption = table.previousElementSibling;
	if (tableAttr == null) {
		table.setAttribute('data-mapping-hidden', 1);
		table.style.display = "none";
		if (null != caption) {
			caption.className = 'caption arrow arrow-right';
		}
	} else {
		table.removeAttribute('data-mapping-hidden');
		table.style.display = "";
		if (null != caption) {
			caption.className = 'caption arrow arrow-down';
		}
	}
}

function mappingsHidding() {
	var mappings = document.getElementsByClassName('mappings');
	for (var i = 0; i < mappings.length; i++) {
		var mappingUl = mappings[i];
		var mappingUlChildren = mappingUl.children;
		
		if (mappingUlChildren.length > 1) {			
			for (var j = 0; j < mappingUlChildren.length; j++) {
				var mappingLi = mappingUlChildren[j];
				if (mappingLi.children.length == 2) {
					var caption  = mappingLi.children[0];				
					if (null == caption || caption.className != 'caption') {
						continue;
					}
					caption.title = 'Click to show/hide table';					
					caption.className = 'caption arrow arrow-down';
				
					var table = mappingLi.children[1];
				
					caption.onclick = function(event) {
						var target = event.target;
						var table = target.nextElementSibling;
						showHideMappingTable(table);					
					};	
					
					if (j > 0) {
						showHideMappingTable(table);
					}
				}		
			}			
		}		
	}
}
