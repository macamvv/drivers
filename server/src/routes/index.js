const { Router } = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { driver: Driver, team: Team, driverTeam, } = require("../db");
const axios = require('axios');

const router = Router();

module.exports = router;

const defaultImage = "https://cdn-icons-png.flaticon.com/512/164/164443.png";

// busca todos los drivers
// y buscar los drivers por nombre
router.get('/drivers', async (req, res) => {
    const { name } = req.query;
    let serializedDrivers = [];
    let drivers;
    let allDrivers;

    let driversFromApi = await axios.get("http://localhost:5000/drivers")

    if(name) {
        drivers = await Driver.findAll({
            where: {
                apellido: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: [{
                model: Team,
              }],
        })

    driversFromApi.data = driversFromApi.data.filter(driver => (
            driver.name.surname.includes(name) || driver.name.surname.includes(name.toLowerCase)
        ))
    } else {
        drivers = await Driver.findAll({
            include: [{
                model: Team,
              }],
        });
    }

    // modifico el objeto de la API para que se corresponda con la data de la base de datos
    serializedDrivers = driversFromApi.data.map(driver => (
        {
            id: driver.id,
            nombre: driver.name.forename,
            fecha_de_nacimiento: driver.dob,
            apellido: driver.name.surname,
            nacionalidad: driver.nationality,
            imagen: driver.image && driver.image.url ? driver.image.url : defaultImage,
            descripcion: driver.description,
            fromApi: true,
            teams: driver.teams ? driver.teams.split(/,\s*/) : [],
        }
    ))

    const dbDriversSerialized = drivers.map(driver => ({
        ...driver.dataValues,
        imagen: driver.dataValues.imagen || defaultImage,
        fromApi: false,
        teams: driver.dataValues.teams.map(team => team.dataValues.nombre)
    }))
    allDrivers = dbDriversSerialized.concat(serializedDrivers)

    return res.status(200).json(allDrivers)
});

// busca driver por id
router.get('/drivers/:idDriver', async (req, res) => {
    try {
        const { idDriver } = req.params;

        const driverDataBase = await Driver.findByPk(idDriver, {
            include: [{
                model: Team,
              }],
        });

        if (driverDataBase !== null) {
            const driverDataBaseData = driverDataBase.dataValues;
            let teams = [];
            
            if(driverDataBaseData.teams) {
                const serializedTeams = driverDataBaseData.teams.map(team => team.dataValues.nombre)
                teams = serializedTeams;
            }

            const serializedDriver = {
                ...driverDataBaseData,
                imagen: driverDataBaseData.imagen || defaultImage,
                teams,
            }
            return res.status(200).send(serializedDriver)
        };
        const driverFromApi = await axios.get(`http://localhost:5000/drivers/${idDriver}`) 

        if (driverFromApi === null) throw new Error({error: []})

        const serializedDriver = {
            id: driverFromApi.data.id,
            nombre: driverFromApi.data.name.forename,
            fecha_de_nacimiento: driverFromApi.data.dob,
            apellido: driverFromApi.data.name.surname,
            nacionalidad: driverFromApi.data.nationality,
            imagen: driverFromApi.data.image ? driverFromApi.data.image.url : defaultImage,
            descripcion: driverFromApi.data.description,
            teams: driverFromApi.data.teams ? driverFromApi.data.teams.split(/,\s*/) : [],
        }

        return res.status(200).send(serializedDriver)


    } catch (error) {
        res.status(500).send(error.message) // error que proviene del axios
    }
});

// crear driver
router.post("/drivers", async (req, res) => {
    const { nombre, apellido, fecha_de_nacimiento, descripcion, nacionalidad, imagen, teams } = req.body;
    let id;
    const dbDrivers = await Driver.findAll({
        order: [
            ['id', 'DESC'],
        ],
    })

    if(dbDrivers && dbDrivers[0] && dbDrivers[0].dataValues.id) {
        id = dbDrivers[0].dataValues.id + 1
    } else {
        const driverFromApi = await axios.get(`http://localhost:5000/drivers/`) 
        id = driverFromApi.data[driverFromApi.data.length - 1].id + 1
    }

    try {
        // crea driver en BD
        const newDriver = await Driver.create({
            id, nombre, apellido, fecha_de_nacimiento, descripcion, nacionalidad, imagen
        })
    
        //crea la relacion entre los teams y el driver recien creado
        for (let index = 0; index < teams.length; index++) {
            const team = teams[index];
            await driverTeam.create({ driver_id: newDriver.id, team_id: team });
        }
    
        res.status(200).send({response: "Successfully added the driver"})
    } catch (error) {
        res.status(500).send({response: "Error adding new driver"})
    }
})


router.get('/teams', async (req, res)=> {
    try {
        const teams = await Team.findAll({ raw: true });
        return res.status(200).json(teams)
    } catch (error){
        res.status(500).send(error.message)
    }
})
