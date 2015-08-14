Assignment:

Rules:
- Write a simple web app that hits the Twitch API URL shown at the top (there are API docs online)
- Build the URL based on the query entered by the user in the search box shown in the mock
- Build out the list as shown in the mock.  
- All UI elements are mandatory and self-explanatory
- Feel free to add more/better UI, as long as you include the mandatory elements
- No frameworks like jQuery/AngularJS.  Just vanilla JS with XHR to hit the API.


My findings
-------------------------------
API:
The rules said to use XHR to hit the API. This was not possible because of the browser restriction of same origin requests. 
The twitch API supports JSONP by providing a callback parameter with the request e.g. https://api.twitch.tv/kraken?callback=foo
I dynamically create a script tag with the src attribute set to the twitch API endpoint including my callback function.
The callback function is invoked when the response returns. I populate my results in this callback function. Then I remove the script tag to keep the DOM clean.
I could not find some of the properties on the response object. The streams array doesn't seem to have a description property. For the stream display name I used the channel display name
i.e. results.streams[0].channel.display_name . I checked the other API endpoints for the information but could not find the description property.


Responsive
------------------
I made the site responsive. It does media queries to detect the screen size and applies the appropriate styles.

Namespaces
-------------------
I generated nested namespaces. I used an article by Addy Osmani to achieve this. http://addyosmani.com/blog/essential-js-namespacing/

Enhancements
------------------------------
If I had time I would like to put caching in this application. The API endpoint /search/streams has a limit parameter. 
The maximum for this is 100. I would have liked to have gotten the maximum results per API call. Then cache the results on the client and display them using pagination. 
If the total results is more than the maximum limit then when the user tried to get the next results past the limit, I could have done another API call setting the offset appropriately.

  





