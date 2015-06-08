Devs = new Mongo.Collection("Developers");

if (Meteor.isClient) {
	Meteor.subscribe('contributions');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
	Migrations.migrateTo('latest');
	// var twDevs = GHApi.getPublicMembersOf("TWChennai");
	// twDevs.forEach(function(dev){
	// 	GHApi.contributionsFrom(dev.login);
	// });
	// new Cron(function(){
	// 	// Chores.update({}, {$set: {done: false}}, {multi: true});
	// 	console.log("running every hour????");
	// }, {minute : 0});
  });

  Meteor.publish('contributions', function() {
   return Contributions.find({}, {sort: {created_at: -1}});
  });
}
