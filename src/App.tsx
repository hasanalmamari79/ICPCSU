import { LazyMotion, MotionConfig, domMax } from 'framer-motion';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { NewsSlider } from './components/NewsSlider';
import { Splash } from './components/Splash';
import { ui } from './content/ui';
import { useLang } from './i18n/LangProvider';
import { About } from './sections/About';
import { Achievements } from './sections/Achievements';
import { Gallery } from './sections/Gallery';
import { VisionMission } from './sections/VisionMission';
import { DocumentaryProvider } from './components/Documentary';
import { Icpc } from './sections/Icpc';
import { Join } from './sections/Join';
import { Offer } from './sections/Offer';
import { Quiz } from './sections/Quiz';
import { Quotes } from './sections/Quotes';
import { Team } from './sections/Team';

export default function App() {
  const { t } = useLang();
  return (
    // reducedMotion="user": transforms are disabled for visitors who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domMax} strict>
        <a href="#main" className="sr-only z-[200] rounded-full bg-sun px-4 py-2 font-bold text-sun-ink focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
          {t(ui.skipToContent)}
        </a>
        <DocumentaryProvider>
        <Splash />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          <NewsSlider />
          <About />
          <VisionMission />
          <Offer />
          <Icpc />
          <Achievements />
          <Gallery />
          <Team />
          <Quotes />
          <Quiz />
          <Join />
        </main>
        <Footer />
        </DocumentaryProvider>
      </LazyMotion>
    </MotionConfig>
  );
}
