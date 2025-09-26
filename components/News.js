import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";


// News data
const news = [
  {
    id: 1,
    date: "03/08/22",
    category: "DEV",
    title: "PERFORMANCE BOOST: VALORANT'S GLOBAL INVALIDATION",
    image: "/images/news/news1.jpg"
  },
  {
    id: 2,
    date: "03/05/22",
    category: "ANNOUNCEMENTS",
    title: "RIOT IS DONATING BATTLE PASS SALES TO HUMANITARIAN RELIEF IN EASTERN EUROPE",
    image: "/images/news/news2.jpg"
  },
  {
    id: 3,
    date: "03/03/22",
    category: "GAME UPDATES",
    title: "DEEP DIVE INTO 4.04 CONTROLLER AGENTS CHANGES",
    image: "/images/news/news3.jpg"
  }
];

// Section component
const Section = ({ children, className = "", blackVLine = false }) => {
  return (
    <section className={`relative ${className}`}>
      {blackVLine && (
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-black opacity-10"></div>
      )}
      {children}
    </section>
  );
};


const SectionHeadMotion = ({ children }) => {
  return (
    <motion.div
      initial={{ translateY: "100%" }}
      whileInView={{ translateY: 0 }}
      viewport={{ margin: "100px" }}
      transition={{ ease: "easeOut", duration: 0.65 }}
    >
      {children}
    </motion.div>
  );
};


const BackgroundText = () => {
  const { scrollYProgress } = useScroll();
  const translateText = useTransform(scrollYProgress, [0, 0.2], [-40, 40]);

  return (
    <div className="absolute right-0 left-0 h-full w-full overflow-hidden top-0 font-dinw05-bold">
      <motion.h2
        className="uppercase absolute whitespace-nowrap w-full duration-150 ease-out leading-[0.82] 
        text-[32.5vw] md:text-[26vw] lg:text-[22.65vw] font-dinw05-bold"
        style={{
          translateY: translateText,
          WebkitTextStroke: "1px #dbd8d2",
          WebkitTextFillColor: "transparent",
        }}
      >
        <span
          className="block 
    -ml-6 lg:-ml-5"
        >
          We are
        </span>
        <span
          className="block 
    ml-44 lg:ml-64"
        >
          VALORANT
        </span>
      </motion.h2>
    </div>
  );
};

// GoToNews component
const GoToNews = () => (
  <div
    className="group cursor-pointer flex items-center flex-row "
  >
    <p className="font-dinw05-bold uppercase text-red text-base mr-4 -tracking-wide font-bold" style={{ fontFamily: 'DinW05Bold, Arial Black, sans-serif' }}>
      <span className="hidden md:inline">{"GO TO"}</span> {"NEWS"} <span className="hidden md:inline">{"PAGE"}</span>
    </p>
    <span className="group-hover:translate-x-2.5 ease-out duration-300 w-6 h-6">
      {/* Animated Arrow */}
      <svg viewBox="0 0 25 15" className="w-full h-full">
        <path
          d="M16.2.5L19.9 4m4.6 3.5l-8.3 7"
          fill="none"
          stroke="#ff4655"
        ></path>
        <path
          fill="none"
          stroke="#ff4655"
          strokeMiterlimit={10}
          d="M16 7.5H0"
        ></path>
      </svg>
    </span>
  </div>
);

