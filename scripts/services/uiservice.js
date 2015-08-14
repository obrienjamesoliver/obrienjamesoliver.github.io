sony.twitch.services.uiservice = (function () {

    var createScriptTag = function (id, src) {

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.language = "javascript";
        script.src = src;
        script.id = id;
        document.body.appendChild(script);
    },
    removeTag = function (id) {
        var scriptTag = document.getElementById(id);
        document.body.removeChild(scriptTag);
    },
    addResultRow = function (id, imageSource, displayName, gameName, viewersCount, description ) {
        var div = document.createElement('div');

        div.className = 'row';
        div.id = 'streamResult' + id;
        div.innerHTML = '<img id="' + 'streamImage' + id + '" src="' + imageSource + '" alt="">\
        <h2>' + displayName + '</h2>\
        <h3>' + gameName + " - " + viewersCount + " viewers" + '</h3>\
        <p class="description">' + description + '</p>';
  
        document.getElementById('results').appendChild(div);
    },
    removeAllChildNodes = function (tagId) {

        populateTagInnerHtml(tagId, "");
                
    },
    hideTag = function (tagId) {

        var tag = document.getElementById(tagId);

        if (tag) {

            tag.style.display = 'none';
        }
    },
    showTag = function (tagId) {

        var tag = document.getElementById(tagId);

        if (tag) {
            tag.style.display = 'block';
        }
    },
    populateTagInnerHtml = function (tagId, html) {

        var tag = document.getElementById(tagId);

        if (tag) {

            tag.innerHTML = html;
        }

    };

    return {
        createScriptTag: createScriptTag,
        removeTag: removeTag,
        addResultRow: addResultRow,
        removeAllChildNodes: removeAllChildNodes,
        hideTag: hideTag,
        showTag: showTag,
        populateTagInnerHtml: populateTagInnerHtml
    };

}());