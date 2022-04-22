const pool = require('./connectModel')

const listPsy = async (req,res) => {
	let query = {
        text: ` SELECT a.* 
				          FROM psychologists a
                WHERE a.b_active = 'true';`,
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


const deactivatePsy = async (req,res) => {
	const {idpsy} = req.body;

	let query = {
        text: ` UPDATE psychologists
                SET b_active = 'f'
                  d_updated_at = NOW()
                WHERE i_idpsy = $1`,
        values: [idpsy]

    }

    return pool()
    .query(query)
    .then(res => res)
    .catch(res => {
		// console.log(error)
    	res.status(400).send({
   	      	message : res
		})
	})
}

const addPsy = async (req,res) => {
	const {   v_psy_user,
            v_names,
            v_surnames,
            v_identification,
            v_password,
            v_email,
            v_sex,
            d_birth_date,
            j_about_me,
            j_specialities,
            j_education
 	} = req

	let query = {
		text: ` INSERT INTO psychologists(
                    v_psy_user,
                    v_names,
                    v_surnames,
                    v_identification,
                    v_password,
                    v_email,
                    v_sex,
                    d_birth_date,
                    j_about_me,
                    j_specialities,
                    j_education)
                VALUES (
                	TRIM($1),TRIM($2),TRIM($3),TRIM($4),TRIM($5),$6,$7,$8,$9,$10,$11
                ) RETURNING i_idpsy`,

	    values:[  v_psy_user,
                v_names,
                v_surnames,
                v_identification,
                v_password,
                v_email,
                v_sex,
                d_birth_date,
                j_about_me,
                j_specialities,
                j_education]
	}
	return pool()
    .query(query)
    .then(res => res
    )
    .catch(res => {
    	res.status(500).send({
	      message : 'Ocurrio un error'
	    })
    })
}

const searchPsy = async (req,res) => {
  const {searchfield} = req.body;

	let query = {
        text: ` SELECT a.* 
				          FROM psychologists a
                WHERE TRIM(a.v_user) = $1 OR TRIM(a.v_identification) = $1;`,
		values : [searchfield]
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
	listPsy,
	addPsy,
  deactivatePsy,
  searchPsy
}
