var artistData;
var trackData;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var artistUrl = 'https://api.spotify.com/v1/search?type=artist&query='
var biographyUrl ='http://developer.echonest.com/api/v4/artist/biographies?api_key=TCEL3VT1U0ZQZXKFP&id=spotify:artist:'
var biographyData;
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
    $scope.showResults = false;
    $scope.audioObject = {}
    
  
    $scope.play = function(song) {
        if($scope.currentSong == song) {
            $scope.audioObject.pause()
            $scope.currentSong = false
            return
        }
        else {
            if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
            $scope.audioObject = new Audio(song);
            $scope.audioObject.play()  
            $scope.currentSong = song
        }
    }

    $scope.getArtists = function() {
        $http.get(artistUrl + $scope.artistName).success(function(response) {
            
            $scope.showResults = true;
            artistData = $scope.artist = response.artists.items[0]
            $scope.allArtists = response.artists.items
            if (artistData.images.length < 1) {
                $scope.imgExists = false;
            } else {
                $scope.imgExists = true;
            }
            
            $http.get(baseUrl + artistData.name).success(function(response){
                trackData = $scope.tracks = response.tracks.items
            })
            
            $http.get(biographyUrl + artistData.id).success(function(response) {
                var bioResponse = response.response
                if (bioResponse.status.message == "Success") {
                    $scope.noBio = false;
                } else {
                    $scope.noBio = true;
                }
                var i = 0;
                while (i < bioResponse.biographies.length && bioResponse.biographies[i].text.length < 75) {
                    i++;
                }
                biographyData = $scope.biography = bioResponse.biographies[i];
            })
        })
    }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
