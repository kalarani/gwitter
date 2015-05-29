describe("Pull request model", function(){
	var pullRequestEvent = new PullRequestEvent({
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
		var htmlUrl = pullRequestEvent.htmlUrl();
		expect(htmlUrl).toBe("https://github.com/paralin/meteor-pnotify/pull/3");
	});
	
	it("should return a generic message for the pull request", function(){
		var message = pullRequestEvent.message();
		expect(message).toBe("opened a pull request");
	})
});