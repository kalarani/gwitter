Devs = new Mongo.Collection("Developers");

if (Meteor.isClient) {
	Meteor.subscribe('contributions');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
	Migrations.migrateTo('latest');
	new Cron(function(){
		console.log("fetching latest contributions");
		var twDevs = GHApi.getPublicMembersOf("TWChennai");
		twDevs.forEach(function(dev){
			GHApi.contributionsFrom(dev.login);
		});
	}, {minute : 0});
  });

  Meteor.publish('contributions', function() {
   return Contributions.find({}, {sort: {created_at: -1}});
  });
}
