describe("Pull request model", function(){
	var push_event = new PullRequestEvent({
      "action": "opened",
      "number": 3,
      "pull_request": {
        "html_url": "https://github.com/paralin/meteor-pnotify/pull/3",
        "title": "Added github url in package.js",
        "user": {},
        "head": {},
        "base": {},
        "_links": {},
      }
    });

	it("should return a html url for the pull request", function(){
		var htmlUrl = push_event.htmlUrl();
		expect(htmlUrl).toBe("https://github.com/paralin/meteor-pnotify/pull/3");
	});
	
	it("should return a generic message for the pull request", function(){
		var message = push_event.message();
		expect(message).toBe("opened a pull request");
	})
});