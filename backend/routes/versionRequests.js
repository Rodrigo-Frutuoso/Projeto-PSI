const express = require('express');
const router = express.Router();
const VersionRequest = require('../models/VersionRequest');
const authMiddleware = require('../middleware/auth');

const ALLOWED_STATUSES = ['em análise', 'aceite', 'recusado'];

// GET /api/version-requests?status=<estado>
// Lista os pedidos do utilizador autenticado, opcionalmente filtrados por estado.
router.get('/', authMiddleware, async (req, res) => {
  try {
    const statusFilter = (req.query.status || '').trim();

    if (statusFilter && !ALLOWED_STATUSES.includes(statusFilter)) {
      return res.status(400).json({
        message: 'Estado inválido. Usa: em análise, aceite, ou recusado.'
      });
    }

    const query = { user: req.userId };
    if (statusFilter) {
      query.status = statusFilter;
    }

    const requests = await VersionRequest.find(query)
      .populate('album', 'title')
      .sort({ requestedAt: -1, _id: -1 });

    const payload = requests.map((request) => ({
      id: request._id,
      albumId: request.album?._id || null,
      albumTitle: request.album?.title || 'Álbum removido',
      designation: request.designation || null,
      requestedAt: request.requestedAt || request.createdAt,
      status: request.status
    }));

    return res.status(200).json(payload);
  } catch (error) {
    console.error('Erro ao listar pedidos de versões:', error);
    return res.status(500).json({ message: 'Erro ao obter os pedidos.' });
  }
});

module.exports = router;
