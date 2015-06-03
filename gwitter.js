Devs = new Mongo.Collection("Developers");

if (Meteor.isClient) {
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
}
