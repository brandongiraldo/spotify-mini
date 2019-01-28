function getUserData(accessToken) {
    return $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
           'Authorization': 'Bearer ' + accessToken
        }
    });
}

function getLibrary(accessToken) {
	return $.ajax({
        url: 'https://api.spotify.com/v1/me/tracks?&limit=50',
        headers: {
           'Authorization': 'Bearer ' + accessToken
        }
    });
}

function search(accessToken, item) {
    url='https://api.spotify.com/v1/search?q='+encodeURIComponent(item)+'?&type=track&market=US';
    console.log(url);
    return $.ajax({
        url: 'https://api.spotify.com/v1/search?q='+encodeURIComponent(item)+'?&type=track&market=US',
        headers: {
           'Authorization': 'Bearer ' + accessToken
        }
    });
}