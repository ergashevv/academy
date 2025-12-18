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
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/contexts/LanguageContext";
import { api } from "@/lib/api";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useState } from "react";

const FinalCTA = () => {
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
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-[#1A2B2F] rounded-3xl p-12 md:p-16 text-center shadow-card animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('finalCTA', 'title')}
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('finalCTA', 'description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              variant="cta"
              size="xl"
              className="group shadow-glow"
              onClick={() => setIsApplicationModalOpen(true)}
            >
              {t('finalCTA', 'button')}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-5 h-5" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-400">
            {t('finalCTA', 'note')}
          </p>
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
                    variant="cta"
                    onClick={() => {
                      setIsApplicationModalOpen(false);
                      setFormData({ fullName: '', phone: '', question: '' });
                      setIsTyping(false);
                      setTypingText("");
                    }}
                    disabled={isSubmitting}
                    className="flex-1 h-12 rounded-lg font-medium transition-all"
                  >
                    {t('application', 'cancel')}
                  </Button>
                  <Button
                    type="submit"
                    variant="cta"
                    disabled={isSubmitting}
                    className="flex-1 h-12 rounded-lg font-semibold transition-all"
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

export default FinalCTA;
