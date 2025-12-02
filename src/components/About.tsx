import { Users } from "lucide-react";
import { useAbout } from "@/hooks/use-api";
import { useTranslation } from "@/hooks/use-translation";

const About = () => {
  const { data: aboutData, isLoading } = useAbout();
  const { t } = useTranslation();
  
  // API returns an array, get first item
  const aboutItem = Array.isArray(aboutData) && aboutData.length > 0 ? aboutData[0] : null;
  
  const title = aboutItem?.title || '';
  const description = aboutItem?.about?.[0]?.description || '';
  const aboutItems = aboutItem?.about || [];

  // Map API data only
  const items = aboutItems
    .filter((item: any) => item.title || item.about_title || item.description)
    .map((item: any) => ({
      title: item.about_title || item.title || '',
      description: item.description || '',
      icon: Users, // Default icon since API doesn't provide icon info
    }));

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="h-12 bg-card rounded-lg animate-pulse mb-6 max-w-md mx-auto" />
            <div className="h-6 bg-card rounded-lg animate-pulse max-w-2xl mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-8 animate-pulse">
                <div className="w-16 h-16 bg-secondary rounded-xl mb-6" />
                <div className="h-6 bg-secondary rounded mb-4" />
                <div className="h-4 bg-secondary rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show no data message if no items available
  if (items.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xl text-muted-foreground">{t('common', 'noData')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {(title || description) && (
          <div className="text-center mb-16 animate-fade-in">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        
        {items.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-background" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
