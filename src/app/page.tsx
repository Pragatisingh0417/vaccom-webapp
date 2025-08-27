import Carousel from './components/Carousel';
import Herosection from "./components/HeroSection";
import FeaturedCategory from './components/FeaturedCategory';
import Introduction from './components/Introduction';
import HomeProductsSection from './components/HomeProductsSection'
import BackgroundImage from './components/BackgroundImage';
import InfoGridWithImage from './components/InfoGridWithImage';
import TopCleaningBrands from './components/TopCleaningBrands';


export default function HomePage() {
  return (
    <>
    <Carousel />
      <Herosection />
      <FeaturedCategory />
      <Introduction />
      <HomeProductsSection />
      <BackgroundImage />
      <InfoGridWithImage />
      <TopCleaningBrands />
      
    </>
  );
}
