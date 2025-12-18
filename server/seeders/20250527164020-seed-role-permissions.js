"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    const Sequelize = require("sequelize");
    const { ROLES } = require("../utils/constants");
    const { allPermissions } = require("../utils/permissions");

    const t = await queryInterface.sequelize.transaction();
    try {
      const now = new Date();

      const [roleRow] = await queryInterface.sequelize.query(
        "SELECT id FROM roles WHERE name = :roleName LIMIT 1",
        {
          replacements: { roleName: ROLES.ADMIN },
          type: Sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      );
      if (!roleRow) throw new Error(`Role "${ROLES.ADMIN}" not found`);
      const adminRoleId = roleRow.id;

      const permRows = await queryInterface.sequelize.query(
        "SELECT id, name FROM permissions WHERE name IN (:names)",
        {
          replacements: { names: allPermissions() },
          type: Sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      );

      const inserts = permRows.map((p) => ({
        roleId: adminRoleId,
        permissionId: p.id,
      }));

      await queryInterface.bulkInsert("role_permissions", inserts, {
        ignoreDuplicates: true,
        transaction: t,
      });

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  down: async (queryInterface) => {
    const { ROLES } = require("../utils/constants");
    const Sequelize = require("sequelize");

    const [roleRow] = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE name = :roleName LIMIT 1",
      {
        replacements: { roleName: ROLES.ADMIN },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    if (roleRow && roleRow.id) {
      await queryInterface.bulkDelete("role_permissions", {
        roleId: roleRow.id,
      });
    }
  },
};
