"use strict";

describe("Github api", function(){
	describe("events", function(){
		var setupGHApiWith = function(events){
			events.meta = {status: "200 OK"};
			spyOn(GHApi, 'getPublicEventsFor').and.returnValue(events);
		}
		var pushEvent = {type: "PushEvent", created_at: "2015-05-18T09:16:44Z", payload: {}, actor: {login: "kalarani"}, repo: {name: ""}}
		var pullRequestEvent = {type: "PullRequestEvent", created_at: "2015-05-17T09:16:44Z", payload: {}, actor: {login: "kalarani"}};

		it("should be able to get public events of a user", function(){
			var some_other_event = {type: "CreateEvent"};
			setupGHApiWith([pushEvent, pullRequestEvent, some_other_event]);

			GHApi.contributionsFrom("kalarani");
			expect(Contributions.find().count()).toBe(2);
		});

		it("Should check if etag is updated in DB", function(){
			Devs.upsert({username: "kalarani"}, {$set: {etag: ""}});
			setupGHApiWith([pushEvent, pullRequestEvent]);

			GHApi.contributionsFrom("kalarani");

			expect(Devs.findOne({username: "kalarani"}).etag).not.toBe("");
		});

		it("should find the new contributions made from the last synced date", function(){
			Contributions.insert(pushEvent);
			Contributions.insert(pullRequestEvent);

			var latestEvent = {type: "PushEvent", created_at: "2015-05-20T09:16:44Z", payload: {}, actor: {login: "kalarani"}, repo: {name: ""}};
			setupGHApiWith([pushEvent, pullRequestEvent, latestEvent]);

			expect(Contributions.find().count()).toBe(2);
			GHApi.contributionsFrom("kalarani");
			expect(Contributions.find().count()).toBe(3);
		});
	});

	describe("orgs", function(){
		it("should get all public members of given organization", function(){

			spyOn(GHApi, 'gh').and.returnValue({orgs: {getMembers: function(){
				return [ {login: "siliconsenthil"}, {login: "selvakn"} ];
			}}});

			var members = GHApi.getPublicMembersOf("TWChennai");

			expect(members.length).toBe(2);
			expect(Devs.find().count()).toBe(2);
			expect(Devs.findOne({username: "siliconsenthil"})).not.toBeNull();
			expect(Devs.findOne({username: "selvakn"})).not.toBeNull();
		});

		it("should update Developers collection with new devs of given organization", function(){
			Devs.insert({username: "sharans", etag: ""});

			spyOn(GHApi, 'gh').and.returnValue({orgs: {getMembers: function(){
				return [ {login: "sharans"}, {login: "selvakn"} ];
			}}});

			var members = GHApi.getPublicMembersOf("TWChennai");

			expect(members.length).toBe(2);
			expect(Devs.find().count()).toBe(2);
			expect(Devs.findOne({username: "sharans"})).not.toBeNull();
			expect(Devs.findOne({username: "selvakn"})).not.toBeNull();
		});
	});

	afterEach(function() {
		Contributions.remove({});
		Devs.remove({});
	});
});