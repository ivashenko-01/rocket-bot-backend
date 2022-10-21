import PostModel from '../models/Post.js';

import UserSiteModel from '../models/UserSite.js';



export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    UserSiteModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось вернуть пользователя',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Пользователь не найден',
          });
        }

        res.json(doc);
      },
    ).populate('user');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить пользователя',
    });
  }
};
