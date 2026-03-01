// data/constants/icons.ts
import {
  Car,
  Trees,
  Warehouse,
  Home,
  Shield,
  Wind,
  Sun,
  Droplets,
  Flame,
  Bird,
  Castle,
  Tent,
  Sparkles,
  Mountain,
  TreePine,
  Umbrella,
  Fence,
  Flower2,
  Leaf,
  Building2,
  Waves,
  Thermometer,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  // مظلات
  car: Car,
  garden: Trees,
  wood: TreePine,
  metal: Mountain,
  cloud: Wind,
  classic: Castle,
  circle: Sun,
  entrance: Home,
  umbrella: Umbrella,
  
  // سواتر
  fence: Fence,
  fenceWood: TreePine,
  fenceMetal: Mountain,
  fenceFabric: Bird,
  
  // برجولات
  pergolaWood: TreePine,
  pergolaMetal: Mountain,
  pergolaLeather: Sparkles,
  
  // هناجر
  warehouse: Warehouse,
  warehouseCar: Car,
  warehouseSteel: Building2,
  
  // قرميد
  roof: Home,
  roofSpanish: Castle,
  roofPlastic: Wind,
  
  // تراثي
  tent: Tent,
  fireplace: Flame,
  traditional: Castle,
  
  // إضافات
  fountain: Droplets,
  waterfall: Waves,
  greenhouse: Trees,
  stone: Mountain,
  insulator: Thermometer,
  flower: Flower2,
  leaf: Leaf,
};

// أيقونات الفئات الرئيسية
export const categoryIcons: Record<number, LucideIcon> = {
  1: Sun,      // المظلات
  2: Shield,   // السواتر
  3: TreePine, // البرجولات
  4: Warehouse, // الهناجر
  5: Home,     // القرميد
  6: Tent,     // تراثي
  7: Sparkles, // إضافات
};