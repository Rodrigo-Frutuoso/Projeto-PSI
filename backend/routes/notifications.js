const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/auth');

// GET /api/notifications
// Lista as notificações do utilizador autenticado
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.userId })
      .populate({
        path: 'versionRequest',
        select: 'album status',
        populate: {
          path: 'album',
          select: 'title'
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Erro ao obter notificações:', error);
    res.status(500).json({ message: 'Erro ao obter notificações.' });
  }
});

// PATCH /api/notifications/:id/read
// Marca uma notificação como lida
router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notificação não encontrada.' });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    res.status(500).json({ message: 'Erro ao marcar notificação como lida.' });
  }
});

// DELETE /api/notifications
// Elimina todas as notificações do utilizador autenticado
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.userId });
    res.status(200).json({ message: 'Todas as notificações foram eliminadas.' });
  } catch (error) {
    console.error('Erro ao eliminar notificações:', error);
    res.status(500).json({ message: 'Erro ao eliminar notificações.' });
  }
});

module.exports = router;
