const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model / user inherits all functionality of the model
class User extends Model {}

// define table columns and configuration
User.init(
    // TABLE COLUMN DEFINITIONS GO HERE
    {
        id: {
            // use the special sequelize dataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            //  this is the equivalent of sql's NOT NULL 
            allowNull: false,
            //  instruct that this is a primary key
            primaryKey: true,
            // turn on auto incremenmt
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email values in this table
            unique: true,
            // if allowNull is set to false, we can run our data through validators before creating table data
            validate: {
                isEmail: true
            }
        },
        // define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // password must be at least four chars long
                len: [4]
            }
        }
    },
  {
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;