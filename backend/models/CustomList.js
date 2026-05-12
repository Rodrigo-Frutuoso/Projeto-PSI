const mongoose = require('mongoose');

const customListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'O utilizador é obrigatório.']
    },
    name: {
        type: String,
        required: [true, 'O nome da lista é obrigatório.'],
        trim: true,
        maxlength: [100, 'O nome da lista não pode exceder 100 carateres.']
    },
    albums: [{
        album: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album',
            required: true
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Índice composto único: o mesmo utilizador não pode ter duas listas com o mesmo nome
customListSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('CustomList', customListSchema);
