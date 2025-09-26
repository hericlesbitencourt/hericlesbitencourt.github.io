"use client"
import ImageGallery from './ImageGallery'

interface ImageCarouselProps {
  images: string[]
  title: string
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  return <ImageGallery images={images} title={title} />
}
