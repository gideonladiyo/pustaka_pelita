// DUMMY katalog untuk prototype. Judul, harga, dan isi akan diganti dengan inventaris e-book asli klien (TRACKER RP-03).

export type Motif = "arch" | "sun" | "lines" | "cross" | "path";

export type CategorySlug =
  | "renungan"
  | "doa"
  | "studi-alkitab"
  | "keluarga"
  | "pertumbuhan-iman"
  | "pelayanan";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  category: CategorySlug;
  price: number;
  comparePrice?: number;
  pages: number;
  fileSizeMb: number;
  format: "PDF";
  language: "Indonesia";
  publishedAt: string;
  sold: number;
  featured?: boolean;
  isPublished: boolean;
  blurb: string;
  description: string[];
  benefits: string[];
  toc: string[];
  verse: { text: string; ref: string };
  sample?: { chapter: string; paragraphs: string[] };
  cover: { bg: string; fg: string; motif: Motif; layout: "classic" | "modern"; series?: string };
};

const AUTHOR = "Pdt. Elia Wiranata";
const AUTHOR_COUPLE = "Pdt. Elia & Ruth Wiranata";

export const categories: Category[] = [
  { slug: "renungan", name: "Renungan Harian", description: "Bacaan singkat untuk saat teduh setiap pagi." },
  { slug: "doa", name: "Doa & Ibadah", description: "Belajar berdoa dan beribadah dengan sungguh." },
  { slug: "studi-alkitab", name: "Studi Alkitab", description: "Panduan mendalami kitab demi kitab, pribadi atau berkelompok." },
  { slug: "keluarga", name: "Keluarga Kristen", description: "Untuk suami, istri, dan orang tua yang ingin membangun rumah di atas firman." },
  { slug: "pertumbuhan-iman", name: "Pertumbuhan Iman", description: "Menemani langkah iman di musim terang maupun gelap." },
  { slug: "pelayanan", name: "Pelayanan & Kepemimpinan", description: "Bekal bagi pelayan, majelis, dan pemimpin gereja." },
];

