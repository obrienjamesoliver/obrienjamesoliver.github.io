sony.twitch.services.alertservice = (function (uiservice) {

    var addAlert = function (alertTagId, message) {

        uiservice.populateTagInnerHtml(alertTagId, message);

        setTimeout(function () {

            uiservice.populateTagInnerHtml(alertTagId, "");

        }, 3000);
    };


    return {
        addAlert: addAlert
    };

}(sony.twitch.services.uiservice));