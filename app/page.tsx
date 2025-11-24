import HeroSection from '@/features/hero/HeroSection';
import ProjectsSection from '@/features/projects/ProjectsSection';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  return (
    <LandingPage>
      <HeroSection />
      <ProjectsSection />
    </LandingPage>
  );
}
