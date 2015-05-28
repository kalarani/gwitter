Devs = new Mongo.Collection("Developers");

if (Meteor.isClient) {
}

if (Meteor.isServer) {
  Meteor.startup(function () {
	Migrations.migrateTo('latest');
  });
}
