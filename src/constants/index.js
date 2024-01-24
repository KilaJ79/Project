const dbName = process.env.DB_NAME || "iva"

const appConstants = Object.freeze({
  dbName
})

export default appConstants;
export {
  dbName
}