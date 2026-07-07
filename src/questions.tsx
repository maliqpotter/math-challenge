import { ReactNode } from "react";

export interface Question {
  id: number;
  question: ReactNode;
  options: { label: string; isCorrect: boolean }[];
  hintMessage: string;
}

export const ALL_QUESTIONS: Question[] = [
  {
    id: 1,
    question: <>Perhatikan bentuk berikut.<br/><span className="text-4xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">3 &times; 3 &times; 3</span><br/>dapat ditulis menjadi ....</>,
    options: [
      { label: "3²", isCorrect: false },
      { label: "3³", isCorrect: true },
      { label: "9³", isCorrect: false },
      { label: "6³", isCorrect: false },
    ],
    hintMessage: "Pangkat menunjukkan banyaknya perkalian berulang."
  },
  {
    id: 2,
    question: <>Nilai dari <span className="text-amber-400 text-4xl">2⁴</span> adalah ....</>,
    options: [
      { label: "8", isCorrect: false },
      { label: "12", isCorrect: false },
      { label: "16", isCorrect: true },
      { label: "18", isCorrect: false },
    ],
    hintMessage: "Ingat: 2⁴ berarti 2 x 2 x 2 x 2."
  },
  {
    id: 3,
    question: <>Pernyataan:<br/><span className="text-4xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">5² = 10</span></>,
    options: [
      { label: "Benar", isCorrect: false },
      { label: "Salah", isCorrect: true },
    ],
    hintMessage: "Ingat, 5² berarti 5 × 5, bukan 5 × 2."
  },
  {
    id: 4,
    question: <>Pernyataan:<br/><span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">4³ berarti 4 &times; 4 &times; 4</span></>,
    options: [
      { label: "Benar", isCorrect: true },
      { label: "Salah", isCorrect: false },
    ],
    hintMessage: "Perhatikan kembali definisi pangkat sebagai perkalian berulang."
  },
  {
    id: 5,
    question: <>Lengkapilah kalimat berikut.<br/><br/>Bilangan berpangkat adalah ....</>,
    options: [
      { label: "Penjumlahan bilangan yang sama", isCorrect: false },
      { label: "Pengurangan bilangan yang sama", isCorrect: false },
      { label: "Perkalian berulang", isCorrect: true },
      { label: "Pembagian berulang", isCorrect: false },
    ],
    hintMessage: "Ingat kembali apa arti dari 3³ atau 2⁴."
  },
  {
    id: 6,
    question: <>Hasil dari <span className="text-amber-400 text-4xl">6²</span> adalah ....</>,
    options: [
      { label: "12", isCorrect: false },
      { label: "36", isCorrect: true },
      { label: "64", isCorrect: false },
      { label: "216", isCorrect: false },
    ],
    hintMessage: "6² berarti 6 dikalikan dengan dirinya sendiri."
  },
  {
    id: 7,
    question: <>Bentuk pangkat dari <span className="text-2xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">7 &times; 7 &times; 7 &times; 7 &times; 7</span> adalah ....</>,
    options: [
      { label: "7⁵", isCorrect: true },
      { label: "5⁷", isCorrect: false },
      { label: "7⁴", isCorrect: false },
      { label: "35", isCorrect: false },
    ],
    hintMessage: "Hitung ada berapa banyak angka 7 yang dikalikan."
  },
  {
    id: 8,
    question: <>Nilai dari <span className="text-amber-400 text-4xl">10³</span> adalah ....</>,
    options: [
      { label: "30", isCorrect: false },
      { label: "100", isCorrect: false },
      { label: "1.000", isCorrect: true },
      { label: "10.000", isCorrect: false },
    ],
    hintMessage: "10³ berarti 10 × 10 × 10."
  },
  {
    id: 9,
    question: <>Pernyataan:<br/><span className="text-4xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">8² = 64</span></>,
    options: [
      { label: "Benar", isCorrect: true },
      { label: "Salah", isCorrect: false },
    ],
    hintMessage: "Coba hitung hasil dari 8 × 8."
  },
  {
    id: 10,
    question: <>Bentuk sederhana dari <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">2³ &times; 2²</span> adalah ....</>,
    options: [
      { label: "2⁶", isCorrect: false },
      { label: "2⁵", isCorrect: true },
      { label: "4⁵", isCorrect: false },
      { label: "4⁶", isCorrect: false },
    ],
    hintMessage: "Pada perkalian bilangan berpangkat dengan basis yang sama, pangkatnya dijumlahkan."
  },
  {
    id: 11,
    question: <>Hasil dari <span className="text-amber-400 text-4xl">3⁴</span> adalah ....</>,
    options: [
      { label: "12", isCorrect: false },
      { label: "27", isCorrect: false },
      { label: "81", isCorrect: true },
      { label: "64", isCorrect: false },
    ],
    hintMessage: "3⁴ = 3 × 3 × 3 × 3."
  },
  {
    id: 12,
    question: <>Berapakah hasil dari <span className="text-amber-400 text-4xl">9²</span> ?</>,
    options: [
      { label: "18", isCorrect: false },
      { label: "81", isCorrect: true },
      { label: "90", isCorrect: false },
      { label: "99", isCorrect: false },
    ],
    hintMessage: "9² sama dengan 9 dikalikan 9."
  },
  {
    id: 13,
    question: <>Bentuk perkalian berulang dari <span className="text-amber-400 text-4xl">5⁴</span> adalah ....</>,
    options: [
      { label: "5 × 4", isCorrect: false },
      { label: "4 × 4 × 4 × 4 × 4", isCorrect: false },
      { label: "5 × 5 × 5 × 5", isCorrect: true },
      { label: "5 + 5 + 5 + 5", isCorrect: false },
    ],
    hintMessage: "Basisnya adalah 5, dan pangkatnya adalah 4 (banyaknya perkalian)."
  },
  {
    id: 14,
    question: <>Hasil dari <span className="text-amber-400 text-4xl">1¹⁰⁰</span> adalah ....</>,
    options: [
      { label: "1", isCorrect: true },
      { label: "100", isCorrect: false },
      { label: "0", isCorrect: false },
      { label: "1.000", isCorrect: false },
    ],
    hintMessage: "Angka 1 jika dipangkatkan berapapun hasilnya tetap 1."
  },
  {
    id: 15,
    question: <>Nilai dari <span className="text-amber-400 text-4xl">2⁵</span> adalah ....</>,
    options: [
      { label: "10", isCorrect: false },
      { label: "25", isCorrect: false },
      { label: "32", isCorrect: true },
      { label: "64", isCorrect: false },
    ],
    hintMessage: "Hitung 2 × 2 × 2 × 2 × 2."
  },
  {
    id: 16,
    question: <>Hasil dari <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">4² + 3²</span> adalah ....</>,
    options: [
      { label: "14", isCorrect: false },
      { label: "25", isCorrect: true },
      { label: "49", isCorrect: false },
      { label: "7", isCorrect: false },
    ],
    hintMessage: "Hitung masing-masing pangkat terlebih dahulu (16 dan 9), lalu jumlahkan."
  },
  {
    id: 17,
    question: <>Bentuk sederhana dari <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">(3²)³</span> adalah ....</>,
    options: [
      { label: "3⁵", isCorrect: false },
      { label: "3⁶", isCorrect: true },
      { label: "3⁸", isCorrect: false },
      { label: "9³", isCorrect: false },
    ],
    hintMessage: "Sifat pangkat dipangkatkan: pangkatnya dikalikan (2 × 3)."
  },
  {
    id: 18,
    question: <>Hasil dari <span className="text-amber-400 text-4xl">7³</span> adalah ....</>,
    options: [
      { label: "21", isCorrect: false },
      { label: "49", isCorrect: false },
      { label: "343", isCorrect: true },
      { label: "243", isCorrect: false },
    ],
    hintMessage: "7 × 7 = 49. Lalu kalikan 49 dengan 7."
  },
  {
    id: 19,
    question: <>Bentuk pangkat dari perkalian <span className="text-2xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">2 &times; 2 &times; 2 &times; 2 &times; 2 &times; 2</span> adalah ....</>,
    options: [
      { label: "2⁶", isCorrect: true },
      { label: "6²", isCorrect: false },
      { label: "12", isCorrect: false },
      { label: "2⁵", isCorrect: false },
    ],
    hintMessage: "Hitung jumlah angka 2 yang saling dikalikan."
  },
  {
    id: 20,
    question: <>Nilai dari <span className="text-amber-400 text-4xl">10⁴</span> adalah ....</>,
    options: [
      { label: "1.000", isCorrect: false },
      { label: "10.000", isCorrect: true },
      { label: "40", isCorrect: false },
      { label: "100.000", isCorrect: false },
    ],
    hintMessage: "10 pangkat 4 berarti angka 1 diikuti dengan 4 buah angka 0."
  },
  {
    id: 21,
    question: <>Pernyataan:<br/><span className="text-4xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">6³ = 6 &times; 3</span></>,
    options: [
      { label: "Benar", isCorrect: false },
      { label: "Salah", isCorrect: true },
    ],
    hintMessage: "6³ berarti 6 × 6 × 6, bukan 6 × 3."
  },
  {
    id: 22,
    question: <>Bentuk sederhana dari <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">5⁶ / 5⁴</span> adalah ....</>,
    options: [
      { label: "5¹⁰", isCorrect: false },
      { label: "5²", isCorrect: true },
      { label: "1²", isCorrect: false },
      { label: "5³", isCorrect: false },
    ],
    hintMessage: "Pada pembagian dengan basis yang sama, pangkatnya dikurangkan (6 - 4)."
  },
  {
    id: 23,
    question: <>Berapakah nilai dari <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">2³ + 2²</span> ?</>,
    options: [
      { label: "12", isCorrect: true },
      { label: "2⁵", isCorrect: false },
      { label: "32", isCorrect: false },
      { label: "10", isCorrect: false },
    ],
    hintMessage: "Hitung 2³ (8) dan 2² (4) secara terpisah, lalu jumlahkan."
  },
  {
    id: 24,
    question: <>Hasil dari <span className="text-amber-400 text-4xl">11²</span> adalah ....</>,
    options: [
      { label: "22", isCorrect: false },
      { label: "111", isCorrect: false },
      { label: "121", isCorrect: true },
      { label: "132", isCorrect: false },
    ],
    hintMessage: "11 dikalikan 11 adalah 121."
  },
  {
    id: 25,
    question: <>Pernyataan:<br/><span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">a² &times; a³ = a⁵</span></>,
    options: [
      { label: "Benar", isCorrect: true },
      { label: "Salah", isCorrect: false },
    ],
    hintMessage: "Pada perkalian basis yang sama, pangkat dijumlahkan."
  },
  {
    id: 26,
    question: <>Nilai dari <span className="text-amber-400 text-4xl">3⁵</span> adalah ....</>,
    options: [
      { label: "15", isCorrect: false },
      { label: "81", isCorrect: false },
      { label: "243", isCorrect: true },
      { label: "125", isCorrect: false },
    ],
    hintMessage: "3⁵ = 3 × 3 × 3 × 3 × 3."
  },
  {
    id: 27,
    question: <>Bentuk perkalian berulang dari <span className="text-amber-400 text-4xl">(-2)³</span> adalah ....</>,
    options: [
      { label: "(-2) × (-2) × (-2)", isCorrect: true },
      { label: "-2 × 2 × 2", isCorrect: false },
      { label: "(-2) × 3", isCorrect: false },
      { label: "2 × 2 × 2", isCorrect: false },
    ],
    hintMessage: "Tanda kurung ikut dikalikan berulang sebanyak pangkatnya."
  },
  {
    id: 28,
    question: <>Hasil dari <span className="text-amber-400 text-4xl">(-3)²</span> adalah ....</>,
    options: [
      { label: "-9", isCorrect: false },
      { label: "9", isCorrect: true },
      { label: "-6", isCorrect: false },
      { label: "6", isCorrect: false },
    ],
    hintMessage: "Bilangan negatif dipangkatkan genap akan menghasilkan bilangan positif."
  },
  {
    id: 29,
    question: <>Hasil dari <span className="text-amber-400 text-4xl">(-4)³</span> adalah ....</>,
    options: [
      { label: "-64", isCorrect: true },
      { label: "64", isCorrect: false },
      { label: "-12", isCorrect: false },
      { label: "16", isCorrect: false },
    ],
    hintMessage: "Bilangan negatif dipangkatkan ganjil akan menghasilkan bilangan negatif."
  },
  {
    id: 30,
    question: <>Bentuk sederhana dari <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">(y⁴)³</span> adalah ....</>,
    options: [
      { label: "y⁷", isCorrect: false },
      { label: "y¹²", isCorrect: true },
      { label: "y¹", isCorrect: false },
      { label: "3y⁴", isCorrect: false },
    ],
    hintMessage: "Jika pangkat dipangkatkan, kalikan kedua pangkat tersebut (4 × 3)."
  },
  {
    id: 31,
    question: <>Bentuk sederhana dari <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">b⁵ &times; b³</span> adalah ....</>,
    options: [
      { label: "b¹⁵", isCorrect: false },
      { label: "b⁸", isCorrect: true },
      { label: "b²", isCorrect: false },
      { label: "2b⁸", isCorrect: false },
    ],
    hintMessage: "Jumlahkan pangkatnya (5 + 3) karena basisnya sama dan operasinya perkalian."
  },
  {
    id: 32,
    question: <>Bentuk sederhana dari <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">p⁸ / p²</span> adalah ....</>,
    options: [
      { label: "p⁴", isCorrect: false },
      { label: "p⁶", isCorrect: true },
      { label: "p¹⁰", isCorrect: false },
      { label: "p¹⁶", isCorrect: false },
    ],
    hintMessage: "Kurangkan pangkatnya (8 - 2) karena basisnya sama dan operasinya pembagian."
  },
  {
    id: 33,
    question: <>Nilai dari <span className="text-amber-400 text-4xl">12²</span> adalah ....</>,
    options: [
      { label: "24", isCorrect: false },
      { label: "144", isCorrect: true },
      { label: "124", isCorrect: false },
      { label: "132", isCorrect: false },
    ],
    hintMessage: "12² = 12 × 12."
  },
  {
    id: 34,
    question: <>Nilai dari <span className="text-amber-400 text-4xl">13²</span> adalah ....</>,
    options: [
      { label: "26", isCorrect: false },
      { label: "139", isCorrect: false },
      { label: "169", isCorrect: true },
      { label: "196", isCorrect: false },
    ],
    hintMessage: "13² = 13 × 13."
  },
  {
    id: 35,
    question: <>Nilai dari <span className="text-amber-400 text-4xl">15²</span> adalah ....</>,
    options: [
      { label: "225", isCorrect: true },
      { label: "150", isCorrect: false },
      { label: "255", isCorrect: false },
      { label: "30", isCorrect: false },
    ],
    hintMessage: "15² = 15 × 15."
  },
  {
    id: 36,
    question: <>Nilai dari <span className="text-amber-400 text-4xl">20²</span> adalah ....</>,
    options: [
      { label: "40", isCorrect: false },
      { label: "200", isCorrect: false },
      { label: "400", isCorrect: true },
      { label: "4.000", isCorrect: false },
    ],
    hintMessage: "20² = 20 × 20."
  },
  {
    id: 37,
    question: <>Nilai dari <span className="text-amber-400 text-4xl">5³</span> adalah ....</>,
    options: [
      { label: "15", isCorrect: false },
      { label: "25", isCorrect: false },
      { label: "125", isCorrect: true },
      { label: "225", isCorrect: false },
    ],
    hintMessage: "5³ = 5 × 5 × 5."
  },
  {
    id: 38,
    question: <>Nilai dari <span className="text-amber-400 text-4xl">4⁴</span> adalah ....</>,
    options: [
      { label: "16", isCorrect: false },
      { label: "64", isCorrect: false },
      { label: "256", isCorrect: true },
      { label: "512", isCorrect: false },
    ],
    hintMessage: "4⁴ = 4 × 4 × 4 × 4."
  },
  {
    id: 39,
    question: <>Nilai dari <span className="text-amber-400 text-4xl">0⁵</span> adalah ....</>,
    options: [
      { label: "0", isCorrect: true },
      { label: "5", isCorrect: false },
      { label: "1", isCorrect: false },
      { label: "Tidak terdefinisi", isCorrect: false },
    ],
    hintMessage: "Nol dipangkatkan berapapun (positif) hasilnya tetap nol."
  },
  {
    id: 40,
    question: <>Pernyataan:<br/><span className="text-4xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">9⁰ = 1</span></>,
    options: [
      { label: "Benar", isCorrect: true },
      { label: "Salah", isCorrect: false },
    ],
    hintMessage: "Setiap bilangan (kecuali nol) jika dipangkatkan 0 hasilnya adalah 1."
  },
  {
    id: 41,
    question: <>Nilai dari pangkat negatif <span className="text-amber-400 text-4xl">2⁻¹</span> adalah ....</>,
    options: [
      { label: "-2", isCorrect: false },
      { label: "1/2", isCorrect: true },
      { label: "-1/2", isCorrect: false },
      { label: "0,2", isCorrect: false },
    ],
    hintMessage: "a⁻ⁿ = 1/aⁿ. Jadi, 2⁻¹ = 1/2¹."
  },
  {
    id: 42,
    question: <>Nilai dari pangkat negatif <span className="text-amber-400 text-4xl">5⁻²</span> adalah ....</>,
    options: [
      { label: "-25", isCorrect: false },
      { label: "1/10", isCorrect: false },
      { label: "1/25", isCorrect: true },
      { label: "-1/25", isCorrect: false },
    ],
    hintMessage: "5⁻² = 1/5² = 1/25."
  },
  {
    id: 43,
    question: <>Hasil desimal dari pangkat <span className="text-amber-400 text-4xl">10⁻³</span> adalah ....</>,
    options: [
      { label: "0,01", isCorrect: false },
      { label: "0,001", isCorrect: true },
      { label: "-1000", isCorrect: false },
      { label: "0,0001", isCorrect: false },
    ],
    hintMessage: "10⁻³ = 1/1000 = 0,001."
  },
  {
    id: 44,
    question: <>Bentuk pangkat dari pecahan <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">1 / 81</span> adalah ....</>,
    options: [
      { label: "3⁻⁴", isCorrect: true },
      { label: "3⁴", isCorrect: false },
      { label: "9²", isCorrect: false },
      { label: "3⁻³", isCorrect: false },
    ],
    hintMessage: "81 = 3⁴, sehingga 1/81 = 3⁻⁴."
  },
  {
    id: 45,
    question: <>Hasil dari perhitungan <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">2³ &times; 5²</span> adalah ....</>,
    options: [
      { label: "200", isCorrect: true },
      { label: "100", isCorrect: false },
      { label: "80", isCorrect: false },
      { label: "400", isCorrect: false },
    ],
    hintMessage: "Hitung 2³ (8) dan 5² (25), lalu kalikan (8 × 25)."
  },
  {
    id: 46,
    question: <>Hasil dari perhitungan <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">10² - 8²</span> adalah ....</>,
    options: [
      { label: "4", isCorrect: false },
      { label: "36", isCorrect: true },
      { label: "64", isCorrect: false },
      { label: "2", isCorrect: false },
    ],
    hintMessage: "Hitung 100 - 64."
  },
  {
    id: 47,
    question: <>Hasil dari <span className="text-amber-400 text-4xl">(2 + 3)²</span> adalah ....</>,
    options: [
      { label: "13", isCorrect: false },
      { label: "25", isCorrect: true },
      { label: "10", isCorrect: false },
      { label: "36", isCorrect: false },
    ],
    hintMessage: "Selesaikan operasi di dalam kurung dahulu (5), baru dipangkatkan."
  },
  {
    id: 48,
    question: <>Hasil dari <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">2³ + 3² - 5¹</span> adalah ....</>,
    options: [
      { label: "12", isCorrect: true },
      { label: "8", isCorrect: false },
      { label: "14", isCorrect: false },
      { label: "6", isCorrect: false },
    ],
    hintMessage: "Hitung masing-masing: 8 + 9 - 5."
  },
  {
    id: 49,
    question: <>Bentuk pangkat dari pecahan <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">1 / 32</span> adalah ....</>,
    options: [
      { label: "2⁻⁵", isCorrect: true },
      { label: "2⁵", isCorrect: false },
      { label: "5⁻²", isCorrect: false },
      { label: "2⁻⁴", isCorrect: false },
    ],
    hintMessage: "32 = 2⁵, sehingga 1/32 = 2⁻⁵."
  },
  {
    id: 50,
    question: <>Hasil dari <span className="text-3xl font-mono text-amber-400 block mt-4 bg-slate-800/50 p-4 rounded-lg inline-block border border-slate-700">2⁰ + 3⁰ + 5⁰</span> adalah ....</>,
    options: [
      { label: "3", isCorrect: true },
      { label: "10", isCorrect: false },
      { label: "0", isCorrect: false },
      { label: "1", isCorrect: false },
    ],
    hintMessage: "Ingat bahwa berapapun pangkat nol (kecuali 0) nilainya adalah 1. Jadi 1 + 1 + 1."
  }
];
