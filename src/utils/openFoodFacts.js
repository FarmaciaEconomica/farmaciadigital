/**
 * Integração com Open Food Facts e Open Beauty Facts
 * Busca imagens e dados de produtos por código de barras (EAN)
 */

const APIS = [
  { name: 'Open Beauty Facts', url: 'https://world.openbeautyfacts.org/api/v0/product' },
  { name: 'Open Food Facts', url: 'https://world.openfoodfacts.org/api/v0/product' }
];

/**
 * Busca produto (imagem e nome) por EAN em Open Beauty Facts e Open Food Facts
 * Tenta Open Beauty Facts primeiro (cosméticos), depois Open Food Facts (alimentos, suplementos)
 * @param {string} barcode - Código EAN (8 ou 13 dígitos)
 * @returns {Promise<{image_url: string, product_name?: string, source?: string} | null>}
 */
export async function fetchProductByBarcode(barcode) {
  const cleanBarcode = String(barcode || '').replace(/\D/g, '');
  if (cleanBarcode.length < 8 || cleanBarcode.length > 13) {
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  let lastError = null;

  try {
    for (const api of APIS) {
      try {
        const res = await fetch(`${api.url}/${cleanBarcode}.json`, {
          signal: controller.signal,
          mode: 'cors',
          headers: { Accept: 'application/json' }
        });

        if (!res.ok) continue;

        const data = await res.json();

        if (data.status === 1 && data.product) {
          clearTimeout(timeoutId);
          const p = data.product;
          const imageUrl = p.image_url || p.image_front_url || p.image_small_url ||
            p.image_front_small_url || p.image_thumb_url || null;
          if (!imageUrl) continue;

          return {
            image_url: imageUrl,
            product_name: p.product_name || p.product_name_fr || p.product_name_en || null,
            brands: p.brands || null,
            source: api.name
          };
        }
      } catch (err) {
        lastError = err;
        continue;
      }
    }
  } finally {
    clearTimeout(timeoutId);
  }

  if (lastError?.name === 'AbortError') {
    throw new Error('Tempo esgotado. Verifique sua conexão e tente novamente.');
  }
  if (lastError) {
    throw lastError;
  }
  return null;
}
