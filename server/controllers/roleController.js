const { Op } = require("sequelize");
const { Role, Permission } = require("../models");
const { HTTP_STATUS } = require("../utils/constants");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/helper/responseHelper");

const createRole = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return sendErrorResponse(
        res,
        "Role name is required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const existing = await Role.findOne({ where: { name } });
    if (existing) {
      return sendErrorResponse(
        res,
        "Role already exists",
        HTTP_STATUS.CONFLICT
      );
    }

    const role = await Role.create({ name, description });
    return sendSuccessResponse(
      res,
      role,
      "Role created successfully",
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    next(error);
  }
};

const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    return sendSuccessResponse(
      res,
      roles,
      "Roles retrieved successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

const getRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return sendErrorResponse(res, "Role not found", HTTP_STATUS.NOT_FOUND);
    }

    return sendSuccessResponse(
      res,
      role,
      "Role retrieved successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const role = await Role.findByPk(id);
    if (!role) {
      return sendErrorResponse(res, "Role not found", HTTP_STATUS.NOT_FOUND);
    }

    if (name) {
      // Check for name conflict
      const existing = await Role.findOne({
        where: { name, id: { [Op.ne]: id } },
      });
      if (existing) {
        return sendErrorResponse(
          res,
          "Role name already exists",
          HTTP_STATUS.CONFLICT
        );
      }
      role.name = name;
    }

    if (description !== undefined) role.description = description;

    await role.save();

    return sendSuccessResponse(
      res,
      role,
      "Role updated successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return sendErrorResponse(res, "Role not found", HTTP_STATUS.NOT_FOUND);
    }

    await role.destroy();

    return sendSuccessResponse(
      res,
      null,
      "Role deleted successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

const assignPermissionsToRole = async (req, res, next) => {
  try {
    const { roleId } = req.params;
    const { permissionIds = [] } = req.body;

    const role = await Role.findByPk(roleId);
    if (!role) {
      return sendErrorResponse(res, "Role not found", HTTP_STATUS.NOT_FOUND);
    }

    if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
      return sendErrorResponse(
        res,
        "permissionIds array is required and cannot be empty",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const permissions = await Permission.findAll({
      where: { id: permissionIds },
    });
    if (permissions.length !== permissionIds.length) {
      return sendErrorResponse(
        res,
        "Some permissions not found",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    await role.setPermissions(permissions);

    return sendSuccessResponse(
      res,
      null,
      "Permissions assigned to role successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

const getPermissionsOfRole = async (req, res, next) => {
  try {
    const { roleId } = req.params;
    const role = await Role.findByPk(roleId, {
      include: {
        model: Permission,
        as: "permissions",
        through: { attributes: [] },
        attributes:["name"],
      },
    });
    if (!role) {
      return sendErrorResponse(res, "Role not found", HTTP_STATUS.NOT_FOUND);
    }

    return sendSuccessResponse(
      res,
      role,
      "Permissions of role retrieved successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignPermissionsToRole,
  getPermissionsOfRole,
};
