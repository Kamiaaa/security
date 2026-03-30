import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import ForHome from "./components/ForHome";
import Services from "./components/Services";

export default function Home() {
  return (
    <>
      <Carousel />
      <Services />
      <ForHome />
      <Banner />
    </>
  );
}
