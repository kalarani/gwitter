"use strict";

describe("Github api", function(){
	var setupGHApiWith = function(events){
		events.meta = {status: "200 OK"};
		spyOn(GHApi, 'getPublicEventsFor').and.returnValue(events);
	}
	var push_event = {type: "PushEvent", created_at: "2015-05-18T09:16:44Z", payload: {}, actor: {login: "kalarani"}}
	var pull_request_event = {type: "PullRequestEvent", created_at: "2015-05-17T09:16:44Z", payload: {}, actor: {login: "kalarani"}};

	it("should be able to get public events of a user", function(){
		var some_other_event = {type: "CreateEvent"};
		setupGHApiWith([push_event, pull_request_event, some_other_event]);

		GHApi.contributionsFrom("kalarani");
		expect(Contributions.find().count()).toBe(2);
	});

	it("Should check if etag is updated in DB", function(){
		Devs.update({username: "kalarani"}, {$set: {etag: ""}});
		setupGHApiWith([push_event, pull_request_event]);

		GHApi.contributionsFrom("kalarani");

		expect(Devs.findOne({username: "kalarani"}).etag).not.toBe("");
	});

	it("should find the new contributions made from the last synced date", function(){
		Contributions.insert(push_event);
		Contributions.insert(pull_request_event);

		var latest_event = {type: "PushEvent", created_at: "2015-05-20T09:16:44Z", payload: {}, actor: {login: "kalarani"}};
		setupGHApiWith([push_event, pull_request_event, latest_event]);

		expect(Contributions.find().count()).toBe(2);
		GHApi.contributionsFrom("kalarani");
		expect(Contributions.find().count()).toBe(3);
	});

	afterEach(function() {
		Contributions.remove({});
	});
});