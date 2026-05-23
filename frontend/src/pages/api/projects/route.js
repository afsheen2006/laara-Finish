import { NextResponse } from "next/server";

const STATIC_PROJECTS = [
{
  id: 1,
  title: "Mobile",
  description: "Improves your Google Business Profile to attract local customers.",
  category: "Google Maps Optimization",
  image: "/projects/google_maps.png",
  gradient: "from-primary/40 to-cyan-600/40",
  featured: true
},
{
  id: 2,
  title: "LearnHub Platform",
  description: "Enterprise LMS with AI-powered course recommendations",
  category: "Mobile",
  image: "/projects/learnhub.png",
  gradient: "from-violet-600/40 to-primary/40",
  featured: false
},
{
  id: 3,
  title: "TechMart Store",
  description: "High-performance e-commerce platform with 99.9% uptime",
  category: "E-Commerce",
  image: "/projects/techmart.png",
  gradient: "from-emerald-600/40 to-teal-600/40",
  featured: false
},
{
  id: 4,
  title: "Customer Releationship Management",
  description: "Centralizes customer data to improve relationships and boost sales.",
  category: "SaaS",
  image: "/projects/crm.png",
  gradient: "from-orange-600/40 to-red-600/40",
  featured: false
},
{
  id: 5,
  title: "Website Development",
  description: "A 24/7 digital storefront driving customer engagement and revenue growth.",
  category: "Web Apps",
  image: "/projects/webdev.png",
  gradient: "from-primary/40 to-indigo-600/40",
  featured: true
},
{
  id: 6,
  title: "Human Resource Management System",
  description: "Software that centralizes employee data and automates HR tasks",
  category: "SaaS",
  image: "/projects/hrms.png",
  gradient: "from-green-600/40 to-emerald-600/40",
  featured: false
}];


export async function GET() {
  return NextResponse.json(STATIC_PROJECTS);
}