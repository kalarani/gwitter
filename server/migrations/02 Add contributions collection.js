Migrations.add({
  version: 2,
  up: function() {
	Contribs = new Mongo.Collection("Contributions");
	var contribsFromKalarani = GHApi.contributionsFrom("kalarani");
	contribsFromKalarani.forEach(function(contribution){
		Contribs.insert(contribution);
	})
  }
});
