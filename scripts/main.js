$(document).ready(function() {

    function login(callback) {
    	// builds the login URL for user after clicking login button
        function buildLoginUrl(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + clientID +
              '&redirect_uri=' + encodeURIComponent(redirectURI) +
              '&scope=' + encodeURIComponent(scopes.join(' ')) +
              '&response_type=token';
        }
    	
    	// the callback window sends the hashed accessToken back here
        window.addEventListener("message", function(event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                callback(hash.access_token);
            }
        }, false);
        
        // window sizes for login
        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        // open window
        var w = window.open(buildLoginUrl(scopes),'Spotify','menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
        
    }
    
    $("#login").click(function() {
    	// get back accessToken from login function
        login(function(accessToken) {
        	// pass into API call (ajax) then get back response as JSON
            getUserData(accessToken).then(function(response) {
            	$("#login").hide();
            	// do whatever
            	console.log(response);
			});
			getLibrary(accessToken).then(function(response) {
				$("#login").hide();
                $("tbody").empty();
				// do whatever
				console.log(response);
                for(var i = 0; i < response.items.length; i++) {
                    $("tbody").append(new Song(i+1, response.items[i].track.name, response.items[i].track.artists[0].name, response.items[i].track.album.name, response.items[i].track.preview_url).render);
                }
                $(".song").dblclick(function() {
                    console.log($(this).attr("data-href"));
                    $(".player").attr('src', $(this).attr("data-href"));
                    $(".player").trigger("play");

                    $(".titleDisplay").text($(this).find('.name').text());
                    $(".artistDisplay").text(" - " + $(this).find('.artist').text());
                });
			});
            $(".form-control").keyup(function() {
                console.log(this.value);
                $("tbody").empty();
                search(accessToken, this.value).then(function(response) {
                    console.log(response.tracks.items);
                    for(var i = 0; i < response.tracks.items.length; i++) {
                        $("tbody").append(new Song(i+1, response.tracks.items[i].name, response.tracks.items[i].artists[0].name, response.tracks.items[i].album.name, response.tracks.items[i].preview_url).render);
                    }
                    $(".song").dblclick(function() {
                        console.log($(this).attr("data-href"));
                        $(".player").attr('src', $(this).attr("data-href"));
                        $(".player").trigger("play");
                    });
                });
            });
		});
    });
});