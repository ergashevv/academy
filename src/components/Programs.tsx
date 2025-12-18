import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useCourses } from "@/hooks/use-api";
import { useTranslation } from "@/hooks/use-translation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

const Programs = () => {
  const { data: coursesData, isLoading } = useCourses();
  const { t } = useTranslation();
  const [selectedCourse, setSelectedCourse] = useState<{
    title: string;
    description: string;
    topics: string[];
    icon: string;
    gradient: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const gradients = [
    "from-blue-500/20 to-cyan-500/20",
    "from-teal-500/20 to-green-500/20",
    "from-purple-500/20 to-pink-500/20",
  ];
  
  // Function to get the appropriate SVG icon based on course title
  const getCourseIcon = (title: string, index: number = 0): string => {
    if (!title) {
      // Fallback by index if no title
      const icons = ['/front-logo.svg', '/back-logo.svg', '/ai-logo.svg'];
      return icons[index % 3];
    }
    
    const titleLower = title.toLowerCase().trim();
    
    // Check for AI related keywords first (most specific)
    if (titleLower.includes('ai') || titleLower.includes('artificial intelligence') || 
        titleLower.includes('machine learning') || titleLower.includes('ml') ||
        titleLower.includes('neural') || titleLower.includes('intelligence') ||
        titleLower.includes('искусственный интеллект') || titleLower.includes('sun\'iy intellekt')) {
      return '/ai-logo.svg';
    }
    
    // Check for Backend related keywords (before frontend to avoid conflicts)
    if (titleLower.includes('backend') || titleLower.includes('back-end') || 
        titleLower.includes('back end') || titleLower.includes('бэкенд') ||
        (titleLower.includes('back') && !titleLower.includes('front'))) {
      return '/back-logo.svg';
    }
    
    // Check for Frontend related keywords
    if (titleLower.includes('frontend') || titleLower.includes('front-end') || 
        titleLower.includes('front end') || titleLower.includes('фронтенд') ||
        titleLower.includes('front')) {
      return '/front-logo.svg';
    }
    
    // Check for Full Stack (can use frontend icon or create a default)
    if (titleLower.includes('full stack') || titleLower.includes('fullstack') ||
        titleLower.includes('фулл стек')) {
      return '/front-logo.svg'; // or could be a different icon
    }
    
    // Fallback by index
    const icons = ['/front-logo.svg', '/back-logo.svg', '/ai-logo.svg'];
    return icons[index % 3];
  };

  // Function to get course sort order (Frontend -> Backend -> AI)
  const getCourseSortOrder = (courseName: string): number => {
    const nameLower = courseName.toLowerCase().trim();
    
    if (nameLower.includes('frontend') || nameLower.includes('front-end') || 
        nameLower.includes('front end') || nameLower.includes('фронтенд') ||
        nameLower.includes('front')) {
      return 1; // Frontend first
    }
    
    if (nameLower.includes('backend') || nameLower.includes('back-end') || 
        nameLower.includes('back end') || nameLower.includes('бэкенд') ||
        (nameLower.includes('back') && !nameLower.includes('front'))) {
      return 2; // Backend second
    }
    
    if (nameLower.includes('ai') || nameLower.includes('artificial intelligence') || 
        nameLower.includes('machine learning') || nameLower.includes('ml') ||
        nameLower.includes('neural') || nameLower.includes('intelligence') ||
        nameLower.includes('искусственный интеллект') || nameLower.includes('sun\'iy intellekt')) {
      return 3; // AI third
    }
    
    return 999; // Unknown courses at the end
  };

  // Extract all courses from API data only
  let programs: Array<{
    title: string;
    description: string;
    topics: string[];
    icon: string;
    gradient: string;
  }> = [];
  let sectionTitle = '';
  let sectionDescription = '';

  if (coursesData && Array.isArray(coursesData) && coursesData.length > 0) {
    // Get first item for section title/description
    const firstItem = coursesData[0];
    sectionTitle = firstItem.title || '';
    sectionDescription = firstItem.description || '';
    
    // Collect all courses from all titles
    const allCourses: any[] = [];
    coursesData.forEach((titleCourse) => {
      if (titleCourse.courses && Array.isArray(titleCourse.courses)) {
        titleCourse.courses.forEach((course) => {
          if (course.course_name || course.title || course.description) {
            allCourses.push({
              ...course,
              title: course.course_name || course.title || '',
              icon: course.icon || getCourseIcon(course.course_name || course.title || '', allCourses.length),
              gradient: gradients[allCourses.length % gradients.length],
              topics: Array.isArray(course.topics) ? course.topics : (course.topics ? [course.topics] : []),
            });
          }
        });
      }
    });
    
    if (allCourses.length > 0) {
      // Sort courses: Frontend -> Backend -> AI
      const sortedCourses = [...allCourses].sort((a, b) => {
        const orderA = getCourseSortOrder(a.course_name || a.title || '');
        const orderB = getCourseSortOrder(b.course_name || b.title || '');
        return orderA - orderB;
      });
      
      programs = sortedCourses.map((course, index) => ({
        title: course.course_name || course.title || '',
        description: course.description || '',
        topics: Array.isArray(course.topics) ? course.topics : [],
        icon: course.icon || getCourseIcon(course.course_name || course.title || '', index),
        gradient: course.gradient || gradients[index % gradients.length],
      }));
    }
  }

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="h-12 bg-card rounded-lg animate-pulse mb-6 max-w-md mx-auto" />
            <div className="h-6 bg-card rounded-lg animate-pulse max-w-2xl mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-8 animate-pulse">
                <div className="w-20 h-20 bg-secondary rounded-2xl mb-6" />
                <div className="h-6 bg-secondary rounded mb-4" />
                <div className="h-4 bg-secondary rounded mb-6" />
                <div className="space-y-2 mb-8">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-3 bg-secondary rounded" />
                  ))}
                </div>
                <div className="h-10 bg-secondary rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show no data message if no programs available
  if (!isLoading && programs.length === 0) {
    return (
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xl text-muted-foreground">{t('common', 'noData')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-secondary/30">
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
        
        {programs.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
            <div 
              key={program.title || index}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 group hover:scale-105 animate-scale-in flex flex-col h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-20 h-20 rounded-2xl ${program.icon && program.icon.endsWith('.svg') ? 'bg-transparent' : `bg-gradient-to-br ${program.gradient}`} p-4 mb-6 group-hover:scale-110 transition-transform flex items-center justify-center`}>
                <img 
                  src={typeof program.icon === 'string' && program.icon.startsWith('http') ? program.icon : program.icon} 
                  alt={program.title} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getCourseIcon(program.title, index);
                  }}
                />
              </div>
              
              <p className="text-muted-foreground mb-6 flex-grow">{program.description}</p>
              
              <div className="space-y-2 mb-8">
                {program.topics && program.topics.length > 0 ? (
                  program.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-sm text-muted-foreground">{topic}</span>
                    </div>
                  ))
                ) : null}
              </div>
              
              <Button
                variant="cta"
                className="w-full mt-auto"
                onClick={() => {
                  setSelectedCourse(program);
                  setIsModalOpen(true);
                }}
              >
                {t('programs', 'learnMore')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
          </div>
        ) : (
          !isLoading && (
            <div className="text-center">
              <p className="text-xl text-muted-foreground">{t('common', 'noData')}</p>
            </div>
          )
        )}
      </div>

      {/* Course Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold flex items-center gap-4">
              {selectedCourse && (
                <>
                  <div className={`w-16 h-16 rounded-2xl ${selectedCourse.icon && selectedCourse.icon.endsWith('.svg') ? 'bg-transparent' : `bg-gradient-to-br ${selectedCourse.gradient}`} p-3 flex items-center justify-center shrink-0`}>
                    <img
                      src={selectedCourse.icon}
                      alt={selectedCourse.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span>{selectedCourse.title}</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground mt-4">
              {selectedCourse?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">{t('programs', 'topics') || 'Mavzular'}</h3>
            <div className="space-y-3">
              {selectedCourse?.topics && selectedCourse.topics.length > 0 ? (
                selectedCourse.topics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-foreground">{topic}</span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">{t('common', 'noData')}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              variant="cta"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              {t('application', 'cancel') || 'Yopish'}
            </Button>
            <Button
              variant="cta"
              onClick={() => {
                setIsModalOpen(false);
                // Optionally open application modal here
                const applyButton = document.querySelector('[class*="shadow-glow"]') as HTMLButtonElement;
                if (applyButton) applyButton.click();
              }}
              className="flex-1"
            >
              {t('nav', 'applyNow') || 'Ariza berish'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Programs;
