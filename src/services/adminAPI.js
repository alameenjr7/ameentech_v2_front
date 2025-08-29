import { apiClient } from '../apiConfig';

class AdminAPIService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  // Generic CRUD operations
  async getAll() {
    const response = await apiClient.get(`/${this.endpoint}`);
    return response.data;
  }

  async getById(id) {
    const response = await apiClient.get(`/${this.endpoint}/${id}`);
    return response.data;
  }

  async create(data) {
    const formData = this.prepareFormData(data);
    const config = this.hasFileFields(data) ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {};
    
    const response = await apiClient.post(`/${this.endpoint}`, formData, config);
    return response.data;
  }

  async update(id, data) {
    const formData = this.prepareFormData(data);
    const config = this.hasFileFields(data) ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {};
    
    const response = await apiClient.patch(`/${this.endpoint}/${id}`, formData, config);
    return response.data;
  }

  // Helper methods for file handling
  hasFileFields(data) {
    return Object.values(data).some(value => value instanceof File);
  }

  prepareFormData(data) {
    const hasFiles = this.hasFileFields(data);
    
    if (!hasFiles) {
      return data;
    }

    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      const value = data[key];
      
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });
    
    return formData;
  }

  async delete(id) {
    const response = await apiClient.delete(`/${this.endpoint}/${id}`);
    return response.data;
  }

  // Special operations
  async toggle(id) {
    const response = await apiClient.put(`/${this.endpoint}/${id}/toggle`);
    return response.data;
  }

  async getActive() {
    const response = await apiClient.get(`/${this.endpoint}/active`);
    return response.data;
  }

  async toggleActive(id) {
    const response = await apiClient.patch(`/${this.endpoint}/${id}/toggle-active`);
    return response.data;
  }
}

