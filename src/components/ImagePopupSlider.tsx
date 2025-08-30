'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

interface ImagePopupSliderProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  forceHttps: (url: string) => string;
}

export default function ImagePopupSlider({
  images,
  initialIndex,
  isOpen,
  onClose,
  forceHttps
}: ImagePopupSliderProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* 이미지 카운터 */}
      <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        {activeIndex + 1} / {images.length}
      </div>

      {/* Swiper 슬라이더 */}
      <div className="w-full h-full flex items-center justify-center p-4">
        <Swiper
          modules={[Navigation, Pagination, Keyboard, Zoom]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          zoom={{
            maxRatio: 3,
            minRatio: 1,
          }}
          initialSlide={initialIndex}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full h-full"
        >
          {images.map((imageUrl, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
                <img
                  src={forceHttps(imageUrl)}
                  alt={`이미지 ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 커스텀 네비게이션 버튼 */}
        <button className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/20">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/20">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* 툴팁 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        <span className="mr-2">⌨️</span>
        키보드 화살표 키로 이동, ESC로 닫기
      </div>
    </div>
  );
}
