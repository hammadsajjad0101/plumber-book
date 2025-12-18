"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    const { ROLES } = require("../utils/constants");
    const t = await queryInterface.sequelize.transaction();
    try {
      const now = new Date();
      const data = Object.values(ROLES).map((name) => ({
        name,
        createdAt: now,
        updatedAt: now,
      }));
      await queryInterface.bulkInsert("roles", data, {
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
    await queryInterface.bulkDelete("roles", {
      name: Object.values(ROLES),
    });
  },
};
