describe("contributions", function(){
	it("should be loaded in reverse chronological order", function(){
		spyOn(Contributions, 'find');
		Template.contributions.__helpers[' contributions']();
		expect(Contributions.find).toHaveBeenCalledWith({}, {sort: {created_at: -1}})
	});
})