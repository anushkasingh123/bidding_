const Bid = require('../Models/Bid.Model');
const Item = require('../Models/ItemModel');
const User = require('../Models/UserModel')
const Notification = require('../Models/Notification.Model');

exports.getBidsForItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const bids = await Bid.findAll({ where: { item_id: itemId }, order: [['created_at', 'DESC']] });
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.placeBid = async (req, res) => {
  console.log(req.body);
  const { itemId } = req.params;
  const { bid_amount } = req.body;
  console.log(bid_amount);

  const {email,role}=req.user.userinfo;
  const userdb = await User.findOne({where: {email:email}});
  const userId=userdb.id;
  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    console.log("paisa",item.current_price);
    console.log(bid_amount <= item.current_price)
    if (bid_amount <= item.current_price) {
      
      return res.status(400).json({ error: 'Bid amount must be higher than current price' });
    }
    const bid = await Bid.create({ item_id: itemId, user_id: userId, bid_amount });
    await item.update({ current_price: bid_amount });
    const itemOwnerUserId = item.userId;
    const notification = await Notification.create({user_id:itemOwnerUserId,message: "Your item has a bid",is_read:false});
    return res.send({
      data: {bid,notification},
      status: 200,
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};