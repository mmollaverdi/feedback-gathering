var items = [
    {code: 1, title: 'Nimble - Demonstrates a positive attitude'},
    {code: 2, title: 'Unstoppable - Demonstrates the ability to overcome technical challenges'},
    {code: 3, title: 'Future Minded - Invests in own development', votes: {'Mr Happy': 2, 'Little Miss Frustrated': 3}},
    {code: 4, title: 'No bull - Has the ability to cut to chase'}
  ];

var itemCodeMap = {};
items.forEach(function(item) {
  itemCodeMap[item.code] = item;
});

exports.voted = function(person, itemCode, callback) {
  var itemVotes = itemCodeMap[itemCode].votes || {};
  var newVoteCount = 1;
  if (itemVotes[person]) {
    newVoteCount = itemVotes[person] + 1;
  }
  itemVotes[person] = newVoteCount;
  itemCodeMap[itemCode].votes = itemVotes;
  callback(newVoteCount);
};

exports.findAll = function(callback) {
  callback(items);
};