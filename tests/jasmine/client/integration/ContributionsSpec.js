describe("contributions", function(){
	it("should be loaded in reverse chronological order", function(){
		spyOn(Contributions, 'find');
		Template.contributions.__helpers[' contributions']();
		expect(Contributions.find).toHaveBeenCalledWith({}, {sort: {created_at: -1}})
	});
});

describe("url for", function(){
	it("push event should point to the first commit", function(){
		var push_event = {type: "PushEvent", payload: {commits: [{url: "https://api.github.com/repos/username/reponame/commit/sha"}]}}
		var url = Template.contribution.__helpers[' getHtmlUrl'].call(push_event);
		expect(url).toBe("https://github.com/username/reponame/commit/sha");
	});
	it("pull request event should point to the corresponding html url", function(){
		var push_event = {type: "PullRequestEvent", payload: {pull_request: {html_url: "url_to_pull_request"}}}
		var url = Template.contribution.__helpers[' getHtmlUrl'].call(push_event);
		expect(url).toBe("url_to_pull_request");
	});
	it("issues event should point to the corresponding html url", function(){
		var push_event = {type: "IssuesEvent", payload: {issue: {html_url: "url_to_issue"}}}
		var url = Template.contribution.__helpers[' getHtmlUrl'].call(push_event);
		expect(url).toBe("url_to_issue");
	});
});