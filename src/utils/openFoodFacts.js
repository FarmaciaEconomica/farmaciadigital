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

  for (const api of APIS) {
    try {
      const res = await fetch(`${api.url}/${cleanBarcode}.json`);
      const data = await res.json();

      if (data.status === 1 && data.product) {
        const p = data.product;
        const imageUrl = p.image_url || p.image_front_url || p.image_small_url || null;
        if (!imageUrl) continue;

        return {
          image_url: imageUrl,
          product_name: p.product_name || p.product_name_fr || p.product_name_en || null,
          brands: p.brands || null,
          source: api.name
        };
      }
    } catch {
      continue;
    }
  }
  return null;
}
