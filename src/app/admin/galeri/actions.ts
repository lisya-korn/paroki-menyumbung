"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function createGalleryItem(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const manualImageUrl = formData.get("imageUrl") as string;
    const description = formData.get("description") as string;
    const files = formData.getAll("files");

    const entriesToCreate: any[] = [];

    // Proses upload file ke Cloudinary secara paralel
    if (files && files.length > 0) {
      const uploadPromises = files.map(async (fileOrString) => {
        if (fileOrString instanceof File && fileOrString.size > 0) {
          const imageUrl = await uploadToCloudinary(fileOrString, "galeri") as string;
          
          return {
            title: title || null,
            imageUrl: imageUrl,
            description: description || null
          };
        }
        return null;
      });

      const uploadedEntries = await Promise.all(uploadPromises);
      uploadedEntries.forEach(entry => {
        if (entry) entriesToCreate.push(entry);
      });
    }

    // Jika tidak ada file yang diupload, tapi ada link manual
    if (entriesToCreate.length === 0 && manualImageUrl) {
      entriesToCreate.push({
        title: title || null,
        imageUrl: manualImageUrl,
        description: description || null
      });
    }

    // Simpan semua entri ke database
    if (entriesToCreate.length > 0) {
      await prisma.gallery.createMany({
        data: entriesToCreate
      });
    }

    revalidatePath("/admin/galeri");
    revalidatePath("/galeri");
    redirect(`/admin/galeri?status=success&message=${encodeURIComponent(`${entriesToCreate.length} foto berhasil ditambahkan ke galeri!`)}`);
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    console.error(error);
    redirect(`/admin/galeri?status=error&message=${encodeURIComponent('Gagal mengunggah foto.')}`);
  }
}

export async function deleteGalleryItem(id: string) {
  try {
    await prisma.gallery.delete({ where: { id } });
    revalidatePath("/admin/galeri");
    revalidatePath("/galeri");
    redirect(`/admin/galeri?status=success&message=${encodeURIComponent('Foto telah dihapus.')}`);
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    console.error(error);
    redirect(`/admin/galeri?status=error&message=${encodeURIComponent('Gagal menghapus foto.')}`);
  }
}
