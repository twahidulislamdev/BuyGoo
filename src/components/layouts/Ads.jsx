import React from "react";
import Flex from "../Flex";
import Container from "../Container";
import Image from "../Image";
import ZFold from "../../assets/zfold.webp";
import XiaomiTv from "../../assets/xiaomitv.webp";
const Ads = () => {
  return (
    <div className="py-8 md:py-12 px-3 lg:px-0">
      <Container>
        <Flex className="flex-col lg:flex-row justify-between gap-5">
          <div className="w-full lg:w-[49%] h-[200px] md:h-[300px]">
            <Image
              imgSrc={ZFold}
              imgAlt="Samsung Z Fold Ad"
              imgClassName="w-full h-full object-fill rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </div>
          <div className="w-full lg:w-[49%] h-[200px] md:h-[300px]">
            <Image
              imgSrc={XiaomiTv}
              imgAlt="Xiaomi TV Ad"
              imgClassName="w-full h-full object-fill rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </div>
        </Flex>
      </Container>
    </div>
  );
};

export default Ads;
