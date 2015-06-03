/* 
{
    "type": "Event",
    "public": true,
    "payload": {
    },
    "repo": {
      "id": 3,
      "name": "octocat/Hello-World",
      "url": "https://api.github.com/repos/octocat/Hello-World"
    },
    "actor": {
      "id": 1,
      "login": "octocat",
      "gravatar_id": "",
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "url": "https://api.github.com/users/octocat"
    },
    "org": {
      "id": 1,
      "login": "github",
      "gravatar_id": "",
      "url": "https://api.github.com/orgs/github",
      "avatar_url": "https://github.com/images/error/octocat_happy.gif"
    },
    "created_at": "2011-09-06T17:26:27Z",
    "id": "12345"
  }
*/

Contributions = new Mongo.Collection("Contributions");

Contributions.helpers({
	event: function(){
		if(this.type === "PullRequestEvent"){
			return new PullRequestEvent(this.payload);
		}
		if(this.type === "IssuesEvent"){
			return new IssuesEvent(this.payload);
		}
		return new PushEvent(this.payload);
	},
	
	repoUrl: function(){
		return this.repo.url.replace("api.", "").replace("repos/", "");
	},

  user: function(){
    return Devs.findOne({username: this.actor.login}) || {};
  }
});