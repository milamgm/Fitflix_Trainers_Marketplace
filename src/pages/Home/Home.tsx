import { Banner, useAppContext } from "../../common/utilities/utils";
import "./Home.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Reviews from "./sections/Reviews";
import DemoSteps from "./sections/DemoSteps";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { t } = useAppContext();
  const revealRefs = useRef<HTMLDivElement[]>([]);
  revealRefs.current = [];

  //Adds multiple refs to an array
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  //Sets a fade-in effect to each ref
  useEffect(() => {
    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
        },
        {
          duration: 0.2,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            id: `part-${index + 1}`,
            trigger: el,
            start: "top center+=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="home">
      <Banner />
      <div className="page_body">
        <section>
          <div className="first_section_text">
            <h2 className="title" ref={addToRefs}>
              {t("home.section1.title")}
            </h2>
            <h3 className="subtitle" ref={addToRefs}>
              {t("home.section1.subtitle")}
            </h3>
            <h3 ref={addToRefs}>{t("home.section1.description")}</h3>
          </div>
        </section>
        <section>
          <h1 className="section__title" ref={addToRefs}>
            {t("home.section2.title")}
          </h1>
          <DemoSteps addToRefs={addToRefs} />
        </section>
        <section>
          <h1 className="section__title" ref={addToRefs}>
            {t("home.section3.title")}
          </h1>
          <Reviews addToRefs={addToRefs} />
        </section>
      </div>
    </div>
  );
};

export default Home;
