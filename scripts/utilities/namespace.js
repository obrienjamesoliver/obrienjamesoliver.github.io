// JavaScript Namespaces for Twitch Stream Search Tool
// a convenience function for parsing string namespaces and
// automatically generating nested namespaces
function extendNamespace(ns, namespace) {
    var parts = namespace.split('.'),
        parent = ns,
        pl,
        i;
    if (parts[0] == "sony") {
        parts = parts.slice(1);

        pl = parts.length;
        for (i = 0; i < pl; i++) {
            //create a property if it doesnt exist
            if (typeof parent[parts[i]] == 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
    }
}

var sony = sony || {};
extendNamespace(sony, 'sony.twitch');
extendNamespace(sony, 'sony.twitch.ui')
extendNamespace(sony, 'sony.twitch.services');