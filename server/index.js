const axios = require("axios");
const server = require("./src/server");
const { conn, team } = require('./src/db.js');
const PORT = 3000;

conn.sync({ force: false }).then(async () => {
  // Carga los teams en la base de datos sacandolos de la API db.json
  
  const teamsCount = await team.count();
  if(!teamsCount) {
    const driversFromApi = await axios.get("http://localhost:5000/drivers");
    let teamsNotRepeated = new Set();
    driversFromApi.data.forEach(({ teams, id }) => {
      if(teams) {
        const teamsArray = teams.split(/,\s*/);
        teamsArray.forEach(team => teamsNotRepeated.add(team))
      }
    })

    const allTeamsToCreate = Array.from(teamsNotRepeated)
    for (let index = 0; index < allTeamsToCreate.length; index++) {
      const teamName = allTeamsToCreate[index];

     
      await team.create({nombre: teamName});  // con el modelo team crea en la BD
    }

  }
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);

  })
}).catch(error => console.error(error))
