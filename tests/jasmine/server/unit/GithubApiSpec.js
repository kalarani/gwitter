describe("Github api", function(){
	it("Should check if push event is a contribution", function(){
		var e = {type: "PushEvent"}
		expect(GHApi.isContribution(e)).toBe(true);
	});
	it("Should check if pull request event is a contribution", function(){
		var e = {type: "PullRequestEvent"}
		expect(GHApi.isContribution(e)).toBe(true);
	});
	it("Should check if creating issues is a contribution", function(){
		var e = {type: "IssuesEvent", payload: {action: "opened"}}
		expect(GHApi.isContribution(e)).toBe(true);

		var e = {type: "IssuesEvent", payload: {action: "closed"}}
		expect(GHApi.isContribution(e)).toBe(false);
	});
	xit("make sure that no filtering happens if the response is a 304");
});