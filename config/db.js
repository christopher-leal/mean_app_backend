const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(`${process.env.DB_STRING}/mean_hospital`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		console.log('DB connected');
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	dbConnection
};
