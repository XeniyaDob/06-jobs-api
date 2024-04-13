const Item = require("../models/Item");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllItems = async (req, res) => {
  const items = await Item.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ items, count: items.length });
};

const getItem = async (req, res) => {
  const {
    user: { userId },
    params: { id: itemId },
  } = req;

  const item = await Item.findOne({ _id: itemId, createdBy: userId });

  if (!item) {
    throw new NotFoundError(`No plant item with id ${itemId}`);
  }
  res.status(StatusCodes.OK).json({ item });
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
