import searchIcon from "../../../../public/search.svg";
import messageIcon from "../../../../public/message.svg";
import calendarIcon from "../../../../public/calendar.svg";

interface Props {
  addToRefs: (el: HTMLDivElement) => void;
}

const DemoSteps = ({ addToRefs }: Props) => (
  <>
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
  </>
);

export default DemoSteps;

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
