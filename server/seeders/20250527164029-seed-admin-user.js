"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const { ROLES } = require("../utils/constants");
const { allPermissions } = require("../utils/permissions");

module.exports = {
  up: async (queryInterface) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      const now = new Date();

      // 1️⃣ Get the admin role ID
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

      const [existing] = await queryInterface.sequelize.query(
        "SELECT id FROM users WHERE email = :email LIMIT 1",
        {
          replacements: { email: "admin@example.com" },
          type: Sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      );
      if (!existing) {
        const hashed = await bcrypt.hash("Admin@123", 12);
        await queryInterface.bulkInsert(
          "users",
          [
            {
              firstName: "Admin",
              lastName: "User",
              email: "admin@example.com",
              phone: "0000000000",
              password: hashed,
              roleId: adminRoleId,
              createdAt: now,
              updatedAt: now,
            },
          ],
          { transaction: t }
        );
      }

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", { email: "admin@example.com" });
  },
};
