const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "project",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title cannot be null",
        },
        notEmpty: {
          msg: "Title cannot be empty",
        },
      },
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: "isFeatured value must be true or false",
        },
      },
    },
    productImage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product Image cannot be null",
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price cannot be null",
        },
        isDecimal: {
          msg: "Price value must be in decimal format",
        },
      },
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Short description cannot be null",
          },
          notEmpty: {
            msg: "Short description cannot be empty",
          },
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description cannot be null",
        },
        notEmpty: {
          msg: "Description cannot be empty",
        },
      },
    },
    productUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product url cannot be null",
        },
        notEmpty: {
          msg: "Product url cannot be empty",
        },
        isUrl: {
          msg: "Invalid product url string",
        },
      },
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        notNull: {
          msg: "Category cannot be null",
        },
      },
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        notNull: {
          msg: "Tags cannot be null",
        },
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    // * paranoid: true -> used to enable soft deletes for a model
    // * paranoid: true -> works only if deletedAt is defined in the migration file
    // * deletedAt can be omitted in the model file
    paranoid: true,
    freezeTableName: true,
    modelName: "project",
  }
);
