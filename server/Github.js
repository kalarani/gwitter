GHApi = {
	isContribution: function(event){
		var isCreateIssueEvent = event.type === "IssuesEvent" && event.payload.action === "opened";
		return isCreateIssueEvent || ["PushEvent", "PullRequestEvent"].indexOf(event.type) >= 0;
	},

	getPublicEventsFor: function(dev){
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
		return gh.events.getFromUserPublic({
			user: dev.username,
			headers: {
				"if-none-match": dev.etag
			}
		});
	},

	contributionsFrom: function(user){
		var dev = Devs.findOne({username: user}) || {};
		var events = GHApi.getPublicEventsFor(dev);
		if(events.meta.status === "200 OK"){
			Devs.update({username: user}, {$set: {etag: events.meta.etag}});
			var contributions = events.filter(function(el){ return GHApi.isContribution(el) });
			var last_synced_event = Contributions.findOne({actor: {login: user}}, {sort: {created_at: -1}});
			var latest_contributions = contributions;
			if(last_synced_event !== undefined){
				var last_synced_event_date = last_synced_event.created_at;
				latest_contributions = contributions.filter(function(c){ return c.created_at > last_synced_event_date});
			}
			latest_contributions.forEach(function(contribution){
				Contributions.insert(contribution);
			});
			return latest_contributions;
		}
		return [];
	}	
}