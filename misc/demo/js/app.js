angular.module("views/comment.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/comment.html",
    "<div class=\"container comment\">\n" +
    "  <div class=\"page-header\">\n" +
    "    <div class=\"comment-header\">\n" +
    "      <h4 class=\"comment-user\">\n" +
    "        <button ng-if=\"comment.children\" class=\"icon-2x clear-square glyphicon\" ng-class=\"{'icon-minus-sign-alt': !collapsed, 'icon-plus-sign-alt': collapsed}\" title=\"toggle children\" ng-click=\"collapse()\"></button>" +
    "        <button ng-if=\"!comment.children\" class=\"icon-2x clear-square\"></button>" +
    "        <span class=\"comment-username\" ng-if=\"!comment.profileUrl\">{{comment.name}}</span>\n" +
    "        <a class=\"comment-username\" ng-if=\"comment.profileUrl\" ng-href=\"{{comment.profileUrl}}\" title=\"{{comment.name}}\">{{comment.name}}</a>\n" +
    "        <small class=\"comment-date\" ng-if=\"comment.date\" title=\"{{comment.date | calendar}}\">{{comment.date | timeago}}</small>\n" +
    "       </h4>\n" +
    "      <img class=\"comment-avatar\" ng-if=\"comment.avatarUrl\" ng-src=\"{{comment.avatarUrl}}\" alt=\"{{comment.name}}\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"container comment-body\" ng-bind=\"comment.text\"></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("views/comments.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/comments.html",
    "<div class=\"comments panel panel-default\">\n" +
    "  <comment ng-repeat=\"comment in comments\" comment-data=\"comment\"></comment>\n" +
    "</div>\n" +
    "");
}]);

angular.module('commentsDemo', ['views/comments.html', 'views/comment.html', 'ui.comments'])

.config(function(commentsConfigProvider) {
  commentsConfigProvider.set({
    containerTemplate: 'views/comments.html',
    commentTemplate: 'views/comment.html',
    commentController: 'CommentCtrl'
  });
})

.controller('CommentCtrl', function($scope, $element) {
  var children;
  $scope.collapsed = true;
  $element.bind('filled.comments', collapse);
  $scope.$on('$destroy', function() {
    $element.unbind('filled.comments', collapse);
  });
  function collapse(e, childComments) {
    children = $(childComments);
    children.collapse('hide');
  }
  $scope.collapse = function() {
    $scope.collapsed = children.hasClass('in');
    children.collapse('toggle');
  };
})

.controller('DemoCtrl', function($scope) {
  $scope.comments = [
    {
      name: '@caitp',
      date: new Date(),
      profileUrl: 'https://github.com/caitp',
      text: 'UI-Comments is designed to simplify the process of creating comment systems similar to Reddit, Imgur or Discuss in AngularJS.',
      children: [{
        name: '@caitp',
        date: new Date(),
        profileUrl: 'https://github.com/caitp',
        text: 'We support nested comments, in a very simple fashion. It\'s great!',
        children: [{
          name: '@caitp',
          date: new Date(),
          profileUrl: 'https://github.com/caitp',
          text: 'These nested comments can descend arbitrarily deep, into many levels. This can be used to reflect a long and detailed conversation about typical folly which occurs in comments',
          children: [{
            name: '@caitp',
            date: new Date(),
            profileUrl: 'https://github.com/caitp',
            text: 'Having deep conversations on the internet can be used to drive and derive data about important topics, from marketing demographic information to political affiliation and even sexual orientation if you care to find out about that. Isn\'t that exciting?'
          }]
        }]
      }]
    }
  ]
})

.filter('timeago', function() {
  return function(date) {
    return moment(date).fromNow();
  };
})
.filter('calendar', function() {
  return function(date) {
    return moment(date).calendar();
  };
});
