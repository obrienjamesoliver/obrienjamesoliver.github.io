sony.twitch.ui.streamsearch = (function (uiservice, jsonpservice, alertservice, configservice) {

    var queryStringElement,
        searchButtonElement,
        resetButtonElement,
        previousButtonElement,
        nextButtonElement,
        DEFAULT_QUERY_STRING = "Search query...",
        results = {
            streams: [],
            totalResults: 0,
            selfUrl: "",
            nextUrl: "",
            previousUrl: "",
            totalPages: 0,
            currentPageNumber: 0,
            pageResultsLimit: 10,
            offset: 0
        },
        init = function () {
           
            queryStringElement = document.getElementById("queryString");
            searchButtonElement = document.getElementById("searchbtn");
            resetButtonElement = document.getElementById("resetbtn");
            previousButtonElement = document.getElementById("searchPreviousbtn");
            nextButtonElement = document.getElementById("searchNextbtn");

            if (_areElementsLoaded()) { //Check if DOM elements loaded correctly
                
                _addElementEvents(); //Add events

                reset(); 
            }
            else { //Can't find HTML elements
                alertservice.addAlert("alerts", "Error loading page. Please try again.");
            }

        },
        _handleKeyPress = function (e) {
            var key = e.keyCode || e.which;
            if (key == 13) {
                search();
            }

        },
        _areElementsLoaded = function () {

            if (queryStringElement && searchButtonElement && resetButtonElement && previousButtonElement && nextButtonElement) {
                return true;
            }
            else{ //Can't find HTML elements    
                return false;
            }
        },
        _addElementEvents = function () {

            if (queryStringElement.addEventListener) {  // all browsers except IE before version 9

                queryStringElement.addEventListener("click", clearSearchBoxDefault);
                queryStringElement.addEventListener("keypress", _handleKeyPress);
                searchButtonElement.addEventListener("click", search);
                resetButtonElement.addEventListener("click", reset);
                previousButtonElement.addEventListener("click", previous);
                nextButtonElement.addEventListener("click", next);
                
            }
            else if (queryStringElement.attachEvent) {   // IE before version 9
                
                queryStringElement.attachEvent("onclick", clearSearchBoxDefault);
                queryStringElement.addEvent("onkeypress", _handleKeyPress);
                searchButtonElement.attachEvent("onclick", search);
                resetButtonElement.attachEvent("onclick", reset);
                previousButtonElement.attachEvent("onclick", previous);
                nextButtonElement.attachEvent("onclick", next);
            }
        },
        _displayResults = function (response) {

            for (var i = 0; i < results.streams.length; i += 1) {
                //parameters to pass: id, imageSource, displayName, gameName, viewers, description 
                uiservice.addResultRow(i, results.streams[i].preview.medium, results.streams[0].channel.display_name, results.streams[0].game, results.streams[0].viewers, "text text text....");
            }
        },
        _clearResultsArea = function () {

            uiservice.removeAllChildNodes("results");

        },
        onResponseStreamsSearch = function (response) {


            uiservice.showTag("resultsContent");

            if (!response.error) {

                results.streams = response.streams;
                results.totalResults = response._total;
                results.nextUrl = response._links.next;
                results.selfUrl = response._links.self;
                results.previousUrl = response._links.prev;
                _calculatePagingDetails();
                _populatePageDetails();
                _showHideNextPrevious();
                _populateTotalResults();

                if (response._total > 0) {

                    _displayResults(response);

                }

            }
            else {

                alertservice.addAlert("alerts", "An error occurred. Please try again. If this issue continues please contact the administrator.")
                _resetResults();
            }

            //always remove the JSONP script tag
            uiservice.removeTag("apiScript");

        },
        _populatePageDetails = function () {

            var currentPageTag = document.getElementById("currentPage");
                currentPageTag.innerHTML = results.currentPageNumber + "\\" + results.totalPages;

        },
        _populateTotalResults = function () {

            var totalResultsTag = document.getElementById("totalResults");
                totalResultsTag.innerHTML = "Total results: " + results.totalResults;
        },
        _calculatePagingDetails = function () {

            var startIndex,
                endIndex;


            results.totalPages = Math.ceil(results.totalResults / results.pageResultsLimit);

            //calculate the offset and currentPage
            startIndex = results.selfUrl.indexOf("offset") + "offset".length + 1;

            endIndex = startIndex;
            while (endIndex < results.selfUrl.length && results.selfUrl[endIndex] !== '&') {
                endIndex += 1;
            }

            results.offset = Number(results.selfUrl.slice(startIndex, endIndex));

            //if the total results is zero then set current page to zero
            results.currentPageNumber = results.totalResults === 0 ? 0 : ((results.pageResultsLimit + results.offset) / results.pageResultsLimit);



        },
        _showHideNextPrevious = function () {
           
            previousButtonElement.disabled = results.offset === 0 ? true : false;
            nextButtonElement.disabled = results.currentPageNumber < results.totalPages ? false : true;
        },
        _getJsonpResponse = function (queryString, url) {

            jsonpservice.generateJsonpResponse(configservice.JSONP_CALLBACK_FUNCTION.searchStreams, queryString, url);
        },
        _resetResults = function () {

            var currentPageTag = document.getElementById("currentPage"),
                totalResultsTag = document.getElementById("totalResults");

            currentPageTag.innerHTML = "";
            totalResultsTag.innerHTML = "";

            previousButtonElement.disabled = true;
            nextButtonElement.disabled = true;

            _clearResultsArea();          

        },
        reset = function () {

            queryStringElement.value = DEFAULT_QUERY_STRING;

            _resetResults();
            uiservice.hideTag("resultsContent");
        },
        search = function () {

            //to do: Sanitize input to prevent script injection
            var queryString = queryStringElement.value.trim();
            
            if (queryString === "" || queryString === DEFAULT_QUERY_STRING) {

                alertservice.addAlert("alerts", "Please enter a value to search for");
            }
            else{

                _clearResultsArea();
                _getJsonpResponse(queryString);
            }

        },
        next = function () {

            _clearResultsArea();
            _getJsonpResponse("", results.nextUrl);

        },
        previous = function () {

            _clearResultsArea();
            _getJsonpResponse("", results.previousUrl);

        },
        clearSearchBoxDefault = function () {

            if (queryStringElement && queryStringElement.value === DEFAULT_QUERY_STRING) {

                queryStringElement.value = "";
            }

        };

    return {
        onResponseStreamsSearch: onResponseStreamsSearch,
        search: search,
        next: next,
        previous: previous,
        init: init,
        clearSearchBoxDefault: clearSearchBoxDefault
    };

}(sony.twitch.services.uiservice, sony.twitch.services.jsonpservice, sony.twitch.services.alertservice, sony.twitch.services.configservice));