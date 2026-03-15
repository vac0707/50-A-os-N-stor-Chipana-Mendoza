/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Church, 
  Music, 
  MapPin, 
  Calendar, 
  Clock, 
  MessageCircle, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react';

// --- Components ---

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="text-3xl md:text-5xl font-display text-gold mb-1">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/60">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center py-12">
      <TimeUnit value={timeLeft.days} label="Días" />
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <TimeUnit value={timeLeft.minutes} label="Minutos" />
      <TimeUnit value={timeLeft.seconds} label="Segundos" />
    </div>
  );
};

const PhotoGallery = () => {
  const photos = [
    "https://res.cloudinary.com/dcnynnstm/image/upload/v1773593801/DSC00168_fjcqly.jpg",
    "https://res.cloudinary.com/dcnynnstm/image/upload/v1773593801/DSC00190_q7i5kr.jpg",
    "https://res.cloudinary.com/dcnynnstm/image/upload/v1773593801/DSC00220_lqe7e9.jpg",
    "https://res.cloudinary.com/dcnynnstm/image/upload/v1773593802/DSC00174_gtfif0.jpg",
    "https://res.cloudinary.com/dcnynnstm/image/upload/v1773593803/DSC00135_mg0pjs.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/5] overflow-hidden rounded-lg border border-gold/20 shadow-2xl shadow-gold/5">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={photos[currentIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      <button 
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm rounded-full text-gold hover:bg-gold hover:text-black transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm rounded-full text-gold hover:bg-gold hover:text-black transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-gold w-4' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

const SectionTitle = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex flex-col items-center mb-8">
    <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mb-4 text-gold">
      <Icon size={24} />
    </div>
    <h2 className="text-2xl md:text-3xl font-display text-gold uppercase tracking-widest text-center">
      {title}
    </h2>
    <div className="decorative-line" />
  </div>
);

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    personas: '1',
    contacto: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola Néstor, confirmo mi asistencia a tu celebración de 50 años.\n\n*Nombre:* ${formData.nombre}\n*Número de personas:* ${formData.personas}\n*Contacto:* ${formData.contacto}`;
    // Using the provided WhatsApp link. Note: appending text to a QR link might not work perfectly, 
    // but we'll try to use the standard wa.me format if possible. 
    // Since we only have the QR link, we'll use it as the destination.
    const whatsappUrl = `https://wa.me/qr/R54BSAK2QVLTB1?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 text-left">
      <div className="space-y-2">
        <label className="text-gold text-xs uppercase tracking-widest font-display">Nombres</label>
        <input 
          required
          type="text"
          value={formData.nombre}
          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
          className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors font-sans"
          placeholder="Tu nombre completo"
        />
      </div>
      <div className="space-y-2">
        <label className="text-gold text-xs uppercase tracking-widest font-display">Número de personas</label>
        <input 
          required
          type="number"
          min="1"
          value={formData.personas}
          onChange={(e) => setFormData({...formData, personas: e.target.value})}
          className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors font-sans"
        />
      </div>
      <div className="space-y-2">
        <label className="text-gold text-xs uppercase tracking-widest font-display">Número de contacto</label>
        <input 
          required
          type="tel"
          value={formData.contacto}
          onChange={(e) => setFormData({...formData, contacto: e.target.value})}
          className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors font-sans"
          placeholder="Ej. +51 999 999 999"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-4 bg-emerald-600 text-white rounded-full font-display tracking-widest uppercase text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-3"
      >
        <MessageCircle size={20} />
        Confirmar asistencia
      </motion.button>
    </form>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'cover' | 'invitation'>('cover');

  const openInvitation = () => {
    setView('invitation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black selection:bg-gold/30 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === 'cover' ? (
          <motion.section 
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
          >
            {/* Background Overlay */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/60 z-10" />
              <img 
                src="https://res.cloudinary.com/dcnynnstm/image/upload/v1773590398/MONTAJE_rg2rb3.jpg" 
                className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow"
                alt="Background"
                referrerPolicy="no-referrer"
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="relative z-20 max-w-3xl"
            >
              <h2 className="text-gold font-display text-lg md:text-xl tracking-[0.3em] mb-4 uppercase">
                Celebración de 50 Años
              </h2>
              <h1 className="text-4xl md:text-7xl font-display text-white mb-8 tracking-tighter">
                Néstor Chipana Mendoza
              </h1>
              
              <div className="decorative-line" />
              
              <p className="font-serif italic text-lg md:text-xl text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto px-4">
                "Celebrar la vida es un regalo, y hoy festejamos medio siglo de historias, sueños y momentos inolvidables. Acompáñanos a celebrar los 50 años de Néstor Chipana Mendoza en una noche llena de alegría y gratitud."
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openInvitation}
                className="px-8 py-3 border border-gold text-gold font-display tracking-widest uppercase text-sm hover:bg-gold hover:text-black transition-all duration-500 flex items-center gap-2 mx-auto"
              >
                Abrir Invitación
                <ChevronDown size={18} className="animate-bounce" />
              </motion.button>
            </motion.div>
          </motion.section>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="p-4 md:p-8 min-h-screen flex justify-center"
          >
            {/* Marco Elegante */}
            <div className="relative w-full max-w-4xl bg-black border-[12px] md:border-[20px] gold-border shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden">
              
              {/* Contenido de la Invitación */}
              <div className="relative z-10">
                {/* Foto Principal en el Marco */}
                <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/dcnynnstm/image/upload/v1773590398/MONTAJE_rg2rb3.jpg" 
                    className="w-full h-full object-cover"
                    alt="Néstor Chipana"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="px-6 py-12 md:px-12 space-y-32">
                  {/* Nombre y Título */}
                  <div className="text-center">
                    <h2 className="text-gold font-display text-sm md:text-base tracking-[0.4em] mb-4 uppercase">
                      Invitación Especial
                    </h2>
                    <h1 className="text-3xl md:text-6xl font-display text-white mb-6 tracking-tight">
                      Néstor Chipana Mendoza
                    </h1>
                    <div className="decorative-line" />
                  </div>

                  {/* 2. Cuenta regresiva */}
                  <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <SectionTitle title="Faltan" icon={Clock} />
                    <Countdown targetDate="2026-04-18T17:00:00" />
                    <p className="font-display text-gold/60 tracking-widest uppercase text-sm">
                      18 de Abril de 2026
                    </p>
                  </motion.section>

                  {/* 3. Santa Misa */}
                  <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <SectionTitle title="Santa Misa" icon={Church} />
                    <div className="space-y-6">
                      <div className="max-w-md mx-auto aspect-video overflow-hidden rounded-xl border border-gold/20 mb-6">
                        <img 
                          src="https://res.cloudinary.com/dcnynnstm/image/upload/v1773590447/iglesia_coa70o.jpg" 
                          alt="Iglesia Virgen de Guadalupe"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h3 className="text-xl font-serif text-white">Iglesia Virgen de Guadalupe</h3>
                      <div className="flex items-center justify-center gap-2 text-gold/80">
                        <Clock size={16} />
                        <span className="font-sans tracking-widest uppercase text-sm">3:00 PM</span>
                      </div>
                      <a 
                        href="https://maps.app.goo.gl/fV9GeENuuQRS1vmZ7" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2 mt-6 border border-gold/30 text-gold text-xs uppercase tracking-widest hover:bg-gold/10 transition-colors"
                      >
                        <MapPin size={14} />
                        Ver Ubicación
                      </a>
                    </div>
                  </motion.section>

                  {/* 4. Recepción */}
                  <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <SectionTitle title="Recepción" icon={Music} />
                    <div className="space-y-6">
                      <div className="max-w-md mx-auto aspect-video overflow-hidden rounded-xl border border-gold/20 mb-6">
                        <img 
                          src="https://res.cloudinary.com/dcnynnstm/image/upload/v1773590448/favio_pozo_cwkhdr.jpg" 
                          alt="Local Floresta"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h3 className="text-xl font-serif text-white">Local Floresta – Sede Favio Pozo</h3>
                      <p className="text-white/60 font-sans text-sm tracking-wide">
                        Av. Prado Alto 2120 – Abancay
                      </p>
                      <div className="flex items-center justify-center gap-2 text-gold/80">
                        <Clock size={16} />
                        <span className="font-sans tracking-widest uppercase text-sm">5:00 PM</span>
                      </div>
                      <a 
                        href="https://maps.app.goo.gl/saNQ4Z6HymB169Ca8" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2 mt-6 border border-gold/30 text-gold text-xs uppercase tracking-widest hover:bg-gold/10 transition-colors"
                      >
                        <MapPin size={14} />
                        Ver Ubicación
                      </a>
                    </div>
                  </motion.section>

                  {/* 5. Galería de fotos */}
                  <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <SectionTitle title="Galería" icon={Heart} />
                    <PhotoGallery />
                  </motion.section>

                  {/* 6. Grupos musicales */}
                  <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <SectionTitle title="Grupos Musicales Invitados" icon={Music} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-items-center">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center space-y-4"
                      >
                        <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-gold/20 p-2 bg-white/5">
                          <img 
                            src="https://res.cloudinary.com/dcnynnstm/image/upload/v1773546433/LOGO_CHAPIMARCA_s44wwx.jpg" 
                            alt="Chapimarca"
                            className="w-full h-full object-contain rounded-full"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <p className="font-display text-gold tracking-widest uppercase text-sm">Chapimarca</p>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center space-y-4"
                      >
                        <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-gold/20 p-2 bg-white/5">
                          <img 
                            src="https://res.cloudinary.com/dcnynnstm/image/upload/v1773546362/GRUPO_PACHACHACA_hlciba.jpg" 
                            alt="Grupo Pachachaca"
                            className="w-full h-full object-contain rounded-full"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <p className="font-display text-gold tracking-widest uppercase text-sm">Grupo Pachachaca</p>
                      </motion.div>
                    </div>
                  </motion.section>

                  {/* 7. Confirmación de asistencia */}
                  <motion.section 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center bg-gold/5 border border-gold/20 rounded-2xl p-6 md:p-12"
                  >
                    <SectionTitle title="Confirmar Asistencia" icon={MessageCircle} />
                    <p className="font-serif italic text-white/70 mb-8 max-w-md mx-auto">
                      Tu presencia hará que este día sea aún más especial. Por favor, confírmanos tu asistencia.
                    </p>
                    <RSVPForm />
                  </motion.section>

                  {/* 9. Footer */}
                  <footer className="py-20 text-center border-t border-gold/10">
                    <div className="mb-8">
                      <Heart className="text-gold mx-auto animate-pulse" size={32} />
                    </div>
                    <p className="font-serif italic text-white/60 text-lg px-4">
                      "Gracias por ser parte de este momento especial."
                    </p>
                    <div className="mt-12 text-[10px] uppercase tracking-[0.5em] text-white/20">
                      Néstor Chipana Mendoza • 50 Años
                    </div>
                    
                    <button 
                      onClick={() => setView('cover')}
                      className="mt-12 text-gold/40 hover:text-gold text-[10px] uppercase tracking-[0.2em] transition-colors"
                    >
                      Volver a la portada
                    </button>
                  </footer>
                </div>
              </div>

              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold z-20" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-gold z-20" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-gold z-20" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold z-20" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS for custom animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.35; transform: scale(1.05); }
          50% { opacity: 0.45; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
      `}} />
    </div>
  );
}
