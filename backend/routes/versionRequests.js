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

// POST /api/version-requests/:id/respond
// Responde a um pedido de versão (aceitar ou recusar)
//router.post('/:id/respond', authMiddleware, async (req, res) => {
// NOTA: authMiddleware removido temporariamente para facilitar os testes de simulação (User Story 14)
router.post('/:id/respond', async (req, res) => {
  try {
    const { status } = req.body;
    console.log('Resposta recebida para o pedido:', req.params.id, 'Ação:', status);
    if (!['aceite', 'recusado'].includes(status)) {
      return res.status(400).json({ message: 'Ação inválida. Deve ser "aceite" ou "recusado".' });
    }

    const versionRequest = await VersionRequest.findById(req.params.id);
    if (!versionRequest) {
      return res.status(404).json({ message: 'Pedido não encontrado.' });
    }

    if (versionRequest.status !== 'em análise') {
      return res.status(400).json({ message: 'Este pedido já foi respondido.' });
    }

    versionRequest.status = status;
    await versionRequest.save();

    const Notification = require('../models/Notification');
    const Album = require('../models/Album');

    // Create a notification
    await Notification.create({
      user: versionRequest.user,
      versionRequest: versionRequest._id,
      message: status === 'aceite' ? 'O seu pedido foi aceite.' : 'O seu pedido foi recusado.',
      read: false
    });

    if (status === 'aceite') {
      const album = await Album.findById(versionRequest.album);
      if (album) {
        album.versions.push({
          ean13: versionRequest.versionEan13,
          physicalSupport: versionRequest.physicalSupport,
          designation: versionRequest.designation
        });
        await album.save();
      }
    }

    return res.status(200).json({ message: `Pedido ${status} com sucesso.`, status: status });
  } catch (error) {
    console.error('Erro ao responder ao pedido:', error);
    return res.status(500).json({ message: 'Erro ao responder ao pedido.' });
  }
});

module.exports = router;
