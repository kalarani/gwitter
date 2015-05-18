GHApi = {
	isContribution: function(event){
		var isCreateIssueEvent = event.type === "IssuesEvent" && event.payload.action === "opened";
		return isCreateIssueEvent || ["PushEvent", "PullRequestEvent"].indexOf(event.type) >= 0;
	},

	contributionsFrom: function(user){
		var gh = new GitHub({
		    version: "3.0.0",
		    debug: true,
		    protocol: "https",
		    host: "api.github.com",
		    timeout: 5000,
		   	headers: {
				"user-agent": "gwitter"
			}
		});
		var events = gh.events.getFromUserPublic({
			user: user,
		});
		console.log(events[0].type);
		return events.filter(function(el){ return GHApi.isContribution(el) });
	}	
}