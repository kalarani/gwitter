Template.contributions.helpers({
	contributions: function(){
		return Contributions.find({}, {sort: {created_at: -1}});
	}
});

Template.contribution.helpers({
	formattedCreatedTime: function(){
		return strftime('%B %d, %Y %H:%M', new Date(this.created_at));
	}
});