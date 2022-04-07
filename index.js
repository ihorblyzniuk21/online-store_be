const express = require ("express");
require ('dotenv/config');
const cors = require ("cors");
const cookieParser = require('cookie-parser');
const sequelize = require("./database/db");
const db = require('./models')
const router = require("./routes/index");
const fileUpload = require('express-fileupload');
const path = require('path');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
	try {
		await db.sequelize.authenticate();
		await db.sequelize.sync();
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start();