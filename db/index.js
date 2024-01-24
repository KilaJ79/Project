import { makeDb } from "../src/data-access/index.js";
import dotenv from "dotenv";
dotenv.config();

(async function setupDb () {
	console.log("Seting up Database...");
	const db = await makeDb();
	const result = db
	.collection('users')
	console.log(result)
	console.log("Database Setup Complete...")
	process.exit()
})()