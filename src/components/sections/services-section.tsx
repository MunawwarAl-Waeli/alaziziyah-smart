import { ServicesGridClient } from "./services-section-client";
import { getAllServices } from "@/lib/api";
export async function ServicesSection() {
  const services = await getAllServices();
  return <ServicesGridClient services={services}  />;
}
