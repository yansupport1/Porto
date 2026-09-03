import { FaArrowLeft, FaTriangleExclamation } from 'react-icons/fa6';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-panel glass-dark">
        <FaTriangleExclamation className="accent-gold text-3xl" />
        <p className="eyebrow mt-8">Sinyal tidak ditemukan</p>
        <h1>404</h1>
        <p className="not-found-copy">Halaman ini belum punya alamat. Mari kembali ke tempat ide-ide Yanz mulai bergerak.</p>
        <Link href="/" className="button button-primary mt-8" data-testid="link-404-home">
          <FaArrowLeft /> Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}