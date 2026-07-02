function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="dialog-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="dialog-confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;