import React from 'react';
import { observer } from 'mobx-react-lite';

interface PageControlProps {
  page: number;
  pageLimit: number;
  pageLimitReached: boolean;
  changePage: (number: number) => void;
}

function PageControl({
  page,
  pageLimit,
  pageLimitReached,
  changePage,
}: PageControlProps) {
  const finalPages = page + 2 >= pageLimit || pageLimit < 5;
  const firstPages = !finalPages && (page < 4);
  const generatedNumberButtons: number[] = [];
  if (finalPages) {
    for (let p = pageLimit - 4; p <= pageLimit; p += 1) {
      if (p > 0) {
        generatedNumberButtons.push(p);
      }
    }
  } else if (firstPages) {
    for (let p = 1; p <= 5; p += 1) {
      generatedNumberButtons.push(p);
    }
  } else {
    for (let p = page - 2; p <= page + 2; p += 1) {
      generatedNumberButtons.push(p);
    }
  }
  return (
    <div className="page-control">
      <button
        className={`arrow-button ${page === 1 && 'blocked-alt'}`}
        type="button"
        onClick={() => changePage(page - 1)}
      >
        ← Back
      </button>
      <div className="number-buttons">
        {generatedNumberButtons.map((p) => (
          <button
            className={`number-button ${p === page && 'current-page'}`}
            type="button"
            onClick={() => changePage(p)}
            key={p}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        className={`arrow-button ${pageLimitReached && 'blocked-alt'}`}
        type="button"
        onClick={() => changePage(page + 1)}
      >
        Forward →
      </button>
    </div>
  );
}

export default observer(PageControl);
