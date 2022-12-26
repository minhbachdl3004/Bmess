import { Modal } from '@material-ui/core';

interface ErrorModalProps {
  open: boolean;
  error: string | null;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ open, error, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="error-modal-title"
    aria-describedby="error-modal-description"
  >
    <div className="error-modal">
      <h2 id="error-modal-title">Error</h2>
      <p id="error-modal-description">{error}</p>
    </div>
  </Modal>
);
