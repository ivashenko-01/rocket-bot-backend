import PodpiskaModel from '../models/Podpiska.js';


export const create = async (req, res) => {
  try {
    const doc = new PodpiskaModel({
      id: req.body.id,
      username: req.body.username,
      guildgrope: req.body.guildgrope,
      availability: req.body.availability,
      lvl: req.body.lvl,
      term: req.body.term,
      data: req.body.data,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

