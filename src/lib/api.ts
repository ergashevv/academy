const API_BASE_URL = 'https://api.uftacademy.uz';

// Helper function to get API URL with language
export const getApiUrl = (endpoint: string, language: string = 'uz') => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${language}/api/${cleanEndpoint}`;
};

// Type definitions based on Swagger schema
export interface Header {
  id?: number;
  logo?: string;
  navigation?: any[];
  [key: string]: any;
}

export interface TitleAbout {
  id?: number;
  title?: string;
  title2?: string | null;
  about?: Array<{
    id?: number;
    about_title?: string;
    description?: string;
    image?: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

export interface ChooseUsTitle {
  id?: number;
  title?: string;
  description?: string;
  choose_us?: Array<{
    id?: number;
    title?: string;
    description?: string;
    icon?: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

export interface Comment {
  id?: number;
  name?: string;
  role?: string;
  position?: string | null;
  comment?: string;
  content?: string;
  rating?: number | null;
  is_checked?: boolean;
  [key: string]: any;
}

export interface CommentTitle {
  id?: number;
  title?: string;
  description?: string;
  [key: string]: any;
}

export interface TitleCourses {
  id?: number;
  title?: string;
  description?: string;
  courses?: Array<{
    id?: number;
    title?: string;
    description?: string;
    topics?: string[];
    icon?: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

export interface CourseDetail {
  id?: number;
  title?: string;
  description?: string;
  topics?: string[];
  icon?: string;
  [key: string]: any;
}

export interface CategoryTitle {
  id?: number;
  title?: string;
  title2?: string;
  categories?: Array<{
    id?: number;
    name?: string;
    gallery?: Array<{
      id?: number;
      image?: string;
      description?: string;
      category_name?: string;
      [key: string]: any;
    }>;
    galleries?: Array<{
      id?: number;
      image?: string;
      description?: string;
      [key: string]: any;
    }>;
    [key: string]: any;
  }>;
  [key: string]: any;
}

export interface GalleryDetail {
  id?: number;
  image?: string;
  description?: string;
  category?: {
    id?: number;
    name?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface ContactInfoTitle {
  id?: number;
  title?: string;
  contact_info?: Array<{
    id?: number;
    type?: string;
    value?: string;
    icon?: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

export interface SocialMedia {
  id?: number;
  platform?: string;
  url?: string;
  icon?: string;
  [key: string]: any;
}

export interface TitleLocation {
  id?: number;
  title?: string;
  locations?: Array<{
    id?: number;
    address?: string;
    latitude?: number;
    longitude?: number;
    [key: string]: any;
  }>;
  [key: string]: any;
}

export interface CompletedProject {
  id?: number;
  title?: string;
  description?: string;
  image?: string;
  [key: string]: any;
}

// API functions
export const api = {
  // Header
  getHeader: async (language: string = 'uz'): Promise<Header> => {
    const response = await fetch(getApiUrl('header/', language));
    if (!response.ok) throw new Error('Failed to fetch header');
    return response.json();
  },

  // About
  getAbout: async (language: string = 'uz'): Promise<TitleAbout[]> => {
    const response = await fetch(getApiUrl('about/', language));
    if (!response.ok) throw new Error('Failed to fetch about');
    return response.json();
  },

  // Choose Us
  getChooseUs: async (language: string = 'uz'): Promise<ChooseUsTitle[]> => {
    const response = await fetch(getApiUrl('choose_us/', language));
    if (!response.ok) throw new Error('Failed to fetch choose us');
    return response.json();
  },

  // Comments/Testimonials
  getComments: async (language: string = 'uz'): Promise<Comment[]> => {
    const response = await fetch(getApiUrl('comments/', language));
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  },

  getCommentsTitle: async (language: string = 'uz'): Promise<CommentTitle> => {
    const response = await fetch(getApiUrl('comments_title/', language));
    if (!response.ok) throw new Error('Failed to fetch comments title');
    return response.json();
  },

  // Courses/Programs
  getCourses: async (language: string = 'uz'): Promise<TitleCourses[]> => {
    const response = await fetch(getApiUrl('courses/', language));
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
  },

  getCourseDetail: async (id: number, language: string = 'uz'): Promise<CourseDetail> => {
    const response = await fetch(getApiUrl(`courses/${id}/`, language));
    if (!response.ok) throw new Error('Failed to fetch course detail');
    return response.json();
  },

  // Gallery
  getTitlesWithCategories: async (language: string = 'uz'): Promise<CategoryTitle[]> => {
    const response = await fetch(getApiUrl('titles-with-categories/', language));
    if (!response.ok) throw new Error('Failed to fetch gallery categories');
    return response.json();
  },

  getGalleryDetail: async (id: number, language: string = 'uz'): Promise<GalleryDetail> => {
    const response = await fetch(getApiUrl(`gallery/${id}/`, language));
    if (!response.ok) throw new Error('Failed to fetch gallery detail');
    return response.json();
  },

  // Contact Info
  getContactInfo: async (language: string = 'uz'): Promise<ContactInfoTitle> => {
    const response = await fetch(getApiUrl('contact_info/', language));
    if (!response.ok) throw new Error('Failed to fetch contact info');
    return response.json();
  },

  // Social Media
  getSocialMedia: async (language: string = 'uz'): Promise<SocialMedia> => {
    const response = await fetch(getApiUrl('social_media/', language));
    if (!response.ok) throw new Error('Failed to fetch social media');
    return response.json();
  },

  // Location
  getLocation: async (language: string = 'uz'): Promise<TitleLocation[]> => {
    const response = await fetch(getApiUrl('location/', language));
    if (!response.ok) throw new Error('Failed to fetch location');
    return response.json();
  },

  // Completed Projects
  getCompletedProjects: async (language: string = 'uz'): Promise<CompletedProject[]> => {
    const response = await fetch(getApiUrl('completed-projects/', language));
    if (!response.ok) throw new Error('Failed to fetch completed projects');
    return response.json();
  },

  // Contact/Application
  submitContact: async (data: { full_name: string; phone_number: string; description: string }, language: string = 'uz'): Promise<any> => {
    const response = await fetch(getApiUrl('contact/', language), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit contact');
    return response.json();
  },
};

