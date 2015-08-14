sony.twitch.services.configservice = (function () {

    //Constants
    var BASE_TWITCH_API_URL = "https://api.twitch.tv/kraken/search/streams?q=",
        TWITCH_API_VERSION = 3,
        JSONP_CALLBACK_FUNCTION = {
            searchStreams: 'sony.twitch.ui.streamsearch.onResponseStreamsSearch'
        };


    return {
        BASE_TWITCH_API_URL: BASE_TWITCH_API_URL,
        JSONP_CALLBACK_FUNCTION: JSONP_CALLBACK_FUNCTION,
        TWITCH_API_VERSION: TWITCH_API_VERSION
    };
    
}());