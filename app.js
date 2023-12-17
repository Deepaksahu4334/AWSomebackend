const express = require('express');
const cors = require('cors');
var pgp = require('pg-promise')();

const app = express();

app.use(cors());
app.use(express.json());

const db = pgp('postgres://postgres:1234@localhost:5432/bank');
db.connect();

// const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(50) UNIQUE NOT NULL,
//         email VARCHAR(100) UNIQUE NOT NULL,
//         mobile VARCHAR(20) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL
//     );
// `;

// db.none(createTableQuery)
//     .then(() => {
//         console.log('Table created successfully');
//     })
//     .catch(error => {
//         console.error('Error creating table:', error);
//     });



app.post('/signup',(req,res)=>{
    console.log(req.body);
    const insertQuery = pgp.helpers.insert(req.body,null,'users');
    db.none(insertQuery)
      .then(()=>{
        console.log('User saved')
      })
      .catch(err=>{
        console.log("error inserting data:",err);
      });
})

app.get('/', (req, res) => {
    
});

app.get('/', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});



