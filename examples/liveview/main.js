var evtSource = new EventSource('http://tf-firehose.herokuapp.com/events');

var eventList = document.getElementById('events');

evtSource.addEventListener('pullRequest', function(evt) {
  var pr = JSON.parse(evt.data);
  console.log(JSON.stringify(pr, null, 2));
  render(pr)
}, false);

// example:
$.getJSON("/pr.json", function( data ) {
  console.log(JSON.stringify(data, null, 2));
  render(data);
});

function render(pr) {
  var newElement = document.createElement("li");
  var src = 'https://avatars3.githubusercontent.com/u/' + pr.user.uid + '?v=3&s=40';
  var img = '<img src="' + src  +'" width="40" height="40">';
  var nick = '<strong><a href="https://github.com/' + pr.user.nickname + '" target="_blank">';
  nick = nick + '@' + pr.user.nickname +'</a></strong>';
  var pr_link = '<strong> <a href="' + pr.issue_url + '">' + pr.title + '</a> </strong>';
  var time = moment(pr.created_at).fromNow();

  var html = img + nick +' submitted Pull Request: ' + pr_link +' on ' + pr.repo_name +' '+ time;
  newElement.innerHTML = html;
  eventList.insertBefore(newElement, eventList.firstChild);
}
