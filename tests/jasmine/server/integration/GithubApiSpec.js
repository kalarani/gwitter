"use strict";


describe("Github api", function(){
	it("should be able to get public events of a user", function(){
		var contributions = GHApi.contributionsFrom("kalarani")
		expect(contributions.length).toBe(8);
	})	
});