"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadToCloudinary } from "@/lib/cloudinary";

async function saveStaffFile(file: File) {
  if (!file || file.size === 0) return null;
  const imageUrl = await uploadToCloudinary(file, "staff") as string;
  return imageUrl;
}

export async function createStaff(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const image = formData.get("image") as File;

    const imageUrl = await saveStaffFile(image);

    await prisma.post.create({
      data: {
        title: name,
        content: position,
        category: "staff",
        imageUrl: imageUrl,
      },
    });

    revalidatePath("/admin/staff");
    revalidatePath("/tentang");
    redirect("/admin/staff?status=success&message=Pengurus berhasil ditambahkan!");
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    console.error(error);
    redirect(`/admin/staff/baru?status=error&message=${encodeURIComponent('Gagal menambah pengurus.')}`);
  }
}

export async function updateStaff(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const image = formData.get("image") as File;
    const existingImageUrl = formData.get("existingImageUrl") as string;

    let imageUrl = existingImageUrl;
    const newImageUrl = await saveStaffFile(image);
    if (newImageUrl) {
      imageUrl = newImageUrl;
    }

    await prisma.post.update({
      where: { id },
      data: {
        title: name,
        content: position,
        imageUrl: imageUrl,
      },
    });

    revalidatePath("/admin/staff");
    revalidatePath("/tentang");
    redirect("/admin/staff?status=success&message=Informasi pengurus berhasil diperbarui!");
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    console.error(error);
    redirect(`/admin/staff/${id}/edit?status=error&message=${encodeURIComponent('Gagal memperbarui pengurus.')}`);
  }
}
