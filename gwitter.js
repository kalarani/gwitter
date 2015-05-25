Devs = new Mongo.Collection("Developers");
Contributions = new Mongo.Collection("Contributions");

if (Meteor.isClient) {
}

if (Meteor.isServer) {
  Meteor.startup(function () {
	Migrations.migrateTo('latest');
  });
}
