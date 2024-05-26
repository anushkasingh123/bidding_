const itemService = require('../Services/itemService');

const createItem = async (req, res) => {
  try {
    const result = await itemService.createItem(req);
    return res.send({
      status:200,
      message:"item added",
      data:result,
    })    
  } catch (error) {
    return res.send({
      status:500,
      message:"internal server error",
      error:error
    })   
  }
};


const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await itemService.getItemById(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateItem = async (req, res) => {
  try {
    const item = await itemService.updateItem(req);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await itemService.deleteItem(id);
    if (!item) {
      res.status(404);
    }
    res.send({
      message: "item deleted successfully",
      status: 200,
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await itemService.getItems(req);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createItem,
  getItemById,
  updateItem,
  deleteItem,
  getItems,
};