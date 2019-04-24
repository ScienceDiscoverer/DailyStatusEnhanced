function save(e)
{
	var d = new Date;
	
	var p = browser.storage.sync.set({
		
		name: document.getElementById("name").value,
		project1: document.getElementById("project1").value,
		whiteprojs: document.getElementById("wprojs").value,
		time1: document.getElementById("time1").value,
		parsing: document.getElementById("parsing").checked
		
		});
	p.then(() => {
	document.getElementById("deb").style.cssText += "color:green;";
	document.getElementById("deb").innerHTML = "Firefox Synced! ";
	}, (res) => {});
	e.preventDefault();
}

/*function saveLocal()
{
	document.getElementById("deb").innerHTML = "Firefox Sync Failed! Saving locally. " + d.getTime();
	document.getElementById("deb").style.cssText += "color:red;";
	browser.storage.local.set({
		
		name: document.getElementById("name").value,
		project1: document.getElementById("project1").value,
		whiteprojs: document.getElementById("wprojs").value
		
		});
}*/

function load()
{
	var n = browser.storage.sync.get();
	n.then((res) => {
	document.getElementById("name").value = res.name || "";
	document.getElementById("project1").value = res.project1 || "";
	document.getElementById("wprojs").value = res.whiteprojs || "";
	document.getElementById("time1").value = res.time1 || "";
	document.getElementById("parsing").checked = res.parsing || false;
	}, (res) => {}
	/*(res) => {
	var p = browser.storage.local.get();
	p.then((res) => {
	document.getElementById("name").value = res.name || "";
	document.getElementById("project1").value = res.project1 || "";
	document.getElementById("wprojs").value = res.whiteprojs || "";
	}*/);
}	

document.addEventListener('DOMContentLoaded', load);
document.forms[0].addEventListener("submit", save);
