import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // ==========================================
  // 1. HASH PASSWORD
  // ==========================================
  const hashedPassword = await bcrypt.hash('password123', 12)
  console.log('✅ Password hashed')

  // ==========================================
  // 2. CREATE ROLES
  // ==========================================
  console.log('Creating roles...')
  
  const adminRole = await prisma.role.create({
    data: { role: 'admin' },
  })

  const petugasRole = await prisma.role.create({
    data: { role: 'petugas' },
  })

  const peminjamRole = await prisma.role.create({
    data: { role: 'peminjam' },
  })

  console.log('✅ Roles created')

  // ==========================================
  // 3. CREATE USERS
  // ==========================================
  console.log('Creating users...')

  const admin = await prisma.user.create({
    data: {
      nama_user: 'Administrator Sistem',
      email: 'admin@example.com',
      password: hashedPassword,
      id_role: adminRole.id_role,
    },
  })

  const petugas1 = await prisma.user.create({
    data: {
      nama_user: 'Petugas 1',
      email: 'petugas1@example.com',
      password: hashedPassword,
      id_role: petugasRole.id_role,
    },
  })

  const petugas2 = await prisma.user.create({
    data: {
      nama_user: 'Petugas 2',
      email: 'petugas2@example.com',
      password: hashedPassword,
      id_role: petugasRole.id_role,
    },
  })

  const peminjam1 = await prisma.user.create({
    data: {
      nama_user: 'John Doe',
      email: 'peminjam1@example.com',
      password: hashedPassword,
      id_role: peminjamRole.id_role,
    },
  })

  const peminjam2 = await prisma.user.create({
    data: {
      nama_user: 'Jane Smith',
      email: 'peminjam2@example.com',
      password: hashedPassword,
      id_role: peminjamRole.id_role,
    },
  })

  console.log('✅ Users created')

  // ==========================================
  // 4. CREATE KATEGORI
  // ==========================================
  console.log('Creating categories...')

  const elektronik = await prisma.kategori.create({
    data: {
      nama_kategori: 'Elektronik',
      deskripsi: 'Peralatan elektronik dan komputer',
    },
  })

  const olahraga = await prisma.kategori.create({
    data: {
      nama_kategori: 'Olahraga',
      deskripsi: 'Peralatan olahraga dan fitness',
    },
  })

  const kantor = await prisma.kategori.create({
    data: {
      nama_kategori: 'Kantor',
      deskripsi: 'Peralatan dan perlengkapan kantor',
    },
  })

  const audioVisual = await prisma.kategori.create({
    data: {
      nama_kategori: 'Audio Visual',
      deskripsi: 'Peralatan audio dan visual',
    },
  })

  console.log('✅ Categories created')

  // ==========================================
  // 5. CREATE ALAT
  // ==========================================
  console.log('Creating alat...')

  const laptopAsus = await prisma.alat.create({
    data: {
      nama_alat: 'Laptop ASUS',
      id_kategori: elektronik.id_kategori,
      stok: 10,
    },
  })

  const laptopLenovo = await prisma.alat.create({
    data: {
      nama_alat: 'Laptop Lenovo',
      id_kategori: elektronik.id_kategori,
      stok: 8,
    },
  })

  const pcDesktop = await prisma.alat.create({
    data: {
      nama_alat: 'PC Desktop',
      id_kategori: elektronik.id_kategori,
      stok: 5,
    },
  })

  const mouseWireless = await prisma.alat.create({
    data: {
      nama_alat: 'Mouse Wireless',
      id_kategori: elektronik.id_kategori,
      stok: 20,
    },
  })

  const keyboardMech = await prisma.alat.create({
    data: {
      nama_alat: 'Keyboard Mechanical',
      id_kategori: elektronik.id_kategori,
      stok: 15,
    },
  })

  const bolaBasket = await prisma.alat.create({
    data: {
      nama_alat: 'Bola Basket',
      id_kategori: olahraga.id_kategori,
      stok: 15,
    },
  })

  const bolaFutsal = await prisma.alat.create({
    data: {
      nama_alat: 'Bola Futsal',
      id_kategori: olahraga.id_kategori,
      stok: 12,
    },
  })

  const raketBadminton = await prisma.alat.create({
    data: {
      nama_alat: 'Raket Badminton',
      id_kategori: olahraga.id_kategori,
      stok: 20,
    },
  })

  const matrasYoga = await prisma.alat.create({
    data: {
      nama_alat: 'Matras Yoga',
      id_kategori: olahraga.id_kategori,
      stok: 10,
    },
  })

  const mejaKerja = await prisma.alat.create({
    data: {
      nama_alat: 'Meja Kerja',
      id_kategori: kantor.id_kategori,
      stok: 8,
    },
  })

  const kursiKantor = await prisma.alat.create({
    data: {
      nama_alat: 'Kursi Kantor',
      id_kategori: kantor.id_kategori,
      stok: 12,
    },
  })

  const proyektorEpson = await prisma.alat.create({
    data: {
      nama_alat: 'Proyektor Epson',
      id_kategori: audioVisual.id_kategori,
      stok: 6,
    },
  })

  const proyektorPanasonic = await prisma.alat.create({
    data: {
      nama_alat: 'Proyektor Panasonic',
      id_kategori: audioVisual.id_kategori,
      stok: 4,
    },
  })

  const speakerAktif = await prisma.alat.create({
    data: {
      nama_alat: 'Speaker Aktif',
      id_kategori: audioVisual.id_kategori,
      stok: 8,
    },
  })

  const micWireless = await prisma.alat.create({
    data: {
      nama_alat: 'Microphone Wireless',
      id_kategori: audioVisual.id_kategori,
      stok: 10,
    },
  })

  const kameraDSLR = await prisma.alat.create({
    data: {
      nama_alat: 'Kamera DSLR Canon',
      id_kategori: audioVisual.id_kategori,
      stok: 5,
    },
  })

  const tripod = await prisma.alat.create({
    data: {
      nama_alat: 'Tripod',
      id_kategori: audioVisual.id_kategori,
      stok: 12,
    },
  })

  console.log('✅ Alat created')

  // ==========================================
  // 6. CREATE KEGIATAN (PEMINJAMAN)
  // ==========================================
  console.log('Creating kegiatan...')

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const kegiatan1 = await prisma.kegiatan.create({
    data: {
      id_user: peminjam1.id_user,
      id_alat: laptopAsus.id_alat,
      jenis_kegiatan: 'Peminjaman',
      tgl_kegiatan: today,
      peminjaman: today,
      pengembalian: null,
      pelanggaran: null,
      denda: 0,
    },
  })

  const kegiatan2 = await prisma.kegiatan.create({
    data: {
      id_user: peminjam2.id_user,
      id_alat: proyektorEpson.id_alat,
      jenis_kegiatan: 'Peminjaman',
      tgl_kegiatan: today,
      peminjaman: today,
      pengembalian: tomorrow,
      pelanggaran: null,
      denda: 0,
    },
  })

  const kegiatan3 = await prisma.kegiatan.create({
    data: {
      id_user: peminjam1.id_user,
      id_alat: bolaBasket.id_alat,
      jenis_kegiatan: 'Peminjaman',
      tgl_kegiatan: today,
      peminjaman: today,
      pengembalian: today,
      pelanggaran: null,
      denda: 0,
    },
  })

  console.log('✅ Kegiatan created')

  // ==========================================
  // 7. CREATE LOG AKTIFITAS
  // ==========================================
  console.log('Creating log aktifitas...')

  await prisma.logAktifitas.create({
    data: {
      id_kegiatan: kegiatan1.id_kegiatan,
      id_user: peminjam1.id_user,
    },
  })

  await prisma.logAktifitas.create({
    data: {
      id_kegiatan: kegiatan2.id_kegiatan,
      id_user: peminjam2.id_user,
    },
  })

  await prisma.logAktifitas.create({
    data: {
      id_kegiatan: kegiatan3.id_kegiatan,
      id_user: peminjam1.id_user,
    },
  })

  console.log('✅ Log aktifitas created')

  // ==========================================
  // SUMMARY
  // ==========================================
  console.log('\n🎉 Database seeding completed successfully!')
  console.log('\n📊 Summary:')
  console.log('   - Roles: 3')
  console.log('   - Users: 5')
  console.log('   - Categories: 4')
  console.log('   - Alat: 17')
  console.log('   - Kegiatan: 3')
  console.log('   - Log Aktifitas: 3')
  
  console.log('\n🔐 Login Credentials:')
  console.log('   Admin:')
  console.log('     Email: admin@example.com')
  console.log('     Password: password123')
  console.log('   Petugas 1:')
  console.log('     Email: petugas1@example.com')
  console.log('     Password: password123')
  console.log('   Peminjam 1:')
  console.log('     Email: peminjam1@example.com')
  console.log('     Password: password123')
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })