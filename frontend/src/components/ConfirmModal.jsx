// ============================================================
// ConfirmModal.jsx — Popup dialog to confirm a destructive action
// ============================================================
// Replaces window.confirm() with a styled modal.
// The parent opens it by passing a non-null `event`, and closes
// it by setting that state back to null.
// ============================================================

import { useEffect } from "react";

function ConfirmModal({ event, onCancel, onConfirm, submitting }) {
  // Close on Escape key press.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !submitting) onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel, submitting]);

  if (!event) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !submitting) onCancel();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-dialog modal-dialog-small"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <div className="modal-header">
          <h2 id="confirm-modal-title" className="danger-heading">
            Confirm Delete
          </h2>
          <button
            type="button"
            className="modal-close"
            onClick={onCancel}
            disabled={submitting}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p>
            Are you sure you want to delete{" "}
            <strong className="danger-text">"{event.title}"</strong>?
          </p>
          <p className="muted-text">This action cannot be undone.</p>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-delete-confirm"
            onClick={onConfirm}
            disabled={submitting}
          >
            {submitting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;