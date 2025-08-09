
import React, { ReactNode } from 'react';

export interface WhyJoinPoint {
  name: string;
  tagline: string;
  icon: React.FC<{ className?: string }>;
}

export interface TeamMember {
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
}

export interface FaqItem {
  question: string;
  answer: string | ReactNode;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  type?: 'message' | 'error';
}