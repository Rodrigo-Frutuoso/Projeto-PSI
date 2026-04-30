const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O nome do artista é obrigatório.'],
        trim: true
    },

    startYear: {
        type: Number,
        required: [true, 'O Ano de Início é obrigatório.'],
        max: [new Date().getFullYear(), 'O ano de início não pode ser no futuro :)']
    },

    isni: {
        type: String,
        required: [true, 'O ISNI é obrigatório.'],
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\d{16}$/.test(v.replace(/\s/g, ''));
            },
            message: 'O ISNI deve ter exatamente 16 dígitos.'
        }
    },

    artistType: {
        type: String,
        enum: ['solo', 'group'],
        required: [true, 'O tipo de artista é obrigatório.']
    },

    imageUrl: {
        type: String,
        trim: true
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }]

}, {
    timestamps: true
});

module.exports = mongoose.model('Artist', artistSchema);
