import { Heart } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { RoseFloralDivider } from '../components/RoseFloralDivider';
import type { StoryTimelineItem } from '../types';

const storyList: StoryTimelineItem[] = [
  {
    id: 1,
    date: '12 Mei 2022',
    badge: 'Awal Sebuah Pertemuan',
    title: 'Tatap Mata Pertama',
    description:
      'Pertemuan yang tak disengaja di sebuah simposium hukum nasional di Jakarta. Obrolan singkat mengenai riset akademis perlahan bertransformasi menjadi diskusi hangat yang selalu dirindukan setiap harinya.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 2,
    date: '18 April 2023',
    badge: 'Bulan Ramadhan',
    title: 'Menjalin Komitmen Suci',
    description:
      "Setelah melewati proses perkenalan ta'aruf dan saling mengenal nilai-nilai keluarga masing-masing, di malam ke-27 bulan suci Ramadhan, kami sepakat untuk melangkah ke jenjang yang lebih serius dan terarah.",
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 3,
    date: '10 Januari 2026',
    badge: 'Hari Lamaran',
    title: 'Ikrar Janji Pertunangan',
    description:
      'Di hadapan kedua orang tua serta sanak keluarga besar, ikatan suci ini diresmikan dalam balutan acara lamaran penuh haru dan doa restu, memantapkan langkah menuju hari mahligai pernikahan.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=700&q=80'
  }
];

const LoveStorySection: React.FC = () => {
  return (
    <section className="relative py-12 px-6 z-10 space-y-8">
      <ScrollReveal variant="up">
        <div className="text-center space-y-2 relative">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B263E] font-bold block">
            OUR JOURNEY
          </span>
          <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#4A1521]">
            Kisah Cinta
          </h3>
          <p className="text-xs text-[#706456]">
            Setiap kisah memiliki awal, dan ini adalah lembaran perjalanan kami.
          </p>
          <div className="flex justify-center pt-1">
            <RoseFloralDivider className="w-24 h-5" color="#8B263E" />
          </div>
        </div>
      </ScrollReveal>

      <div className="relative pl-6 sm:pl-8 space-y-8 before:content-[''] before:absolute before:left-3 before:top-3 before:bottom-3 before:w-[1.5px] before:bg-gradient-to-b before:from-[#8B263E] before:via-[#CBB8A1] before:to-[#8B263E]">
        {storyList.map((story, index) => (
          <ScrollReveal key={story.id} variant="zoom" delay={index * 120}>
            <div className="relative group">
              {/* Timeline Circle Bullet */}
              <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 w-6 h-6 rounded-full bg-[#8B263E] text-white flex items-center justify-center shadow-md">
                <Heart className="w-3 h-3 fill-current" />
              </div>

              {/* Card Story */}
              <div className="bg-white/95 rounded-3xl p-5 border border-[#ECE3D5] shadow-xs hover:shadow-md transition-shadow space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#8B263E] bg-[#FBF7F0] px-2.5 py-1 rounded-full border border-[#EFE8DC]">
                    {story.badge}
                  </span>
                  <span className="text-[11px] text-[#8A7E72] font-medium font-serif">
                    {story.date}
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl h-40">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h4 className="font-serif-wedding text-base font-bold text-[#4A1521]">
                  {story.title}
                </h4>

                <p className="text-xs text-[#6B6053] leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default LoveStorySection;
