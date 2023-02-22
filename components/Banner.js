import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  //bg-gradient-to-t from-gray-100 to-transparent
  return (
    <div
      className="relative banner "
      style={{ height: "15rem", width: "100%" }}
    >
      <div className="absolute w-full h-22  bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        interval={3000}
      >
        <div>
          <Image
            src="/image/ban-1.png"
            alt="lamb"
            layout="responsive"
            width={600}
            height={600}
            quality={99}
          />
        </div>
        <div>
          <Image
            src="/image/ban-2.jpg"
            alt="meat"
            layout="responsive"
            width={600}
            height={600}
            quality={99}
          />
        </div>
        <div>
          <Image
            src="/image/ban-3.avif"
            alt="lamb"
            layout="responsive"
            width={600}
            height={600}
            quality={99}
          />
        </div>

        <div>
          <Image
            src="/image/ban-4.jpg"
            alt="lamb"
            layout="responsive"
            width={600}
            height={600}
            quality={99}
          />
        </div>
        <div>
          <Image
            src="/image/ban-5.jpg"
            alt="lamb"
            layout="responsive"
            width={600}
            height={600}
            quality={99}
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
