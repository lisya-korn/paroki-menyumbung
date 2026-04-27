import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@menyumbung.id';
  const newPassword = 'Salib@Suci_Biru92';
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { password: hashedPassword },
      create: {
        email,
        password: hashedPassword,
        name: 'Admin Paroki',
        role: 'admin'
      },
    });

    console.log(`Password untuk user ${user.email} berhasil diperbarui!`);
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
