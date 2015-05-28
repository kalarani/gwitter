describe("Issues model", function(){
	var push_event = new IssuesEvent({
      "action": "opened",
      "issue": {
        "html_url": "https://github.com/njupiter/njupiter/issues/10",
      }
    });

	it("should return a html url for the issue", function(){
		var htmlUrl = push_event.htmlUrl();
		expect(htmlUrl).toBe("https://github.com/njupiter/njupiter/issues/10");
	});
	
	it("should return a generice messag for the issue", function(){
		var message = push_event.message();
		expect(message).toBe("opened an issue");
	})
});