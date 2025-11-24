import HeroSection from '@/features/landing/hero/HeroSection';
import ProjectsSection from '@/features/landing/projects/ProjectsSection';
import LandingPage from '@/features/landing/LandingPage';

export default function Home() {
  return (
    <LandingPage>
      <HeroSection />
      <ProjectsSection />
    </LandingPage>
  );
}
