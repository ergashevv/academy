import { useTranslation } from "@/hooks/use-translation";

const About = () => {
  const { t } = useTranslation();
  
  // Static data in 3 languages
  const title = t('about', 'defaultTitle');
  const description = t('about', 'defaultDescription');
  
  // Statistics data
  const stats = [
    {
      value: "150+",
      label: t('about', 'statsProjects'),
    },
    {
      value: "700+",
      label: t('about', 'statsGraduates'),
    },
    {
      value: "1500+",
      label: t('about', 'statsTotalGraduates'),
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 animate-fade-in">
          {title && (
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        {/* Statistics Panel */}
        <div className="bg-primary/10 rounded-2xl p-6 md:p-8 shadow-card">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
