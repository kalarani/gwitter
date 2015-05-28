IssuesEvent = function(payload){
	this.payload = payload;
};

IssuesEvent.prototype = {
	htmlUrl: function(){
		return this.payload["issue"]["html_url"];
	},
	
	message: function(){
		return "opened an issue";
	}
};