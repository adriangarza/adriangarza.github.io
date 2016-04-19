var currentFont = 2;
var cardOn = false;
var nightOn = false;

function downloadInnerHtml(filename, elId, mimeType) {
    var elHtml = document.getElementById(elId).innerHTML;

    //replace divs with newlines
    elHtml = elHtml.split("<div>").join("\n");

    //and then get rid of all the HTML tags
    elHtml = elHtml.replace(/(<([^>]+)>)/ig,"");
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

var fileName =  'untitled.pdf';

function download() {
    downloadInnerHtml(fileName, 'editor','text/html');
}

window.onload = function() {
    document.getElementById("editor").focus();
    if (localStorage.theme) {
        switch(localStorage.theme) {
            case "night":
                toggleNight();
                break;
            case "card":
                toggleCard();
                break;
        }
    } else {
        localStorage.theme = "default"
    }
};

var fonts = [
    "Roboto",
    "Roboto Mono",
    "Droid Serif"
]

function switchFont() {
    if (currentFont < fonts.length-1) {
        currentFont++;
    } else currentFont = 0;
    $("body").css("font-family", fonts[currentFont]);
}

$(window).bind('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            event.preventDefault();
            download();
            break;
        case 'd':
            event.preventDefault();
            switchFont();
            break;
        case 'y':
            event.preventDefault();
            toggleNight();
            break;
        case 'i':
            event.preventDefault();
            toggleCard();
            break;
        }
    }
});

$("#editor").bind('keydown', function(event) {
    //tab
    if (event.which == 9) {
        //alert("bepis")
        event.preventDefault();
        var editor = document.getElementById("editor");
        var doc = editor.ownerDocument.defaultView;
        var sel = doc.getSelection();
        var range = sel.getRangeAt(0);

        var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
        range.insertNode(tabNode);

        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode);
        sel.removeAllRanges();
        sel.addRange(range);
    }
})

function toggleCard() {
    var editor = document.getElementById("editor");
    var body = document.body;
    if (nightOn) toggleNight();
    if (cardOn) {
        localStorage.theme = "default"
        editor.className = ""
        body.style.backgroundColor = "white";
    } else {
        localStorage.theme = "card"
        editor.className = "card"
        body.style.backgroundColor = "rgba(0,0,0,.05)"
    }
    cardOn = !cardOn
}

function toggleNight() {
    var editor = document.getElementById("editor");
    var body = document.body;
    if (cardOn) toggleCard();
    if (nightOn) {
        localStorage.theme = "default"
        editor.style.color = "rgb(50, 50, 50)"
        body.style.backgroundColor = "white";
        editor.style.backgroundColor = "white";
    } else {
        localStorage.theme = "night"
        body.style.backgroundColor = "rgb(33, 37, 43)";
        editor.style.backgroundColor = "rgb(40, 44, 52)";
        editor.style.color = "rgb(200, 200, 200)"
    }
    nightOn = !nightOn
}
