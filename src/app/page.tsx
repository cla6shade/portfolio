import HeroSection from '@/features/landing/hero/HeroSection';
import BasicInfoSection from '@/features/landing/basic-info/BasicInfoSection';
import ProjectsSection from '@/features/landing/projects/ProjectsSection';
import Footer from '@/components/Footer';
import LandingPage from '@/features/landing/LandingPage';
import Navigation from '@/components/navigation/Navigation';
import fetchFollowers from '@/utils/fetch-followers';

export default function Home() {
  return (
    <>
      <Navigation followersPromise={fetchFollowers()} />
      <LandingPage>
        <HeroSection />
        <BasicInfoSection />
        <ProjectsSection />
        <Footer />
      </LandingPage>
    </>
  );
}
