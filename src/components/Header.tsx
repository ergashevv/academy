import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/uftlogo.svg";
import { useHeader } from "@/hooks/use-api";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const { data: headerData, isLoading } = useHeader();
  const { t } = useTranslation();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const logoUrl = headerData?.logo 
    ? (typeof headerData.logo === 'string' && headerData.logo.startsWith('http') 
        ? headerData.logo 
        : `https://api.uftacademy.uz${headerData.logo}`)
    : logo;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logoUrl} 
              alt="UFT Academy" 
              className="h-12 w-auto" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = logo;
              }}
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
            >
              {t('nav', 'about')}
            </button>
            <button
              onClick={() => scrollToSection('programs')}
              className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
            >
              {t('nav', 'programs')}
            </button>
            <button
              onClick={() => scrollToSection('why-choose-us')}
              className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
            >
              {t('nav', 'whyChooseUs')}
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
            >
              {t('nav', 'testimonials')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
            >
              {t('nav', 'contact')}
            </button>
          </nav>

          {/* Language & CTA */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-primary bg-background hover:bg-primary/10 transition-colors text-foreground font-medium">
                  {language}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32 bg-card border-border">
                <DropdownMenuItem
                  onClick={() => setLanguage("UZ")}
                  className={`cursor-pointer ${language === "UZ" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  UZ
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("RU")}
                  className={`cursor-pointer ${language === "RU" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  RU
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("EN")}
                  className={`cursor-pointer ${language === "EN" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  EN
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="cta" 
              size="lg"
              onClick={() => scrollToSection('cta')}
              className="shadow-glow"
            >
              {t('nav', 'applyNow')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
