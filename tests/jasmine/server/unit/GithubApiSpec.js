describe("Github api", function(){
	it("Should check if push event is a contribution", function(){
		var e = {type: "PushEvent", "repo": {"name" : ""}};
		expect(GHApi.isContribution(e)).toBe(true);
	});
	it("Should check if pull request event is a contribution", function(){
		var e = {type: "PullRequestEvent"};
		expect(GHApi.isContribution(e)).toBe(true);
	});
	it("Should check if creating issues is a contribution", function(){
		var e = {type: "IssuesEvent", payload: {action: "opened"}};
		expect(GHApi.isContribution(e)).toBe(true);

		var e = {type: "IssuesEvent", payload: {action: "closed"}};
		expect(GHApi.isContribution(e)).toBe(false);
	});
	it("Should check that pushing to gh-pages is not a contribution", function(){
		var e = {type: "PushEvent", "repo" : { "id" : 13862168, "name" : "prasann/prasann.github.io", "url" : "https://api.github.com/repos/prasann/prasann.github.io" }};
		expect(GHApi.isContribution(e)).toBe(false);
	});
	it("Should return emply list of contributions if server returns 304", function(){
		spyOn(GHApi, 'getPublicEventsFor').and.returnValue({meta: {status: "304 Not Modified"}});

		expect(GHApi.contributionsFrom("kalarani").length).toBe(0);
	});
});