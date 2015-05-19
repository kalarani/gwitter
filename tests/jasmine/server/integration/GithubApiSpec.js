"use strict";


describe("Github api", function(){
	it("should be able to get public events of a user", function(){
		var contributions = GHApi.contributionsFrom("kalarani");
		expect(contributions.length).toBe(8);
	});

	it("Should check if etag is updated in DB", function(){
		Devs.update({username: "kalarani"}, {$set: {etag: ""}});
		GHApi.contributionsFrom("kalarani");
		expect(Devs.findOne({username: "kalarani"}).etag).not.toBe("");
	});
});