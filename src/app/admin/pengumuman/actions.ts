"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createAnnouncement(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const isPinned = formData.get("isPinned") === "on";
    const customDate = formData.get("createdAt") as string;

    await prisma.announcement.create({
      data: {
        title,
        content,
        isPinned,
        // @ts-ignore
        authorId: session.user.id,
        createdAt: customDate ? new Date(customDate) : new Date()
      },
    });

    revalidatePath("/admin/pengumuman");
    revalidatePath("/pengumuman");
    revalidatePath("/");
    redirect(`/admin/pengumuman?status=success&message=${encodeURIComponent('Pengumuman berhasil diterbitkan!')}`);
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    console.error(error);
    redirect(`/admin/pengumuman?status=error&message=${encodeURIComponent('Gagal menerbitkan pengumuman.')}`);
  }
}

export async function updateAnnouncement(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const isPinned = formData.get("isPinned") === "on";
    const customDate = formData.get("createdAt") as string;

    await prisma.announcement.update({
      where: { id },
      data: {
        title,
        content,
        isPinned,
        createdAt: customDate ? new Date(customDate) : undefined
      },
    });

    revalidatePath("/admin/pengumuman");
    revalidatePath("/pengumuman");
    revalidatePath("/");
    redirect(`/admin/pengumuman?status=success&message=${encodeURIComponent('Perubahan pengumuman berhasil disimpan!')}`);
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    console.error(error);
    redirect(`/admin/pengumuman?status=error&message=${encodeURIComponent('Gagal menyimpan perubahan.')}`);
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");

    await prisma.announcement.delete({
      where: { id },
    });

    revalidatePath("/admin/pengumuman");
    revalidatePath("/pengumuman");
    revalidatePath("/");
    redirect(`/admin/pengumuman?status=success&message=${encodeURIComponent('Pengumuman telah dihapus.')}`);
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    console.error(error);
    redirect(`/admin/pengumuman?status=error&message=${encodeURIComponent('Gagal menghapus pengumuman.')}`);
  }
}
