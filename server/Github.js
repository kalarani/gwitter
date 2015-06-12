GHApi = {
	isContribution: function(event){
		var isCreateIssueEvent = event.type === "IssuesEvent" && event.payload.action === "opened";
		var isPushEvent = event.type === "PushEvent" && event.repo.name.indexOf("github.io") < 0;
		return isCreateIssueEvent || isPushEvent || event.type === "PullRequestEvent";
	},

	gh: function(){
		return new GitHub({
		    version: "3.0.0",
		    debug: true,
		    protocol: "https",
		    host: "api.github.com",
		    timeout: 5000,
		   	headers: {
				"user-agent": "gwitter"
			}
		});
	},

	getPublicEventsFor: function(dev){
		return GHApi.gh().events.getFromUserPublic({
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
			var contributions = events.filter(function(el){ return GHApi.isContribution(el); });
			var lastSyncedEvent = Contributions.findOne({actor: {login: user}}, {sort: {created_at: -1}});
			if(lastSyncedEvent !== undefined){
				var lastSyncedEvent_date = lastSyncedEvent.created_at;
				contributions = contributions.filter(function(c){ return c.created_at > lastSyncedEvent_date});
			}
			contributions.forEach(function(contribution){
				Contributions.insert(contribution);
			});
			return contributions;
		}
		return [];
	},

	getPublicMembersOf: function(orgName){
		var members = GHApi.gh().orgs.getMembers({
			org: orgName
		});
		members.forEach(function(m){
			Devs.upsert({username: m.login}, {$set: {username: m.login, avatarUrl: m.avatar_url, htmlUrl: m.html_url}});
		});
		return members;
	}
}