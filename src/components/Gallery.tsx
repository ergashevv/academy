import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import { useTitlesWithCategories } from "@/hooks/use-api";
import { useTranslation } from "@/hooks/use-translation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const { data: galleryData, isLoading } = useTitlesWithCategories();
  const { t } = useTranslation();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Extract all gallery images from API data only
  let images: Array<{ src: string; alt: string; id?: number }> = [];
  let sectionTitle = '';
  let sectionDescription = '';

  if (galleryData && Array.isArray(galleryData) && galleryData.length > 0) {
    // Get first title item for section title
    const firstItem = galleryData[0];
    sectionTitle = firstItem.title || '';
    sectionDescription = firstItem.title2 || firstItem.description || '';
    
    // Collect all images from all categories across all titles
    const allImages: Array<{ src: string; alt: string; id?: number }> = [];
    
    galleryData.forEach((titleItem: any) => {
      if (titleItem.categories && Array.isArray(titleItem.categories)) {
        titleItem.categories.forEach((category: any) => {
          // Support both 'gallery' (new API) and 'galleries' (old API) for backward compatibility
          const galleryArray = category.gallery || category.galleries;
          
          if (galleryArray && Array.isArray(galleryArray)) {
            galleryArray.forEach((gallery: any) => {
              if (gallery.image) {
                // Handle both full URLs and relative paths
                let imageUrl = gallery.image;
                if (!imageUrl.startsWith('http')) {
                  // If it's a relative path, prepend API base URL
                  // Handle both /media/... and gallery/... formats
                  if (imageUrl.startsWith('/media/')) {
                    imageUrl = `https://api.uftacademy.uz${imageUrl}`;
                  } else if (imageUrl.startsWith('media/')) {
                    imageUrl = `https://api.uftacademy.uz/${imageUrl}`;
                  } else if (imageUrl.startsWith('/')) {
                    imageUrl = `https://api.uftacademy.uz${imageUrl}`;
                  } else if (imageUrl.startsWith('gallery/')) {
                    // Handle gallery/... format
                    imageUrl = `https://api.uftacademy.uz/media/${imageUrl}`;
                  } else {
                    imageUrl = `https://api.uftacademy.uz/media/${imageUrl}`;
                  }
                }
                
                allImages.push({
                  id: gallery.id,
                  src: imageUrl,
                  alt: gallery.description || gallery.category_name || gallery.title || `Gallery image from ${category.name || titleItem.title || 'gallery'}`,
                });
              }
            });
          }
        });
      }
    });
    
    // Use API images
    images = allImages;
  }

  // Autoplay functionality
  useEffect(() => {
    if (!api || images.length === 0) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        // If at the end, loop back to start
        api.scrollTo(0);
      }
    }, 3500); // 3.5 seconds interval

    return () => clearInterval(interval);
  }, [api, images.length]);

  // Track current slide
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="h-12 bg-card rounded-lg animate-pulse mb-6 max-w-md mx-auto" />
            <div className="h-6 bg-card rounded-lg animate-pulse max-w-2xl mx-auto" />
          </div>
          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/3] bg-card rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show no data message if no images available
  if (!isLoading && images.length === 0) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xl text-muted-foreground">{t('common', 'noData')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {(sectionTitle || sectionDescription) && (
          <div className="text-center mb-16 animate-fade-in">
            {sectionTitle && (
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {sectionDescription}
              </p>
            )}
          </div>
        )}
        
        {images.length > 0 ? (
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {images.map((image, index) => {
                const isActive = current === index;
                return (
                <CarouselItem key={image.id || index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div 
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setIsModalOpen(true);
                    }}
                    className={`group relative overflow-hidden rounded-2xl shadow-card transition-all duration-700 aspect-[4/3] cursor-pointer ${
                      isActive 
                        ? 'scale-110 shadow-glow border-2 border-primary/50 -translate-y-2 z-10' 
                        : 'scale-100 hover:shadow-glow hover:scale-105 opacity-80'
                    }`}
                  >
                    {isActive && (
                      <>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none z-10" />
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent z-10" />
                      </>
                    )}
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isActive 
                          ? 'scale-105' 
                          : 'group-hover:scale-110'
                      }`}
                      loading="lazy"
                      onError={(e) => {
                        // If image fails to load, try alternative URL format
                        const target = e.target as HTMLImageElement;
                        const originalSrc = target.src;
                        if (originalSrc.includes('/media/')) {
                          // Try without /media/ prefix
                          target.src = originalSrc.replace('/media/', '/');
                        } else if (!originalSrc.includes('http')) {
                          // Try with /media/ prefix
                          target.src = `https://api.uftacademy.uz/media/${image.src}`;
                        }
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent transition-opacity duration-300 ${
                      isActive ? 'opacity-30' : 'opacity-0 group-hover:opacity-100'
                    }`} />
                    {image.alt && (
                      <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <p className="text-white text-sm line-clamp-2">{image.alt}</p>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12" />
            <CarouselNext className="right-0 md:-right-12" />
          </Carousel>
        ) : (
          !isLoading && (
            <div className="text-center">
              <p className="text-xl text-muted-foreground">{t('common', 'noData')}</p>
            </div>
          )
        )}
      </div>

      {/* Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogOverlay className="bg-black/90 backdrop-blur-sm" />
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-transparent border-0 shadow-none [&>button]:hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full h-10 w-10 bg-black/50"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Previous Button */}
            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
                onClick={() => {
                  const prevIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
                  setSelectedImageIndex(prevIndex);
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
                onClick={() => {
                  const nextIndex = selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
                  setSelectedImageIndex(nextIndex);
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            {/* Image */}
            {images[selectedImageIndex] && (
              <>
                <div className="absolute inset-0 flex items-center justify-center px-4 md:px-16">
                  <img
                    src={images[selectedImageIndex].src}
                    alt={images[selectedImageIndex].alt}
                    className="max-w-[90%] max-h-[85%] w-auto h-auto object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const originalSrc = target.src;
                      if (originalSrc.includes('/media/')) {
                        target.src = originalSrc.replace('/media/', '/');
                      } else if (!originalSrc.includes('http')) {
                        target.src = `https://api.uftacademy.uz/media/${images[selectedImageIndex].src}`;
                      }
                    }}
                  />
                </div>
                {images[selectedImageIndex].alt && (
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg max-w-2xl text-center z-40">
                    <p className="text-sm md:text-base">{images[selectedImageIndex].alt}</p>
                  </div>
                )}
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
