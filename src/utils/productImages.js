/**
 * Utilitário para gerenciar imagens de produtos
 * Retorna imagem padrão baseada no tipo de medicamento
 */

// URLs das imagens padrão - SVGs dimensionados 400x400 para exibição consistente
// viewBox proporcional para object-contain em cards
export const DEFAULT_PRODUCT_IMAGES = {
  // Tarjado + Genérico: embalagem com tarja amarela (Medicamento Genérico) + vermelha (Prescrição)
  generic: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#FFFFFF"/>
      <rect x="40" y="60" width="200" height="280" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
      <text x="140" y="130" font-family="Arial,sans-serif" font-size="24" font-weight="bold" fill="#000" text-anchor="middle">Comprimidos</text>
      <rect x="40" y="200" width="200" height="50" fill="#FFC107"/>
      <text x="140" y="232" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#1565C0" text-anchor="middle">Medicamento Genérico</text>
      <rect x="40" y="250" width="200" height="45" fill="#D32F2F"/>
      <text x="140" y="278" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">VENDA SOB PRESCRIÇÃO MÉDICA</text>
      <rect x="260" y="100" width="80" height="200" rx="4" fill="#E8E8E8" stroke="#C0C0C0"/>
      <ellipse cx="300" cy="140" rx="25" ry="25" fill="#FFFFFF" stroke="#999"/>
      <ellipse cx="300" cy="195" rx="25" ry="25" fill="#FFFFFF" stroke="#999"/>
      <ellipse cx="300" cy="250" rx="25" ry="25" fill="#FFFFFF" stroke="#999"/>
      <text x="30" y="210" font-family="Arial,sans-serif" font-size="9" fill="#999" transform="rotate(-90 30 210)">IMAGEM MERAMENTE ILUSTRATIVA</text>
    </svg>
  `)}`,
  
  // Tarjado + Marca própria: embalagem com tarja vermelha (Prescrição) apenas
  reference: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#FFFFFF"/>
      <rect x="40" y="60" width="200" height="280" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
      <text x="140" y="130" font-family="Arial,sans-serif" font-size="24" font-weight="bold" fill="#000" text-anchor="middle">Comprimidos</text>
      <rect x="40" y="250" width="200" height="45" fill="#D32F2F"/>
      <text x="140" y="278" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">VENDA SOB PRESCRIÇÃO MÉDICA</text>
      <rect x="260" y="100" width="80" height="200" rx="4" fill="#E8E8E8" stroke="#C0C0C0"/>
      <ellipse cx="300" cy="140" rx="25" ry="25" fill="#FFFFFF" stroke="#999"/>
      <ellipse cx="300" cy="195" rx="25" ry="25" fill="#FFFFFF" stroke="#999"/>
      <ellipse cx="300" cy="250" rx="25" ry="25" fill="#FFFFFF" stroke="#999"/>
      <text x="30" y="210" font-family="Arial,sans-serif" font-size="9" fill="#999" transform="rotate(-90 30 210)">IMAGEM MERAMENTE ILUSTRATIVA</text>
    </svg>
  `)}`,
  
  // Medicamento Isento de Prescrição (tarja azul)
  otc: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#FFFFFF"/>
      <rect x="40" y="60" width="200" height="280" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
      <text x="140" y="130" font-family="Arial,sans-serif" font-size="24" font-weight="bold" fill="#000" text-anchor="middle">Comprimidos</text>
      <rect x="40" y="250" width="200" height="45" fill="#2B6CB0"/>
      <text x="140" y="278" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ISENTO DE PRESCRIÇÃO</text>
      <text x="30" y="210" font-family="Arial,sans-serif" font-size="9" fill="#999" transform="rotate(-90 30 210)">IMAGEM MERAMENTE ILUSTRATIVA</text>
    </svg>
  `)}`,
  
  // Genérico Isento (tarja amarela + azul)
  genericOtc: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#FFFFFF"/>
      <rect x="40" y="60" width="200" height="280" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
      <text x="140" y="130" font-family="Arial,sans-serif" font-size="24" font-weight="bold" fill="#000" text-anchor="middle">Comprimidos</text>
      <rect x="40" y="200" width="200" height="50" fill="#FFC107"/>
      <text x="140" y="232" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#000" text-anchor="middle">Medicamento Genérico</text>
      <rect x="40" y="250" width="200" height="45" fill="#2B6CB0"/>
      <text x="140" y="278" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ISENTO DE PRESCRIÇÃO</text>
      <text x="30" y="210" font-family="Arial,sans-serif" font-size="9" fill="#999" transform="rotate(-90 30 210)">IMAGEM MERAMENTE ILUSTRATIVA</text>
    </svg>
  `)}`
};

/**
 * Retorna a imagem padrão adequada baseada nas propriedades do produto
 * @param {Object} product - Objeto do produto
 * @returns {string} URL da imagem padrão
 */
export const getDefaultProductImage = (product) => {
  const isGeneric = product.is_generic || product.genericAvailable || false;
  const requiresPrescription = product.requires_prescription || product.requiresPrescription || false;
  
  // Genérico com receita
  if (isGeneric && requiresPrescription) {
    return DEFAULT_PRODUCT_IMAGES.generic;
  }
  
  // Genérico sem receita
  if (isGeneric && !requiresPrescription) {
    return DEFAULT_PRODUCT_IMAGES.genericOtc;
  }
  
  // Não genérico com receita
  if (!isGeneric && requiresPrescription) {
    return DEFAULT_PRODUCT_IMAGES.reference;
  }
  
  // Não genérico sem receita (isento)
  return DEFAULT_PRODUCT_IMAGES.otc;
};

/**
 * Retorna a imagem do produto ou a imagem padrão
 * Produtos tarjados (requires_prescription) SEMPRE usam imagem padrão - imagem EAN é ignorada
 * @param {Object} product - Objeto do produto
 * @returns {string} URL da imagem
 */
export const getProductImage = (product) => {
  const requiresPrescription = product?.requires_prescription || product?.requiresPrescription || false;
  
  // Produtos tarjados: ignorar imagem EAN, sempre usar padrão (genérico ou marca própria)
  if (requiresPrescription) {
    return getDefaultProductImage(product);
  }
  
  // Produtos não tarjados: usar imagem se existir
  if (product?.image_url || product?.image) {
    return product.image_url || product.image;
  }
  
  return getDefaultProductImage(product);
};

/**
 * Verifica se a URL da imagem é válida
 * @param {string} url - URL da imagem
 * @returns {boolean}
 */
export const isValidImageUrl = (url) => {
  if (!url) return false;
  
  // Se é data URL, é válido
  if (url.startsWith('data:')) return true;
  
  // Se começa com http/https, é válido
  if (url.startsWith('http://') || url.startsWith('https://')) return true;
  
  // Se é um caminho relativo, é válido
  if (url.startsWith('/') || url.startsWith('./')) return true;
  
  return false;
};
