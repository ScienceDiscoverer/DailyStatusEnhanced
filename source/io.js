function save(e)
{
	var p = browser.storage.sync.set({
		
		name: document.getElementById("name").value,
		project1: document.getElementById("project1").value,
		whiteprojs: document.getElementById("wprojs").value
		
		});
	p.then(() => {
	document.getElementById("deb").style.cssText += "color:green;";
	document.getElementById("deb").innerHTML = "Firefox Synced!";
	},
	saveLocal());
	e.preventDefault();
}

function saveLocal()
{
	document.getElementById("deb").innerHTML = "Firefox Sync Failed! Saving locally.";
	document.getElementById("deb").style.cssText += "color:red;";
	browser.storage.local.set({
		
		name: document.getElementById("name").value,
		project1: document.getElementById("project1").value,
		whiteprojs: document.getElementById("wprojs").value
		
		});
}

function load()
{
	var n = browser.storage.sync.get();
	n.then((res) => {
	document.getElementById("name").value = res.name || "";
	document.getElementById("project1").value = res.project1 || "";
	document.getElementById("wprojs").value = res.whiteprojs || "";
	},
	(res) => {
	var p = browser.storage.local.get();
	p.then((res) => {
	document.getElementById("name").value = res.name || "";
	document.getElementById("project1").value = res.project1 || "";
	document.getElementById("wprojs").value = res.whiteprojs || "";
	});
	});
}	

document.addEventListener('DOMContentLoaded', load);
document.forms[0].addEventListener("submit", save);
