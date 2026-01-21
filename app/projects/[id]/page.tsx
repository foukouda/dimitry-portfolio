import { use } from 'react';
import ProjectDetailClient from './ProjectDetailClient';

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return <ProjectDetailClient id={id} />;
}
