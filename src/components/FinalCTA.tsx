import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const FinalCTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-card rounded-3xl p-12 md:p-16 text-center shadow-card animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('finalCTA', 'title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t('finalCTA', 'description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="cta" size="xl" className="group animate-glow">
              {t('finalCTA', 'button')}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground">
            {t('finalCTA', 'note')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
