module.exports = (database) => {
    const index = async (req, res) => {
        const regNumbers = await database.getRegNumbers()
        const towns = await database.getAllTowns()
        res.render("index", {
            towns,
            regNumbers
        })
    }

    const add = async (req, res) => {
        let regNumber = req.body.regNumber
        regNumber = regNumber.toUpperCase().trim()
        let code = regNumber.slice(0,2)
        const regex = /[A-Z]{2,3}\s[0-9]{3}(\-|\s)?[0-9]{3}/
        const town = await database.findTownCode(code)
        const duplicate = await database.findRegNumber(regNumber)

        if(!regex.test(regNumber)){
            req.flash("error", "Please enter valid registration number")
        } else if(!town){
            req.flash("error", "Registration code not accepted")
        } else if(duplicate){
            req.flash("error", "Registration number already exists")
        } else {
            req.flash("success", "Registration number added successfully")
            await database.addRegNumber(regNumber, town.id)
        }
        res.redirect("/")
    }

    const filter = (req, res) => {
        let town = req.body.town
        if(town == "all"){
            res.redirect("/")
        } else {
            res.redirect("/filter/"+town)
        }
    }

    const filtered = async (req, res) => {
        let town = req.params.town
        let towns = await database.getAllTowns()
        const regNumbers = await database.getRegNumbersForTown(town)
        res.render("index", {
            towns,
            regNumbers
        })
    }

    return {
        index,
        add,
        filter,
        filtered
    }
}
