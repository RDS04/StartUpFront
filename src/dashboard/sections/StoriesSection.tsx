import React, { useState } from 'react';
import {
  BookHeart,
  Plus,
  Trash2,
  Edit3,
  MoveUp,
  MoveDown,
  Save,
  Loader2,
  Sparkles,
  Calendar,
  Heading,
  FileText,
  Image as ImageIcon,
  RotateCcw,
  CheckCircle2,
  Eye,
  Heart,
} from 'lucide-react';
import type { DashboardData, StoryItem, TierConfig } from '../types';
import { INITIAL_STORIES, saveDashboardData } from '../initialData';
import { saveStories, saveMyInvitation } from '../../services/invitationService';

interface StoriesSectionProps {
  data: DashboardData;
  setData: React.Dispatch<React.SetStateAction<DashboardData>>;
  tierConfig: TierConfig;
  onShowToast: (msg: string) => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({
  data,
  setData,
  tierConfig: _tierConfig,
  onShowToast,
}) => {
  const stories = data.stories && data.stories.length > 0 ? data.stories : INITIAL_STORIES;

  // Form State
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [yearInput, setYearInput] = useState('');
  const [chapterInput, setChapterInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [storyInput, setStoryInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Set form into edit mode
  const handleEditClick = (item: StoryItem) => {
    setEditingId(item.id);
    setYearInput(item.year || '');
    setChapterInput(item.chapter || '');
    setTitleInput(item.title || '');
    setStoryInput(item.story || '');
    setImageInput(item.image || '');

    // Smooth scroll to form
    const formElement = document.getElementById('story-input-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setYearInput('');
    setChapterInput('');
    setTitleInput('');
    setStoryInput('');
    setImageInput('');
  };

  // Submit Form (Add or Update)
  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();

    if (!yearInput.trim() || !titleInput.trim() || !storyInput.trim()) {
      onShowToast('Mohon lengkapi Tahun, Judul Cerita, dan Isi Cerita.');
      return;
    }

    let updatedStories: StoryItem[] = [];

    if (editingId !== null) {
      // Update existing
      updatedStories = stories.map((s) => {
        if (s.id === editingId) {
          return {
            ...s,
            year: yearInput.trim(),
            chapter: chapterInput.trim() || undefined,
            title: titleInput.trim(),
            story: storyInput.trim(),
            image: imageInput.trim() || undefined,
          };
        }
        return s;
      });
      onShowToast('Bab kisah cinta berhasil diperbarui!');
    } else {
      // Add new
      const nextIndex = stories.length + 1;
      const defaultChapter = `CHAPTER 0${nextIndex}`;
      const newStory: StoryItem = {
        id: `story_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        year: yearInput.trim(),
        chapter: chapterInput.trim() || defaultChapter,
        title: titleInput.trim(),
        story: storyInput.trim(),
        image: imageInput.trim() || undefined,
      };
      updatedStories = [...stories, newStory];
      onShowToast('Cerita baru berhasil ditambahkan!');
    }

    const updatedData: DashboardData = {
      ...data,
      stories: updatedStories,
    };

    setData(updatedData);
    saveDashboardData(updatedData);
    handleCancelEdit();
  };

  // Delete Story
  const handleDeleteStory = (id: string | number) => {
    if (stories.length <= 1) {
      onShowToast('Minimal sisakan 1 bab cerita untuk undangan Anda.');
      return;
    }
    const filtered = stories.filter((s) => s.id !== id);
    const updatedData: DashboardData = {
      ...data,
      stories: filtered,
    };
    setData(updatedData);
    saveDashboardData(updatedData);
    if (editingId === id) {
      handleCancelEdit();
    }
    onShowToast('Bab cerita berhasil dihapus.');
  };

  // Move Story Position
  const handleMoveStory = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= stories.length) return;

    const newStories = [...stories];
    const [moved] = newStories.splice(index, 1);
    newStories.splice(targetIndex, 0, moved);

    const updatedData: DashboardData = {
      ...data,
      stories: newStories,
    };
    setData(updatedData);
    saveDashboardData(updatedData);
    onShowToast(`Urutan bab dipindahkan.`);
  };

  // Reset to Default Stories
  const handleResetDefault = () => {
    if (window.confirm('Kembalikan kisah cinta ke 3 bab bawaan template?')) {
      const updatedData: DashboardData = {
        ...data,
        stories: INITIAL_STORIES,
      };
      setData(updatedData);
      saveDashboardData(updatedData);
      handleCancelEdit();
      onShowToast('Kisah cinta telah dikembalikan ke bawaan template.');
    }
  };

  // Save All Stories to Database
  const handleSaveToDatabase = async () => {
    setIsSaving(true);
    try {
      // 1. Simpan via endpoint khusus stories
      await saveStories(stories);
      // 2. Simpan juga keseluruhan data undangan agar konsisten
      await saveMyInvitation({
        ...data,
        stories: stories,
      });

      saveDashboardData({ ...data, stories });
      onShowToast('Semua bab Kisah Cinta berhasil disimpan ke database!');
    } catch (err: any) {
      console.error(err);
      onShowToast(err.message || 'Gagal menyimpan ke database. Coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ============================================================== */}
      {/* 🌟 HEADER SECTION                                             */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200/60">
            <BookHeart className="w-3.5 h-3.5 text-emerald-600" />
            <span>Our Journey / Love Story</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2.5">
            Kisah Cinta Kami
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Tuliskan dan rangkai perjalanan cinta berharga Anda dari awal pertemuan hingga hari bahagia pernikahan, tersimpan rapi di database undangan Anda.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span>{showPreview ? 'Sembunyikan Preview' : 'Lihat Preview'}</span>
          </button>

          <button
            type="button"
            onClick={handleSaveToDatabase}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-emerald-900 hover:from-emerald-800 hover:to-emerald-950 rounded-xl shadow-md shadow-emerald-900/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan ke DB...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan ke Database</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📝 FORM INPUT (TAMBAH / EDIT BAB CERITA)                       */}
      {/* ============================================================== */}
      <div
        id="story-input-form"
        className="bg-stone-50/80 rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {editingId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                {editingId ? 'Edit Bab Kisah Cinta' : 'Tambah Bab Perjalanan Cinta Baru'}
              </h3>
              <p className="text-[11px] text-stone-500">
                {editingId
                  ? 'Perbarui detail tahun, bab, judul atau narasi cerita ini.'
                  : 'Tambahkan momen penting baru ke dalam linimasa perjalanan cinta Anda.'}
              </p>
            </div>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-xs font-semibold text-stone-500 hover:text-stone-800 px-3 py-1 bg-white border border-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              Batal Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmitStory} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tahun / Periode */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>Tahun / Waktu Periode</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={yearInput}
                onChange={(e) => setYearInput(e.target.value)}
                placeholder="Contoh: 2019 atau Mei 2021"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 transition-all text-stone-800 placeholder:text-stone-400"
                required
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Muncul sebagai penanda tahun di timeline.
              </span>
            </div>

            {/* Bab / Chapter Label */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-stone-400" />
                <span>Label Bab (Opsional)</span>
              </label>
              <input
                type="text"
                value={chapterInput}
                onChange={(e) => setChapterInput(e.target.value)}
                placeholder={`Contoh: CHAPTER 0${stories.length + 1}`}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 transition-all text-stone-800 placeholder:text-stone-400"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Boleh dikosongkan (otomatis diisi "CHAPTER 0X").
              </span>
            </div>
          </div>

          {/* Judul Cerita */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Heading className="w-3.5 h-3.5 text-stone-400" />
              <span>Judul Cerita / Momen</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Contoh: Awal Pertemuan / Masa Pendewasaan & Komitmen"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 transition-all text-stone-800 placeholder:text-stone-400 font-medium"
              required
            />
          </div>

          {/* Narasi Cerita */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-stone-400" />
              <span>Isi Cerita / Kisah Perjalanan</span>
              <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={storyInput}
              onChange={(e) => setStoryInput(e.target.value)}
              placeholder="Tuliskan kisah romantis yang terjadi pada momen ini, bagaimana kalian berdua saling mengenal, mengatasi tantangan, atau melangkah menuju hari bahagia..."
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 transition-all text-stone-800 placeholder:text-stone-400 leading-relaxed"
              required
            />
          </div>

          {/* Foto Kenangan (Opsional) */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-stone-400" />
              <span>Link URL Foto Kenangan (Opsional)</span>
            </label>
            <input
              type="url"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="Contoh: https://images.unsplash.com/... atau link foto kenangan"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 transition-all text-stone-800 placeholder:text-stone-400"
            />
            <span className="text-[10px] text-stone-400 mt-1 block">
              Foto opsional ditampilkan di template yang mendukung thumbnail per cerita (misal Template Satu).
            </span>
          </div>

          {/* Tombol Aksi Form */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 text-xs font-semibold text-stone-600 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              {editingId ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Update Bab Cerita</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Tambahkan ke Linimasa</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ============================================================== */}
      {/* 📚 DAFTAR BAB CERITA YANG SUDAH ADA                           */}
      {/* ============================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
              <span>Rangkaian Bab Kisah Cinta</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                {stories.length} Bab
              </span>
            </h3>
            <p className="text-[11px] text-stone-500">
              Gunakan tombol panah untuk menukar urutan bab cerita, atau klik edit untuk mengubah teks.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetDefault}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 hover:text-stone-800 transition-colors cursor-pointer px-2.5 py-1 rounded-lg hover:bg-stone-100"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Bawaan</span>
          </button>
        </div>

        {/* Stories List */}
        <div className="space-y-3">
          {stories.map((item, idx) => {
            const isEditingThis = editingId === item.id;
            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isEditingThis
                    ? 'bg-emerald-50/60 border-emerald-400 ring-2 ring-emerald-600/20'
                    : 'bg-white border-stone-200/90 hover:border-stone-300 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Circle Badge Number */}
                    <div className="w-8 h-8 rounded-full bg-emerald-800 text-[#c5a454] border-2 border-white shadow-xs flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      {idx + 1}
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      {/* Meta Pill: Tahun & Chapter */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 border border-stone-200">
                          {item.year}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
                          {item.chapter || `CHAPTER 0${idx + 1}`}
                        </span>
                      </div>

                      {/* Judul Cerita */}
                      <h4 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight">
                        {item.title}
                      </h4>

                      {/* Narasi */}
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                        {item.story}
                      </p>

                      {/* Optional Image Preview */}
                      {item.image && (
                        <div className="mt-2 flex items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                          />
                          <span className="text-[10px] text-stone-400 truncate max-w-xs">
                            {item.image}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions (Move, Edit, Delete) */}
                  <div className="flex items-center gap-1 sm:self-start shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 justify-end">
                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveStory(idx, 'up')}
                      title="Pindahkan ke atas"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 disabled:opacity-25 transition-colors cursor-pointer"
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={idx === stories.length - 1}
                      onClick={() => handleMoveStory(idx, 'down')}
                      title="Pindahkan ke bawah"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 disabled:opacity-25 transition-colors cursor-pointer"
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => handleEditClick(item)}
                      title="Edit bab cerita ini"
                      className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDeleteStory(item.id)}
                      title="Hapus bab cerita ini"
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📱 LIVE PREVIEW TIMELINE (PERSIS SEPERTI TAMPILAN UNDANGAN)    */}
      {/* ============================================================== */}
      {showPreview && (
        <div className="mt-8 pt-8 border-t border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-700 fill-current" />
              <h3 className="text-sm font-bold text-stone-900">
                Live Preview: Tampilan Kisah Cinta di Undangan Tamu
              </h3>
            </div>
            <span className="text-[11px] text-stone-400">
              Otomatis mengikuti bab yang Anda buat di atas
            </span>
          </div>

          <div className="max-w-md mx-auto bg-[#fafbf7] rounded-3xl p-6 sm:p-8 border border-[#8f9e7b]/30 shadow-md">
            {/* Header Mockup */}
            <div className="text-center space-y-2 mb-8">
              <span className="inline-block text-[10px] uppercase font-bold tracking-[0.25em] text-[#718569] bg-[#8f9e7b]/15 px-3 py-1 rounded-full border border-[#8f9e7b]/25">
                OUR JOURNEY
              </span>
              <h4 className="text-2xl font-bold text-[#233325] tracking-wide">
                KISAH CINTA KAMI
              </h4>
              <div className="w-12 h-0.5 bg-[#c5a454] mx-auto rounded-full mt-2" />
            </div>

            {/* Timeline Mockup */}
            <div className="relative pl-6 sm:pl-8 space-y-7 before:absolute before:top-2 before:bottom-2 before:left-2 sm:before:left-3 before:w-0.5 before:bg-[#8f9e7b]/30">
              {stories.map((item, idx) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Pin Indicator */}
                  <div className="absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full bg-[#5b6e55] border-2 border-white shadow-md flex items-center justify-center text-white">
                    <Sparkles className="w-2.5 h-2.5 text-[#c5a454]" />
                  </div>

                  {/* Story Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#8f9e7b]/30 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs px-2.5 py-0.5 rounded-full bg-[#8f9e7b]/15 text-[#3b4f3a]">
                        {item.year}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#8f9e7b] font-semibold">
                        {item.chapter || `CHAPTER 0${idx + 1}`}
                      </span>
                    </div>

                    <h5 className="font-bold text-xs sm:text-sm text-[#243626]">
                      {item.title}
                    </h5>

                    <p className="text-xs text-[#52664e] leading-relaxed font-light">
                      {item.story}
                    </p>

                    {item.image && (
                      <div className="mt-2 rounded-xl overflow-hidden h-28">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Bar Bottom */}
      <div className="sticky bottom-4 z-20 flex justify-end">
        <button
          type="button"
          onClick={handleSaveToDatabase}
          disabled={isSaving}
          className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-900 hover:to-black rounded-2xl shadow-xl shadow-emerald-950/30 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan ke Database...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan Kisah Cinta ke Database</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
