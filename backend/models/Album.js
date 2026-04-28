const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    ean13: {
        type: String,
        required: [true, 'O EAN-13 é obrigatório.'],
        validate: {
            validator: function (v) {
                return /^\d{13}$/.test(v);
            },
            message: 'O EAN-13 deve ter exatamente 13 dígitos.'
        }
    },
    physicalSupport: {
        type: String,
        enum: {
            values: ['CD', 'vinil', 'cassete'],
            message: 'O suporte físico deve ser CD, vinil, ou cassete.'
        },
        required: [true, 'O suporte físico é obrigatório.']
    },
    designation: {
        type: String,
        trim: true,
        default: null
    }
}, { _id: true });

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'O titulo do album é obrigatório.'],
        trim: true
    },

    releaseYear: {
        type: Number,
        required: [true, 'O Ano de Lançamento é obrigatório.'],
        max: [new Date().getFullYear(), 'O ano de lançamento não pode ser no futuro :)']
    },

    mbid: {
        type: String,
        required: [true, 'O MBID é obrigatório.'],
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
            },
            message: 'O MBID deve ter exatamente 36 caracteres no formato xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.'
        }
    },

    albumType: {
        type: String,
        enum: ['single', 'EP', 'LP', 'Compilation'],
        required: [true, 'O tipo de álbum é obrigatório (single, EP, LP, ou Compilation).']
    },

    artista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: false
    },

    versions: [versionSchema]

}, {
    timestamps: true
});

module.exports = mongoose.model('Album', albumSchema);
