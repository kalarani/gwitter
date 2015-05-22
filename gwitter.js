Devs = new Mongo.Collection("Developers");
Contributions = new Mongo.Collection("Contributions");

if (Meteor.isClient) {
	Template.contributions.helpers({
		contributions: function(){
			return Contributions.find({}, {sort: {created_at: -1}});
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
	Migrations.migrateTo('latest');
	GHApi.contributionsFrom("kalarani");
  });
}
