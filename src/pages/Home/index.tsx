import './style.css';

import { ChatWidget } from '../../components/ChatWidget';
import { HeroSection } from '../../components/HeroSection';
import { VirtualSelfSection } from '../../components/VirtualSelfSection';

export function Home() {
  return (
    <div className="HomePage">
      <div className="HomePageStack">
        <HeroSection />
        <ChatWidget />
        <VirtualSelfSection />
      </div>
    </div>
  );
}

