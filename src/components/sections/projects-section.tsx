import React from "react";
import { getAllProjects } from "@/lib/api"; // تأكد من مسار الاستيراد
import ProjectsGridClient from "./projects-grid-client"; // مسار مكون العميل

export async function ProjectsSection() {
  // جلب البيانات من الووردبريس
  const projects = await getAllProjects();

  // إذا لم تكن هناك مشاريع، لا نعرض القسم
  if (!projects || projects.length === 0) {
    return null;
  }

  return <ProjectsGridClient projects={projects} />;
}
