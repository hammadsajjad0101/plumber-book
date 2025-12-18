// utils/permissions.js

const PERMISSIONS = {
  user: {
    CREATE: 'user_create',
    READ:   'user_read',
    UPDATE: 'user_update',
    DELETE: 'user_delete',
  },
};

function allPermissions() {
  return Object
    .values(PERMISSIONS)
    .map(Object.values)
    .flat();
}

module.exports = {
  PERMISSIONS,
  allPermissions,
};
