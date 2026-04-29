"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Helper untuk menyimpan file ke Cloudinary
async function saveUploadedFiles(formData: FormData): Promise<string[]> {
  const files = formData.getAll("files");
  
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map(async (fileOrString) => {
    if (fileOrString instanceof File && fileOrString.size > 0) {
      const imageUrl = await uploadToCloudinary(fileOrString, "konten") as string;
      return imageUrl;
    }
    return null;
  });

  const results = await Promise.all(uploadPromises);
  return results.filter((path): path is string => path !== null);
}

export async function createPost(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const badge = formData.get("badge") as string;
    const manualImageUrl = formData.get("imageUrl") as string;
    const customDate = formData.get("createdAt") as string;

    // Proses upload file jika ada
    const uploadedPaths = await saveUploadedFiles(formData);
    
    // Gabungkan link manual (jika ada) dengan hasil upload
    const allImages = [
      ...(manualImageUrl ? manualImageUrl.split('\n').map(s => s.trim()).filter(s => s !== '') : []),
      ...uploadedPaths
    ].join('\n');

    await prisma.post.create({
      data: { 
        title, 
        content, 
        category,
        badge: badge || null,
        imageUrl: allImages || null,
        createdAt: customDate ? new Date(customDate) : new Date()
      },
    });

    revalidatePath("/admin/konten");
    revalidatePath(`/${category}`);
    revalidatePath("/");
    redirect(`/admin/konten?status=success&message=${encodeURIComponent('Artikel berhasil diterbitkan!')}`);
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    console.error(error);
    redirect(`/admin/konten?status=error&message=${encodeURIComponent('Gagal menerbitkan artikel: ' + (error.message || 'Terjadi kesalahan sistem'))}`);
  }
}

export async function updatePost(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const oldPost = await prisma.post.findUnique({ where: { id } });
    const oldCategory = oldPost?.category;

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const badge = formData.get("badge") as string;
    const manualImageUrl = formData.get("imageUrl") as string;
    const customDate = formData.get("createdAt") as string;

    // Proses upload file jika ada
    const uploadedPaths = await saveUploadedFiles(formData);
    
    // Gabungkan link manual (jika ada) dengan hasil upload
    const allImages = [
      ...(manualImageUrl ? manualImageUrl.split('\n').map(s => s.trim()).filter(s => s !== '') : []),
      ...uploadedPaths
    ].join('\n');

    await prisma.post.update({
      where: { id },
      data: { 
        title, 
        content, 
        category,
        badge: badge || null,
        imageUrl: allImages || null,
        createdAt: customDate ? new Date(customDate) : undefined
      },
    });

    revalidatePath("/admin/konten");
    revalidatePath("/");
    if (oldCategory) revalidatePath(`/${oldCategory}`);
    revalidatePath(`/${category}`);
    
    redirect(`/admin/konten?status=success&message=${encodeURIComponent('Perubahan artikel berhasil disimpan!')}`);
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    console.error(error);
    redirect(`/admin/konten?status=error&message=${encodeURIComponent('Gagal menyimpan perubahan: ' + (error.message || 'Terjadi kesalahan'))}`);
  }
}

export async function deletePost(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const post = await prisma.post.findUnique({ where: { id } });
    const category = post?.category;

    await prisma.post.delete({ where: { id } });

    revalidatePath("/admin/konten");
    revalidatePath("/");
    if (category) revalidatePath(`/${category}`);
    // Untuk delete, kita biasanya tidak redirect tapi revalidate, 
    // tapi kita bisa redirect ke halaman yang sama dengan pesan
    redirect(`/admin/konten?status=success&message=${encodeURIComponent('Artikel telah dihapus.')}`);
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    console.error(error);
    redirect(`/admin/konten?status=error&message=${encodeURIComponent('Gagal menghapus artikel.')}`);
  }
}
