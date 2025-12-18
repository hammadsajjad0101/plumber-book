"use strict";

module.exports = {
  up: async (queryInterface) => {
    const { allPermissions } = require("../utils/permissions");
    const t = await queryInterface.sequelize.transaction();
    try {
      const now = new Date();
      const perms = allPermissions().map((name) => ({
        name,
        createdAt: now,
        updatedAt: now,
      }));
      await queryInterface.bulkInsert("permissions", perms, {
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
    const { allPermissions } = require("../utils/permissions");
    await queryInterface.bulkDelete("permissions", {
      name: allPermissions(),
    });
  },
};
