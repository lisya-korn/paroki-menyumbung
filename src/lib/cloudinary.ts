import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export async function uploadToCloudinary(file: File, folder: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { 
        folder: `paroki-menyumbung/${folder}`,
        resource_type: 'auto'
      },
      (error: any, result: any) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result?.secure_url);
        }
      }
    ).end(buffer);
  });
}

/**
 * Ekstrak public_id dari URL Cloudinary.
 * Contoh URL: https://res.cloudinary.com/xxx/image/upload/v123/paroki-menyumbung/konten/abc.jpg
 * → public_id: "paroki-menyumbung/konten/abc"
 */
export function extractPublicId(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z]+)?$/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * Hapus file dari Cloudinary berdasarkan URL-nya.
 * Mendukung gambar (image) dan PDF/file lain (raw).
 */
export async function deleteFromCloudinary(url: string): Promise<boolean> {
  try {
    const publicId = extractPublicId(url);
    if (!publicId) return false;

    // Coba hapus sebagai image dulu, lalu raw jika gagal
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    if (result.result === 'ok') return true;

    const resultRaw = await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
    return resultRaw.result === 'ok';
  } catch (err) {
    console.error('Cloudinary delete error:', err);
    return false;
  }
}
