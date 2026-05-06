import './style.css';

import { ABOUT_SIDE } from './consts';

type EducationItem = (typeof ABOUT_SIDE.education.items)[number];

function EducationItemRow({ item }: { item: EducationItem }) {
  return (
    <div className="AboutEduItem">
      <div className="AboutEduDegree">{item.degree}</div>
      <div className="AboutEduPeriod">{item.period}</div>
      <div className="AboutEduSchool">{item.school}</div>
    </div>
  );
}

export function AboutEducationLanguagesSection() {
  return (
    <div className="AboutSideStack">
      <div className="AboutSideBlock">
        <div className="AboutSideEyebrow">{ABOUT_SIDE.education.eyebrow}</div>
        <div className="AboutSideTitle">{ABOUT_SIDE.education.title}</div>
        <div className="AboutEduList">
          {ABOUT_SIDE.education.items.map((i) => (
            <EducationItemRow key={`${i.degree}-${i.period}`} item={i} />
          ))}
        </div>
      </div>

      <div className="AboutSideBlock">
        <div className="AboutSideEyebrow">{ABOUT_SIDE.languages.eyebrow}</div>
        <div className="AboutSideTitle">{ABOUT_SIDE.languages.title}</div>
        <div className="AboutLangs">
          {ABOUT_SIDE.languages.items.map((l) => (
            <span key={l} className="AboutLangTag">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
