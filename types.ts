// Fix: Import React to resolve 'Cannot find namespace React' error
import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  details: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  badgeUrl: string;
  verifyUrl: string;
}

export interface Skill {
  category: string;
  items: string[];
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum Section {
  HERO = 'home',
  ABOUT = 'about',
  PROJECTS = 'projects',
  CERTIFICATIONS = 'certifications',
  CONTACT = 'contact'
}