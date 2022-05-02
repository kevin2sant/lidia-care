const pool = require('./connectModel')

const getListPsyActive = (req,res,next) => {
	let query = {
        text: ` SELECT * FROM psychologists WHERE b_active IS TRUE`,
		values : []
    }

    return pool()
    .query(query)
    .then(res => res.rows)
    .catch(res => {
		// console.log(error)
    	res.status(400).send({
			error : res
		})
	})
}

module.exports = {
	getListPsyActive
}