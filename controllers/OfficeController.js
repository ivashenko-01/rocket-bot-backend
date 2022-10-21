import PostModel from '../models/Post.js';

import UserSiteModel from '../models/UserSite.js';



export const getOne = async (req, res) => {
  try {
    const user = await UserSiteModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};
