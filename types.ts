
import type { ReactNode } from 'react';

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
  id:string;
  sender: 'user' | 'ai';
  text: string;
}

export interface CommitteeResource {
  title: string;
  url: string;
  description: string;
}

export interface CommitteeMember {
  name: string;
  rollNumber: string;
  role: string;
}

export interface CommitteeDetail {
  id: string;
  name: string;
  iconUrl: string;
  category: string;
  tagline: string;
  topic: string;
  about: string;
  agendaPoints: string[];
  resources: CommitteeResource[];
  members: CommitteeMember[];
}