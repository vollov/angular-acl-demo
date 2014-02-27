db.user.drop();

users = [ {
	'password': '30274c47903bd1bac7633bbf09743149ebab805f',
	'email': 'mary@demo.org',
	"firstname" : "Thomas",
	"lastname" : "Davis",
	"age" : 12
}, {
	'password': '8843d7f92416211de9ebb963ff4ce28125932878',
	'email': 'wendy@abc.com',
	"firstname" : "Wendy",
	"lastname" : "Chan",
	"age" : 33
}, {
	"_id": new ObjectId("52e9ce56977f8a8b113a09f9"),
	'password': '30274c47903bd1bac7633bbf09743149ebab805f',
	'email': 'dustin@demo.org',
	"firstname" : "Dustin",
	"lastname" : "Light",
	"age" : 35
}, {
	'password': '30274c47903bd1bac7633bbf09743149ebab805f',
	'email': 'luke@demo.org',
	"firstname" : "Luke",
	"lastname" : "Smith",
	"age" : 47
}, ];

db.user.insert(users);