var evtSource = new EventSource('http://tf-firehose.herokuapp.com/events');

var eventList = document.getElementById('events');

evtSource.addEventListener('pullRequest', function(evt) {
  var pr = JSON.parse(evt.data);
  console.log(JSON.stringify(pr, null, 2));
  render(pr)
}, false);

// load examples
$.getJSON("/pr.json", function( data ) {
  data.forEach(function(pr) { render(pr) });
});

// we could tidy this up using a view library, but it does what we need for now.
function render(pr) {
  var newElement = document.createElement("li");
  newElement.className += "card";
  var src = 'https://avatars3.githubusercontent.com/u/' + pr.user.uid + '?v=3&s=60';
  var img = '<div class="img-wrap"><img src="' + src  +'" width="60" height="60"></div>';
  var nickname = '<div class="words"><strong><a href="https://github.com/' + pr.user.nickname + '" target="_blank">';
  nickname += '@' + pr.user.nickname +'</a></strong>';
  var pr_link = '<strong> <a href="' + pr.issue_url + '">' + pr.title + '</a> </strong>';
  var pr_repo = '<a href="' + pr.issue_url + '">' + pr.repo_name + '</a></div>';
  var html = img + nickname +' submitted Pull Request: ' + pr_link +'<br /> on ' + pr_repo;
  // html += ' <em style="color:grey">' + moment(pr.created_at).fromNow() +'</em>';
  newElement.innerHTML = html;
  eventList.insertBefore(newElement, eventList.firstChild); // prepend
}
