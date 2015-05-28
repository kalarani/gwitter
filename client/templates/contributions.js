Template.contributions.helpers({
	contributions: function(){
		return Contributions.find({}, {sort: {created_at: -1}});
	}
});