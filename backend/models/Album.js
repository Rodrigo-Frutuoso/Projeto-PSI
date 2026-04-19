const mongoose = require('mongoose');

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
        enum: ['single', 'EP', 'LP'],
        required: [true, 'O tipo de álbum é obrigatório (single, EP, ou LP).']
    },

    artista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Album', albumSchema);