export const books: Book[] = [
  {
    slug: "berjalan-dalam-terang",
    title: "Berjalan dalam Terang",
    subtitle: "Renungan 40 Hari Bersama Injil Yohanes",
    author: AUTHOR,
    category: "renungan",
    price: 59000,
    comparePrice: 79000,
    pages: 168,
    fileSizeMb: 3.2,
    format: "PDF",
    language: "Indonesia",
    publishedAt: "2025-02-14",
    sold: 412,
    featured: true,
    isPublished: true,
    blurb: "Empat puluh renungan pendek yang mengajak Anda mengenal Yesus lewat tanda-tanda dan percakapan di Injil Yohanes.",
    description: [
      "Setiap renungan dimulai dengan satu perikop pendek dari Injil Yohanes, disusul penjelasan sederhana dan satu pertanyaan untuk direnungkan sepanjang hari. Cukup sepuluh menit di pagi hari.",
      "Buku ini cocok dibaca pribadi, bersama pasangan, atau dipakai kelompok sel selama masa Prapaskah.",
    ],
    benefits: [
      "40 renungan harian dengan ayat, penjelasan, dan pertanyaan refleksi",
      "Lembar jurnal doa di akhir setiap minggu",
      "Panduan diskusi singkat untuk kelompok sel",
    ],
    toc: [
      "Pengantar: Mengapa Yohanes?",
      "Minggu 1: Firman yang menjadi manusia",
      "Minggu 2: Tanda-tanda yang menunjuk kepada-Nya",
      "Minggu 3: Percakapan di malam dan siang hari",
      "Minggu 4: Akulah terang dunia",
      "Minggu 5: Gembala yang baik",
      "Minggu 6: Kasih sampai pada kesudahannya",
      "Penutup: Berjalan dalam terang setiap hari",
    ],
    verse: {
      text: "Akulah terang dunia; barangsiapa mengikut Aku, ia tidak akan berjalan dalam kegelapan, melainkan ia akan mempunyai terang hidup.",
      ref: "Yohanes 8:12",
    },
    sample: {
      chapter: "Hari 1. Pada mulanya adalah Firman",
      paragraphs: [
        "Yohanes tidak memulai Injilnya di palungan Betlehem. Ia mundur jauh sebelum itu, ke saat sebelum ada matahari dan bintang. Pada mulanya adalah Firman. Kalimat pembuka ini sengaja menggemakan kitab Kejadian, seakan Yohanes berkata: kisah yang akan kau baca adalah kisah penciptaan yang baru.",
        "Mungkin pagi ini Anda membuka hari dengan banyak rencana. Daftar pekerjaan, tagihan, urusan anak, pesan yang belum dibalas. Yohanes mengajak kita berhenti sejenak dan mengingat bahwa sebelum semua itu ada, Allah sudah berbicara. Hidup kita tidak dimulai dari kesibukan kita, tetapi dari Firman-Nya.",
        "Renungkan hari ini: apa yang biasanya menjadi suara pertama yang Anda dengar setiap pagi?",
      ],
    },
    cover: { bg: "#2c4a3e", fg: "#ece7d8", motif: "arch", layout: "classic", series: "Renungan 40 Hari" },
  },
  {
    slug: "doa-yang-mengubah-hari",
    title: "Doa yang Mengubah Hari",
    subtitle: "Belajar Berdoa dari Doa Bapa Kami",
    author: AUTHOR,
    category: "doa",
    price: 45000,
    pages: 112,
    fileSizeMb: 2.1,
    format: "PDF",
    language: "Indonesia",
    publishedAt: "2024-08-03",
    sold: 356,
    featured: true,
    isPublished: true,
    blurb: "Doa Bapa Kami diurai kalimat demi kalimat menjadi pola doa harian yang sederhana dan jujur.",
    description: [
      "Banyak orang Kristen hafal Doa Bapa Kami, tetapi jarang memakainya sebagai pola untuk berdoa dengan kata-kata sendiri. Buku ini membahas tujuh bagian doa tersebut dan menunjukkan cara menghidupinya dalam doa sehari-hari.",
      "Setiap bab ditutup dengan latihan doa praktis yang bisa langsung dicoba, termasuk contoh doa untuk keluarga, pekerjaan, dan gereja.",
    ],
    benefits: [
      "7 bab pembahasan Doa Bapa Kami",
      "Latihan doa praktis di setiap bab",
      "Kartu pola doa satu halaman untuk dicetak",
    ],
    toc: [
      "Pengantar: Ajarlah kami berdoa",
      "Bapa kami yang di sorga",
      "Dikuduskanlah nama-Mu",
      "Datanglah Kerajaan-Mu",
      "Berikanlah kami makanan kami yang secukupnya",
      "Ampunilah kami",
      "Lepaskanlah kami dari yang jahat",
    ],
    verse: {
      text: "Janganlah hendaknya kamu kuatir tentang apa pun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur.",
      ref: "Filipi 4:6",
    },
    sample: {
      chapter: "Bab 1. Bapa kami yang di sorga",
      paragraphs: [
        "Yesus bisa saja mengajar murid-murid-Nya memulai doa dengan gelar yang megah. Tetapi kata pertama yang Ia ajarkan adalah sapaan yang paling akrab: Bapa. Doa Kristen dimulai bukan dari rasa takut, melainkan dari kepastian bahwa kita diterima sebagai anak.",
        "Perhatikan juga kata kami. Bahkan ketika berdoa sendirian di kamar, kita tidak pernah berdoa sebagai orang yang terasing. Kita berdoa bersama seluruh keluarga Allah di segala tempat.",
      ],
    },
    cover: { bg: "#1f2c48", fg: "#e7e2d4", motif: "sun", layout: "classic" },
  },
  {
    slug: "rumah-di-atas-batu",
    title: "Rumah di Atas Batu",
    subtitle: "Membangun Keluarga yang Berakar pada Firman",
    author: AUTHOR_COUPLE,
    category: "keluarga",
    price: 69000,
    comparePrice: 89000,
    pages: 204,
    fileSizeMb: 4.6,
    format: "PDF",
    language: "Indonesia",
    publishedAt: "2025-06-21",
    sold: 298,
    featured: true,
    isPublished: true,
    blurb: "Ditulis bersama sang istri dari pengalaman 25 tahun pernikahan dan pendampingan keluarga jemaat.",
    description: [
      "Buku ini membahas fondasi keluarga Kristen secara praktis: komunikasi suami istri, mengelola konflik, keuangan rumah tangga, hingga mezbah keluarga yang tidak terasa seperti kewajiban.",
      "Setiap bab dilengkapi kisah nyata (dengan nama disamarkan) dan pertanyaan untuk dibahas berdua.",
    ],
    benefits: [
      "12 bab tentang pernikahan dan rumah tangga",
      "Pertanyaan diskusi untuk pasangan di setiap bab",
      "Contoh jadwal mezbah keluarga mingguan",
      "Bonus: doa untuk anak-anak",
    ],
    toc: [
      "Pengantar: Mendengar dan melakukan",
      "Fondasi yang tidak terlihat",
      "Berbicara dan mendengar dengan kasih",
      "Ketika konflik datang",
      "Uang, kerja, dan rumah tangga",
      "Mezbah keluarga yang hidup",
      "Membesarkan anak dalam iman",
      "Menua bersama dalam anugerah",
    ],
    verse: {
      text: "Setiap orang yang mendengar perkataan-Ku ini dan melakukannya, ia sama dengan orang yang bijaksana, yang mendirikan rumahnya di atas batu.",
      ref: "Matius 7:24",
    },
    sample: {
      chapter: "Bab 1. Fondasi yang tidak terlihat",
      paragraphs: [
        "Tidak ada orang yang memuji fondasi rumah. Tamu yang datang memuji ruang tamu, dapur, atau taman. Fondasi tersembunyi di bawah tanah. Tetapi ketika hujan deras datang, hanya fondasi yang menentukan apakah rumah itu tetap berdiri.",
        "Dalam pernikahan kami, fondasi itu ternyata bukan perasaan cinta yang menggebu di awal. Fondasinya adalah kebiasaan-kebiasaan kecil yang dilakukan berulang: berdoa bersama sebelum tidur, meminta maaf lebih dulu, dan membuka Alkitab di meja makan meski hanya lima menit.",
      ],
    },
    cover: { bg: "#cbbb9d", fg: "#2a2219", motif: "lines", layout: "modern" },
  },
  {
    slug: "menyelami-surat-roma",
    title: "Menyelami Surat Roma",
    subtitle: "Panduan Studi 16 Pertemuan untuk Kelompok Kecil",
    author: AUTHOR,
    category: "studi-alkitab",
    price: 79000,
    pages: 236,
    fileSizeMb: 5.4,
    format: "PDF",
    language: "Indonesia",
    publishedAt: "2024-03-10",
    sold: 187,
    isPublished: true,
    blurb: "Satu pertemuan untuk setiap pasal. Lengkap dengan latar belakang, pertanyaan diskusi, dan catatan untuk pemimpin.",
    description: [
      "Surat Roma sering dianggap berat. Panduan ini memecahnya menjadi enam belas pertemuan yang masing-masing bisa diselesaikan dalam 60 sampai 90 menit.",
      "Disusun untuk pemimpin kelompok sel, persekutuan pemuda, atau siapa pun yang ingin belajar Roma secara runtut.",
    ],
    benefits: [
      "16 pertemuan, satu untuk setiap pasal",
      "Catatan pemimpin dan kunci jawaban",
      "Peta alur pikiran Paulus dalam satu halaman",
    ],
    toc: [
      "Cara memakai panduan ini",
      "Pasal 1-3: Semua orang membutuhkan Injil",
      "Pasal 4-5: Dibenarkan karena iman",
      "Pasal 6-8: Hidup baru di dalam Roh",
      "Pasal 9-11: Kesetiaan Allah kepada umat-Nya",
      "Pasal 12-16: Persembahan yang hidup",
      "Lampiran: Catatan untuk pemimpin",
    ],
    verse: {
      text: "Sebab aku mempunyai keyakinan yang kokoh dalam Injil, karena Injil adalah kekuatan Allah yang menyelamatkan setiap orang yang percaya.",
      ref: "Roma 1:16",
    },
    sample: {
      chapter: "Pertemuan 1. Hamba Kristus Yesus",
      paragraphs: [
        "Paulus memperkenalkan dirinya pertama-tama sebagai hamba. Bukan rasul yang hebat, bukan teolog, melainkan budak milik Kristus. Seluruh surat ini ditulis dari posisi itu.",
        "Pertanyaan pembuka untuk kelompok: jika Anda harus memperkenalkan diri dengan satu kata yang menggambarkan hubungan Anda dengan Kristus, kata apa yang akan Anda pilih?",
      ],
    },
    cover: { bg: "#3a3e44", fg: "#e9e6de", motif: "cross", layout: "modern", series: "Seri Studi Kitab" },
  },
  {
    slug: "ketika-tuhan-terasa-diam",
    title: "Ketika Tuhan Terasa Diam",
    subtitle: "Iman yang Bertahan di Masa Sulit",
    author: AUTHOR,
    category: "pertumbuhan-iman",
    price: 49000,
    pages: 132,
    fileSizeMb: 2.4,
    format: "PDF",
    language: "Indonesia",
    publishedAt: "2025-09-05",
    sold: 341,
    featured: true,
    isPublished: true,
    blurb: "Untuk Anda yang sedang berdoa dan belum melihat jawaban. Jujur tentang pergumulan, teguh dalam pengharapan.",
    description: [
      "Lahir dari serangkaian khotbah setelah masa pandemi, buku ini berjalan bersama tokoh-tokoh Alkitab yang pernah merasa ditinggalkan Tuhan: Ayub, Elia, pemazmur, hingga Yesus sendiri di Getsemani.",
      "Tidak menawarkan jawaban instan, tetapi menemani pembaca untuk tetap berpegang pada Allah yang setia.",
    ],
    benefits: [
      "9 bab renungan dari tokoh-tokoh Alkitab",
      "Doa ratapan yang bisa dipakai pribadi",
      "Saran praktis untuk mendampingi teman yang berduka",
    ],
    toc: [
      "Pengantar: Bolehkah orang percaya bertanya?",
      "Ayub dan pertanyaan yang tidak dijawab",
      "Elia di bawah pohon arar",
      "Mazmur ratapan: berdoa dengan jujur",
      "Getsemani: bukan kehendak-Ku",
      "Sabtu yang sunyi",
      "Pengharapan yang tidak mengecewakan",
    ],
    verse: {
      text: "Mengapa engkau tertekan, hai jiwaku, dan gelisah di dalam diriku? Berharaplah kepada Allah!",
      ref: "Mazmur 42:6",
    },
    sample: {
      chapter: "Pengantar. Bolehkah orang percaya bertanya?",
      paragraphs: [
        "Beberapa tahun lalu seorang ibu datang ke ruang konseling gereja dan berkata pelan, Pak Pendeta, saya takut berdosa karena terus bertanya kenapa. Saya menunjukkan kepadanya Mazmur 13. Pemazmur bertanya berapa lama empat kali dalam dua ayat.",
        "Alkitab tidak menyembunyikan pertanyaan orang-orang beriman. Justru di sana kita belajar bahwa pertanyaan yang dibawa kepada Allah adalah bentuk iman, bukan tanda iman yang hilang.",
      ],
    },
    cover: { bg: "#56303b", fg: "#f0e3df", motif: "path", layout: "classic" },
  },
  {
    slug: "gembala-yang-melayani",
    title: "Gembala yang Melayani",
    subtitle: "Catatan Pastoral untuk Pemimpin Gereja",
    author: AUTHOR,
    category: "pelayanan",
    price: 89000,
    pages: 248,
    fileSizeMb: 5.1,
    format: "PDF",
    language: "Indonesia",
    publishedAt: "2023-11-18",
    sold: 96,
    isPublished: true,
    blurb: "Catatan dua dekade penggembalaan: tentang khotbah, kunjungan, konflik jemaat, dan menjaga jiwa sang gembala sendiri.",
    description: [
      "Ditulis untuk pendeta, penatua, diaken, dan majelis yang memikul tanggung jawab penggembalaan. Isinya praktis, lahir dari pengalaman melayani jemaat di kota maupun di desa.",
      "Bagian terakhir membahas hal yang sering terlupakan: kesehatan rohani dan emosional para pelayan itu sendiri.",
    ],
    benefits: [
      "14 bab catatan pastoral",
      "Contoh format kunjungan jemaat",
      "Daftar periksa persiapan khotbah mingguan",
    ],
    toc: [
      "Panggilan untuk menggembalakan",
      "Mempersiapkan khotbah yang setia",
      "Kunjungan rumah dan rumah sakit",
      "Mendampingi jemaat yang berduka",
      "Menghadapi konflik di gereja",
      "Membina pemimpin baru",
      "Menjaga jiwa sang gembala",
    ],
    verse: {
      text: "Gembalakanlah kawanan domba Allah yang ada padamu, jangan dengan paksa, tetapi dengan sukarela sesuai dengan kehendak Allah.",
      ref: "1 Petrus 5:2",
    },
    cover: { bg: "#6d4429", fg: "#f2e6d8", motif: "arch", layout: "modern" },
  },
  {
    slug: "delapan-jalan-murid",
    title: "Delapan Jalan Murid",
    subtitle: "Merenungkan Ucapan Bahagia di Matius 5",
    author: AUTHOR,
    category: "studi-alkitab",
    price: 55000,
    pages: 144,
    fileSizeMb: 2.8,
    format: "PDF",
    language: "Indonesia",
    publishedAt: "2024-12-01",
    sold: 158,
    isPublished: true,
    blurb: "Delapan ucapan bahagia dibaca sebagai potret murid Kristus, bukan daftar syarat untuk menjadi bahagia.",
    description: [
      "Setiap ucapan bahagia dibahas dalam satu bab: artinya pada zaman Yesus, bagaimana ia menantang cara pandang kita hari ini, dan seperti apa wujudnya dalam hidup sehari-hari.",
      "Bisa dipakai untuk studi pribadi selama delapan minggu atau bahan persekutuan.",
    ],
    benefits: [
      "8 bab studi Ucapan Bahagia",
      "Pertanyaan pendalaman pribadi dan kelompok",
      "Ringkasan satu halaman untuk setiap bab",
    ],
    toc: [
      "Pengantar: Khotbah di bukit",
      "Miskin di hadapan Allah",
      "Yang berdukacita",
      "Yang lemah lembut",
      "Yang lapar dan haus akan kebenaran",
      "Yang murah hatinya",
      "Yang suci hatinya",
      "Yang membawa damai",
      "Yang dianiaya oleh sebab kebenaran",
    ],
    verse: {
      text: "Berbahagialah orang yang miskin di hadapan Allah, karena merekalah yang empunya Kerajaan Sorga.",
      ref: "Matius 5:3",
    },
    sample: {
      chapter: "Bab 1. Miskin di hadapan Allah",
      paragraphs: [
        "Yesus membuka khotbah-Nya dengan kalimat yang terdengar terbalik. Berbahagialah orang yang miskin. Di dunia yang mengukur keberhasilan dari apa yang dimiliki, Yesus memulai dari orang yang tahu bahwa dirinya tidak memiliki apa-apa di hadapan Allah.",
        "Kemiskinan yang dimaksud bukan sekadar soal dompet. Ini adalah sikap hati yang berkata: Tuhan, aku datang dengan tangan kosong.",
      ],
    },
    cover: { bg: "#46676b", fg: "#f0eee6", motif: "lines", layout: "classic" },
  },
  {
    slug: "sabat-bagi-jiwa-yang-lelah",
    title: "Sabat bagi Jiwa yang Lelah",
    subtitle: "Menemukan Istirahat di Tengah Kesibukan",
    author: AUTHOR,
    category: "pertumbuhan-iman",
    price: 45000,
    pages: 120,
    fileSizeMb: 2.2,
    format: "PDF",
    language: "Indonesia",
    publishedAt: "2025-04-12",
    sold: 274,
    isPublished: true,
    blurb: "Tentang istirahat yang Tuhan berikan, untuk pekerja, ibu rumah tangga, dan pelayan gereja yang kehabisan tenaga.",
    description: [
      "Buku ini mengajak pembaca melihat sabat bukan sebagai aturan, tetapi sebagai hadiah. Dibahas juga cara sederhana menata ritme kerja, ibadah, dan istirahat dalam satu minggu.",
      "Ditulis dengan bahasa yang hangat dan banyak contoh dari kehidupan keluarga di kota besar.",
    ],
    benefits: [
      "8 bab tentang istirahat dan ritme hidup",
      "Lembar perencanaan ritme mingguan",
      "Liturgi doa sederhana untuk malam hari",
    ],
    toc: [
      "Pengantar: Lelah yang tidak hilang dengan tidur",
      "Allah yang beristirahat",
      "Sabat sebagai hadiah",
      "Marilah kepada-Ku",
      "Ritme kerja dan doa",
      "Sabat di tengah keluarga muda",
      "Istirahat bagi para pelayan",
    ],
    verse: {
      text: "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi kelegaan kepadamu.",
      ref: "Matius 11:28",
    },
    cover: { bg: "#dcd8cc", fg: "#1f2c48", motif: "sun", layout: "modern" },
  },
  {
    slug: "mengasuh-dengan-kasih-karunia",
    title: "Mengasuh dengan Kasih Karunia",
    subtitle: "Panduan Praktis bagi Orang Tua Kristen",
    author: AUTHOR_COUPLE,
    category: "keluarga",
    price: 59000,
    pages: 176,
    fileSizeMb: 3.7,
    format: "PDF",
    language: "Indonesia",
    publishedAt: "2026-01-20",
    sold: 203,
    isPublished: true,
    blurb: "Mendidik anak dengan disiplin yang lahir dari kasih, bukan dari rasa takut atau malu.",
    description: [
      "Membahas tahap-tahap usia anak dari balita hingga remaja, termasuk tantangan gawai, sekolah, dan pergaulan. Setiap bab berisi prinsip alkitabiah dan langkah praktis yang bisa langsung diterapkan.",
      "Ditulis dari pengalaman membesarkan tiga anak dan mendampingi keluarga muda di gereja.",
    ],
    benefits: [
      "10 bab panduan pengasuhan per tahap usia",
      "Ide ibadah keluarga untuk anak kecil",
      "Daftar percakapan penting dengan remaja",
    ],
    toc: [
      "Pengantar: Orang tua juga butuh anugerah",
      "Balita: menanam benih",
      "Usia sekolah: disiplin yang mengasihi",
      "Gawai dan layar di rumah",
      "Remaja: dari mengatur ke mendampingi",
      "Ketika anak mempertanyakan iman",
      "Berdoa bagi anak-anak kita",
    ],
    verse: {
      text: "Didiklah orang muda menurut jalan yang patut baginya, maka pada masa tuanya pun ia tidak akan menyimpang dari pada jalan itu.",
      ref: "Amsal 22:6",
    },
    cover: { bg: "#5f7354", fg: "#f1efe4", motif: "path", layout: "classic" },
  },
  {
    slug: "renungan-pagi-untuk-pasangan",
    title: "Renungan Pagi untuk Pasangan",
    subtitle: "30 Hari Bertumbuh Bersama dalam Firman",
    author: AUTHOR_COUPLE,
    category: "renungan",
    price: 39000,
    pages: 96,
    fileSizeMb: 1.8,
    format: "PDF",
    language: "Indonesia",
    publishedAt: "2026-02-10",
    sold: 230,
    isPublished: true,
    blurb: "Tiga puluh renungan singkat untuk dibaca berdua sebelum memulai hari.",
    description: [
      "Setiap renungan berisi satu ayat, satu halaman bacaan, dan dua pertanyaan untuk dibicarakan berdua. Cocok untuk pasangan baru menikah maupun yang sudah puluhan tahun bersama.",
      "Banyak dipakai sebagai hadiah pernikahan dan bahan persiapan katekisasi nikah.",
    ],
    benefits: [
      "30 renungan untuk dibaca berdua",
      "Pertanyaan percakapan di setiap hari",
      "Doa pasangan di akhir setiap minggu",
    ],
    toc: [
      "Cara memakai renungan ini",
      "Minggu 1: Dipanggil bersama",
      "Minggu 2: Kasih yang sabar",
      "Minggu 3: Mengampuni setiap hari",
      "Minggu 4: Melayani bersama",
      "Penutup: Tali tiga lembar",
    ],
    verse: {
      text: "Dan bilamana seorang dapat dialahkan, dua orang akan dapat bertahan. Tali tiga lembar tak mudah diputuskan.",
      ref: "Pengkhotbah 4:12",
    },
    cover: { bg: "#874b52", fg: "#f6e9e4", motif: "arch", layout: "classic", series: "Renungan 30 Hari" },
  },
  {
    slug: "mazmur-untuk-musim-sulit",
    title: "Mazmur untuk Musim Sulit",
    subtitle: "Renungan dari 25 Mazmur Ratapan dan Pengharapan",
    author: AUTHOR,
    category: "renungan",
    price: 49000,
    pages: 152,
    fileSizeMb: 2.9,
    format: "PDF",
    language: "Indonesia",
    publishedAt: "2026-07-08",
    sold: 64,
    isPublished: true,
    blurb: "Dua puluh lima mazmur dipilih untuk menemani hari-hari yang berat: sakit, kehilangan, kecewa, dan menunggu.",
    description: [
      "Para pemazmur berdoa dengan jujur tentang takut, marah, dan sedih, lalu kembali berpegang pada kasih setia Tuhan. Buku ini mengajak pembaca berdoa bersama mereka.",
      "Setiap renungan ditutup dengan doa pendek yang bisa diucapkan saat kata-kata sendiri terasa habis.",
    ],
    benefits: [
      "25 renungan dari kitab Mazmur",
      "Doa pendek di setiap renungan",
      "Indeks mazmur berdasarkan pergumulan",
    ],
    toc: [
      "Pengantar: Doa yang jujur",
      "Saat takut: Mazmur 27, 46, 91",
      "Saat sakit: Mazmur 6, 38, 41",
      "Saat kehilangan: Mazmur 31, 42, 88",
      "Saat menunggu: Mazmur 13, 40, 130",
      "Saat bersyukur kembali: Mazmur 30, 103, 116",
    ],
    verse: {
      text: "Diamlah dan ketahuilah, bahwa Akulah Allah!",
      ref: "Mazmur 46:11",
    },
    cover: { bg: "#27344f", fg: "#e9e4d6", motif: "lines", layout: "modern" },
  },
  {
    slug: "murid-yang-memuridkan",
    title: "Murid yang Memuridkan",
    subtitle: "Langkah Sederhana Menjalankan Amanat Agung",
    author: AUTHOR,
    category: "pelayanan",
    price: 65000,
    pages: 188,
    fileSizeMb: 3.9,
    format: "PDF",
    language: "Indonesia",
    publishedAt: "2026-09-14",
    sold: 41,
    isPublished: true,
    blurb: "Pemuridan bukan program gereja, melainkan cara hidup. Buku ini menunjukkan langkah pertamanya.",
    description: [
      "Membahas cara memulai hubungan pemuridan satu lawan satu atau dalam kelompok kecil, apa saja yang perlu dipelajari bersama, dan bagaimana menyiapkan murid untuk memuridkan orang lain.",
      "Dilengkapi bahan 12 pertemuan dasar yang bisa langsung dipakai.",
    ],
    benefits: [
      "Bahan 12 pertemuan pemuridan dasar",
      "Panduan memulai kelompok kecil",
      "Lembar evaluasi perjalanan murid",
    ],
    toc: [
      "Pengantar: Pergilah dan jadikanlah murid",
      "Apa itu murid?",
      "Memulai dengan satu orang",
      "Firman, doa, dan persekutuan",
      "Murid yang diutus",
      "Bahan 12 pertemuan dasar",
    ],
    verse: {
      text: "Karena itu pergilah, jadikanlah semua bangsa murid-Ku dan baptislah mereka dalam nama Bapa dan Anak dan Roh Kudus.",
      ref: "Matius 28:19",
    },
    cover: { bg: "#34465a", fg: "#ebe8df", motif: "cross", layout: "classic" },
  },
];

export const getBook = (slug: string) => books.find((b) => b.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const publishedBooks = () => books.filter((b) => b.isPublished);
export const featuredBooks = () => publishedBooks().filter((b) => b.featured);
export const newestBooks = () =>
  [...publishedBooks()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
export const bestSellers = () => [...publishedBooks()].sort((a, b) => b.sold - a.sold);
export const countByCategory = (slug: CategorySlug) =>
  publishedBooks().filter((b) => b.category === slug).length;
export const relatedBooks = (book: Book, limit = 4) => {
  const sameCat = publishedBooks().filter((b) => b.category === book.category && b.slug !== book.slug);
  const others = bestSellers().filter((b) => b.category !== book.category && b.slug !== book.slug);
  return [...sameCat, ...others].slice(0, limit);
};
