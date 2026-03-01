import { ServicesGridClient } from "./services-section-client";
import { getWPData } from "@/lib/api";
export async function ServicesSection() {
  const {services } = await getWPData();
  return <ServicesGridClient services={services} />;
}
