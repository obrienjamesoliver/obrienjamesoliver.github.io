sony.twitch.services.jsonpservice = (function (uiservice, configservice) {

    var _createJsonpScriptTag = function (callbackFunction, queryString, nextPreviousUrl) {

        //if not using next or previous URL then build the ulr
        var apiUrl = (!nextPreviousUrl ? configservice.BASE_TWITCH_API_URL + queryString : nextPreviousUrl) + "&callback=" + callbackFunction + "&api_version=" + configservice.TWITCH_API_VERSION;

        uiservice.createScriptTag("apiScript", apiUrl);
           
    },
    generateJsonpResponse = function (callbackFunction, queryString, nextPreviousUrl) {

        _createJsonpScriptTag(callbackFunction, queryString, nextPreviousUrl);

    };


    return {
        generateJsonpResponse: generateJsonpResponse
    };

}(sony.twitch.services.uiservice, sony.twitch.services.configservice));