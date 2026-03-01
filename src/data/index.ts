import { acceleratedValues } from 'framer-motion';
import { fenceServices } from './services/fences';
import { pergolaServices } from './services/pergolas';
import { roofingServices } from './services/roofing';
import { traditionalServices } from './services/traditional';
import { umbrellaServices } from './services/umbrellas';
import { warehouseServices } from './services/warehouses';
import { accessoryServices } from './services/accessories';

// data/index.ts
export * from './types';

// الفئات
export { categories } from './categories';

// الخدمات
export { umbrellaServices } from './services/umbrellas';
export { fenceServices } from './services/fences';
export { pergolaServices } from './services/pergolas';
export { warehouseServices } from './services/warehouses';
export { roofingServices } from './services/roofing';
export { traditionalServices } from './services/traditional';
export { accessoryServices } from './services/accessories';

// تجميع كل الخدمات
export const allServices = [
  ...umbrellaServices,
  ...fenceServices,
  ...pergolaServices,
  ...warehouseServices,
  ...roofingServices,
  ...traditionalServices,
  ...accessoryServices
];

// ===== دوال مساعدة متقدمة =====

/**
 * الحصول على خدمات حسب الفئة
 */
export const getServicesByCategory = (categoryId: number) => {
  return allServices.filter(service => service.categoryId === categoryId);
};

/**
 * الحصول على خدمة حسب المعرف
 */
export const getServiceById = (id: number) => {
  return allServices.find(service => service.id === id);
};

/**
 * الحصول على الخدمات الأكثر طلباً
 */
export const getPopularServices = (limit: number = 8) => {
  return allServices
    .filter(service => service.popular)
    .slice(0, limit);
};

/**
 * الحصول على أحدث الخدمات
 */
export const getNewServices = (limit: number = 8) => {
  return allServices
    .filter(service => service.new)
    .slice(0, limit);
};

/**
 * البحث في الخدمات
 */
export const searchServices = (query: string) => {
  const lowercaseQuery = query.toLowerCase().trim();
  if (!lowercaseQuery) return [];
  
  return allServices.filter(service => 
    service.title.toLowerCase().includes(lowercaseQuery) ||
    service.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    service.keywords?.some(keyword => keyword.includes(lowercaseQuery))
  );
};

/**
 * الحصول على خدمات مقترحة (مرتبطة بنفس الفئة)
 */
export const getRelatedServices = (serviceId: number, limit: number = 4) => {
  const service = getServiceById(serviceId);
  if (!service) return [];
  
  return allServices
    .filter(s => s.categoryId === service.categoryId && s.id !== serviceId)
    .slice(0, limit);
};

/**
 * الحصول على إحصائيات سريعة
 */
export const getServicesStats = () => {
  const totalProjects = allServices.reduce((sum, service) => sum + service.stats.projects, 0);
  const totalServices = allServices.length;
  const totalCategories = 7;
  
  return {
    totalProjects,
    totalServices,
    totalCategories,
    popularCount: allServices.filter(s => s.popular).length,
    newCount: allServices.filter(s => s.new).length
  };
};

/**
 * الحصول على إحصائيات حسب الفئة
 */
export const getCategoryStats = (categoryId: number) => {
  const categoryServices = getServicesByCategory(categoryId);
  const totalProjects = categoryServices.reduce((sum, service) => sum + service.stats.projects, 0);
  
  return {
    serviceCount: categoryServices.length,
    totalProjects,
    popularCount: categoryServices.filter(s => s.popular).length
  };
};