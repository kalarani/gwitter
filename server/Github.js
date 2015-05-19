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
		var dev = Devs.findOne({username: user}) || {};
		var events = gh.events.getFromUserPublic({
			user: user,
			headers: {
				"if-none-match": dev.etag
			}
		});
		if(events.meta.status === "304 Not Modified"){
			return [];
		}
		if(dev.etag !== events.meta.etag){
			Devs.update({username: user}, {$set: {etag: events.meta.etag}});
		}
		return events.filter(function(el){ return GHApi.isContribution(el) });
	}	
}