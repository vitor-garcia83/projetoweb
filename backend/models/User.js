import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  matricula: {
    type: String,
    trim: true,
    required: false,  // pode deixar opcional se quiser
  },
  nome: {
    type: String,
    trim: true,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Email inválido'], // validação simples de email
  },
  celular: {
    type: String,
    trim: true,
    required: false,
  },
  cpf: {
    type: String,
    trim: true,
    required: false,
    unique: true,  // se quiser garantir que CPF não se repita
    // poderia adicionar uma validação customizada para CPF aqui
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
  },
}, {
  timestamps: true, // para ter createdAt e updatedAt automáticos
});

export default mongoose.model('User', userSchema);