// Slider component
const Slider = () => {
  const BREAKPOINT = 25;
  const TRANSITION_CLASSES = ["ease-out", "duration-500"];

  const [disabled, setDisabled] = useState(false);
  const ref = useRef(null);
  const [sliderIndex, setSliderIndex] = useState(0);

  const animations = useRef(new Map());

  const handleMouseEnter = (id) => {
    gsap.killTweensOf(`#filter-${id}`);
    
    gsap.fromTo(`#filter-${id}`, 
      { scaleX: 0, opacity: 0.4 }, 
      { scaleX: 1, transformOrigin: 'left', duration: 0.2, ease: 'linear' }
    );
  }

  const handleMouseLeave = (id) => {
    gsap.killTweensOf(`#filter-${id}`);
    
    gsap.to(`#filter-${id}`, { 
      scaleX: 0, 
      duration: 0.2, 
      ease: "linear",
    });
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024 && !disabled) {
        setDisabled(true);
      } else if (window.innerWidth < 1024 && disabled) {
        setDisabled(false);
      }
    }

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize, false);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [disabled]);

  const elastic = {};
  const constrain = {};

  if (sliderIndex === 0) {
    constrain.right = 0;
    elastic.right = 0.5;
  }

  if (sliderIndex === news.length - 1) {
    constrain.left = 0;
    elastic.left = 0.5;
  }

  useEffect(() => {
    if (disabled) {
      ref.current?.classList.remove(...TRANSITION_CLASSES);
      setSliderIndex(0);
    }
  }, [disabled]);

  const handleDragEnd = (e, info) => {
    ref.current?.classList.add(...TRANSITION_CLASSES);

    if (Math.abs(info.offset.x) >= BREAKPOINT) {
      const direction = info.offset.x > 0 ? -1 : 1;
      const newIndex = Math.max(0, Math.min(news.length - 1, sliderIndex + direction));
      setSliderIndex(newIndex);
    }
  };


  return (
    <div className="relative">
      <motion.div
        ref={ref}
        drag={disabled ? false : "x"}
        dragSnapToOrigin
        dragMomentum={false}
        dragTransition={{ bounceDamping: 100, bounceStiffness: 1000 }}
        className={`flex w-full ${TRANSITION_CLASSES.join(" ")}`}
        style={{
          translateX: `-${sliderIndex * 100}%`,
        }}
        dragConstraints={constrain}
        dragElastic={elastic}
        onPointerDown={() => ref.current?.classList.remove(...TRANSITION_CLASSES)}
        onDragEnd={handleDragEnd}
      >
        {news.map((item) => (
          <div
            key={item.id}
            className="min-w-full lg:min-w-[33.33%] px-4"
            >
            <div className="overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={() => handleMouseLeave(item.id)}
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div 
                  id={`filter-${item.id}`} 
                  className="img-filter absolute inset-0 w-full h-full transform bg-[#ff4655] opacity-0 z-10 origin-left"
                  style={{ scaleX: 0, pointerEvents: 'none' }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="text-xs mr-4">{item.date}</span>
                  <span className="text-xs text-red uppercase font-bold">{item.category}</span>
                </div>
                <h3 className="font-tungsten-bold text-2xl uppercase leading-tight font-black drop-shadow-lg" style={{ fontFamily: 'TungstenBold, Impact, Arial Black, sans-serif' }}>
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Mobile pagination dots */}
      <div className="flex justify-center mt-4 lg:hidden">
        {news.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 mx-1 rounded-full ${i === sliderIndex ? "bg-red" : "bg-gray-400"
              }`}
            onClick={() => {
              ref.current?.classList.add(...TRANSITION_CLASSES);
              setSliderIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Main News component
const News = () => {
  return (
    <Section className="overflow-hidden" blackVLine>
      <BackgroundText />

      {/* Main Container */}
      <div
        className="relative mx-auto max-w-[76.875rem] 
        pt-[4.375rem] lg:pt-[8.75rem] 
        pb-[10vw] lg:pb-[6.25rem] 
        "
      >
        {/* Red Squares */}
        <div
          className="left-1/2 -translate-x-1/2 absolute w-14 
            top-8 lg:top-16 
            "
        >
          <span className="bg-red w-2 h-2 absolute"></span>
          <span className="bg-red w-2 h-2 absolute right-0"></span>
        </div>

        <div className="flex justify-between items-start">
          <h2
            className="z-20 overflow-hidden relative text-[#ff4655] font-tungsten-bold 
            translate-y-[24%] lg:translate-y-[20%] 
            leading-[0.95] 
            text-[3.44rem] md:text-[6.25rem] lg:text-[7.5rem] 
            py-1.5 lg:py-0 font-black -mr-8 lg:-mr-16"
            style={{ fontFamily: 'TungstenBold, Impact, Arial Black, sans-serif' }}
          >
            <SectionHeadMotion>LATEST NEWS</SectionHeadMotion>
          </h2>
          <div className="flex">
            <GoToNews />
          </div>
        </div>

        <Slider />
      </div>
    </Section>
  );
};

export default News;