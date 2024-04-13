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
  const {
    body: { name, price, description },
    user: { userId },
    params: { id: itemId },
  } = req;

  if (!name || !price || !description) {
    throw new BadRequestError(
      "Please provide all required values - name, price, description"
    );
  }
  const item = await Item.findOneAndUpdate(
    { _id: itemId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!item) {
    throw new NotFoundError(`No item with id ${itemId}`);
  }
  res.status(StatusCodes.OK).json({ item });
};

const deleteItem = async (req, res) => {
  const {
    user: { userId },
    params: { id: itemId },
  } = req;

  const item = await Item.findOneAndRemove({
    _id: itemId,
    createdBy: userId,
  });

  if (!item) {
    throw new NotFoundError(`No item with id ${itemId}`);
  }
  res.status(StatusCodes.OK).send("Item deleted");
};

module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
