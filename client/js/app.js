angular.module('feedbackApp', ['btford.socket-io', 'lvl.directives.dragdrop']);

function VotingController($scope, $http, socket) {
    $http({method: 'GET', url: '/app/items'})
        .success(function(data) {
            $scope.voteItems = data;
        })
        .error(function() {});
    $http({method: 'GET', url: '/app/people'})
        .success(function(data) {
            $scope.people = data;
        })
        .error(function() {});

    $scope.voted = function(person, voteItemCode) {
        socket.emit('vote', {'person': person, 'itemCode': voteItemCode});
    }

    socket.on('newVoteCount', function(data) {
        var itemCode = data['itemCode'];
        var person = data['person'];
        var voteCount = data['voteCount'];
        var voteItem = _.find($scope.voteItems, function(item){ return item.code === itemCode; });
        voteItem.votes = voteItem.votes || {};
        voteItem.votes[person] = voteCount;
    });

    $scope.dropped = function(dragEl, voteItemCode) {
        var person = angular.element(dragEl).attr('data-person-name');
        socket.emit('vote', {'person': person, 'itemCode': voteItemCode});
    }
}
