const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'O nome de utilizador é obrigatório.'],
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9]+$/.test(v);
      },
      message: 'O nome de utilizador só pode conter letras e dígitos.'
    }
  },
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório.'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'O formato do e-mail é inválido.'
    }
  },
  password: {
    type: String,
    required: [true, 'A palavra-passe é obrigatória.']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'A data de nascimento é obrigatória.']
  },
  favoriteArtist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    default: null
  }
}, {
  timestamps: true
});

// Hash da palavra-passe antes de guardar
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar palavras-passe
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remover a palavra-passe ao converter para JSON
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);
