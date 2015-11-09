function getAvatar(data) {
  var avatar = data[0]['actor']['avatar_url'];
  return avatar;
}

function formatDefaultData(data) {
  var username;
  var repo;
  var formattedData = '';

  for (var i = 0; i < data.length; i++) {
    username = data[i]['actor']['login'];
    repo = data[i]['repo']['name'];
    formattedData += '<li>' + repo + '</li>';
  }
  return formattedData;
}

function formatStarredAndWatchedData(data) {
  var username;
  var repo;
  var formattedData = '';

  for (var i = 0; i < data.length; i++) {
    username = $('#username').val();
    repo = data[i]['name'];
    formattedData += '<li>' + repo + '</li>';
  }
  return formattedData;
}

function formatFollowData(data) {
  var follow;
  var repo;
  var formattedData = '';

  for (var i = 0; i < data.length; i++) {
    follow = data[i]['login'];
    repo = data[i]['name'];
    formattedData += '<li>' + follow + '</li>';
  }
  return formattedData;
}

function attachEventListener() {
  $('#username-search').click( function() {
    var avatar;
    var gitURL = 'https://api.github.com/users/';
    var username = $('#username').val();
    var option = $('#option').val();
    var deferredAvatar = $.get(gitURL + username + '/events');
    var deferred = $.get(gitURL + username + option);

    deferredAvatar.done(function(data) {
      if ($('.search').has('img').length) {
        $('.search').children('img').remove();
      }
      $('.search').append('<img src="' + getAvatar(data) + '" height="200px" width="200px"/>');
    })

    deferred.done(function(data) {
      if (option === '/events'){
        $('.result').html('<ul>' + formatDefaultData(data) + '</ul>');
        $('.details').text('This is what ' + username + ' has been up to:');
      } else if (option === '/starred'){
        $('.result').html('<ul>' + formatStarredAndWatchedData(data) + '</ul>');
        $('.details').text('This is what ' + username + ' stargazes at:');
      } else if (option === '/subscriptions'){
        $('.result').html('<ul>' + formatStarredAndWatchedData(data) + '</ul>');
        $('.details').text('This is what ' + username + ' watches:');
      } else if (option === '/subscriptions'){
        $('.result').html('<ul>' + formatStarredAndWatchedData(data) + '</ul>');
        $('.details').text('This is what ' + username + ' has forked:');
      }else if (option === '/followers'){
        $('.result').html('<ul>' + formatFollowData(data) + '</ul>');
        $('.details').text('These users follow ' + username + ':');
      } else if (option === '/following'){
        $('.result').html('<ul>' + formatFollowData(data) + '</ul>');
        $('.details').text( username + ' follows these users:');
      }
    })
  })
}

function init() {
  attachEventListener();
}

$(document).ready(function() {
  init();
});
