describe("Contribution model", function(){
	it("should return corresponding event model based on event type", function(){
		var contribution = Contributions._transform({ type: "PushEvent", payload: {} });
		expect(contribution.event()).toEqual(new PushEvent({}));
		
		contribution.type = "PullRequestEvent";
		expect(contribution.event()).toEqual(new PullRequestEvent({}));
		
		contribution.type = "IssuesEvent";
		expect(contribution.event()).toEqual(new IssuesEvent({}));
	});
});