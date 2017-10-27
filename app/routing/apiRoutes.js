
var friendsData = require("../data/friends.js");

module.exports = function(app){

  app.get("/api/friends", function(req, res){
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res){
    var newFriend = req.body;

    var compatibleFriends = findFriends(newFriend);

    friendsData.push(newFriend);
    res.json(compatibleFriends);
  });
}

function findFriends(newFriend){
  var compatibleFriends = [];
  var prevFriendScore = Number.MAX_SAFE_INTEGER;

  friendsData.forEach(function(friend){
    var currFriendScore = getCompatibilityScore(friend, newFriend);

    if(currFriendScore === prevFriendScore){
      compatibleFriends.push(friend);
    }
    else if(currFriendScore < prevFriendScore){
      compatibleFriends = [];
      compatibleFriends.push(friend);
    }

    prevFriendScore = currFriendScore;
  });

  return compatibleFriends;
}

function getCompatibilityScore(friend1, friend2){
  return friend1.scores.reduce(function(total, score, currentIndex){
    var friend_1_score = parseInt(score);
    var friend_2_score = parseInt(friend2.scores[currentIndex]);
    var diff = Math.abs(friend_1_score - friend_2_score);

    return total + diff;
  }, 0);
}



