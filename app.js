Parse.initialize("743sVGRWPfvsEFzh3AWioIhULr0pknf37XUJoS53", "5F7cp3Hh5Zg7A2137sPAxVtwrQAuNOsqpXEJChYR");

var artistData;
var trackData;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var artistUrl = 'https://api.spotify.com/v1/search?type=artist&query='
var myApp = angular.module('myApp', [])

var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
});

var FavoriteArtists = Parse.Object.extend("FavoriteArtists");
var favoriteArtists = new FavoriteArtists();


var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
    $scope.showResults = false;
  $scope.audioObject = {}
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.artist)
         .success(function(response){
      data = $scope.tracks = response.tracks.items
      
    })
  }
  
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
        $scope.showResults = true;
        $http.get(artistUrl + $scope.artist).success(function(response) {
            artistData = $scope.artist = response.artists.items[0]
            if (artistData.images.length < 1) {
                $scope.imgExists = false;
            } else {
                $scope.imgExists = true;
            }
            
            $http.get(baseUrl + data.name).success(function(response){
                trackData = $scope.tracks = response.tracks.items
            })
        })
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
