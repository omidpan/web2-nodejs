import mysql,{Pool} from 'mysql2';

const pool : Pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'mypassword',
    database:'mydb',
    connectionLimit:10, // this is the number of connections that we can have simultasly .
});

export default pool.promise();