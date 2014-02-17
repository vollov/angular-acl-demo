db.user.drop();

users = [ {
	"firstname" : "Thomas",
	"lastname" : "Davis",
	"age" : 12
}, {
	"firstname" : "Annie",
	"lastname" : "Chan",
	"age" : 33
}, {
	"_id": new ObjectId("52e9ce56977f8a8b113a09f9"),
	"firstname" : "Dustin",
	"lastname" : "Light",
	"age" : 35
}, {
	"firstname" : "Luke",
	"lastname" : "Smith",
	"age" : 47
}, ];

db.user.insert(users);