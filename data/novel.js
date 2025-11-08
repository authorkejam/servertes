// Data Novel dan berkas bacaannya
let novels = [
  {
    id: 0,
    title: "TUTORIAL PENGGUNAAN",
    date: "00-10-2025",
    genre: ["Baca dulu, ini mungkin membantu"],
    chapters: [
      {
        title: "Tutorial Chapter 1: Tombol Kontrol",
        file: "Novel/Tutorial/tutorial1.md"
      },
      {
        title: "Tutorial Chapter 2: Navigasi",
        file: "Novel/Tutorial/tutorial2.md"
      },
      {
        title: "Pengenalan",
        file: "Novel/Tutorial/Pengenalan.md"
      },
      {
        title: "list keinginan",
        file: "Novel/Tutorial/listkeinginan.md"
      }
    ]
  },
  {
    id: 1,
    title: "Another Side",
    date: "18-06-2019",
    status: "Bersambung",
    genre: ["Drama", "Romance", "Tragedy"],
    cover: "cover/Another-cover.jpg",
    chapters: [
      {
        title: "Prologue",
        file: "Novel/1Anotherside/Know the Characters.md"
      },
      {
        title: "Chapter 1: Sepotong Roti",
        file: "Novel/1Anotherside/anotherside_chapter1.md"
      },
      {
        title: "Chapter 2: Tempat Kerja",
        file: "Novel/1Anotherside/anotherside_chapter2.md"
      },
      {
        title: "Chapter 3: Tanggung Jawab",
        file: "Novel/1Anotherside/anotherside_chapter3.md"
      },
      {
        title: "Chapter 4: Candaan",
        file: "Novel/1Anotherside/anotherside_chapter4.md"
      },
      {
        title: "Chapter 5: Boneka Rusak",
        file: "Novel/1Anotherside/anotherside_chapter5.md"
      },
      {
        title: "Chapter 6: Namamu?",
        file: "Novel/1Anotherside/anotherside_chapter6.md"
      },
      {
        title: "Chapter 7: Balas Dendam",
        file: "Novel/1Anotherside/anotherside_chapter7.md"
      },
      {
        title: "Chapter 8: Masa Laluku",
        file: "Novel/1Anotherside/anotherside_chapter8.md"
      },
      {
        title: "Chapter 9: Renata Kecil",
        file: "Novel/1Anotherside/anotherside_chapter9.md"
      },
      {
        title: "Chapter 10: Sahabatku",
        file: "Novel/1Anotherside/anotherside_chapter10.md"
      },
      {
        title: "Chapter 11: Liburan",
        file: "Novel/1Anotherside/anotherside_chapter11.md"
      },
      {
        title: "Chapter 12: Sesuatu yang tak Kuinginkan",
        file: "Novel/1Anotherside/anotherside_chapter12.md"
      },
      {
        title: "Chapter 13: Ingatan yang Salah",
        file: "Novel/1Anotherside/anotherside_chapter13.md"
      },
      {
        title: "Chapter 14: Another Story",
        file: "Novel/1Anotherside/anotherside_chapter14.md"
      },
      {
        title: "Chapter 15: Aku & Deona",
        file: "Novel/1Anotherside/anotherside_chapter15.md"
      },
      {
        title: "Chapter 16:",
        file: "Novel/1Anotherside/anotherside_chapter16.md"
      },

    ]
  },
  {
    id: 2,
    title: "Boulevards of Broken Dream",
    date: "03-08-2024",
    status: "Bersambung",
    genre: ["Drama", "Crime",],
    cover: "cover/Boulevards-cover.jpg",
    chapters: [
      {
        title: "Chapter 1: Just a Dream",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter1.md"
      },
      {
        title: "Chapter 2: Broken Heart",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter2.md"
      },
      {
        title: "Chapter 3: Broken Way",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter3.md"
      },
      {
        title: "Chapter 4: Broken Drive",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter4.md"
      },
      {
        title: "Chapter 5: The Broken Rules",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter5.md"
      },
      {
        title: "Chapter 6: The Broken Promise",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter6.md"
      },
      {
        title: "Chapter 7: The Broken Story",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter7.md"
      },
      {
        title: "Chapter 8: The Broken Dream",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter8.md"
      },
      {
        title: "Chapter 9: The Broken Past",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter9.md"
      },
      {
        title: "Chapter 10: Broken Choices",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter10.md"
      },
      {
        title: "Chapter 11: Broken Memory",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter11.md"
      },
      {
        title: "Chapter 12: Broken Friend",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter12.md"
      },
      {
        title: "Chapter 13: Broken Soul",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter13.md"
      },
      {
        title: "Chapter 14: Broken Truth",
        file: "Novel/2BoulevardsofBrokenDream/boulevards_chapter14.md"
      }
    ]
  },
  {
    id:3,
    title: "Being Kind?",
    date: "30-12-2023",
    status: "Completed",
    genre: ["Philosophy","Psychology","Short"],
    cover: "cover/beingkind-cover.jpg",
    chapters: [
      {
        title: "Chapter 1: Concept of Kindness",
        file: "Novel/3BeingKind/beingkind_chapter1.md"
      },
      {
        title: "Chapter 2: Forgotten Kindness",
        file: "Novel/3BeingKind/beingkind_chapter2.md"
      },
      {
        title: "Chapter 3: Lost of Self",
        file: "Novel/3BeingKind/beingkind_chapter3.md"
      },
      {
        title: "Chapter 4: I Thoutght being Kind is a Gift, instead it's a Curse",
        file: "Novel/3BeingKind/beingkind_chapter4.md"
      },
      {
        title: "Chapter 5: Kebaikan adalah hal yang menyakitkan",
        file: "Novel/3BeingKind/beingkind_chapter5.md"
      },
      {
        title: "Chapter 6: Aku lelah menjadi Baik",
        file: "Novel/3BeingKind/beingkind_chapter6.md"
      },
      {
        title: "Chapter 7: Just because doing samoething good,",
        file: "Novel/3BeingKind/beingkind_chapter7.md"
      },
      {
        title: "Chapter 8: doesn't mean you Kind",
        file: "Novel/3BeingKind/beingkind_chapter8.md"
      },
      {
        title: "Chapter 9: Bagi Untuk Orang Lain, Buruk Bagiku",
        file: "Novel/3BeingKind/beingkind_chapter9.md"
      },
      {
        title: "Chapter 10: Hate and Trust",
        file: "Novel/3BeingKind/beingkind_chapter10.md"
      },
      {
        title: "Chapter 11: What is good? What is bad?",
        file: "Novel/3BeingKind/beingkind_chapter11.md"
      },
      {
        title: "Chapter 12: Illusion and Kindness",
        file: "Novel/3BeingKind/beingkind_chapter12.md"
      },
      {
        title: "The Past",
        file: "Novel/3BeingKind/beingkind_chapter13.md"
      },
      {
        title: "Note for Readers",
        file: "Novel/3BeingKind/beingkind_chapter14.md"
      }

    ]
  },
  {
    id: 4,
    title: "VAL",
    date: "01-04-2025",
    status: "Ongoing",
    genre: ["Drama","Romance"],
    cover: "cover/Val-cover.jpg",
    chapters: [
      {
        title: "Chapter 1: PILIHAN YANG SALAH",
        file: "Novel/4VAL/val_chapter1.md"
      },
      {
        title: "Chapter 2: Kehidupan Sekolah yang Berbeda",
        file: "Novel/4VAL/val_chapter2.md"
      },
      {
        title: "Chapter 3: Masa Perkuliahan",
        file: "Novel/4VAL/val_chapter3.md"
      },
      {
        title: "Chapter 4: Double Date",
        file: "Novel/4VAL/val_chapter4.md"
      }
    ]
  },
  /*{
    id: 5,
    title: "Hunted by Death",
    date: "01-04-2024",
    status: "?",
    genre: ["Belum Tersedia",],
    cover: "cover/Hunted-cover.jpg",
    chapters: [
      {
        title: "Chapter 1: The Chase Begins",
        file: "Novel/5Huntedbydeath/novel4_chapter1.md"
      },
      {
        title: "Chapter 2: Shadows of the Past",
        file: "Novel/5Huntedbydeath/novel4_chapter2.md"
      }
    ]
  },*/
  {
    id: 6,
    title: "Pacarku Seorang Yakuza",
    date: "17-10-2025",
    status: "Complete",
    genre: ["Mafia", "Romance", "Drama",],
    cover: "cover/Yakuza-cover.jpg",
    chapters: [
      {title: "Bab 1: Pembuka",
        file: "Novel/6Yakuza/1yakuza.md"
      },
      {
        title: "Bab 2: Bayangan yang Mengendap",
        file: "Novel/6Yakuza/2yakuza.md"
      },
      {
        title: "Bab 3: Retakan Pertama",
        file: "Novel/6Yakuza/3yakuza.md"
      },
      {
        title: "Bab 4: Garis yang Kabur",
        file: "Novel/6Yakuza/4yakuza.md"
      },
      {
        title: "Bab 5: Mata yang Mengintai",
        file: "Novel/6Yakuza/5yakuza.md"
      },
      {
        title: "Bab 6: Tembok yang Runtuh",
        file: "Novel/6Yakuza/6yakuza.md"
      },
      {
        title: "Bab 7: Perang Dimulai",
        file: "Novel/6Yakuza/7yakuza.md"
      },
      {
        title: "Bab 8: Jejak Bayangan",
        file: "Novel/6Yakuza/8yakuza.md"
      },
      {
        title: "Bab 9: Pertarungan Bayangan",
        file: "Novel/6Yakuza/9yakuza.md"
      },
      {
        title: "Bab 10: Lenyap dalam Ingatan",
        file: "Novel/6Yakuza/10yakuza.md"
      }
    ]
  },
  {
    id: 7,
    title: "Jendela Restoran Keluarga",
    date: "06-11-2025",
    status: "Ongoing",
    genre: ["Drama", "Romance"],
    cover: "cover/Jendela-cover.jpg",
    chapters: [
      {
        title: "Bab 1 - Aku dan Mereka",
        file: "Novel/Jendela Restoran Keluarga/Jendela1.md",
      },
      {
        title: "Bab 2 - Pagi yang sibuk",
        file: "Novel/Jendela Restoran Keluarga/Jendela2.md",
      },
      {
        title: "Bab 3 - Cerita Dibalik Dapur",
        file: "Novel/Jendela Restoran Keluarga/Jendela3.md",
      },
      {
        title: "Bab 4 - Sudut Pandang Pertama",
        file: "Novel/Jendela Restoran Keluarga/Jendela4.md",
      },
      {
        title: "Bab 5 - Tertabrak dan Kembali Kesana",
        file: "Novel/Jendela Restoran Keluarga/Jendela5.md",
      },
      {
        title: "Bab 6 - Renata Kecil",
        file: "Novel/Jendela Restoran Keluarga/Jendela6.md",
      },
      {
        title: "Bab 7 - Kampung Halaman",
        file: "Novel/Jendela Restoran Keluarga/Jendela7.md",
      },
      {
        title: "Bab 8 Janji",
        file: "Novel/Jendela Restoran Keluarga/Jendela8.md",
      },
      {
        title: "Bab 9 - Bermain Bersama Anak Panti",
        file: "Novel/Jendela Restoran Keluarga/Jendela9.md",
      },
      {
        title: "Bab 10 - Kegelisahan",
        file: "Novel/Jendela Restoran Keluarga/Jendela10.md",
      },
      {
        title: "Bab 11 - Kesibukan Masing-Masing",
        file: "Novel/Jendela Restoran Keluarga/Jendela11.md",
      },
      {
        title: "Bab 12 - Dito/Romantic Dinner",
        file: "Novel/Jendela Restoran Keluarga/Jendela12.md",
      },
      {
        title: "Bab 13 - New Moments",
        file: "Novel/Jendela Restoran Keluarga/Jendela13.md",
      },
      {
        title: "Bab 14 - Orphanage Visit",
        file: "Novel/Jendela Restoran Keluarga/Jendela14.md",
      },
      {
        title: "Bab 15 - Hari Belanja",
        file: "Novel/Jendela Restoran Keluarga/Jendela15.md",
      },
      {
        title: "Bab 16 - Persiapan",
        file: "Novel/Jendela Restoran Keluarga/Jendela16.md",
      },
      {
        title: "Bab 17 - Tias & Reza/Romantic",
        file: "Novel/Jendela Restoran Keluarga/Jendela17.md",
      },
      {
        title: "Bab 18 - Cinta Bukan untuk Semua Orang",
        file: "Novel/Jendela Restoran Keluarga/Jendela18.md",
      },
      {
        title: "Bab 19 - Hari Persiapan",
        file: "Novel/Jendela Restoran Keluarga/Jendela19.md",
      },
      {
        title: "Bab 20 - Cerita Gadis yang Menderita",
        file: "Novel/Jendela Restoran Keluarga/Jendela20.md",
      },
      {
        title: "Bab 21 - Hari Amal",
        file: "Novel/Jendela Restoran Keluarga/Jendela21.md",
      },
      {
        title: "Bab 22 - Kisah Cinta dan Kepergian",
        file: "Novel/Jendela Restoran Keluarga/Jendela22.md",
      },
      {
        title: "Bab 23 - The Truth About Him",
        file: "Novel/Jendela Restoran Keluarga/Jendela23.md",
      },
      {
        title: "Bab 24 - Kenangan Lama",
        file: "Novel/Jendela Restoran Keluarga/Jendela24.md",
      },
    ],
  },
  
];
//Batas Novel, dibawah Short Story




