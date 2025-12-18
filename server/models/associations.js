module.exports = (models) => {
  const { User, Role, Permission } = models;

 
  User.belongsTo(Role, { foreignKey: 'roleId', as: "role" });
  Role.hasMany(User, { foreignKey: 'roleId', as:"users" });

  Role.belongsToMany(Permission, {
    as: 'permissions',
    through: 'role_permissions',
    foreignKey: 'roleId',
    otherKey: 'permissionId',
    timestamps: false,
  });

  Permission.belongsToMany(Role, {
    as: 'roles',
    through: 'role_permissions',
    foreignKey: 'permissionId',
    otherKey: 'roleId',
    timestamps: false,
  });
};
