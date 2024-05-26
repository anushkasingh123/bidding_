const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel.js');

const register = async (req, res) => {
  const { username, password, email, role } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT) );
    const user = await User.create({ username, password: hashedPassword, email, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const { email, password,role } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({userId:user.id}, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {register,login}