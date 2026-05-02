// Funções utilitárias para pesquisa com suporte a acentos

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const makeAccentIgnoredRegex = (text) => {
    let escaped = escapeRegExp(text);
    return escaped
        .replace(/[aáàãâäAÁÀÃÂÄ]/g, '[aáàãâäAÁÀÃÂÄ]')
        .replace(/[eéèêëEÉÈÊË]/g, '[eéèêëEÉÈÊË]')
        .replace(/[iíìîïIÍÌÎÏ]/g, '[iíìîïIÍÌÎÏ]')
        .replace(/[oóòõôöOÓÒÕÔÖ]/g, '[oóòõôöOÓÒÕÔÖ]')
        .replace(/[uúùûüUÚÙÛÜ]/g, '[uúùûüUÚÙÛÜ]')
        .replace(/[cçCÇ]/g, '[cçCÇ]')
        .replace(/[nñNÑ]/g, '[nñNÑ]');
};

const normalizeSearchText = (text) => (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const matchesWordPrefix = (title, searchQuery) => {
    const normalizedQuery = normalizeSearchText(searchQuery);
    if (!normalizedQuery) return false;

    return normalizeSearchText(title)
        .split(/\s+/)
        .some((word) => word.startsWith(normalizedQuery));
};

module.exports = {
    escapeRegExp,
    makeAccentIgnoredRegex,
    normalizeSearchText,
    matchesWordPrefix
};
