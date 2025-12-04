import { Mail, Phone, MapPin } from "lucide-react";
import { useContactInfo, useLocation, useSocialMedia } from "@/hooks/use-api";
import { useTranslation } from "@/hooks/use-translation";

const Footer = () => {
  const { data: contactInfoData, isLoading: contactLoading } = useContactInfo();
  const { data: locationData, isLoading: locationLoading } = useLocation();
  const { data: socialMediaData, isLoading: socialLoading } = useSocialMedia();
  const { t } = useTranslation();
  
  const isLoading = contactLoading || locationLoading || socialLoading;

  // Default contact info
  const defaultContact = {
    address: "123 Tech Street, Innovation District\nSan Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "info@techeducation.com",
  };

  // Extract contact info from API
  let contactInfo = defaultContact;
  if (contactInfoData && contactInfoData.contact_info && Array.isArray(contactInfoData.contact_info)) {
    const contactItems = contactInfoData.contact_info;
    contactInfo = {
      address: contactItems.find((item: any) => item.type === 'address' || item.type === 'location')?.value || defaultContact.address,
      phone: contactItems.find((item: any) => item.type === 'phone' || item.type === 'tel')?.value || defaultContact.phone,
      email: contactItems.find((item: any) => item.type === 'email' || item.type === 'mail')?.value || defaultContact.email,
    };
  }

  // Extract location from API
  let location = contactInfo.address;
  if (locationData && locationData.length > 0) {
    const firstLocation = locationData[0];
    if (firstLocation.locations && Array.isArray(firstLocation.locations) && firstLocation.locations.length > 0) {
      const loc = firstLocation.locations[0];
      location = loc.address || contactInfo.address;
    }
  }

  // Extract social media links
  const socialLinks: Array<{ platform: string; url: string }> = [];
  if (socialMediaData && typeof socialMediaData === 'object') {
    if (Array.isArray(socialMediaData)) {
      socialMediaData.forEach((item: any) => {
        if (item.url && item.platform) {
          socialLinks.push({ platform: item.platform, url: item.url });
        }
      });
    } else if (socialMediaData.url && socialMediaData.platform) {
      socialLinks.push({ platform: socialMediaData.platform, url: socialMediaData.url });
    }
  }

  if (isLoading) {
    return (
      <footer className="bg-secondary/50 border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-card rounded mb-4 w-32" />
                <div className="space-y-3">
                  <div className="h-4 bg-card rounded w-24" />
                  <div className="h-4 bg-card rounded w-24" />
                  <div className="h-4 bg-card rounded w-24" />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-border">
            <div className="h-4 bg-card rounded w-64 mx-auto" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-secondary/50 border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer', 'quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-accent transition-colors">
                  {t('nav', 'about')}
                </a>
              </li>
              <li>
                <a href="#programs" className="text-muted-foreground hover:text-accent transition-colors">
                  {t('nav', 'programs')}
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="text-muted-foreground hover:text-accent transition-colors">
                  {t('nav', 'whyChooseUs')}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-accent transition-colors">
                  {t('nav', 'testimonials')}
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-muted-foreground hover:text-accent transition-colors">
                  {t('nav', 'gallery')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-accent transition-colors">
                  {t('nav', 'contact')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer', 'contactUs')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-muted-foreground whitespace-pre-line">
                  {location}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="text-muted-foreground hover:text-accent transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="text-muted-foreground hover:text-accent transition-colors">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer', 'followUs')}</h4>
            {socialLinks.length > 0 ? (
              <ul className="space-y-2">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      {social.platform}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">Our Location</p>
            )}
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} UFT Academy. {t('footer', 'copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
