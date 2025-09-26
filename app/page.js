'use client'

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import ScrollSmoother from "gsap/ScrollSmoother";
import { useEffect, useRef, useState } from "react";
import News from "@/components/News";

gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollSmoother);

export default function Home() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const logoRef = useRef(null);
  const splashScreenRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartPosition, setScrollStartPosition] = useState(0);

  const smoothWrapper = useRef(null);
  const smoothContent = useRef(null);
  const smoother = useRef(null);

  useEffect(() => {
    if (videoLoaded && logoLoaded) {
      setTimeout(() => {
        gsap.to(splashScreenRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            setShowSplash(false);
            initializeAnimations();
          }
        })
      }, 500);
    }
  }, [videoLoaded, logoLoaded]);

  useEffect(() => {
    smoother.current = ScrollSmoother.create({
      wrapper: smoothWrapper.current,
      content: smoothContent.current,
      smooth: 1.2,
      effects: true
    });

    return () => {
      if (smoother.current) {
        smoother.current.kill();
      }
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoRef.current.play().catch(e => console.log('vid err'));
        }
        else {
          videoRef.current.pause();
        }
      })
    }, options);

    observer.observe(videoRef.current);

    return () => {
      observer.unobserve(videoRef.current);
      observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const pct = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setProgress(pct);
    }

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const initializeAnimations = () => {
    // Animate header on load
    gsap.fromTo("header",
      { y: -100, opacity: 0, color: '#111111' },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", color: '#ff4655' }
    );

    // Stagger navigation items
    gsap.fromTo("header div div",
      { y: -20, opacity: 0.5, filter: 'blur(1px)' },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, filter: 'none', ease: "power2.out" }
    );

    const revealTimeline = gsap.timeline({
      delay: 1,
    });

    revealTimeline
      // 1. Animate the VALORANT Logo in
      .fromTo(".valorant-logo",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power1.out" }
      )
      // 2. Animate the TRACKER text in
      .set(".tracker-curtain", { opacity: 1 })
      .fromTo(".tracker-curtain", {
        scaleX: "0%",
        transformOrigin: "left center",
      }, {
        scaleX: "100%",
        duration: 0.6,
        ease: "power3.inOut"
      }, '<')
      .set(".tracker", { opacity: 1 })
      .to(".tracker-curtain", {
        scaleX: "0%",
        transformOrigin: "right center",
        duration: 0.6,
        ease: "power3.inOut"
      })
      // 3. Reveal CTA button border with blink
      .fromTo(".cta-button",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.05,
          ease: "none",
          repeat: 3,
          yoyo: true,
          onComplete: () => {
            gsap.to(".cta-button", { opacity: 1, duration: 0.1 });
          }
        },
        '<'
      )
      // 4. Reveal CTA button background with blink
      .fromTo(".cta-button-bg",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.05,
          ease: "none",
          repeat: 3,
          yoyo: true,
          onComplete: () => {
            gsap.to(".cta-button-bg", { opacity: 1, duration: 0.1 });
          }
        },
        '<'
      );
    // increase opacity of header on scroll
    gsap.to("header", {
      backgroundColor: "#111111",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "300px top",
        scrub: true
      }
    })

    // parallax on hero scroll
    gsap.to(".hero-image-container", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  useEffect(() => {
    // Apply shadow + "press in" animation
    gsap.fromTo(
      ".logo-part",
      { filter: "drop-shadow(0px 0px 0px #ff4655)" },
      {
        filter: "drop-shadow(0px 1px 4px #ff4655)",
        duration: 8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      }
    );
  }, []);



  useEffect(() => {
    const videoElement = videoRef.current;
    const logoElement = logoRef.current;

    if (videoElement) {
      const handleVideoLoad = () => {
        console.log('video loaded');
        setVideoLoaded(true);
      }

      if (videoElement.readyState >= 3) {
        handleVideoLoad();
      } else {
        videoElement.addEventListener("loadeddata", handleVideoLoad);
      }
      return () => videoElement.removeEventListener("loadeddata", handleVideoLoad);
    }
  }, []);


  useEffect(() => {
    const logoElement = logoRef.current;

    if (logoElement) {
      const handleLogoLoad = () => {
        console.log('logo loaded');
        setLogoLoaded(true);
      }

      logoElement.onload = handleLogoLoad;


      if (logoElement.complete) {
        setLogoLoaded(true);
      }

      return () => {
        logoElement.onload = null;
      };
    }
  }, []);

  useEffect(() => {
    // Fallback timeout to ensure splash screen doesn't get stuck
    const fallbackTimer = setTimeout(() => {
      if (!videoLoaded || !logoLoaded) {
        console.log('Fallback: forcing splash screen to end');
        setVideoLoaded(true);
        setLogoLoaded(true);
      }
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, [videoLoaded, logoLoaded]);



  return (
    <>
      {showSplash && (
        <div
          ref={splashScreenRef}
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#000000] z-[10000] overflow-hidden"
        >
          <div className="h-3/4 w-3/4 p-4 mb-8 relative flex items-center justify-center">
            <svg
              width="700px"
              height="700px"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlSpace="preserve"
            >
              <defs>
                <filter id="redShadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#ff4655" floodOpacity="0.8" />
                </filter>
              </defs>

              <path d="M6,2h20c2.2,0,4,1.8,4,4v20c0,2.2-1.8,4-4,4H6c-2.2,0-4-1.8-4-4V6C2,3.8,3.8,2,6,2z" />

              <g>
                <path
                  className="logo-part"
                  d="M19.1,24.4H19c-2,0-4,0-6,0c-0.2,0-0.4-0.1-0.5-0.3c-2.1-2.6-4.2-5.3-6.3-7.9C6.1,16.1,6,16,6,15.8
             c0-2.6,0-5.1,0-7.7C6,8.1,6,8.1,6.1,8h0.1c4.3,5.4,8.6,10.8,13,16.2c0,0,0,0.1,0,0.1L19.1,24.4L19.1,24.4z"
                  fill="#fff"
                />

                <path
                  className="logo-part"
                  d="M25.8,16.3c-0.6,0.8-1.2,1.5-1.8,2.3c-0.1,0.2-0.3,0.3-0.5,0.3c-2,0-4,0-6,0c0,0-0.1,0-0.1,0
             c-0.1,0-0.2-0.1-0.1-0.2c0,0,0-0.1,0.1-0.1c2-2.5,4-5,5.9-7.4c0.8-1,1.6-2,2.5-3.1c0,0,0.1-0.1,0.1-0.1c0,0,0.1,0,0.1,0
             c0,0.1,0,0.1,0,0.2c0,2.5,0,5.1,0,7.6C26,16,25.9,16.2,25.8,16.3L25.8,16.3z"
                  fill="#fff"
                />
              </g>
            </svg>
          </div>
          <div className="loading-bar w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ff4655] transition-all duration-300"
              style={{ width: `${(videoLoaded && logoLoaded) ? 100 : logoLoaded || videoLoaded ? 50 : 0}%` }}
            ></div>
          </div>
          <p className="mt-4 text-[#ece8e1] font-mark-pro-bold text-sm">
            {videoLoaded && logoLoaded ? "Ready" : "Loading..."}
          </p>
        </div>
      )}
      <div ref={smoothWrapper} className="smooth-wrapper">
        <header className="fixed tracking-tighter w-full top-0 flex font-extrabold font-stretch-50% leading-0 items-center justify-between px-4 sm:px-8 py-4 mx-auto h-20 z-[9999] cursor-default">
          <span className="flex-1 flex">
            <span className="p-1 text-transparent bg-clip-text bg-linear-[135deg] from-67% to-10% from-[#ff4655] to-[#ece8e1] text-3xl sm:text-5xl">VT</span>
          </span>
          <button className="sm:hidden text-[#ece8e1] p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden sm:flex flex-row gap-8 items-center">
            <div className="text-[#ece8e1] text-lg hover:text-[#ff4655] transform duration-300 hover:scale-105 transition-colors">Home</div>
            <div className="text-[#ece8e1] text-lg hover:text-[#ff4655] transform duration-300 hover:scale-105 transition-colors">Leaderboards</div>
            <div className="text-[#ece8e1] text-lg hover:text-[#ff4655] transform duration-300 hover:scale-105 transition-colors">Lineups</div>
            <div className="text-[#ece8e1] text-lg hover:text-[#ff4655] transform duration-300 hover:scale-105 transition-colors">Premier</div>
          </div>
        </header>
        <div ref={smoothContent} className="smooth-content">
          <div className="flex flex-col relative bg-[#ece8e1] min-h-screen overflow-x-hidden z-0">

            {/* Hero Section - Refactored */}
            <section className="flex flex-col h-screen bg-[#0f1923] relative hero-section">
              <div className="h-full w-full relative hero-image-container">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="true"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/hero.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f1923] z-2"></div>
              </div>

              {/* Hero Content */}
              <div className="flex flex-col items-center justify-center absolute inset-0 z-10 p-4">
                <div className="flex flex-col items-center w-full max-w-xs sm:max-w-2xl">
                  <div className="valorant-logo opacity-0">
                    <Image
                      src="/V_Logotype_White_1.png"
                      alt="VALORANT Logo"
                      width={600}
                      height={120}
                      className="object-contain"
                      priority={true}
                      ref={logoRef}
                    />
                  </div>

                  <div className="relative select-none text-transparent bg-clip-text bg-linear-130 from-75% to-[#ff4655] to-25% from-[#ece8e1] font-mark-pro-bold text-5xl sm:text-8xl transition-all">
                    <div className="tracker opacity-0">TRACKER</div>
                    <div className="tracker-curtain absolute opacity-0 left-0 -top-1 w-full transform h-full bg-[#ff4655]" />
                  </div>

                  {/* CTA */}
                  <div
                    onClick={() => console.log("a")}
                    className="cta-button opacity-0 z-9 mt-16 min-w-40 min-h-10 sm:min-w-50 sm:min-h-15 flex items-center justify-center cursor-pointer
                text-white border-1 px-1 font-extrabold font-stretch-200%"
                  >
                    <div className="cta-button-bg opacity-0 flex justify-center items-center transition-colors bg-[#ff4655] hover:bg-[#ece8e1] hover:text-[#111111] text-[#ece8e1] w-full h-8 sm:h-13">
                      <span className="text-xl font-mark-pro-bold">Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* News Section */}
            <News />

            <section className="flex relative flex-col min-h-screen items-start bg-[#0f1923] p-8"></section>
            <section className="flex relative flex-col min-h-screen items-start bg-[#ece8e1] p-8"></section>

            <footer className="bg-black py-8 border-t border-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black"></div>
              <div className="container max-w-6xl mx-auto px-6 relative z-10">
                <div className="flex justify-center space-x-6 mb-8">
                  {[
                    { path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                    { path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                    { path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                    { path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                    { path: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" }
                  ].map((icon, index) => (
                    <a key={index} href="#" className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#ff4655] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#ff4655]/50">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d={icon.path} />
                      </svg>
                    </a>
                  ))}
                </div>

                <div className="flex justify-center mb-4">
                  <div className="text-gray-400 text-sm font-bold tracking-wider flex items-center">
                    <div className="flex items-baseline justify-center py-3 px-4 select-none">
                      <span className="fill-[#737373] w-[120px] h-10 hover:fill-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 587.93 165"
                          className="w-full h-full cursor-pointer"
                        >
                          <path d="M98.77.33L0 46.07l24.61 93.66 18.73-2.3-5.15-58.89 6.15-2.74L54.96 136l32.01-3.93-5.69-65 6.09-2.71 11.68 66.23 32.38-3.98-6.23-71.25 6.16-2.74 12.77 72.43 32.01-3.93V19.71L98.77.33zm2.32 142.05l1.63 9.22 73.42 12.24v-30.68l-75.01 9.22h-.04zm144.49-19.22v12.63h15.57a14.84 14.84 0 01-1.92 7.31 13 13 0 01-5.6 5.11 20 20 0 01-8.9 1.8 17.53 17.53 0 01-10-2.8 17.87 17.87 0 01-6.44-8.14 33.06 33.06 0 01-2.27-12.93 31.81 31.81 0 012.32-12.81 18.14 18.14 0 016.5-8 17.27 17.27 0 019.82-2.78 19.31 19.31 0 015.36.71 14.15 14.15 0 014.33 2.09 12.92 12.92 0 013.18 3.29 15.61 15.61 0 012 4.44h17.27a27.22 27.22 0 00-3.46-10.28 28.84 28.84 0 00-7.05-8.1 32.6 32.6 0 00-9.91-5.29 37.91 37.91 0 00-12.06-1.86 37.32 37.32 0 00-14 2.6 32.6 32.6 0 00-11.36 7.61 35 35 0 00-7.61 12.21 46.15 46.15 0 00-2.73 16.44q0 11.94 4.54 20.59a32.4 32.4 0 0012.69 13.27 39.84 39.84 0 0035.84.84 28.39 28.39 0 0011.67-11q4.25-7.19 4.24-17.2v-9.76zm215.03 40.81V88.53h51.67v13.96h-34.62v16.76h27.99v13.96h-27.99v16.8h34.7v13.96h-51.75zm101.83-53.3a9 9 0 00-3.54-6.64c-2.09-1.59-5-2.38-8.69-2.38a16.63 16.63 0 00-6.26 1 8.62 8.62 0 00-3.83 2.78 6.74 6.74 0 00-1.33 4 6.2 6.2 0 00.79 3.29 7.27 7.27 0 002.4 2.45 16.54 16.54 0 003.7 1.79 40.14 40.14 0 004.64 1.31l6.63 1.54a47.19 47.19 0 019.45 3.08 27.46 27.46 0 017.2 4.68 18.84 18.84 0 014.58 6.39 20.37 20.37 0 011.61 8.29 20.65 20.65 0 01-3.54 12.11 22.56 22.56 0 01-10.15 7.85 41.31 41.31 0 01-15.93 2.76 42.69 42.69 0 01-16.17-2.81 23.22 23.22 0 01-10.72-8.48q-3.83-5.66-4-14.12h16.43a10.68 10.68 0 007.05 9.94 19.37 19.37 0 007.24 1.26 18.44 18.44 0 006.66-1.09 10 10 0 004.33-3 7.22 7.22 0 001.57-4.48 6.16 6.16 0 00-1.42-4 10.86 10.86 0 00-4.14-2.81 42.07 42.07 0 00-6.89-2.14l-8.07-1.95q-9.65-2.3-15.23-7.26t-5.54-13.44a19.86 19.86 0 013.72-12.12 24.74 24.74 0 0110.33-8.11 36.74 36.74 0 0115-2.91 35.62 35.62 0 0114.92 2.91 23.43 23.43 0 019.91 8.14 21.54 21.54 0 013.6 12.12zm-113.99 53.3h-16.87v-57.35l-1.73-.02-17.04 57.37h-16.86l-16.58-57.37-2.15.02v57.35h-16.87V88.53h28.67l14.48 50.56h1.75l14.48-50.56h28.72v75.44zm-114.66 0h18.27l-25.33-75.43h-23.15l-25.37 75.43h18.3l4.93-16.54h27.42zm-28.43-29.7l8.22-27.65h3.1l8.26 27.65zm278.58-37.76a4 4 0 01-3.67-2.44 4 4 0 010-3.1 4 4 0 01.85-1.27 4.25 4.25 0 011.27-.86 4.15 4.15 0 013.1 0 4.13 4.13 0 011.27.86 4.08 4.08 0 01.86 1.27 4 4 0 010 3.1 4.08 4.08 0 01-.86 1.27 4 4 0 01-1.27.86 4 4 0 01-1.55.31zm0-1.09a2.84 2.84 0 001.47-.39 2.94 2.94 0 001.05-1 2.93 2.93 0 000-2.92 3 3 0 00-1.06-1 2.93 2.93 0 00-2.92 0 3 3 0 00-1 1 2.86 2.86 0 000 2.92 3 3 0 001 1 2.83 2.83 0 001.46.39zm-1.46-1.15V90.6h1.78a1.52 1.52 0 01.69.15 1.13 1.13 0 01.47.42 1.24 1.24 0 01.17.66 1.16 1.16 0 01-.18.66 1 1 0 01-.48.41 1.56 1.56 0 01-.7.14h-1.2v-.72h1a.52.52 0 00.36-.12.5.5 0 00.14-.37.47.47 0 00-.14-.37.52.52 0 00-.36-.12h-.55v2.93zm2.39-1.68l.82 1.68h-1.11l-.75-1.68zM282.41 1.03h17.05v75.44h-17.05zm98.02 37.72q0 12.42-4.71 21a32.67 32.67 0 01-12.79 13.17 38.57 38.57 0 01-36.31 0 32.75 32.75 0 01-12.79-13.2q-4.71-8.66-4.71-21t4.71-21.05a32.67 32.67 0 0112.75-13.14 38.65 38.65 0 0136.31 0 32.67 32.67 0 0112.79 13.17q4.71 8.64 4.71 21.05m-17.35 0a33.35 33.35 0 00-2.23-13 17.47 17.47 0 00-6.33-8 18.57 18.57 0 00-19.45 0 17.57 17.57 0 00-6.35 8 38.59 38.59 0 000 26 17.49 17.49 0 006.35 8 18.57 18.57 0 0019.45 0 17.39 17.39 0 006.33-8 33.4 33.4 0 002.23-13M246.58 50.17l8.76 26.3h18.71l-9.74-28.33h-13.23l-.79-2.44c2.52-.49 6.83-1.25 10.65-3.85a20 20 0 008.75-16.39 24.15 24.15 0 00-3.26-12.75 21.9 21.9 0 00-9.36-8.64 32.56 32.56 0 00-14.64-3H212v75.4h17.06v-26.3zm-.32-15.61a19.35 19.35 0 01-7.26 1.18h-9.94V14.88h9.91a18.68 18.68 0 017.25 1.24 9.12 9.12 0 014.4 3.7 10 10 0 011.5 5.64 9.65 9.65 0 01-1.48 5.55 8.86 8.86 0 01-4.38 3.55M382.04 1.03v14h29.3l.8 2.45c-2.48.48-6.67 1.22-10.43 3.7v55.31h16.87v-61.5h19.62v-14z"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <p className="text-gray-500 text-sm max-w-3xl mx-auto leading-relaxed">
                    © 2025 RIOT GAMES, INC. RIOT GAMES, VALORANT, AND ANY ASSOCIATED LOGOS ARE TRADEMARKS, SERVICE MARKS, AND/OR REGISTERED TRADEMARKS OF RIOT GAMES, INC.
                  </p>
                </div>

                <div className="flex justify-center space-x-8 mb-12">
                  {["PRIVACY NOTICE", "TERMS OF SERVICE", "COOKIE PREFERENCES"].map((link, index) => (
                    <a key={index} href="#" className="text-white text-sm font-semibold hover:text-[#ff4655] transition-all duration-300 hover:scale-105">
                      {link}
                    </a>
                  ))}
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center bg-gray-800 p-4 rounded-xl text-white font-sans max-w-xs shadow-2xl border border-gray-700">
                    <div className="mr-4">
                      <img src="/na.png" alt="ESRB Rating" className="h-28 w-auto" />
                    </div>
                    <div className="space-y-1 text-sm flex flex-col">
                      <p className="font-semibold">Blood</p>
                      <p className="font-semibold">Language</p>
                      <p className="font-semibold">Violence</p>
                      <p className="font-semibold">Users Interact</p>
                      <p className="font-semibold">In-Game Purchases</p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}