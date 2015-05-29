describe("Issues model", function(){
	var issuesEvent = new IssuesEvent({
      "action": "opened",
      "issue": {
        "html_url": "https://github.com/njupiter/njupiter/issues/10",
      }
    });

	it("should return a html url for the issue", function(){
		var htmlUrl = issuesEvent.htmlUrl();
		expect(htmlUrl).toBe("https://github.com/njupiter/njupiter/issues/10");
	});
	
	it("should return a generice messag for the issue", function(){
		var message = issuesEvent.message();
		expect(message).toBe("opened an issue");
	})
});