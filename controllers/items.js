const getAllItems = async (req, res) => {
  res.send("get all plants");
};

const getItem = async (req, res) => {
  res.send("get plant");
};

const createItem = async (req, res) => {
  res.send("create plant");
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
