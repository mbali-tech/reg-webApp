module.exports = (db) => {

    const findTownCode = async code => {
        const town = await db.oneOrNone("SELECT * FROM towns WHERE code = $1", [code])
        return town
    }

    const addRegNumber = async (regNumber, town_code) => {
        db.none("INSERT INTO regNumbers (regNumber, town_code) VALUES ($1, $2)", [regNumber, town_code])
    }

    const getRegNumbers = async () => {
        const regNumbers = await db.manyOrNone("SELECT * FROM regNumbers")
        return regNumbers
    }

    const findRegNumber = async regNumber => {
        const results = await db.oneOrNone("SELECT * FROM regNumbers WHERE regNumber = $1", [regNumber])
        return results
    }

    return {
        findTownCode,
        addRegNumber,
        getRegNumbers,
        findRegNumber
    }
}