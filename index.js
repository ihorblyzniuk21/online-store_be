const express = require ("express");
require ('dotenv/config');
const cors = require ("cors");
const sequelize = require("./database/db");
const db = require('./models')
const router = require("./routes/index");
const fileUpload = require('express-fileupload');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

const start = async () => {
	try {
		await db.sequelize.sync();
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start();