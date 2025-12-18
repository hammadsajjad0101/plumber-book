require("dotenv").config();
const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/helper/responseHelper");
const { HTTP_STATUS, ROLES } = require("../utils/constants");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    roleId: user.roleId,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return sendErrorResponse(
        res,
        "All fields are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const existing = await User.findOne({
      where: { email },
    });
    if (existing) {
      return sendErrorResponse(
        res,
        "Email already exists",
        HTTP_STATUS.CONFLICT
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const roleName = role || ROLES.USER;
    const roleRecord = await Role.findOne({
      where: { name: roleName },
    });
    if (!roleRecord) {
      return sendErrorResponse(
        res,
        `Role "${roleName}" not found`,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      roleId: roleRecord.id,
    });

    const token = generateToken(user);
    const userData = user.toJSON();
    delete userData.password;

    return sendSuccessResponse(
      res,
      { user: userData, token },
      "User registered successfully",
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendErrorResponse(
        res,
        "Email and password are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendErrorResponse(
        res,
        "Invalid email or password",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendErrorResponse(
        res,
        "Invalid email or password",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const token = generateToken(user);

    const userData = user.toJSON();
    delete userData.password;

    return sendSuccessResponse(
      res,
      { user: userData, token },
      "Login successful",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return sendSuccessResponse(
      res,
      users,
      "Users retrieved successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return sendErrorResponse(res, "User not found", HTTP_STATUS.NOT_FOUND);
    }

    return sendSuccessResponse(
      res,
      user,
      "User retrieved successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, password, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return sendErrorResponse(res, "User not found", HTTP_STATUS.NOT_FOUND);
    }

    if (email) {
      const conflict = await User.findOne({
        where: {
          email,
          id: { [Op.ne]: id },
        },
      });
      if (conflict) {
        return sendErrorResponse(
          res,
          "Email already in use",
          HTTP_STATUS.CONFLICT
        );
      }
    }

    const updatedData = {
      firstName: firstName ?? user.firstName,
      lastName: lastName ?? user.lastName,
      email: email ?? user.email,
      phone: phone ?? user.phone,
      roleId: undefined,
    };

    if (role) {
      const roleRecord = await Role.findOne({
        where: { name: role },
      });
      if (!roleRecord) {
        return sendErrorResponse(
          res,
          `Role "${role}" not found`,
          HTTP_STATUS.BAD_REQUEST
        );
      }
      updatedData.roleId = roleRecord.id;
    } else {
      updatedData.roleId = user.roleId;
    }

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    await user.update(updatedData);

    const updatedUser = user.toJSON();
    delete updatedUser.password;

    return sendSuccessResponse(
      res,
      updatedUser,
      "User updated successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return sendErrorResponse(res, "User not found", HTTP_STATUS.NOT_FOUND);
    }

    await user.destroy();

    return sendSuccessResponse(
      res,
      null,
      "User deleted successfully",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
