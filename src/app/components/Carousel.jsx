'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

export default function Carousel() {
  const slides = [
    "/banner-img/banner-img1.webp",
    "/banner-img/banner-img2.webp",
    "/banner-img/banner-img3.webp",
  ];

  return (
    <div className="w-full">
      <Swiper
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((src, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={src}
              alt={`Slide ${idx + 1}`}
              width={1920}
              height={600}
              className="w-full h-[550px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
