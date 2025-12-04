import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/uftlogo.svg";
import { useHeader } from "@/hooks/use-api";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";
import { useState } from "react";
import { api } from "@/lib/api";
import { TypingAnimation } from "@/components/ui/typing-animation";

const Header = () => {
  const { language, setLanguage, languageCode } = useLanguage();
  const { data: headerData, isLoading } = useHeader();
  const { t } = useTranslation();
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    question: '',
  });
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cleanPhoneNumber = (phone: string): string => {
    // Remove all characters except digits and +
    return phone.replace(/[^\d+]/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsTyping(true);
    
    try {
      const cleanedPhone = cleanPhoneNumber(formData.phone);
      const response = await api.submitContact({
        full_name: formData.fullName,
        phone_number: cleanedPhone,
        description: formData.question,
      }, languageCode);

      // Simulate typing animation with Python-like code
      const responseText = `# Sending application...\n\ndata = {\n    "full_name": "${formData.fullName}",\n    "phone_number": "${cleanedPhone}",\n    "description": "${formData.question.replace(/"/g, '\\"').substring(0, 50)}${formData.question.length > 50 ? '...' : ''}"\n}\n\nresponse = requests.post("/api/contact/", json=data)\n\nif response.status_code == 200:\n    print("Success!")\nelse:\n    print("Error")`;
      
      setTypingText(responseText);
      
      // Wait for typing to complete, then show success message
      setTimeout(() => {
        setIsTyping(false);
        setIsSuccess(true);
        
        // Close modal after showing success message
        setTimeout(() => {
          setIsApplicationModalOpen(false);
          setFormData({ fullName: '', phone: '', question: '' });
          setIsSubmitting(false);
          setIsSuccess(false);
          setTypingText("");
        }, 2000);
      }, responseText.length * 20 + 300);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      setIsSubmitting(false);
      setIsTyping(false);
      setIsSuccess(false);
      setTypingText("");
      alert('Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
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
              onClick={() => scrollToSection('gallery')}
              className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
            >
              {t('nav', 'gallery')}
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
              <DropdownMenuContent align="end" className="w-fit min-w-[var(--radix-dropdown-menu-trigger-width)] bg-card border-border p-1">
                <DropdownMenuItem
                  onClick={() => setLanguage("UZ")}
                  className={`cursor-pointer px-3 py-2 text-sm font-medium justify-center ${language === "UZ" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  UZ
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("RU")}
                  className={`cursor-pointer px-3 py-2 text-sm font-medium justify-center ${language === "RU" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  RU
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("EN")}
                  className={`cursor-pointer px-3 py-2 text-sm font-medium justify-center ${language === "EN" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  EN
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="cta" 
              size="lg"
              onClick={() => setIsApplicationModalOpen(true)}
              className="shadow-glow"
            >
              {t('nav', 'applyNow')}
            </Button>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Dialog open={isApplicationModalOpen} onOpenChange={setIsApplicationModalOpen}>
        <DialogContent className="max-w-md bg-[#1A2B2F] backdrop-blur-xl border border-[#2A3B3F] dark:bg-[#1A2B2F] max-h-[90vh] flex flex-col p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-white">{t('application', 'title')}</DialogTitle>
            <DialogDescription className="text-gray-300 mt-2">
              {t('application', 'fullName')}, {t('application', 'phone')} va {t('application', 'question')} maydonlarini to'ldiring
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden flex flex-col min-h-[400px]">
            {isTyping ? (
              <div className="mt-4 p-4 bg-[#0F1A1C] rounded-lg border border-[#2A3B3F] font-mono text-sm overflow-y-auto flex-1">
                <pre className="text-white whitespace-pre-wrap">
                  <TypingAnimation 
                    text={typingText} 
                    speed={30}
                    className="text-[#00FF88]"
                  />
                </pre>
              </div>
            ) : isSuccess ? (
              <div className="mt-4 flex flex-col items-center justify-center flex-1 py-8">
                <div className="w-16 h-16 rounded-full bg-[#00FF88]/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#00FF88] mb-2">Muvaffaqiyatli yuborildi!</h3>
                <p className="text-gray-300 text-center">
                  Arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz.
                </p>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-5 mt-2">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white font-medium text-sm">
                  {t('application', 'fullName')}
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder={t('application', 'fullNamePlaceholder')}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  disabled={isSubmitting}
                  className="bg-[#0F1A1C] border border-[#2A3B3F] text-white placeholder:text-gray-500 focus-visible:border-[#00FF88] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg h-12 px-4 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white font-medium text-sm">
                  {t('application', 'phone')}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t('application', 'phonePlaceholder')}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  disabled={isSubmitting}
                  className="bg-[#0F1A1C] border border-[#2A3B3F] text-white placeholder:text-gray-500 focus-visible:border-[#00FF88] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg h-12 px-4 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="question" className="text-white font-medium text-sm">
                  {t('application', 'question')}
                </Label>
                <Textarea
                  id="question"
                  placeholder={t('application', 'questionPlaceholder')}
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                  disabled={isSubmitting}
                  className="bg-[#0F1A1C] border border-[#2A3B3F] text-white placeholder:text-gray-500 focus-visible:border-[#00FF88] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg min-h-[120px] px-4 py-3 transition-all resize-none"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsApplicationModalOpen(false);
                    setFormData({ fullName: '', phone: '', question: '' });
                    setIsTyping(false);
                    setTypingText("");
                  }}
                  disabled={isSubmitting}
                  className="flex-1 h-12 border border-[#00FF88] text-[#00FF88] bg-transparent hover:bg-[#00FF88]/10 rounded-lg font-medium transition-all"
                >
                  {t('application', 'cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="cta"
                  disabled={isSubmitting}
                  className="flex-1 h-12 bg-[#00FF88] hover:bg-[#00E67A] text-white rounded-lg font-semibold transition-all shadow-lg"
                >
                  {isSubmitting ? 'Yuborilmoqda...' : t('application', 'submit')}
                </Button>
              </div>
            </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
