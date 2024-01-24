import makeUsersDb from "./users-db.js";
import { getInstance } from "../db-client/mongodb.js";

const usersDb = makeUsersDb({ getInstance });

const dbAccess = Object.freeze({
  usersDb
})

export default dbAccess
export {
  usersDb
}