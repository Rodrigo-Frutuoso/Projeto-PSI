const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  isrc: {
    type: String,
    trim: true,
    default: null
  },
  title: {
    type: String,
    required: [true, 'O título da canção é obrigatório.'],
    trim: true
  },
  durationSeconds: {
    type: Number,
    required: false,
    min: [0, 'A duração deve ser positiva (segundos).']
  },
  artists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Song', songSchema);
