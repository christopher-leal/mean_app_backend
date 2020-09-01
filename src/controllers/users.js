const User = require('./../models/usuario');
const bcryptjs = require('bcryptjs');

const getUsers = async (req, res) => {
	const { limit, offset } = req.body;

	const [ users, total ] = await Promise.all([
		User.find({ status: true }).limit(limit).skip(offset),
		User.countDocuments()
	]);
	res.json({ ok: true, items: users, total });
};

const addUser = async (req, res) => {
	try {
		const { id, ...rest } = req.body;
		const userId = req.id;

		let user;

		if (id) {
			user = await User.findById(id);
			if (!user) return res.status(400).json({ ok: false, error: 'No se encontro el usuario' });
			if (rest.password) {
				const salt = await bcryptjs.genSalt();
				rest.password = await bcryptjs.hash(rest.password, salt);
			}
			user = await User.findOneAndUpdate({ _id: id }, { ...rest, updatedBy: userId }, { new: true });
		} else {
			const userDb = await User.findOne({ email: rest.email });

			if (userDb) {
				return res.status(400).json({ ok: false, error: 'Correo existente' });
			}

			user = new User(req.body);
			const salt = await bcryptjs.genSalt();

			user.password = await bcryptjs.hash(rest.password, salt);
			await user.save();
		}

		res.json({ ok: true, user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ ok: false, error });
	}
};

// const updateUser = async (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		const userDB = await User.findById(id);
// 		if (!userDB) return res.status(400).json({ ok: false, error: 'No se encontro el usuario' });

// 		const { password, google, email, ...rest } = req.body;
// 		if (userDB.email !== email) {
// 			const emailExists = await User.findOne({ email });
// 			if (emailExists) return res.status(400).json({ ok: false, error: 'El email ya esta registrado' });
// 		}

// 		rest.email = email;
// 		const updatedUser = await User.findOneAndUpdate({ _id: id }, rest, { new: true });

// 		res.json({ ok: true, user: updatedUser });
// 	} catch (error) {
// 		res.status(500).json({ ok: false, error });
// 	}
// };

const deleteUser = async (req, res) => {
	try {
		const { id } = req.body;

		// const deletedUser = await User.findOneAndDelete({ _id: id });
		const deletedUser = await User.findOne({ _id: id });
		if (!deletedUser) return res.status(400).json({ ok: false, error: 'Usuario no encontrado' });
		deletedUser.status = false;
		await deletedUser.save();
		res.json({ ok: true, user: deletedUser });
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

module.exports = {
	getUsers,
	addUser,
	// updateUser,
	deleteUser
};
