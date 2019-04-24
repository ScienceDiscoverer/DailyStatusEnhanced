var n = browser.storage.sync.get();

n.then(function syncro(res)
{
	main(res);
}, (res) => { alert("Sync failed!"); }
/*(res) =>
{
	var p = browser.storage.local.get();
	p.then(function locale(res)
	{
		main(res);
	});
}*/);

function main(data)
{
	var name = data.name || "";
	var project1 = data.project1 || "";
	var emptyarr = [""];
	var wprojs = data.whiteprojs.split("\n") || emptyarr;
	var deftime1 = data.time1 || "";
	var asanaparse = data.parsing || false;
	
	console.log(time1);
	
	//document.body.style.border = "15px solid green"; // My first manipulation in js (<>_<>)

	var f = document.getElementsByClassName("freebirdFormviewerViewItemsItemItem");

	// Manipulate Name & Project
	function preSelect(item, selection)
	{
		if(!selection)
		{
			return;
		}
		
		var phold = item.children[1].children[0].children[0].children[0]; // Placeholder
		var opts = item.children[1].children[0].children[0].children; // All options
		var input = item.children[2];

		input.value = selection;

		phold.className = phold.className.replace(' isSelected','');
		phold.setAttribute("aria-selected", "false");
		phold.setAttribute("tabindex", "-1");

		for(var i = 0; i < opts.length; ++i)
		{
			var e = opts[i];
			
			if(e.getAttribute("data-value") == selection)
			{		
				e.className += " isSelected";
				e.setAttribute("aria-selected", "true");
				e.setAttribute("tabindex", "0");
			}
		}
	}

	preSelect(f[0], name); // Preselect Name
	preSelect(f[2], project1); // Preselect Project #1

	// Manipulate Date
	var day = f[1].children[1].children[0].children[0].children[0].children[1].children[0].children[0].children[0].children[0];
	var dayinp = f[1].children[1].children[0].children[0].children[0].children[2];
	var mon = f[1].children[1].children[0].children[2].children[0].children[1].children[0].children[0].children[0].children[0];;
	var moninp = f[1].children[1].children[0].children[2].children[0].children[2];

	var date = new Date();
	var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0');

	day.setAttribute("data-initial-value", dd);
	day.setAttribute("value", dd);
	dayinp.value = dd;

	mon.setAttribute("data-initial-value", mm);
	mon.setAttribute("value", mm);
	moninp.value = mm;

	// Enchance style
	var style = document.createElement("style");
	document.head.appendChild(style);
	f[0].parentElement.style = "width: 250px;";
	style.sheet.insertRule(".floater { float: left; clear: none; }");
	style.sheet.insertRule(".project { width: 250px; }");
	style.sheet.insertRule(".task { width: 800px; }");
	style.sheet.insertRule(".freebirdFormviewerViewCenteredContent { width: 1200px; }");
	style.sheet.insertRule(".freebirdFormviewerViewItemsTextTextItem .freebirdFormviewerViewItemsTextShortText:not(.freebirdFormviewerViewItemsTextDisabledText) { width: 100%; }");
	style.sheet.insertRule(".freebirdFormviewerViewItemsTextItemWrapper { padding: .8em .5em .5em 0; }");
	style.sheet.insertRule(".freebirdFormviewerViewHeaderRequiredLegend { display: none; }");
	style.sheet.insertRule(".freebirdFormviewerViewNavigationNavControls .freebirdFormviewerViewNavigationButtonsAndProgress { margin-top:0px; }");
	style.sheet.insertRule(".freebirdFormviewerViewFormBanner { height: 170px; }");

	f[0].parentElement.className += " floater"; // Name style
	f[1].parentElement.className += " floater"; // Date style
	
	for(var i = 0; i < 10; ++i)
	{
		f[2+3*i].parentElement.className += " floater project"; // Project i+1
		f[3+3*i].parentElement.className += " floater task"; // Task i+1
	}

	// Add allighnment table
	function insertTableAfter(referenceNode)
	{
		// If no cloning or local var - it will just move it, not insert .___.
		var table = document.createElement("table"); 
		table.style = "width:100%";
		referenceNode.parentNode.insertBefore(table, referenceNode.nextSibling);
	}
	
	for(var i = 0; i < 11; ++i)
	{
		insertTableAfter(f[1+3*i].parentNode);
	}

	// Fix date style
	style.sheet.insertRule(".freebirdFormviewerViewItemsDateSep { margin-top: 17px; }");
	style.sheet.insertRule(".quantumWizTextinputPaperinputInputArea { top: 0px; }");
	style.sheet.insertRule(".exportContentArea { top: 0px; }");

	// Hide superflous projects
	for(var i = 5; i < 32; ++i)
	{
		f[i].style = "display:none";
	}

	var imgp = document.createElement("p");
	imgp.style = "text-align:center;margin-top:0px;margin-bottom:0px;";
	var addproj = document.createElement("img");
	addproj.src = browser.extension.getURL("data/+.png");
	f[0].parentElement.parentElement.insertBefore(imgp, f[31].parentNode.nextSibling);
	imgp.appendChild(addproj);

	var visprojs = 1;

	addproj.onmousedown =
	function mDown()
	{
		addproj.src = browser.extension.getURL("data/+_prs.png");
	}

	addproj.onmouseup =
	function mUp()
	{
		if(visprojs > 10)
		{
			return;
		}
		
		f[2+3*visprojs].removeAttribute("style");
		f[3+3*visprojs].removeAttribute("style");
		f[4+3*visprojs].removeAttribute("style");
		++visprojs;
		addproj.src = browser.extension.getURL("data/+.png");
		
		if(visprojs == 10)
		{
			imgp.removeChild(addproj);
		}
	}
	
	// Filter rarely used projects
	function filterProjs(base)
	{
		if(wprojs.length == 1 && !wprojs[0])
		{
			return;
		}
		
		var opts = base.children[1].children[0].children[0].children; // All options
		
		for(var i = 1; i < opts.length; ++i)
		{
			var o = opts[i];
			o.style = "display:none";
			
			for(var j = 0; j < wprojs.length; ++j)
			{
				if(o.getAttribute("data-value") == wprojs[j])
				{
					o.removeAttribute("style");
					continue;
				}
			}
		}
	}
	
	for(var i = 0; i < 10; ++i)
	{
		filterProjs(f[2+3*i]);
	}
	
	// Asana tasks parsing	
	if(asanaparse)
	{
		var t = document.getElementsByClassName("quantumWizTextinputPapertextareaInput");
		
		for(var i = 0; i < t.length; ++i)
		{
			t[i].onpaste = function asanaParse(e)
			{
				var e = window.event || e;
				var targ = e.target || e.srcElement;
				var str = e.clipboardData.getData("text/plain");
				str = str.replace(/\[.*?\]/g, ";");
				str = str.replace(/\s\(.*\);/g, "; ");
				str = str.replace(/\s\(.*\)/g, "");
				str = str.replace(/\n/g, "");
				console.log(str);
				targ.setAttribute("data-initial-value", str);
				targ.innerText = str;
				
				targ.parentElement.parentElement.children[0].style = "display:none";
				
				targ.style = "height:" + targ.scrollHeight + "px";
				
				console.log("targh: ", targ.scrollHeight);
				console.log("elh: ", e.scrollHeight);
				//var emptystr = "";
				//navigator.clipboard.writeText(emptystr);
				//targ.setAttribute("aria-invalid", "false");
				//targ.setAttribute("badinput", "false");

				return false;
			}
		}
	}
	
	// Set default time
	var time1 = document.getElementsByClassName("quantumWizTextinputPaperinputInput")[3];
	
	time1.setAttribute("data-initial-value", deftime1);
	time1.setAttribute("value", deftime1);
	time1.parentElement.parentElement.parentElement.parentElement.className += " hasValue";
}








