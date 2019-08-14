const  mysql = require('mysql2/promise');

let pool = mysql.createPool({
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : 'Daniel87',
    database : 'mvxd008',            //mvxmdl001, custmetamaster, customer, testent, banking, workingcustomer, custmeta03, bankingmeta02, mvxmdl001, CstMMst002, drawingCustomer
    gracefulexit    :  true
})

pool.getConnection((err, connection) => {
    //hello
    if (err) 
    {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') 
        {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') 
        {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') 
        {
            console.error('Database connection was refused.')
        }
    }

    if (connection) 
    	connection.release()
    return
})


module.exports = pool;