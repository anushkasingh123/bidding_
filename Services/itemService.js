const { where } = require('sequelize');
const Item = require('../Models/ItemModel.js');
const User = require('../Models/UserModel.js')

const createItem = async (req) => {
  let imageUrl=""
   /*try {
    if(req.file){
      const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "uploads",
      })};
      imageUrl = result.secure_url
    
  // } catch (error) {
    
   //}*/
   console.log(req.file);
   const {email,role}=req.user.userinfo;
   console.log("mail",email);
   const userdb = await User.findOne({where: {email:email}});
   console.log("userdb",userdb);
   console.log("idd",userdb.id);

    const { name, description, starting_price} = req.body;
  
      const item = await Item.create({ name, description, starting_price, current_price: starting_price,imageUrl,userId:userdb.id })
      console.log(item);
      return item;
  };

const getItemById = async (id) => {
  console.log(id);

  const item = await Item.findByPk(id);
  if(!item)
    {
      return null;
    }
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

const deleteItem = async (req) => {
  const { id } = req.params;
  const {email,role}=req.user.userinfo;
  const userdb = await User.findOne({where: {email:email}});
      const item = await Item.findByPk(id);
      if(!item)
        {
            return "item not found";
        }
        if(item.userId===userdb.id)
          {
            await item.destroy();

          }
          return "you can not delete unauthourize item";
      

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

