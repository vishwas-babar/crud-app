import {Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crud_app',
    password: 'Vishwas@7769',
    port: 5432,
})


export default pool;