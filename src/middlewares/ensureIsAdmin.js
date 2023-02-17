const knex = require('../db/knex');
const AppError = require('../utils/appError');

async function ensureIsAdmin(req, res, next){
	const user_id = req.user.id;

	const user = await knex('users').where({id: user_id}).first();

	if(!user.isAdmin) throw new AppError('Access Denied', 401);

	next();
}

module.exports = ensureIsAdmin;