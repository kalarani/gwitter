Template.contributions.helpers({
	contributions: function(){
		return Contributions.find({}, {sort: {created_at: -1}});
	}
});

Template.contribution.helpers({
	getHtmlUrl: function(){
		if(this.type == "PullRequestEvent") {
			return this.payload.pull_request.html_url;
		}
		else if (this.type === "IssuesEvent") {
			return this.payload.issue.html_url;
		}
		else if (this.type === "PushEvent"){
			return this.payload.commits[0].url.replace("api.","").replace("repos/","");
		}
		return "#";
	}
});