/**
 * Configuração do Cloudinary
 * Para usar imagens do Cloudinary, configure as variáveis de ambiente
 */

const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '',
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET || '',
};

/**
 * Gera URL de imagem otimizada do Cloudinary
 * @param {string} imagePath - Caminho da imagem no Cloudinary
 * @param {object} options - Opções de transformação
 * @returns {string} URL da imagem otimizada
 */
export const getCloudinaryUrl = (imagePath, options = {}) => {
  if (!cloudinaryConfig.cloudName) {
    // Se não houver configuração do Cloudinary, retorna URL original
    return imagePath;
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options;

  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);
  transformations.push(`c_${crop}`);
  if (gravity !== 'auto') transformations.push(`g_${gravity}`);

  const transformString = transformations.join(',');
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;

  // Se a imagem já é uma URL do Cloudinary, extrai o path
  if (imagePath.includes('cloudinary.com')) {
    const urlParts = imagePath.split('/upload/');
    if (urlParts.length > 1) {
      return `${baseUrl}/${transformString}/${urlParts[1]}`;
    }
  }

  // Se é um path local, adiciona as transformações
  return `${baseUrl}/${transformString}/${imagePath}`;
};

/**
 * Upload de imagem para o Cloudinary
 * @param {File} file - Arquivo de imagem
 * @param {object} options - Opções de upload
 * @returns {Promise<object>} Resultado do upload
 */
export const uploadToCloudinary = async (file, options = {}) => {
  // Verificação detalhada das variáveis
  console.log('🔍 Verificando configuração Cloudinary:', {
    cloudName: cloudinaryConfig.cloudName || '❌ FALTA',
    apiKey: cloudinaryConfig.apiKey ? '✅ Configurado' : '❌ FALTA',
    uploadPreset: options.uploadPreset || '❌ FALTA',
    fileName: file?.name,
    fileSize: file?.size
  });

  if (!cloudinaryConfig.cloudName) {
    const error = 'Cloudinary não configurado. VITE_CLOUDINARY_CLOUD_NAME está faltando.';
    console.error('❌', error);
    throw new Error(error);
  }

  if (!options.uploadPreset) {
    const error = 'Upload Preset não fornecido. Configure VITE_CLOUDINARY_UPLOAD_PRESET ou passe uploadPreset nas opções.';
    console.error('❌', error);
    throw new Error(error);
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', options.uploadPreset);
  
  // Não precisa enviar cloud_name no FormData para uploads unsigned
  // O cloud_name já está na URL da API

  if (options.folder) {
    formData.append('folder', options.folder);
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
  
  console.log('☁️ Iniciando upload para Cloudinary:', {
    url: uploadUrl,
    uploadPreset: options.uploadPreset,
    folder: options.folder || 'nenhum'
  });

  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    const responseText = await response.text();
    console.log('📡 Resposta do Cloudinary (status):', response.status);
    console.log('📡 Resposta do Cloudinary (texto):', responseText.substring(0, 200));

    if (!response.ok) {
      let errorMessage = `Erro ao fazer upload para o Cloudinary (${response.status})`;
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error?.message || errorMessage;
        console.error('❌ Erro detalhado:', errorData);
      } catch (e) {
        console.error('❌ Resposta de erro:', responseText);
      }
      throw new Error(errorMessage);
    }

    const data = JSON.parse(responseText);
    console.log('✅ Upload bem-sucedido!', {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height
    });

    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
    };
  } catch (error) {
    console.error('❌ Erro no upload do Cloudinary:', error);
    console.error('Stack:', error.stack);
    throw error;
  }
};

export default cloudinaryConfig;
