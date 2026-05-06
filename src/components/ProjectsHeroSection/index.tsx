import './style.css';

import type { ProjectCategory } from '../../types/project';
import { FILTER_CHIPS, PROJECTS_PAGE } from './consts';

type ProjectsHeroSectionProps = {
  activeFilter: ProjectCategory;
  onFilterChange: (key: ProjectCategory) => void;
};

export function ProjectsHeroSection({ activeFilter, onFilterChange }: ProjectsHeroSectionProps) {
  return (
    <div className="ProjectsHeroSection">
      <div className="ProjectsHeroHeading">
        <span className="ProjectsHeroLine1">{PROJECTS_PAGE.heading[0]}</span>
        <span className="ProjectsHeroAccent">{PROJECTS_PAGE.heading[1]}</span>
      </div>
      <p className="ProjectsHeroSubheading">{PROJECTS_PAGE.subheading}</p>
      <div className="ProjectsHeroFilters">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip.key}
            className={['ProjectsFilterChip', activeFilter === chip.key ? 'is-active' : ''].join(' ')}
            onClick={() => onFilterChange(chip.key)}
            type="button"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
