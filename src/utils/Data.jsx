import { Droplet, Sprout, SunMedium } from "lucide-react";
import { BookOpen, Heart, Settings } from 'lucide-react';

export const tipCards = [
  {
    icon: <Droplet className="w-12 h-12 text-[#4CA771]" />,
    title: "Proper Watering",
    description:
      "Master the art of hydration. Learn to read your plants' thirst signals and prevent over or under-watering.",
    image: "https://tools-api.webcrumbs.org/image-placeholder/300/200/nature/1",
  },
  {
    icon: <SunMedium className="w-12 h-12 text-[#4CA771]" />,
    title: "Sunlight Mastery",
    description:
      "Unlock the secrets of light placement. Discover how to create the perfect illuminate environment for each plant.",
    image: "https://tools-api.webcrumbs.org/image-placeholder/300/200/nature/2",
  },
  {
    icon: <Sprout className="w-12 h-12 text-[#4CA771]" />,
    title: "Soil & Nutrients",
    description:
      "Dive deep into the world of plant nutrition. Learn how to create the most nurturing environment for growth.",
    image: "https://tools-api.webcrumbs.org/image-placeholder/300/200/nature/3",
  },
];

export const featureCards = [
  {
    icon: <BookOpen className="w-16 h-16 text-[#EAF9E7]" />,
    title: "Document Journey",
    description:
      "Create personalized digital diaries tracking every milestone of your plants' lives.",
    image: "/hero1.jpeg",
  },
  {
    icon: <Heart className="w-16 h-16 text-[#EAF9E7]" />,
    title: "Share Stories",
    description:
      "Connect with a community of plant lovers, sharing your green adventures and inspirations.",
    image: "image2.jpeg",
  },
  {
    icon: <Settings className="w-16 h-16 text-[#EAF9E7]" />,
    title: "Learn & Grow",
    description:
      "Access a comprehensive knowledge base with expert tips, care guides, and plant health insights.",
    image: "image3.jpeg"
  },
];
