PullRequestEvent = function(payload){
	this.payload = payload;
};

PullRequestEvent.prototype = {
	htmlUrl: function(){
		return this.payload["pull_request"]["html_url"];
	},
	
	message: function(){
		return "opened a pull request";
	}
};