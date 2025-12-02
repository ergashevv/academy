import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useCourses } from "@/hooks/use-api";
import { useTranslation } from "@/hooks/use-translation";

const Programs = () => {
  const { data: coursesData, isLoading } = useCourses();
  const { t } = useTranslation();
  
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
          if (course.title || course.description) {
            allCourses.push({
              ...course,
              icon: course.icon || getCourseIcon(course.title || '', allCourses.length),
              gradient: gradients[allCourses.length % gradients.length],
              topics: Array.isArray(course.topics) ? course.topics : (course.topics ? [course.topics] : []),
            });
          }
        });
      }
    });
    
    if (allCourses.length > 0) {
      programs = allCourses.map((course, index) => ({
        title: course.title || '',
        description: course.description || '',
        topics: Array.isArray(course.topics) ? course.topics : [],
        icon: course.icon || getCourseIcon(course.title || '', index),
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
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 group hover:scale-105 animate-scale-in"
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
              
              <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
              <p className="text-muted-foreground mb-6">{program.description}</p>
              
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
              
              <Button variant="outline" className="w-full group-hover:bg-accent/10">
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
    </section>
  );
};

export default Programs;
