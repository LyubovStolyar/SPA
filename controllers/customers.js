const database = require('./database');
const joi = require('joi');

module.exports = {
    getCustomers: async function (req, res, next) {
        const sql = `SELECT * FROM customers;` // ORDER BY name ASC;`;
        console.log(sql);
        try {
            const result = await database.query(sql);
            res.json(result[0]);
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    },

    registerCustomer: async function (req, res, next) {
        const schema = joi.object({
            first_name: joi.string().required().min(2).max(50),
            last_name: joi.string().required().min(2).max(50),
            email: joi.string().required().email().min(6).max(255),
            phone: joi.string().required().min(7).max(13),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(400).send('error sign up new customer');
            return;
        }

        const sql = `INSERT INTO customers (first_name, last_name, email, phone) VALUES(?,?,?,?)`;

        try {
   
            const result = await database.query(sql, [
                value.first_name,
                value.last_name,
                value.email,
                value.phone
            ]);

            res.json({
                id: result[0].insertId,
                first_name: value.first_name,
                last_name: value.last_name,
                email: value.email,
                phone: value.phone,
            })
        }
        catch (err) {
            console.log(err.message);
            res.status(400).send('error sign up new customer');
        }
    },
    updateCustomer: async function (req, res, next) {
        const schema = joi.object({
            first_name: joi.string().required().min(2).max(50),
            last_name: joi.string().required().min(2).max(50),
            email: joi.string().required().email().min(6).max(255),
            phone: joi.string().required().min(7).max(13),
            id: joi.required()
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(400).send('error sign up new customer');
            return;
        }

        const sql = `UPDATE customers SET first_name='${value.first_name}', last_name='${value.last_name}', email='${value.email}', phone='${value.phone}' WHERE id=${value.id}`;

        try {
   
            const result = await database.query(sql
            //     , 
            //     [
            //     value.first_name,
            //     value.last_name,
            //     value.email,
            //     value.phone,
            // ]
            );

            res.json({
                id: value.id,
                first_name: value.first_name,
                last_name: value.last_name,
                email: value.email,
                phone: value.phone,
            })
        }
        catch (err) {
            console.log(err.message);
            res.status(400).send('error update customer');
        }
    },

    deleteCustomer: async function (req, res, next) {
      
        const sql = `DELETE FROM customers WHERE id=?;` 
        console.log(sql);
        try {
            const result = await database.query(sql, req.params.id);
            res.json(result[0]);
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    },
  
}