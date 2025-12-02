import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import type {
  Header,
  TitleAbout,
  ChooseUsTitle,
  Comment,
  CommentTitle,
  TitleCourses,
  CourseDetail,
  CategoryTitle,
  GalleryDetail,
  ContactInfoTitle,
  SocialMedia,
  TitleLocation,
  CompletedProject,
} from '@/lib/api';

// Header hooks
export const useHeader = () => {
  const { languageCode } = useLanguage();
  return useQuery<Header>({
    queryKey: ['header', languageCode],
    queryFn: () => api.getHeader(languageCode),
  });
};

// About hooks
export const useAbout = () => {
  const { languageCode } = useLanguage();
  return useQuery<TitleAbout[]>({
    queryKey: ['about', languageCode],
    queryFn: () => api.getAbout(languageCode),
  });
};

// Choose Us hooks
export const useChooseUs = () => {
  const { languageCode } = useLanguage();
  return useQuery<ChooseUsTitle[]>({
    queryKey: ['chooseUs', languageCode],
    queryFn: () => api.getChooseUs(languageCode),
  });
};

// Comments/Testimonials hooks
export const useComments = () => {
  const { languageCode } = useLanguage();
  return useQuery<Comment[]>({
    queryKey: ['comments', languageCode],
    queryFn: () => api.getComments(languageCode),
  });
};

export const useCommentsTitle = () => {
  const { languageCode } = useLanguage();
  return useQuery<CommentTitle>({
    queryKey: ['commentsTitle', languageCode],
    queryFn: () => api.getCommentsTitle(languageCode),
  });
};

// Courses/Programs hooks
export const useCourses = () => {
  const { languageCode } = useLanguage();
  return useQuery<TitleCourses[]>({
    queryKey: ['courses', languageCode],
    queryFn: () => api.getCourses(languageCode),
  });
};

export const useCourseDetail = (id: number) => {
  const { languageCode } = useLanguage();
  return useQuery<CourseDetail>({
    queryKey: ['course', id, languageCode],
    queryFn: () => api.getCourseDetail(id, languageCode),
    enabled: !!id,
  });
};

// Gallery hooks
export const useTitlesWithCategories = () => {
  const { languageCode } = useLanguage();
  return useQuery<CategoryTitle[]>({
    queryKey: ['titlesWithCategories', languageCode],
    queryFn: () => api.getTitlesWithCategories(languageCode),
  });
};

export const useGalleryDetail = (id: number) => {
  const { languageCode } = useLanguage();
  return useQuery<GalleryDetail>({
    queryKey: ['gallery', id, languageCode],
    queryFn: () => api.getGalleryDetail(id, languageCode),
    enabled: !!id,
  });
};

// Contact Info hooks
export const useContactInfo = () => {
  const { languageCode } = useLanguage();
  return useQuery<ContactInfoTitle>({
    queryKey: ['contactInfo', languageCode],
    queryFn: () => api.getContactInfo(languageCode),
  });
};

// Social Media hooks
export const useSocialMedia = () => {
  const { languageCode } = useLanguage();
  return useQuery<SocialMedia>({
    queryKey: ['socialMedia', languageCode],
    queryFn: () => api.getSocialMedia(languageCode),
  });
};

// Location hooks
export const useLocation = () => {
  const { languageCode } = useLanguage();
  return useQuery<TitleLocation[]>({
    queryKey: ['location', languageCode],
    queryFn: () => api.getLocation(languageCode),
  });
};

// Completed Projects hooks
export const useCompletedProjects = () => {
  const { languageCode } = useLanguage();
  return useQuery<CompletedProject[]>({
    queryKey: ['completedProjects', languageCode],
    queryFn: () => api.getCompletedProjects(languageCode),
  });
};

