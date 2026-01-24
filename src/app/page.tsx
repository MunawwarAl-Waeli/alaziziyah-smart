import { Hero } from "@/components/features/home/hero";
import { Features } from "@/components/features/home/features";
import { ArchitecturalSeparator } from "@/components/ui/separator";
import { ProductsGrid } from "@/components/features/home/products-grid";
import { ProjectsShowcase } from "@/components/features/prodects/projects";
import { CustomerSuccess } from "@/components/features/Customer/CustomerSuccess";
import { OurServices } from "@/components/features/Servecs/OurServices";
import { Testimonials } from "@/components/features/home/testimonials";
import { CTASection } from "@/components/features/home/cta-section";


export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {/* 1. القسم الرئيسي */}
      <Hero />
      {/* 2. Features */}
      {/* أضفنا padding-bottom ليعطي مساحة للموجة */}
      <Features />

      {/* 3. Products Grid (يحتوي الآن على الموجة في أعلاه) */}

      <ProductsGrid />
      {/* <ProjectsShowcase /> */}
      {/* <CustomerSuccess />
      <OurServices /> */}
<Testimonials />
<CTASection />
      {/* مساحة للتجربة */}
      <div className="h-40" />
    </div>
  );
}
