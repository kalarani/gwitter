PushEvent = function(payload){
	this.payload = payload;
};

PushEvent.prototype = {
	htmlUrl: function(){
		return this.payload["commits"][0].url.replace("api.", "").replace("repos/", "");
	},
	
	message: function(){
		var noOfCommits = this.payload["commits"].length;
		var pluralizedCommit = noOfCommits > 1 ? " commits" : " commit";
		return "pushed " + noOfCommits + pluralizedCommit;
	}
};