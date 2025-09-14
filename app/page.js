'use client'

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

export default function Home() {

  useEffect(() => {
    // Animate header on load
    gsap.fromTo("header",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Stagger navigation items
    gsap.fromTo("header div div",
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.5 }
    );

    // Create a new timeline for the reveal sequence
    const revealTimeline = gsap.timeline({
      delay: 1 // Start this whole sequence after a 1-second delay
    });

    revealTimeline
      // 1. Fade out the initial placeholder text
      .to(".placeholder-text", { // Changed selector to be more specific
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      // 2. Animate the VALORANT Logo in
      .fromTo(".valorant-logo",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power2.out",
        },
        // Start this animation 0.3 seconds after the timeline begins
        0.3
      )
      // 3. Animate the TRACKER text in
      .fromTo(".tracker",
        { opacity: 0, x: -20, text: "" }, // start with empty text
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power2.out",
          text: "TRACKER", // final text
        },
        1.5
      );
  }, []);

  useEffect(() => {
    gsap.to("header", {
      backgroundColor: "#111111",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "300px top",
        scrub: true
      }
    })

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
  }, []);

  return (
    <div className="flex flex-col relative bg-[#ece8e1] min-h-screen overflow-x-hidden">
      <header className="fixed w-full top-0 font-[impact] flex items-center justify-between px-4 sm:px-8 py-4 mx-auto h-20 z-10 cursor-default">
        <span className="flex-1 flex">
          <span className="p-1 text-[#ff4655] text-3xl sm:text-5xl">VT</span>
        </span>
        <button className="sm:hidden text-[#ece8e1] p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="hidden sm:flex flex-row gap-8 items-center">
          <div className="text-[#ece8e1] text-lg hover:text-[#ff4655] transition-colors">Home</div>
          <div className="text-[#ece8e1] text-lg hover:text-[#ff4655] transition-colors">Leaderboards</div>
          <div className="text-[#ece8e1] text-lg hover:text-[#ff4655] transition-colors">Lineups</div>
          <div className="text-[#ece8e1] text-lg hover:text-[#ff4655] transition-colors">Premier</div>
        </div>
      </header>

      <section className="flex h-screen bg-[#0f1923] relative hero-section">
        <div className="flex h-full w-full relative hero-image-container">
          <Image
            src="/Beta Key Art_VALORANT.jpg"
            fill={true}
            priority
            quality={100}
            className="object-cover"
            alt="Valorant Key Art"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f1923]"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">

          <div className="placeholder-text absolute text-5xl sm:text-8xl text-white font-bold">
            VALORANT
          </div>

          <div className="relative flex flex-col items-center w-full max-w-xs sm:max-w-2xl">
            <div className="valorant-logo opacity-0">
              <Image
                src="/V_Logotype_White.png"
                alt="VALORANT Logo"
                width={600}
                height={120}
                className="object-contain"
              />
            </div>

            <div className="tracker absolute top-[65%] sm:top-[60%] text-4xl sm:text-8xl text-white">
              TRACKER
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center min-h-screen bg-[#ece8e1] p-8 text-center">
        <h2 className="text-4xl font-bold text-[#0f1923] mb-4">Content Starts Here</h2>
      </section>

      <footer className="flex bg-[#ff4655] min-h-[200px] w-full items-center justify-center">
        <div className="text-[#ece8e1] text-2xl font-bold">FOOTER</div>
      </footer>
    </div>
  );
}