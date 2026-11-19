import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  DepartmentId,
  PRODUCT_DEPARTMENTS,
} from '../data/storeCatalog';

interface DepartmentGridProps {
  selectedDepartment: DepartmentId;
  onSelectDepartment: (dept: DepartmentId) => void;
}

export const DepartmentGrid: React.FC<DepartmentGridProps> = ({
  selectedDepartment,
  onSelectDepartment,
}) => {
  return (
    <section
      className="departments-section"
      id="departments"
      aria-labelledby="departments-heading"
    >
      <div className="shell">
        <div className="section-bar">
          <div>
            <p className="section-kicker">6 Kids &amp; Family Categories</p>
            <h2 id="departments-heading">Shop by Product Format</h2>
          </div>
          <button
            type="button"
            className="section-reset-link"
            onClick={() => onSelectDepartment('all')}
          >
            <span>Browse all 15 products</span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="department-cards-grid">
          {PRODUCT_DEPARTMENTS.map((dept) => {
            const isSelected = selectedDepartment === dept.id;
            return (
              <button
                key={dept.id}
                type="button"
                className={`department-card ${isSelected ? 'is-selected' : ''}`}
                aria-pressed={isSelected}
                onClick={() => onSelectDepartment(dept.id)}
              >
                <div className="department-card-media">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    width={480}
                    height={360}
                  />
                </div>
                <div className="department-card-body">
                  <h3>{dept.name}</h3>
                  <p className="department-meta">
                    {dept.fulfillmentType} · {dept.bestChannel}
                  </p>
                  <p className="department-tagline">{dept.tagline}</p>
                  <div className="department-card-foot">
                    <span className="department-price tabular-nums">
                      {dept.typicalPriceRange}
                    </span>
                    <span className="department-cta">
                      Shop format <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
