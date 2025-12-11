import HeroSection from '@/features/landing/hero/HeroSection';
import BasicInfoSection from '@/features/landing/basic-info/BasicInfoSection';
import ProjectsSection from '@/features/landing/projects/ProjectsSection';
import Footer from '@/components/Footer';
import LandingPage from '@/features/landing/LandingPage';
import fetchFollowers from '@/utils/fetch-followers';
import LandingNavigation from '@/features/landing/LandingNavigation';

export default function Home() {
  return (
    <>
      <LandingNavigation followersPromise={fetchFollowers()} />
      <LandingPage>
        <HeroSection />
        <BasicInfoSection />
        <ProjectsSection />
        <Footer />
      </LandingPage>
    </>
  );
}
