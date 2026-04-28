const mongoose = require('mongoose');

const collectionItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'O utilizador é obrigatório.']
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: [true, 'O álbum é obrigatório.']
    },
    versionEan13: {
        type: String,
        required: [true, 'O EAN-13 da versão é obrigatório.'],
        validate: {
            validator: function (v) {
                return /^\d{13}$/.test(v);
            },
            message: 'O EAN-13 deve ter exatamente 13 dígitos.'
        }
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Índice composto único: o mesmo user não pode ter a mesma versão (EAN-13) duas vezes
collectionItemSchema.index({ user: 1, versionEan13: 1 }, { unique: true });

module.exports = mongoose.model('CollectionItem', collectionItemSchema);
