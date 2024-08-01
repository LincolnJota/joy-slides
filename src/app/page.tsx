'use client'
// pages/slides.js
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slides = [
  { id: 1, src: '/images/Slide1.jpg', alt: 'Slide 1' },
  { id: 2, src: '/images/Slide2.jpg', alt: 'Slide 2' },
  { id: 3, src: '/images/Slide3.jpg', alt: 'Slide 3' },
  { id: 4, src: '/images/Slide4.jpg', alt: 'Slide 4' },
  { id: 5, src: '/images/Slide5.jpg', alt: 'Slide 5' },
  { id: 6, src: '/images/Slide6.jpg', alt: 'Slide 6' },
  { id: 7, src: '/images/Slide7.jpg', alt: 'Slide 7' },
  { id: 8, src: '/images/Slide8.jpg', alt: 'Slide 8' },
  { id: 9, src: '/images/Slide9.jpg', alt: 'Slide 9' },
];

export default function SlideShow() {
  const sliderRef = useRef<Slider | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Desativar as setas padrão
  };


  useEffect(() => {
    const fetchIndex = async () => {
      try {
        const response = await fetch('/api/slider');
        const data = await response.json();

        setCurrentIndex(data.index);
      } catch (error) {
        console.error('Erro ao buscar o índice do slide:', error);
      }
    };

    fetchIndex(); // Busca inicial

    const interval = setInterval(fetchIndex, 1000); // Verifica o índice a cada segundo

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      console.log("Atualizando para novo índex: " + currentIndex);

      sliderRef.current.slickGoTo(currentIndex);
    }
  }, [currentIndex]);

  const isFullscreen = () => {
    return !!document.fullscreenElement
  }

  const toggleFullscreen = () => {
    if (!isFullscreen()) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }


  return (
    <div onDoubleClick={() => toggleFullscreen()} className="w-screen h-screen overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {slides.map(slide => (
          <div key={slide.id} className="w-full h-full relative">
            <Image
              src={slide.src}
              alt={slide.alt}
              height={0}
              width={0}
              quality={100}
              sizes='100vw'
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}