import { pool } from "./_dbConfig.js";


export const createUser = async (req, res) => {
    try {
        const { username, firstname, lastname, email, phonenumber, password } = req.body;

        if (!firstname || !lastname || !email || !phonenumber) {
            return res.status(400).send("Not all data is filled in")
        }

        const checkUser = `
        SELECT * FROM users 
        WHERE username = $1 
        OR email =$2
        `
        const checkValues = [username, email]
        const checkResult = await pool.query(checkUser, checkValues)

        if (checkResult.rows.length > 0) {
            return res.status(400).send("User already exist")
        }

        const query = `INSERT INTO users 
        (username, 
        firstname, 
        lastname, 
        email, 
        phonenumber, 
        password)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id`

        const values = [username, firstname, lastname, email, phonenumber, password]
        const result = await pool.query(query, values)

        res.status(201).send({ message: "New user created", userId: result.rows[0].id })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, firstname, lastname, email, phonenumber, password } = req.body;


        const query = `
        UPDATE users
        SET username = $1,
            firstname = $2,
            lastname = $3,
            email = $4,
            phonenumber = $5,
            password = $6
        WHERE id = $7 
        RETURNING *;
        `
        const values = [username, firstname, lastname, email, phonenumber, password, id]
        const { rows } = await pool.query(query, values)

        if (rows.length === 0) {
            return res.status(404).send("Cannot find anything")
        }

        res.status(200).json(rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).send("Some error has occured failed")
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
        DELETE FROM users
        WHERE id = $1 
        RETURNING *;
        `
        const { rows } = await pool.query(query, [id])
        res.status(200).json(rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).send("Some error has occured")
    }
}