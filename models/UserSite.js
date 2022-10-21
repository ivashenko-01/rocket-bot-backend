import mongoose from 'mongoose';

const UserSiteSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Уникальность
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String, 
    guildId: {
        type: String,
        default: 'Не указали'
    },
    guildName: {
        type: String,
        default: 'Не указали'
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    
}, {
    timestamps: true, 
});

export default mongoose.model('UserSite', UserSiteSchema)