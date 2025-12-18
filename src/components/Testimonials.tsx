import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useComments, useCommentsTitle } from "@/hooks/use-api";
import { useTranslation } from "@/hooks/use-translation";
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Testimonials = () => {
  const { data: commentsData, isLoading: commentsLoading } = useComments();
  const { data: commentsTitleData, isLoading: titleLoading } = useCommentsTitle();
  const { t } = useTranslation();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const isLoading = commentsLoading || titleLoading;
  
  const sectionTitle = commentsTitleData?.title || '';
  const sectionDescription = commentsTitleData?.description || '';

  // Map API comments to testimonials format - only use API data
  const testimonials = commentsData && Array.isArray(commentsData) && commentsData.length > 0
    ? commentsData
        .filter((comment) => {
          // Filter comments that have name and comment text
          const hasName = comment.name && comment.name.trim() !== '';
          const hasComment = (comment.comment || comment.content) && (comment.comment || comment.content).trim() !== '';
          return hasName && hasComment;
        })
        .map((comment) => ({
          id: comment.id,
          name: comment.name || '',
          role: comment.position || comment.role || '',
          content: comment.comment || comment.content || '',
          rating: comment.rating !== null && comment.rating !== undefined ? comment.rating : null,
        }))
    : [];

  // Autoplay functionality
  useEffect(() => {
    if (!api || testimonials.length === 0) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        // If at the end, loop back to start
        api.scrollTo(0);
      }
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, [api, testimonials.length]);

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
      <section className="py-12 md:py-16 lg:py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <div className="h-10 md:h-12 bg-card rounded-lg animate-pulse mb-4 max-w-xl mx-auto" />
            <div className="h-5 md:h-6 bg-card rounded-lg animate-pulse max-w-2xl mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-7 animate-pulse min-h-[350px] md:min-h-[400px]">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-xl mb-3 md:mb-4" />
                <div className="flex gap-0.5 md:gap-1 mb-3 md:mb-4">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="w-3.5 h-3.5 md:w-4 md:h-4 bg-secondary rounded" />
                  ))}
                </div>
                <div className="h-3 md:h-4 bg-secondary rounded mb-2" />
                <div className="h-3 md:h-4 bg-secondary rounded mb-2" />
                <div className="h-3 md:h-4 bg-secondary rounded mb-2" />
                <div className="h-3 md:h-4 bg-secondary rounded mb-4 md:mb-6" />
                <div className="pt-3 md:pt-4 border-t border-border mt-auto">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 md:h-5 bg-secondary rounded mb-2" />
                      <div className="h-3 bg-secondary rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show no data message if no testimonials available
  if (!isLoading && testimonials.length === 0) {
    return (
      <section className="py-12 md:py-16 lg:py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-12 md:py-16">
            <p className="text-lg md:text-xl text-muted-foreground">{t('common', 'noData')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 bg-secondary/30 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {(sectionTitle || sectionDescription) && (
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            {sectionTitle && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-primary bg-clip-text text-transparent">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                {sectionDescription}
              </p>
            )}
          </div>
        )}
        
        {testimonials.length > 0 ? (
          <div className="relative pt-10 md:pt-16 pb-10 md:pb-16">
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
                slidesToScroll: 1,
                skipSnaps: false,
                duration: 30,
              }}
              className="w-full mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4 py-6 md:py-8">
                {testimonials.map((testimonial, index) => {
                  const isActive = current === index;
                  const isPrev = current === (index - 1 + testimonials.length) % testimonials.length;
                  const isNext = current === (index + 1) % testimonials.length;
                  
                  // Get initials for avatar
                  const initials = testimonial.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);
                  
                  return (
                  <CarouselItem
                    key={testimonial.id || index}
                    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      onClick={() => {
                        setSelectedTestimonial(testimonial);
                        setIsModalOpen(true);
                      }}
                      className={`bg-card rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-7 transition-all duration-500 ease-out flex flex-col group relative overflow-hidden cursor-pointer min-h-[380px] md:min-h-[420px] ${
                        isActive 
                          ? 'scale-[1.03] md:scale-[1.05] border-2 border-primary/60 -translate-y-1 md:-translate-y-2 z-20 opacity-100' 
                          : isPrev || isNext
                          ? 'scale-[0.98] opacity-80 -translate-y-0.5 z-10 shadow-card'
                          : 'scale-100 hover:shadow-lg hover:scale-[1.02] opacity-70 hover:opacity-90 z-0 shadow-card'
                      }`}
                      style={isActive ? {
                        boxShadow: `
                          0 -8px 25px hsl(142 100% 50% / 0.08),
                          0 8px 25px hsl(142 100% 50% / 0.08),
                          0 -6px 20px hsl(0 0% 0% / 0.2),
                          0 6px 20px hsl(0 0% 0% / 0.3),
                          0 0 30px hsl(142 100% 50% / 0.1)
                        `.replace(/\s+/g, ' ').trim(),
                      } : {}}
                    >
                      {/* Animated gradient background */}
                      {isActive && (
                        <>
                          <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent pointer-events-none animate-fade-in" />
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/80 to-transparent animate-fade-in" />
                          <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
                        </>
                      )}
                      
                      {/* Shimmer effect on active card */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                        </div>
                      )}
                      
                      {/* Quote Icon */}
                      <div className={`mb-3 md:mb-4 transition-transform duration-300 relative z-10 ${
                        isActive ? 'scale-105' : 'scale-100 group-hover:scale-105'
                      }`}>
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md transition-all duration-300 ${
                          isActive ? 'shadow-glow' : 'group-hover:shadow-lg'
                        }`}>
                          <Quote className="w-5 h-5 md:w-6 md:h-6 text-background rotate-180" />
                        </div>
                      </div>
                      
                      {/* Rating */}
                      {testimonial.rating !== null && testimonial.rating !== undefined && (
                        <div className="flex gap-0.5 md:gap-1 mb-3 md:mb-4 relative z-10">
                          {[...Array(Math.min(testimonial.rating, 5))].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 md:w-4 md:h-4 fill-accent text-accent transition-transform duration-300 ${
                                isActive 
                                  ? 'scale-110' 
                                  : 'group-hover:scale-105'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Comment Text */}
                      <div className="mb-4 md:mb-6 flex-grow relative z-10 min-h-[120px] md:min-h-[140px]">
                        <p 
                          className={`leading-relaxed transition-colors duration-300 text-sm md:text-base ${
                            isActive 
                              ? 'text-foreground font-medium' 
                              : 'text-foreground/85 group-hover:text-foreground'
                          }`}
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 6,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {testimonial.content}
                        </p>
                      </div>
                      
                      {/* Author Info */}
                      <div className={`pt-3 md:pt-4 border-t mt-auto transition-colors duration-300 flex items-center gap-2 md:gap-3 relative z-10 ${
                        isActive 
                          ? 'border-accent/60' 
                          : 'border-border/50 group-hover:border-accent/40'
                      }`}
                      >
                        {/* Avatar */}
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 font-bold text-background text-sm md:text-base transition-all duration-300 shadow-md ${
                          isActive 
                            ? 'scale-105 shadow-glow ring-2 ring-primary/60 ring-offset-2 ring-offset-card' 
                            : 'group-hover:scale-105 group-hover:shadow-lg'
                        }`}
                        >
                          {initials}
                        </div>
                        
                        {/* Name and Role */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-sm md:text-base transition-colors duration-300 truncate ${
                            isActive 
                              ? 'text-accent' 
                              : 'text-foreground group-hover:text-accent'
                          }`}>
                            {testimonial.name}
                          </p>
                          {testimonial.role && (
                            <p className={`text-xs md:text-sm mt-0.5 transition-colors duration-300 truncate ${
                              isActive 
                                ? 'text-foreground/90' 
                                : 'text-muted-foreground group-hover:text-foreground/80'
                            }`}>
                              {testimonial.role}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
                })}
              </CarouselContent>
              
              {/* Custom Navigation Buttons */}
              <CarouselPrevious className="left-1 md:left-2 lg:-left-14 h-10 w-10 md:h-12 md:w-12 bg-card/95 backdrop-blur-md border-2 border-primary/40 hover:border-primary/80 hover:bg-card shadow-xl hover:shadow-glow transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </CarouselPrevious>
              <CarouselNext className="right-1 md:right-2 lg:-right-14 h-10 w-10 md:h-12 md:w-12 bg-card/95 backdrop-blur-md border-2 border-primary/40 hover:border-primary/80 hover:bg-card shadow-xl hover:shadow-glow transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </CarouselNext>
            </Carousel>
            
            {/* Enhanced Dots Indicator */}
            {testimonials.length > 1 && (
              <div className="flex justify-center items-center gap-2 md:gap-3 mt-8 md:mt-10">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`transition-all duration-500 rounded-full relative group ${
                      current === index
                        ? 'w-8 h-2 md:w-10 md:h-2.5 bg-primary shadow-glow scale-110'
                        : 'w-2 h-2 md:w-2.5 md:h-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60 hover:scale-125'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {current === index && (
                      <span className="absolute inset-0 rounded-full bg-primary/50 animate-ping opacity-75" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          !isLoading && (
            <div className="text-center py-12 md:py-16 animate-fade-in">
              <p className="text-lg md:text-xl text-muted-foreground">{t('common', 'noData')}</p>
            </div>
          )
        )}
      </div>

      {/* Modal for full testimonial */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border/50">
          {selectedTestimonial && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 font-bold text-background text-xl shadow-lg">
                    {selectedTestimonial.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold mb-1">
                      {selectedTestimonial.name}
                    </DialogTitle>
                    {selectedTestimonial.role && (
                      <DialogDescription className="text-base">
                        {selectedTestimonial.role}
                      </DialogDescription>
                    )}
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Rating */}
                {selectedTestimonial.rating !== null && selectedTestimonial.rating !== undefined && (
                  <div className="flex gap-1">
                    {[...Array(Math.min(selectedTestimonial.rating, 5))].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-accent text-accent"
                      />
                    ))}
                  </div>
                )}
                
                {/* Full Comment Text */}
                <div className="bg-secondary/30 rounded-xl p-6 border border-border/50">
                  <div className="flex items-start gap-3">
                    <Quote className="w-6 h-6 text-primary rotate-180 flex-shrink-0 mt-1" />
                    <p className="text-base md:text-lg leading-relaxed text-foreground">
                      {selectedTestimonial.content}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Testimonials;
