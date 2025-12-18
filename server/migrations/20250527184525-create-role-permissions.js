"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("role_permissions", {
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
        primaryKey: true,
      },
      permissionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "permissions",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
        primaryKey: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("role_permissions");
  },
};
