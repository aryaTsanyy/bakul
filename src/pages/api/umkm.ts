// Daftar kategori yang digunakan untuk filter. Tambahkan jika ada kategori lain!
export type Category =
  | "Makanan"
  | "Minuman"
  | "Jasa"
  | "Kosmetik"
  | "Oleh-oleh"
  | "Lainnya";

// Struktur untuk setiap item menu/layanan
export interface ProductService {
  name: string;
  // Jika ingin menambah harga di masa depan: price?: number;
}

// Review dari pelanggan (opsional, bisa diaktifkan nanti)
export interface Review {
  id: number;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  date: string;
}
export interface testimonialsDummy {
  id: string;
  nama: string;
  jabatan: string;
  imageOwner: string;
  komentar: string;
}

// Location Data
export interface LocationData {
  lat: number;
  lng: number;
  googleMapsUrl: string;
}

// --- 3. Interface UMKM Utama ---

export interface Umkm {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  categories: Category[];
  description: string;
  story?: string;
  searchKeywords: string[];
  averageRating: number;
  testimonials: testimonialsDummy[];
  address: string;
  phone: string;
  instagram: string;
  operatingHours: string;
  productsAndServices: ProductService[];
  location: LocationData;
  photos: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  business: string;
  imageOwner: string;
  komentar: string;
}
