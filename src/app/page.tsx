import HeroSection from '@/features/landing/hero/HeroSection';
import ProjectsSection from '@/features/landing/projects/ProjectsSection';
import TechStacksSection from '@/features/landing/techstacks/TechStacksSection';
import LandingPage from '@/features/landing/LandingPage';

export default function Home() {
  return (
    <LandingPage>
      <HeroSection />
      <ProjectsSection />
      <TechStacksSection />
    </LandingPage>
  );
}
