import { Users2, Briefcase, Trophy, HeartHandshake } from "lucide-react";
import { useChooseUs } from "@/hooks/use-api";
import { useTranslation } from "@/hooks/use-translation";

const WhyChooseUs = () => {
  const { data: chooseUsData, isLoading } = useChooseUs();
  const { t } = useTranslation();
  
  const iconMap: Record<string, any> = {
    Users2,
    Briefcase,
    Trophy,
    HeartHandshake,
  };

  // Extract features from API data only
  let features: Array<{ icon: any; title: string; description: string }> = [];
  let sectionTitle = '';
  let sectionDescription = '';

  if (chooseUsData && Array.isArray(chooseUsData) && chooseUsData.length > 0) {
    // Get first item for section title/description
    const firstItem = chooseUsData[0];
    sectionTitle = firstItem.title || '';
    sectionDescription = firstItem.description || '';
    
    // Collect all choose_us items from all title items
    const allChooseUsItems: any[] = [];
    chooseUsData.forEach((titleItem: any) => {
      if (titleItem.choose_us && Array.isArray(titleItem.choose_us)) {
        titleItem.choose_us.forEach((item: any) => {
          if (item.title || item.description) {
            allChooseUsItems.push(item);
          }
        });
      }
    });
    
    // Map API data to features
    if (allChooseUsItems.length > 0) {
      features = allChooseUsItems.map((item: any) => {
        // Try to match icon by name
        const iconName = item.icon || item.icon_name;
        const matchedIcon = iconName && iconMap[iconName] ? iconMap[iconName] : Users2;
        
        return {
          icon: matchedIcon,
          title: item.title || '',
          description: item.description || '',
        };
      });
    }
  }

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="h-12 bg-card rounded-lg animate-pulse mb-6 max-w-md mx-auto" />
            <div className="h-6 bg-card rounded-lg animate-pulse max-w-2xl mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-8 animate-pulse">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-secondary rounded-xl flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-6 bg-secondary rounded mb-3" />
                    <div className="h-4 bg-secondary rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show no data message if no features available
  if (!isLoading && features.length === 0) {
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

  const gradients = [
    "from-blue-500/20 to-cyan-500/20",
    "from-green-500/20 to-emerald-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-orange-500/20 to-red-500/20",
  ];

  return (
    <section id="why-choose-us" className="py-20 px-4 bg-[#0D1F1C]">
      <div className="container mx-auto max-w-6xl">
        {(sectionTitle || sectionDescription) && (
          <div className="text-center mb-16 animate-fade-in">
            {sectionTitle && (
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        {features.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const gradient = gradients[index % gradients.length];
              return (
                <div
                  key={feature.title || index}
                  className="bg-[#1A2B2F] rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in border border-[#2A3B3F]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} p-4 inline-flex items-center justify-center`}>
                      <Icon className="w-full h-full text-accent" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
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

export default WhyChooseUs;
