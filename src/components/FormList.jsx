import React from "react";
import { useEnrollment } from "../context/EnrollmentContext";

export function FormList({ asLink = true, compact = false, id = "formList" }) {
  const { activeForms, state, formTitle, formBlurb, t, navigateTo } = useEnrollment();

  return (
    <ul className={`form-list ${compact ? "compact" : ""}`} id={id}>
      {activeForms.map((form) => {
        const isDone = !!state.completed[form.id];
        const statusText = isDone ? "✓" : t("statusTodo");

        const content = (
          <>
            <span className="form-num">{form.num}</span>
            <span className="form-meta">
              <strong>{formTitle(form)}</strong>
              <span>{formBlurb(form)}</span>
            </span>
            <span className={`status ${isDone ? "done" : ""}`}>{statusText}</span>
          </>
        );

        if (asLink) {
          return (
            <li key={form.id}>
              <a
                href={`#${form.id}`}
                data-nav={form.id}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(form.id);
                }}
              >
                {content}
              </a>
            </li>
          );
        }

        return (
          <li key={form.id}>
            <div className="row">{content}</div>
          </li>
        );
      })}
    </ul>
  );
}

export default FormList;
