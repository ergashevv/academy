import { Button } from "@/components/ui/button";
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
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useHeader } from "@/hooks/use-api";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/contexts/LanguageContext";
import { api } from "@/lib/api";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useState } from "react";

const Hero = () => {
  const { data: headerData, isLoading } = useHeader();
  const { t } = useTranslation();
  const { languageCode } = useLanguage();
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
  
  const title = headerData?.title || "Start Your Tech Career";
  const subtitle = headerData?.subtitle || "Offline";
  const description = headerData?.description || "Transform your future with hands-on training in Frontend Development, Backend Development, and Artificial Intelligence. Learn from industry experts in a collaborative classroom environment.";
  const heroImageUrl = headerData?.hero_image || heroImage;

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute inset-0 opacity-20" id="bg-wrap">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <radialGradient id="Gradient1" cx="50%" cy="50%" fx="0.441602%" fy="50%" r=".5">
              <animate attributeName="fx" dur="34s" values="0%;3%;0%" repeatCount="indefinite"></animate>
              <stop offset="0%" stopColor="rgba(255, 0, 255, 1)"></stop>
              <stop offset="100%" stopColor="rgba(255, 0, 255, 0)"></stop>
            </radialGradient>
            <radialGradient id="Gradient2" cx="50%" cy="50%" fx="2.68147%" fy="50%" r=".5">
              <animate attributeName="fx" dur="23.5s" values="0%;3%;0%" repeatCount="indefinite"></animate>
              <stop offset="0%" stopColor="rgba(255, 255, 0, 1)"></stop>
              <stop offset="100%" stopColor="rgba(255, 255, 0, 0)"></stop>
            </radialGradient>
            <radialGradient id="Gradient3" cx="50%" cy="50%" fx="0.836536%" fy="50%" r=".5">
              <animate attributeName="fx" dur="21.5s" values="0%;3%;0%" repeatCount="indefinite"></animate>
              <stop offset="0%" stopColor="rgba(0, 255, 255, 1)"></stop>
              <stop offset="100%" stopColor="rgba(0, 255, 255, 0)"></stop>
            </radialGradient>
            <radialGradient id="Gradient4" cx="50%" cy="50%" fx="4.56417%" fy="50%" r=".5">
              <animate attributeName="fx" dur="23s" values="0%;5%;0%" repeatCount="indefinite"></animate>
              <stop offset="0%" stopColor="rgba(0, 255, 0, 1)"></stop>
              <stop offset="100%" stopColor="rgba(0, 255, 0, 0)"></stop>
            </radialGradient>
            <radialGradient id="Gradient5" cx="50%" cy="50%" fx="2.65405%" fy="50%" r=".5">
              <animate attributeName="fx" dur="24.5s" values="0%;5%;0%" repeatCount="indefinite"></animate>
              <stop offset="0%" stopColor="rgba(0,0,255, 1)"></stop>
              <stop offset="100%" stopColor="rgba(0,0,255, 0)"></stop>
            </radialGradient>
            <radialGradient id="Gradient6" cx="50%" cy="50%" fx="0.981338%" fy="50%" r=".5">
              <animate attributeName="fx" dur="25.5s" values="0%;5%;0%" repeatCount="indefinite"></animate>
              <stop offset="0%" stopColor="rgba(255,0,0, 1)"></stop>
              <stop offset="100%" stopColor="rgba(255,0,0, 0)"></stop>
            </radialGradient>
          </defs>
          <rect x="13.744%" y="1.18473%" width="100%" height="100%" fill="url(#Gradient1)" transform="rotate(334.41 50 50)">
            <animate attributeName="x" dur="20s" values="25%;0%;25%" repeatCount="indefinite"></animate>
            <animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite"></animate>
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="7s" repeatCount="indefinite"></animateTransform>
          </rect>
          <rect x="-2.17916%" y="35.4267%" width="100%" height="100%" fill="url(#Gradient2)" transform="rotate(255.072 50 50)">
            <animate attributeName="x" dur="23s" values="-25%;0%;-25%" repeatCount="indefinite"></animate>
            <animate attributeName="y" dur="24s" values="0%;50%;0%" repeatCount="indefinite"></animate>
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"></animateTransform>
          </rect>
          <rect x="9.00483%" y="14.5733%" width="100%" height="100%" fill="url(#Gradient3)" transform="rotate(139.903 50 50)">
            <animate attributeName="x" dur="25s" values="0%;25%;0%" repeatCount="indefinite"></animate>
            <animate attributeName="y" dur="12s" values="0%;25%;0%" repeatCount="indefinite"></animate>
            <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="9s" repeatCount="indefinite"></animateTransform>
          </rect>
        </svg>
      </div>
      
      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {title}
            <span className="block mt-2 bg-gradient-primary bg-clip-text text-transparent">
              {subtitle}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="cta" size="xl" className="group" onClick={() => setIsApplicationModalOpen(true)}>
              {t('hero', 'applyNow')}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

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
    </section>
  );
};

export default Hero;
