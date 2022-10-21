import mongoose from 'mongoose';

const PodpiskaSchema = new mongoose.Schema(
  {
    id: String,
    username: {
        type: String,
        default: 'user'
    },
    guildgrope: {
        type: String,
        default: 'Не указали',
    },
    status: {
        type: String,
        default: 'Активна'
    },
    data: {
        type: String,
        default: 'Не указали'
    },
    availability: {
        type: String,
        default: 'Нет'
    },
    term: {
        type: String,
        default: 'Без срока'
    },
    avtoinfo: {
        type: Number,
        default: 0
    },
    rentcar: {
        type: Number,
        default: 0
    },
    auctionCount: {
        type: Number,
        default: 0
    },
    lvl: {
        type: String,
        default: 'Обычный'
    },
  },
);

export default mongoose.model('Podpiska', PodpiskaSchema, 'Podpiskas');