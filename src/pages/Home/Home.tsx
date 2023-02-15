import { Banner } from "../../utilities/utils";
import "./Home.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import image16 from "../../../public/image16.jpg";
import image17 from "../../../public/image17.jpg";
import searchIcon from "../../../public/search.svg";
import messageIcon from "../../../public/message.svg";
import calendarIcon from "../../../public/calendar.svg";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
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
              Finde Deine Lehrkraft
            </h2>
            <h3 className="subtitle" ref={addToRefs}>
              Kraft trainieren, Stärke und Ausdauer steigern, persönlich wachsen
              mit über 1100 Fitness-Coaches
            </h3>
            <h3 ref={addToRefs}>
              Alle unsere Personal Trainer sind hochqualifiziert, intensiv
              geprüft und teils sogar TÜV zertifiziert! Egal was es ist - unsere
              Fitness Coaches helfen dir deine Träume endlich anzupacken! In
              einem Fitnesstudio, unter freiem Himmel, bei dir zuhause oder mit
              Live Online Personal Training via Bildschirm wo immer du willst.
            </h3>
          </div>
        </section>
        <section>
          <h1 className="section__title" ref={addToRefs}>
            Lernen war noch nie so einfach!
          </h1>
          {demo_steps.map(({ title, desc, img, desc_position }) =>
            desc_position === "left" ? (
              <div className="step__div" key={title} ref={addToRefs}>
                <div className="step__description">
                  <h1>{title}</h1>
                  <div className="step__icon">
                    <img src={img} />
                  </div>
                  <h3>{desc}</h3>
                </div>
                <div className="step__img">
                  <img src={img} />
                </div>
              </div>
            ) : (
              <div className="step__div" key={title} ref={addToRefs}>
                <div className="step__img">
                  <img src={img} />
                </div>
                <div className="step__description">
                  <h1>{title}</h1>
                  <div className="step__icon">
                    <img src={img} />
                  </div>
                  <h3>{desc}</h3>
                </div>
              </div>
            )
          )}
        </section>
        <section>
          <h1 className="section__title" ref={addToRefs}>
            Kunden bewerten Personal Trainer
          </h1>
          <div className="comment" ref={addToRefs}>
            <div className="header">
              <img className="avatar" src={image17} alt="" />
              <div className="info">
                <h4>Athina B.</h4>
                <h6>Januar 2023 </h6>
              </div>
              <div className="stars">
                <img src="star.svg" alt="" className="star" />
                <img src="star.svg" alt="" className="star" />
                <img src="star.svg" alt="" className="star" />
                <img src="star.svg" alt="" className="star" />
                <img src="star.svg" alt="" className="star" />
              </div>
            </div>
            <p>
              Ich habe das Training mit Mario angefangen, weil ich sehr
              unzufrieden mit mir war und dringend etwas an meinem Lebensstil
              ändern wollte. Nun trainiere ich schon seit 1,5 Jahren mit ihm und
              bin nicht nur viel fitter sondern auch weitaus glücklicher! Mario
              kann sehr gut auf jede Person vor ihm individuell eingehen und hat
              mich im Training immer gefordert und motiviert. Vom Training bei
              mir zu Hause während der Pandemiezeiten bis heute in dem neuen,
              modernen Studio war er immer voll dabei und unterstützt mich darin
              meine Ziele zu erreichen. Das Training mit Mario kann ich nur
              jedem weiterempfehlen!{" "}
            </p>
            <small>Über den Trainer Mario Schaafstall, Köln</small>
          </div>
          <div className="comment" ref={addToRefs}>
            <div className="header">
              <img className="avatar" src={image16} alt="" />
              <div className="info">
                <h4>Martin G.</h4>
                <h6>Dezember 2022</h6>
              </div>
              <div className="stars">
                <img src="star.svg" alt="" className="star" />
                <img src="star.svg" alt="" className="star" />
                <img src="star.svg" alt="" className="star" />
                <img src="star.svg" alt="" className="star" />
                <img src="star.svg" alt="" className="star" />
              </div>
            </div>
            <p>
              Kalle spricht sein Training mit mir immer ab und passt es meinen
              persönlichen Wünschen sinnvoll an. Ich trainiere mit ihm schon
              seit einigen Jahren. Er hat mich fit gemacht wie noch nie , so
              dass ich wieder Gas geben kann. Mein Dank gilt Kalle!
            </p>
            <small>Über den Trainer Kalle Janßen, Kreis Viersen</small>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

const demo_steps = [
  {
    title: "1. Suchen",
    desc: "Schau Dir beliebig viele Profile an und kontaktiere die Lehrkräfte, die Deinen persönlichen Kriterien (Preis, Ausbildung, Bewertung, Unterrichtsform etc.) am besten entsprechen.",
    img: searchIcon,
    desc_position: "left",
  },
  {
    title: "2. Kontaktieren",
    desc: "Die Lehrkräfte antworten blitzschnell innerhalb weniger Stunden! Und falls Du Schwierigkeiten haben solltest, die passende Lehrkraft zu finden, hilft Dir unser Support-Team gerne weiter.",
    img: messageIcon,
    desc_position: "right",
  },
  {
    title: "3. Unterricht planen",
    desc: "Tausche Dich mit Deiner Lehrkraft oder Deinem Coach aus und plant eure Kurse selbstständig über Euren Messenger.        ",
    img: calendarIcon,
    desc_position: "left",
  },
];
