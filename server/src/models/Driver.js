const { DataTypes, literal } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('driver', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
 
    imagen: {
      type: DataTypes.STRING(500)
    },
    nacionalidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_de_nacimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, { timestamps: false });
};