// Authentication service
export const authService = {
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  async getProfile() {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  async updateProfile(profileData) {
    // Déterminer l'ID utilisateur depuis le token
    const userToken = localStorage.getItem('token');
    let userId = null;
    
    if (userToken) {
      try {
        const base64Payload = userToken.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        userId = payload.id || payload.userId || payload.sub;
      } catch (e) {
        console.warn('Cannot decode token:', e);
      }
    }

    // Essayer les routes dans l'ordre de préférence
    const routes = [
      { method: 'patch', url: `/users/${userId}`, condition: userId },
      { method: 'put', url: '/auth/profile', condition: true },
      { method: 'patch', url: '/auth/profile', condition: true }
    ];

    let lastError = null;
    
    for (const route of routes) {
      if (!route.condition) continue;
      
      try {
        const response = await apiClient[route.method](route.url, profileData);
        return response.data;
      } catch (error) {
        lastError = error;
        // Ne continuer que si c'est une erreur 404
        if (error.response?.status !== 404) {
          throw error;
        }
        // Sinon, essayer la route suivante
      }
    }
    
    // Si on arrive ici, aucune route n'a fonctionné
    throw lastError || new Error('Aucune route de mise à jour du profil disponible');
  },

  async changePassword(passwordData) {
    const response = await apiClient.post('/auth/change-password', passwordData);
    return response.data;
  }
};

// Initialize services for all endpoints
export const contactsService = new AdminAPIService('contacts');
export const servicesService = new AdminAPIService('services');
export const projectsService = new AdminAPIService('projects');
export const aboutsService = new AdminAPIService('abouts');
export const educationService = new AdminAPIService('education');
export const usersService = new AdminAPIService('users');
// Special settings service that handles singleton settings
class SettingsService extends AdminAPIService {
  constructor() {
    super('settings');
  }

  async create(data) {
    // For settings, we use POST without ID (upsert behavior)
    const formData = this.prepareFormData(data);
    const config = this.hasFileFields(data) ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {};
    
    const response = await apiClient.post(`/${this.endpoint}`, formData, config);
    return response.data;
  }

  async update(id, data) {
    // For settings, we might not have an ID, so use PUT/POST to upsert
    const formData = this.prepareFormData(data);
    const config = this.hasFileFields(data) ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {};
    
    // Try to update first, if it fails, create
    try {
      if (id) {
        const response = await apiClient.patch(`/${this.endpoint}/${id}`, formData, config);
        return response.data;
      } else {
        const response = await apiClient.post(`/${this.endpoint}`, formData, config);
        return response.data;
      }
    } catch (error) {
      if (error.response?.status === 404 && id) {
        // If update fails with 404, try create
        const response = await apiClient.post(`/${this.endpoint}`, formData, config);
        return response.data;
      }
      throw error;
    }
  }
}

export const settingsService = new SettingsService();
export const blogsService = new AdminAPIService('blogs');
export const faqsService = new AdminAPIService('faqs');
export const pricingPlansService = new AdminAPIService('pricing-plans');
export const testimonialsService = new AdminAPIService('testimonials');
export const toolsService = new AdminAPIService('tools');
export const workExperiencesService = new AdminAPIService('work-experiences');
export const marqueesService = new AdminAPIService('marquees');
export const mailingService = new AdminAPIService('mailing');

// Entity configurations for form generation
export const entityConfigs = {
  contacts: {
    title: 'Messages de Contact',
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true, placeholder: 'John Doe', readonly: true },
      { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john.doe@example.com', readonly: true },
      { name: 'phone', label: 'Téléphone', type: 'tel', placeholder: '+1234567890', readonly: true },
      { name: 'interest', label: 'Domaine d\'intérêt', type: 'text', required: true, placeholder: 'Web Development', readonly: true },
      { name: 'budget', label: 'Budget', type: 'text', required: true, placeholder: '1000-2000$', readonly: true },
      { name: 'country', label: 'Pays', type: 'text', required: true, placeholder: 'USA', readonly: true },
      { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'I would like to discuss a project.', readonly: true, rows: 6 },
      { name: 'status', label: 'Statut', type: 'select', options: ['new', 'in_progress', 'completed', 'cancelled'], required: true }
    ],
    readonly: false,
    canCreate: false,
    canEdit: false,
    customActions: true
  },

  services: {
    title: 'Services',
    fields: [
      { name: 'title', label: 'Titre du service', type: 'text', required: true, placeholder: 'Développement Web' },
      { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Création de sites web modernes.' },
      { name: 'icon', label: 'Icône (nom du fichier)', type: 'text', required: true, help: 'Ex: web-icon.png', placeholder: 'web-icon.png' },
      { name: 'isActive', label: 'Actif', type: 'checkbox' },
      { name: 'order', label: 'Ordre d\'affichage', type: 'number', min: 1, required: true, placeholder: '1' },
      { name: 'isNew', label: 'Nouveau', type: 'checkbox' },
      { name: 'isFeatured', label: 'Mis en avant', type: 'checkbox' },
      { name: 'slug', label: 'Slug', type: 'text', required: true, help: 'URL-friendly version du titre', placeholder: 'developpement-web' }
    ],
    hasToggle: true,
    hasActive: true,
    canCreate: true,
    canEdit: true,
    canDelete: true
  },

  projects: {
    title: 'Projets',
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true, placeholder: 'Project Title' },
      { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Project Description' },
      { name: 'category', label: 'Catégorie', type: 'text', required: true, placeholder: 'Web Development' },
      { name: 'clientName', label: 'Nom du client', type: 'text', placeholder: 'Client Name' },
      { name: 'projectUrl', label: 'URL du projet', type: 'url', placeholder: 'https://example.com' },
      { name: 'technologies', label: 'Technologies', type: 'textarea', help: 'Format JSON: ["React", "Node.js"]', placeholder: '["React", "Node.js"]', rows: 2 },
      { name: 'tags', label: 'Tags', type: 'textarea', help: 'Format JSON: ["Web", "API"]', placeholder: '["Web", "API"]', rows: 2 },
      { name: 'slug', label: 'Slug', type: 'text', required: true, help: 'URL-friendly version du titre', placeholder: 'project-slug' },
      { name: 'isNew', label: 'Nouveau', type: 'checkbox' },
      { name: 'isFeatured', label: 'Mis en avant', type: 'checkbox' },
      { name: 'isActive', label: 'Actif', type: 'checkbox' },
      { name: 'order', label: 'Ordre d\'affichage', type: 'number', min: 1, placeholder: '1' },
      { name: 'serviceId', label: 'ID du service', type: 'number', help: 'ID du service associé', placeholder: '1' },
      { name: 'image', label: 'Image', type: 'file', accept: 'image/*' }
    ],
    hasToggle: true,
    hasActive: true,
    canCreate: true,
    canEdit: true,
    canDelete: true
  },

  abouts: {
    title: 'À Propos',
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true, placeholder: 'À propos de nous' },
      { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Nous sommes une équipe...' },
      { name: 'paragraphs', label: 'Paragraphes', type: 'textarea', required: true, help: 'Format JSON: ["Paragraphe 1", "Paragraphe 2"]', placeholder: '["Paragraphe 1", "Paragraphe 2"]', rows: 4 },
      { name: 'stats', label: 'Statistiques', type: 'textarea', required: true, help: 'Format JSON: [{"number":"10+","label":"Projets"}]', placeholder: '[{"number":"10+","label":"Projets"}]', rows: 3 },
      { name: 'yearExperience', label: 'Années d\'expérience', type: 'textarea', help: 'Format JSON: [{"number":"10+","label":"Années d\'expérience"}]', placeholder: '[{"number":"10+","label":"Années d\'expérience"}]', rows: 2 },
      { name: 'clients', label: 'Clients', type: 'textarea', help: 'Format JSON: [{"number":"100+","label":"Clients"}]', placeholder: '[{"number":"100+","label":"Clients"}]', rows: 2 },
      { name: 'signature', label: 'Signature', type: 'text', placeholder: 'Baaba NGOM' },
      { name: 'imageUrl', label: 'Image', type: 'file', accept: 'image/*' }
    ]
  },

  education: {
    title: 'Formation',
    fields: [
      { name: 'period', label: 'Période', type: 'text', required: true, help: 'Ex: 2018-2022 ou 2020-Present', placeholder: '2018-2022' },
      { name: 'institution', label: 'Institution', type: 'text', required: true },
      { name: 'degree', label: 'Diplôme', type: 'text', required: true }
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true
  },

  users: {
    title: 'Utilisateurs',
    fields: [
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Mot de passe', type: 'password', required: true, createOnly: true },
      { name: 'firstName', label: 'Prénom', type: 'text', required: true },
      { name: 'lastName', label: 'Nom de famille', type: 'text', required: true },
      { name: 'role', label: 'Rôle', type: 'select', options: ['USER', 'ADMIN'], required: true }
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true
  },

  settings: {
    title: 'Paramètres',
    fields: [
      { name: 'title', label: 'Titre du site', type: 'text', required: true },
      { name: 'phone', label: 'Téléphone', type: 'tel' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'address', label: 'Adresse', type: 'text' },
      { name: 'meta_description', label: 'Meta description', type: 'textarea' },
      { name: 'meta_keywords', label: 'Meta keywords', type: 'text', help: 'Séparés par des virgules' },
      { name: 'slogan', label: 'Slogan', type: 'text' },
      { name: 'isActive', label: 'Actif', type: 'checkbox' },
      { name: 'color', label: 'Couleur primaire', type: 'color' },
      { name: 'color_2', label: 'Couleur secondaire', type: 'color' },
      { name: 'color_3', label: 'Couleur tertiaire', type: 'color' },
      { name: 'facebook', label: 'Facebook', type: 'url' },
      { name: 'instagram', label: 'Instagram', type: 'url' },
      { name: 'twitter', label: 'Twitter', type: 'url' },
      { name: 'linkedin', label: 'LinkedIn', type: 'url' },
      { name: 'whatsapp', label: 'WhatsApp', type: 'url' },
      { name: 'telegram', label: 'Telegram', type: 'url' },
      { name: 'youtube', label: 'YouTube', type: 'url' },
      { name: 'tiktok', label: 'TikTok', type: 'url' },
      { name: 'domain', label: 'Domaine', type: 'url' },
      { name: 'timezone', label: 'Fuseau horaire', type: 'text' },
      { name: 'logo', label: 'Logo principal', type: 'file', accept: 'image/*' },
      { name: 'logo_2', label: 'Logo secondaire', type: 'file', accept: 'image/*' },
      { name: 'favicon', label: 'Favicon', type: 'file', accept: 'image/*' },
      { name: 'meta_image', label: 'Image meta', type: 'file', accept: 'image/*' }
    ]
  },

  blogs: {
    title: 'Articles de Blog',
    fields: [
      { name: 'category', label: 'Catégorie', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'title', label: 'Titre', type: 'text', required: true },
      { name: 'excerpt', label: 'Extrait', type: 'textarea', required: true },
      { name: 'link', label: 'Lien', type: 'url' },
      { name: 'image', label: 'Image', type: 'file', accept: 'image/*' }
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true
  },

  faqs: {
    title: 'FAQ',
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true, placeholder: 'Quelle est votre question ?' },
      { name: 'answer', label: 'Réponse', type: 'textarea', required: true, placeholder: 'Réponse détaillée...', rows: 4 },
      { name: 'order', label: 'Ordre d\'affichage', type: 'number', min: 1, placeholder: '1', help: 'Ordre d\'affichage (optionnel)' }
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true
  },

  'pricing-plans': {
    title: 'Plans Tarifaires',
    fields: [
      { name: 'name', label: 'Nom du plan', type: 'text', required: true },
      { name: 'price', label: 'Prix', type: 'number', required: true },
      { name: 'features', label: 'Fonctionnalités', type: 'textarea', required: true, help: 'Format JSON: ["Feature 1", "Feature 2"]', placeholder: '["Fonctionnalité 1", "Fonctionnalité 2", "Fonctionnalité 3"]' },
      { name: 'icon', label: 'Icône', type: 'text', help: 'Ex: <FaStar />', placeholder: '<FaStar />' },
      { name: 'popular', label: 'Populaire', type: 'checkbox' }
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true
  },

  testimonials: {
    title: 'Témoignages',
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'role', label: 'Rôle/Poste', type: 'text', required: true },
      { name: 'text', label: 'Témoignage', type: 'textarea', required: true },
      { name: 'rating', label: 'Note', type: 'number', min: 1, max: 5, required: true },
      { name: 'avatar', label: 'Avatar', type: 'file', accept: 'image/*' }
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true
  },

  tools: {
    title: 'Outils',
    fields: [
      { name: 'name', label: 'Nom de l\'outil', type: 'text', required: true },
      { name: 'percent', label: 'Pourcentage de maîtrise', type: 'number', min: 0, max: 100, required: true },
      { name: 'icon', label: 'Icône (nom du fichier)', type: 'text', required: true, help: 'Ex: nestjs.png', placeholder: 'nestjs.png' }
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true
  },

  'work-experiences': {
    title: 'Expériences Professionnelles',
    fields: [
      { name: 'period', label: 'Période', type: 'text', required: true, help: 'Ex: 2022-Present ou 2020-2022', placeholder: '2022-Present' },
      { name: 'company', label: 'Entreprise', type: 'text', required: true },
      { name: 'role', label: 'Rôle/Poste', type: 'text', required: true }
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true
  },

  marquees: {
    title: 'Messages Défilants',
    fields: [
      { 
        name: 'items', 
        label: 'Messages défilants', 
        type: 'marquee-items', 
        required: true, 
        help: 'Ajoutez vos messages un par un. Ils apparaîtront en défilement continu sur votre site.',
        placeholder: 'Nouveau projet en ligne...'
      }
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true,
    readonly: ['createdAt', 'updatedAt'],
    displayFields: ['items', 'createdAt', 'updatedAt']
  },

  mailing: {
    title: 'Mailing List',
    fields: [
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'name', label: 'Nom', type: 'text' },
      { name: 'subscribed_at', label: 'Date d\'inscription', type: 'datetime-local', readonly: true }
    ],
    readonly: true
  }
};

export default AdminAPIService;