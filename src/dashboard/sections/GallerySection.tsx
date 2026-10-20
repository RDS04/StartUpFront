import React, { useState, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  Save,
  ZoomIn,
  MoveUp,
  MoveDown,
  Link as LinkIcon,
  Loader2,
  Heart,
  Eye,
} from 'lucide-react';
import type { DashboardData, GalleryPhotoItem, TierConfig } from '../types';
import { saveDashboardData } from '../initialData';
import { saveMyInvitation, uploadGalleryImage } from '../../services/invitationService';

interface GallerySectionProps {
  data: DashboardData;
  setData: React.Dispatch<React.SetStateAction<DashboardData>>;
  tierConfig: TierConfig;
  onShowToast: (msg: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  data,
  setData,
  tierConfig: _tierConfig,
  onShowToast,
}) => {
  const gallery = data.gallery || [];

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewLocalUrl, setPreviewLocalUrl] = useState<string | null>(null);
  const [captionInput, setCaptionInput] = useState('');
  const [orientationInput, setOrientationInput] = useState<'portrait' | 'landscape'>('portrait');
  const [urlInput, setUrlInput] = useState('');
  const [inputMode, setInputMode] = useState<'file' | 'url'>('file');

  // Preview Modal
  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        onShowToast('Ukuran foto maksimal 8 MB.');
        return;
      }
      setSelectedFile(file);
      setPreviewLocalUrl(URL.createObjectURL(file));
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalUrl = '';

    if (inputMode === 'file') {
      if (!selectedFile) {
        onShowToast('Pilih file foto terlebih dahulu.');
        return;
      }

      setIsUploading(true);
      try {
        const uploadRes = await uploadGalleryImage(selectedFile);
        finalUrl = uploadRes.url;
      } catch (err: any) {
        console.warn('Gagal upload file ke backend:', err);
        // Fallback: gunakan blob url lokal jika backend offline
        finalUrl = previewLocalUrl || '';
        onShowToast('Disimpan secara lokal di perangkat.');
      } finally {
        setIsUploading(false);
      }
    } else {
      if (!urlInput.trim()) {
        onShowToast('Masukkan tautan URL foto.');
        return;
      }
      finalUrl = urlInput.trim();
    }

    if (!finalUrl) {
      onShowToast('Foto tidak valid.');
      return;
    }

    const newPhoto: GalleryPhotoItem = {
      id: `photo-${Date.now()}`,
      url: finalUrl,
      thumbnail: finalUrl,
      caption: captionInput.trim() || 'Momen Bahagia Kami',
      orientation: orientationInput,
    };

    const updatedGallery = [...gallery, newPhoto];
    const updatedData: DashboardData = {
      ...data,
      gallery: updatedGallery,
    };

    setData(updatedData);
    saveDashboardData(updatedData);

    // Auto save to database
    try {
      await saveMyInvitation(updatedData);
      onShowToast('Foto berhasil ditambahkan & tersimpan ke database!');
    } catch {
      onShowToast('Foto berhasil ditambahkan ke galeri lokal.');
    }

    // Reset Form
    setSelectedFile(null);
    setPreviewLocalUrl(null);
    setCaptionInput('');
    setUrlInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeletePhoto = async (id: string | number) => {
    const updatedGallery = gallery.filter((p) => p.id !== id);
    const updatedData: DashboardData = {
      ...data,
      gallery: updatedGallery,
    };
    setData(updatedData);
    saveDashboardData(updatedData);

    try {
      await saveMyInvitation(updatedData);
      onShowToast('Foto berhasil dihapus dari database.');
    } catch {
      onShowToast('Foto dihapus.');
    }
  };

  const handleMovePhoto = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === gallery.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...gallery];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    const updatedData: DashboardData = {
      ...data,
      gallery: reordered,
    };
    setData(updatedData);
    saveDashboardData(updatedData);

    try {
      await saveMyInvitation(updatedData);
      onShowToast('Urutan foto berhasil disimpan.');
    } catch {
      onShowToast('Urutan foto diperbarui.');
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      saveDashboardData(data);
      await saveMyInvitation(data);
      onShowToast('Galeri foto berhasil disimpan ke database!');
    } catch (err: any) {
      console.warn('Gagal menyimpan galeri:', err);
      onShowToast('Tersimpan di perangkat lokal.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-7 max-w-4xl animate-in fade-in pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
              Galeri Foto (Momen Bahagia)
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1B4332]">
              {gallery.length} Foto
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Unggah foto prewedding Anda. Foto yang diunggah akan otomatis tersimpan di database dan tampil di bagian &ldquo;Momen Bahagia Kami&rdquo; pada undangan digital.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 self-start sm:self-auto"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan ke Database</span>
            </>
          )}
        </button>
      </div>

      {/* Grid: Upload Form (Left) & Gallery Preview / List (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Upload Form Box */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 sm:p-6 rounded-3xl border border-stone-200 bg-white shadow-xs space-y-4">
            <h2 className="font-bold text-stone-800 text-sm flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#2D6A4F]" />
              <span>Tambah Foto Baru</span>
            </h2>

            {/* Switch Mode: File vs URL */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100 rounded-xl">
              <button
                type="button"
                onClick={() => setInputMode('file')}
                className={`py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  inputMode === 'file'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
              </button>
              <button
                type="button"
                onClick={() => setInputMode('url')}
                className={`py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  inputMode === 'url'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Input URL</span>
              </button>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4">
              {inputMode === 'file' ? (
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Pilih Berkas Foto *
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                    id="gallery-file-input"
                  />

                  {previewLocalUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-emerald-300 bg-stone-50 aspect-video group">
                      <img
                        src={previewLocalUrl}
                        alt="Preview Foto"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-white/90 text-stone-800 text-xs font-bold hover:bg-white cursor-pointer"
                        >
                          Ganti Foto
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="gallery-file-input"
                      className="border-2 border-dashed border-stone-300 hover:border-[#2D6A4F] bg-stone-50/70 hover:bg-emerald-50/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#2D6A4F] flex items-center justify-center mb-2 shadow-xs">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-stone-700">
                        Klik untuk upload foto
                      </span>
                      <span className="text-[10px] text-stone-400 mt-0.5">
                        Format JPG, PNG, WEBP (Maks 8MB)
                      </span>
                    </label>
                  )}
                </div>
              ) : (
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Tautan URL Foto *
                  </label>
                  <input
                    type="url"
                    placeholder="https://contoh.com/foto-prewedding.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]"
                  />
                </div>
              )}

              {/* Caption */}
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Keterangan / Caption Foto (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Sesi Foto Lembah Harau"
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>

              {/* Orientation */}
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Orientasi Tampilan Grid
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrientationInput('portrait')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      orientationInput === 'portrait'
                        ? 'border-[#2D6A4F] bg-emerald-50 text-[#1B4332]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="w-2.5 h-3.5 border-2 border-current rounded-xs" />
                    <span>Portrait (3:4)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrientationInput('landscape')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      orientationInput === 'landscape'
                        ? 'border-[#2D6A4F] bg-emerald-50 text-[#1B4332]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="w-3.5 h-2.5 border-2 border-current rounded-xs" />
                    <span>Landscape (16:9)</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengunggah Foto...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Tambahkan ke Galeri</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Gallery List & Live Invitation Simulator (Right) */}
        <div className="lg:col-span-7 space-y-6">
          {/* List of Uploaded Photos */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-stone-800 text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#2D6A4F]" />
                <span>Daftar Foto Galeri ({gallery.length})</span>
              </h2>
              {gallery.length > 0 && (
                <span className="text-[11px] text-stone-400">
                  Gunakan panah untuk mengubah urutan foto
                </span>
              )}
            </div>

            {gallery.length === 0 ? (
              <div className="p-8 rounded-3xl border-2 border-dashed border-stone-200 bg-white text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-stone-700">Belum Ada Foto Galeri</h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Gunakan form di samping untuk mengunggah foto prewedding pertama Anda.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {gallery.map((photo, index) => {
                  return (
                    <div
                      key={photo.id}
                      className="p-3 rounded-2xl border border-stone-200 bg-white shadow-xs space-y-2 group hover:border-stone-300 transition"
                    >
                      <div className="relative rounded-xl overflow-hidden bg-stone-100 aspect-video">
                        <img
                          src={photo.url}
                          alt={photo.caption || `Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-semibold uppercase backdrop-blur-xs">
                          #{index + 1} &bull; {photo.orientation}
                        </span>

                        <button
                          type="button"
                          onClick={() => setActivePreviewIndex(index)}
                          className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black text-white cursor-pointer backdrop-blur-xs opacity-0 group-hover:opacity-100 transition"
                          title="Perbesar foto"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <p className="text-xs font-semibold text-stone-800 truncate flex-1" title={photo.caption}>
                          {photo.caption || 'Tanpa keterangan'}
                        </p>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleMovePhoto(index, 'up')}
                            disabled={index === 0}
                            className="p-1 rounded-md text-stone-400 hover:text-stone-800 hover:bg-stone-100 disabled:opacity-20 cursor-pointer"
                            title="Pindah ke atas"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMovePhoto(index, 'down')}
                            disabled={index === gallery.length - 1}
                            className="p-1 rounded-md text-stone-400 hover:text-stone-800 hover:bg-stone-100 disabled:opacity-20 cursor-pointer"
                            title="Pindah ke bawah"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="p-1 rounded-md text-rose-500 hover:bg-rose-50 cursor-pointer ml-1"
                            title="Hapus foto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Live Invitation Template Preview Section */}
          <div className="p-5 sm:p-6 rounded-3xl border border-stone-200 bg-[#fbfdf9] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332]">
                <Eye className="w-4 h-4 text-[#2D6A4F]" />
                <span>Simulasi Tampilan &ldquo;Momen Bahagia Kami&rdquo; di Undangan</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-[#1B4332] font-semibold">
                Live Preview
              </span>
            </div>

            {/* Template Card Simulator */}
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-[#f3f6ee] text-[#2c3d2f] border border-[#8f9e7b]/30 shadow-sm space-y-6">
              <div className="text-center space-y-1.5">
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#718569] bg-white px-2.5 py-0.5 rounded-full border border-[#8f9e7b]/30">
                  Our Gallery
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#233325]">
                  Momen Bahagia Kami
                </h3>
                <div className="w-10 h-0.5 bg-[#c5a454] mx-auto rounded-full mt-1.5" />
              </div>

              <div className="text-center px-2">
                <p className="text-[11px] text-[#50644d] italic font-light leading-relaxed">
                  &ldquo;Menikah bukan perlombaan, bukan soal cepat atau lambat. Tetapi, siapa yang siap mengemban amanah yang besar.&rdquo;
                </p>
              </div>

              {/* Grid Simulator matching User Image 1 */}
              <div className="grid grid-cols-2 gap-2.5">
                {gallery.length > 0 ? (
                  gallery.map((photo, i) => {
                    const isWide = photo.orientation === 'landscape';
                    return (
                      <div
                        key={photo.id}
                        onClick={() => setActivePreviewIndex(i)}
                        className={`relative rounded-xl overflow-hidden bg-stone-200 cursor-pointer shadow-xs hover:shadow-md transition group ${
                          isWide ? 'col-span-2 aspect-video' : 'aspect-[3/4]'
                        }`}
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption || `Momen ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-[#1c291d]/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/90 text-[#2c3d2f] flex items-center justify-center shadow">
                            <ZoomIn className="w-4 h-4 text-[#5b6e55]" />
                          </div>
                        </div>
                        <div className="absolute bottom-1.5 right-1.5">
                          <div className="p-1 rounded-full bg-white/60 text-[#c5a454]">
                            <Heart className="w-2.5 h-2.5 fill-current" />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-2 py-8 text-center text-xs text-stone-400">
                    Belum ada foto galeri yang diunggah. Silakan unggah foto di samping untuk melihat preview.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {activePreviewIndex !== null && gallery[activePreviewIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 p-4 flex items-center justify-center backdrop-blur-sm animate-in fade-in"
          onClick={() => setActivePreviewIndex(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] flex flex-col items-center">
            <img
              src={gallery[activePreviewIndex].url}
              alt={gallery[activePreviewIndex].caption || 'Foto Galeri'}
              className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
            />
            {gallery[activePreviewIndex].caption && (
              <p className="mt-3 text-white text-xs font-semibold px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md">
                {gallery[activePreviewIndex].caption}
              </p>
            )}
            <button
              type="button"
              onClick={() => setActivePreviewIndex(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-stone-900 font-bold flex items-center justify-center shadow-lg hover:bg-stone-100 cursor-pointer"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
