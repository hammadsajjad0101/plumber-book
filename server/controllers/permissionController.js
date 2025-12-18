const { Op } = require("sequelize");
const { Permission } = require("../models");
const { HTTP_STATUS } = require("../utils/constants");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/helper/responseHelper");

const createPermission = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return sendErrorResponse(
        res,
        "Permission name is required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const existing = await Permission.findOne({ where: { name } });
    if (existing) {
      return sendErrorResponse(
        res,
        "Permission already exists",
        HTTP_STATUS.CONFLICT
      );
    }

    const permission = await Permission.create({ name, description });
    return sendSuccessResponse(
      res,
      permission,
      "Permission created successfully",
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllPermissions = async (req, res, next) => {
  try {
    const permissions = await Permission.findAll();
    return sendSuccessResponse(
      res,
      permissions,
      "Permissions retrieved successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

const getPermissionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);
    if (!permission) {
      return sendErrorResponse(
        res,
        "Permission not found",
        HTTP_STATUS.NOT_FOUND
      );
    }

    return sendSuccessResponse(
      res,
      permission,
      "Permission retrieved successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const permission = await Permission.findByPk(id);
    if (!permission) {
      return sendErrorResponse(
        res,
        "Permission not found",
        HTTP_STATUS.NOT_FOUND
      );
    }

    if (name) {
      const existing = await Permission.findOne({
        where: { name, id: { [Op.ne]: id } },
      });
      if (existing) {
        return sendErrorResponse(
          res,
          "Permission name already exists",
          HTTP_STATUS.CONFLICT
        );
      }
      permission.name = name;
    }
    if (description !== undefined) permission.description = description;

    await permission.save();

    return sendSuccessResponse(
      res,
      permission,
      "Permission updated successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deletePermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);
    if (!permission) {
      return sendErrorResponse(
        res,
        "Permission not found",
        HTTP_STATUS.NOT_FOUND
      );
    }

    await permission.destroy();

    return sendSuccessResponse(
      res,
      null,
      "Permission deleted successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
