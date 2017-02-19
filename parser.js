var form = document.getElementById('url-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    var uri = document.getElementById('uri-box').value;
    var uriParts = parseUri(uri);
    render(uriParts);
});

function render(uriParts) {
    document.getElementById('parts').className = '';
    for (var key in uriParts) {
        document.getElementById(key + '-value').innerHTML = uriParts[key];
    }
}

function parseUri(uri) {
    var uriParts = {
        scheme: '',
        authority: '',
        path: '',
        query: '',
        fragment: ''
    };

    uriParts['scheme'] = getScheme(uri);
    uriParts['authority'] = getAuthority(uri);
    uriParts['path'] = getPath(uri);
    uriParts['query'] = getQuery(uri);
    uriParts['fragment'] = getFragment(uri);

    return uriParts;
}

function getScheme(uri) {
    return uri.split(":")[0];
}

function getAuthority(uri) {
    var temp = "";
    if(uri.includes("//")) {
        temp = uri.split("://")[1];
    } else {
        temp = uri.split(":/")[1];
    }

    if(temp.includes("/"))
        return temp.split("/")[0];
    return temp;
}

function getPath(uri) {
    var temp = "";
    if(uri.includes("//")) {
        temp = uri.split("://")[1];
    } else {
        temp = uri.split(":/")[1];
    }

    if(temp.includes("/"))
        temp = temp.substring(temp.indexOf("/"));
    else return null;

    if(temp.includes("?")) {
        return temp.split("?")[0];
    } else if(temp.includes("#")){
        return temp.split("#")[0];
    } else return temp;
}

function getQuery(uri) {
    var temp = "";
    if(uri.includes("?")) {
        temp = uri.split("?")[1];
    } else return null;
    if(temp.includes("#"))
        return temp.substring(0, temp.indexOf("#"));
    else return temp;
}

function getFragment(uri) {
    if(uri.includes("#")) {
        return uri.split("#")[1];
    } else return null;
}