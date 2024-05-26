const Item = require('../Models/ItemModel.js');

const createItem = async (req) => {
  console.log(req.body);
    const { name, description, starting_price,/*, image_url */} = req.body;
  
      const item = await Item.create({ name, description, starting_price, current_price: starting_price,/* image_url*/ })
      console.log(item);
      return item;
  };

const getItemById = async (id) => {

  const item = await Item.findByPk(id);
  const { name, description, starting_price, current_price }=item;
  const new_item={name:name, description:description, starting_price:starting_price,current_price:current_price};
    return   new_item;
;
      
  };

const updateItem = async (req) => {
    const { id } = req.params;
    const { name, description, starting_price, end_time/*, image_url*/ } = req.body;
      const item = await Item.findByPk(id);
      await item.update({ name, description, starting_price, end_time/*, image_url */});
      return item;

  };

const deleteItem = async (id) => {
      const item = await Item.findByPk(id);
      if(!item)
        {
            return "item not found";
        }
      await item.destroy();

  };


const getItems = async (req) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

      const items = await Item.findAll({ limit, offset });
      return items;

  };

  module.exports = {
    createItem,
    getItemById,
    updateItem,
    deleteItem,
    getItems,
  };

