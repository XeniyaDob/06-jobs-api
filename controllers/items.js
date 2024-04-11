const Item = require("../models/Item");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllItems = async (req, res) => {
  res.send("get all plants");
};

const getItem = async (req, res) => {
  res.send("get plant");
};

const createItem = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const item = await Item.create(req.body);

  res.status(StatusCodes.CREATED).json({ item });
};

const updateItem = async (req, res) => {
  res.send("update plant");
};

const deleteItem = async (req, res) => {
  res.send("delete plant");
};

module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
