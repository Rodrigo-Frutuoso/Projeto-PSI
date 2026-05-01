const mongoose = require('mongoose');

const versionRequestSchema = new mongoose.Schema({
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
  },
  status: {
    type: String,
    enum: ['em análise', 'aceite', 'recusado'],
    default: 'em análise'
  },
  requestedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

versionRequestSchema.index({ user: 1, album: 1, versionEan13: 1 }, { unique: true });

module.exports = mongoose.model('VersionRequest', versionRequestSchema);