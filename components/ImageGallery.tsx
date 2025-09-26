"use client"
import { useState } from 'react'
import Image from './image'
import ImageModal from './ImageModal'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Restore body scroll
    document.body.style.overflow = 'auto'
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  if (!images || images.length === 0) {
    return null
  }

  // Show single image if only one, show grid if multiple
  if (images.length === 1) {
    return (
      <>
        <div className="relative w-full h-96 md:h-[500px] mb-8 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
          <div
            className="relative w-full h-full"
            onClick={() => openModal(0)}
          >
            <Image
              src={images[0]}
              alt={`${title} - Image 1`}
              fill
              className="object-contain"
            />
          </div>
          {/* Click hint overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200">
            <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-200">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        </div>
        
        <ImageModal
          images={images}
          currentIndex={currentIndex}
          isOpen={isModalOpen}
          onClose={closeModal}
          onPrevious={goToPrevious}
          onNext={goToNext}
          title={title}
        />
      </>
    )
  }

  // Multiple images - show thumbnail grid
  return (
    <>
      <div className="mb-8">
        {/* Main featured image (first image) */}
        <div className="relative w-full h-96 md:h-[500px] mb-4 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
          <div
            className="relative w-full h-full"
            onClick={() => openModal(0)}
          >
            <Image
              src={images[0]}
              alt={`${title} - Featured Image`}
              fill
              className="object-contain"
            />
          </div>
          {/* Click hint overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200">
            <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-50 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
          {/* Image counter badge */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            1 / {images.length}
          </div>
        </div>

        {/* Thumbnail grid for remaining images */}
        {images.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {images.slice(1).map((image, index) => {
              const actualIndex = index + 1
              const displayNumber = actualIndex + 1
              return (
                <div
                  key={actualIndex}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group"
                  onClick={() => openModal(actualIndex)}
                >
                  <Image
                    src={image}
                    alt={`${title} - Image ${displayNumber}`}
                    fill
                    className="object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                  {/* Image number */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    {displayNumber}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* View all button if many images */}
        {images.length > 5 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => openModal(0)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6l16 0M4 12l16 0M4 18l7 0" />
              </svg>
              View all {images.length} images
            </button>
          </div>
        )}
      </div>

      <ImageModal
        images={images}
        currentIndex={currentIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
        onPrevious={goToPrevious}
        onNext={goToNext}
        title={title}
      />
    </>
  )
}
