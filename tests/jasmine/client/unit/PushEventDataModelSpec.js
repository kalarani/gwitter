describe("Push event model", function(){
	var push_event = new PushEvent({
      "push_id": 664604403,
      "size": 1,
      "distinct_size": 1,
      "ref": "refs/heads/master",
      "head": "2b5b200b62b58caaa16f7bb694147c1ee49259c3",
      "before": "e5d71e1fd94423c026e7903c807c2a7392589ec4",
      "commits": [
        {
          "sha": "2b5b200b62b58caaa16f7bb694147c1ee49259c3",
          "author": {
            "email": "kalarani@thoughtworks.com",
            "name": "Kalarani"
          },
          "message": "Included Privileges carbon module",
          "distinct": true,
          "url": "https://api.github.com/repos/kalarani/YDeliver/commits/2b5b200b62b58caaa16f7bb694147c1ee49259c3"
        }
      ]
    });

	it("should return a html url for the commit", function(){
		var htmlUrl = push_event.htmlUrl();
		expect(htmlUrl).toBe("https://github.com/kalarani/YDeliver/commits/2b5b200b62b58caaa16f7bb694147c1ee49259c3");
	});
	
	it("should return the message with number of commits included", function(){
		var message = push_event.message();
		expect(message).toBe("pushed 1 commit");
		
		push_event.payload["commits"].push({ "sha": "2b5b200b62b58caaa16f7bb694147c1ee235469c3"});
		message = push_event.message();
		expect(message).toBe("pushed 2 commits");
	})
});