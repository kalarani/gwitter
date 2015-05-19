Migrations.add({
  version: 1,
  up: function() {
	Devs = new Mongo.Collection("Developers");
	Devs.insert({username: "kalarani", etag:""});
}
});