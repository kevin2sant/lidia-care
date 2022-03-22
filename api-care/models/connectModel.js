const { Pool } = require('pg')

module.exports = pool = () => {
    return new Pool({
        // dev
        host: 'lidiadev.ca1qq9liaacg.us-east-2.rds.amazonaws.com',
        
        // prod
        // host: 'pgflock.cikycp4byzkz.us-east-2.rds.amazonaws.com',
        
        password: 'l1d14,2022',
        user: 'postgres',
        database: 'lidia-care',
        port: '5432'
    })
}