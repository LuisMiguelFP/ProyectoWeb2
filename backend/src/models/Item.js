import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Item = sequelize.define("Item", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    defaultValue: "medium",
  },

  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  tags: {
    type: DataTypes.JSON, 
    defaultValue: [],
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

export default Item;
