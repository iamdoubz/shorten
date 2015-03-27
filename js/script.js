
var SHORTENCOUNT = 0;
var SHORTENDEBUG = true;

function SHORTENDEBUGALERT(m) {
	if (SHORTENDEBUG) {
		alert(m + " C:" + SHORTENCOUNT);
		SHORTENCOUNT++;
	}
}

$(document).ready(function() {
	SHORTENDEBUGALERT("ready");
	if(/(public)\.php/i.exec(window.location.href)!=null) return;
	setTimeout(addShareListener, 1000);
});

function addShareListener() {
	SHORTENDEBUGALERT("addShareListener");
	addGlobalListener('.nav-files');
	addGlobalListener('.nav-sharingin');
	addGlobalListener('.nav-sharingout');
	addGlobalListener('.nav-sharinglinks');
	addGlobalListener('.name');
	addGlobalListener('.crumb');
	$('.action-share').ready(function() {
		SHORTENDEBUGALERT("action-share ready");
		$('.action-share').click(function() {
			SHORTENDEBUGALERT("action-share click");
			setTimeout(function() {
				addListener('#linkCheckbox');
				replaceUrl();
			}, 750);
		});
	});
}

function addListener(o) {
	SHORTENDEBUGALERT("addListener-"+o);
	$(o).ready(function() {
		SHORTENDEBUGALERT("addListener-"+o+"-ready");
		$(o).click(function() {
			SHORTENDEBUGALERT("addListener-"+o+"-click");
			setTimeout(replaceUrl, 750);
		});
	});
}

function addGlobalListener(o) {
	SHORTENDEBUGALERT("addGlobalListener-"+o);
	$(o).ready(function() {
		$(o).click(function() {
			setTimeout(addShareListener, 1000);
		});
	});
}

function replaceUrl() {
	SHORTENDEBUGALERT("replaceUrl");
	if ($('#linkText').css('display') == 'block') {
		SHORTENDEBUGALERT("replaceUrl-makelink");
		var curUrl = $('#linkText').val();
		$('#linkText').val('Please wait...');
		makeUrl(curUrl);
	}
}

function makeUrl(curUrl) {
	SHORTENDEBUGALERT("makeUrl-"+curUrl);
	var shortenurl = OC.linkTo("shorten","makeurl").replace("apps/shorten","index.php/apps/shorten");
	$.post(shortenurl, { curUrl: curUrl }, function (data) {
		$('#linkText').val(data);
	});
}
