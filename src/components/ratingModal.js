import { faStar } from "@fortawesome/fontawesome-free-solid";
import { faStar as faStarO } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

export const RatingModal = (props) => {
  const { id, onClose, title, open } = props;
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState(0);
  const [error, setError] = useState();
  useEffect(() => {
    setError(undefined);
  }, [selection]);

  const sendRating = async () => {
    setLoading(true);

    await axios.post("/ratings/", { value: selection, recipe: id });

    setLoading(false);
    onClose(false);
  };

  return (
    <Modal show={open} onClose={() => onClose(false)}>
      <Modal.Header>
        <Modal.Title>Rate {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {error && (
            <Alert variant="warning" className="mt-3">
              {" "}
              {error}{" "}
            </Alert>
          )}
          <Form.Group>
            <label>
              <FontAwesomeIcon
                size="4x"
                fade={loading && selection >= 1}
                icon={selection >= 1 ? faStar : faStarO}
                onClick={() => setSelection(1)}
              />
            </label>
            <label>
              <FontAwesomeIcon
                size="4x"
                fade={loading && selection >= 2}
                icon={selection >= 2 ? faStar : faStarO}
                onClick={() => setSelection(2)}
              />
            </label>
            <label>
              <FontAwesomeIcon
                size="4x"
                fade={loading && selection >= 3}
                icon={selection >= 3 ? faStar : faStarO}
                onClick={() => setSelection(3)}
              />
            </label>
            <label>
              <FontAwesomeIcon
                size="4x"
                fade={loading && selection >= 4}
                icon={selection >= 4 ? faStar : faStarO}
                onClick={() => setSelection(4)}
              />
            </label>
            <label>
              <FontAwesomeIcon
                size="4x"
                fade={loading && selection >= 5}
                icon={selection >= 5 ? faStar : faStarO}
                onClick={() => setSelection(5)}
              />
            </label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => onClose(false)}
          aria-label="Close Rating Modal"
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (selection === 0) {
              setError("Please make a rating");
              return;
            }
            sendRating();
          }}
          aria-label="Submit Rating"
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
