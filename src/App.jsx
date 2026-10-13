import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandValues from './components/BrandValues'
import ProductSection from './components/ProductSection'
import GheeOffers from './components/GheeOffers'
import WhyChooseUs from './components/WhyChooseUs'
import AboutSection from './components/AboutSection'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="overflow-x-clip">
      {/* <AnnouncementBar /> */}
      <Navbar />
      <main>
        <Hero />
        <BrandValues />
        <ProductSection />
        <GheeOffers />
        <AboutSection />
        <WhyChooseUs />
        
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
