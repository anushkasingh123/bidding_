const Bid = require('../Models/Bid.Model');
const Item = require('../Models/ItemModel');

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
  const { itemId } = req.params;
  const { bid_amount } = req.body;
  const userId = req.user.userId;
  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    if (bid_amount <= item.current_price) {
      return res.status(400).json({ error: 'Bid amount must be higher than current price' });
    }
    const bid = await Bid.create({ item_id: itemId, user_id: userId, bid_amount });
    await item.update({ current_price: bid_amount });
    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};