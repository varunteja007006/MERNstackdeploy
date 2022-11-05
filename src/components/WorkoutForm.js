import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, reps, load };

    const response = await fetch(`/api/workouts`, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Brearer ${user.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: data });
    }
  };

  return (
    <Form className="p-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Situps, Pushups, etc..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={emptyFields.includes("title") ? "error" : ""}
        />
        {emptyFields.includes("title") ? (
          <Form.Text className="text-muted ms-1">
            <i className="fa-sharp fa-solid fa-triangle-exclamation"></i> Title
            is missing
          </Form.Text>
        ) : (
          ""
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Reps</Form.Label>
        <Form.Control
          type="text"
          placeholder="1 or 10 or so..."
          value={reps}
          onChange={(e) => {
            setReps(e.target.value);
          }}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
        {emptyFields.includes("reps") ? (
          <Form.Text className="text-muted ms-1">
            <i className="fa-sharp fa-solid fa-triangle-exclamation"></i> Reps
            is missing
          </Form.Text>
        ) : (
          ""
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Load</Form.Label>
        <Form.Control
          type="text"
          placeholder="1 or 10 or so..."
          value={load}
          onChange={(e) => {
            setLoad(e.target.value);
          }}
          className={emptyFields.includes("load") ? "error" : ""}
        />
        {emptyFields.includes("load") ? (
          <Form.Text className="text-muted ms-1">
            <i className="fa-sharp fa-solid fa-triangle-exclamation"></i> Load
            is missing
          </Form.Text>
        ) : (
          ""
        )}
      </Form.Group>
      <div className="text-center">
        <Button
          type="submit"
          variant="submitbtn"
          className="ms-auto me-auto mt-0 mb-2"
        >
          Add
        </Button>
        {error && (
          <Alert variant="danger" className="m-2">
            <i className="fa-sharp fa-solid fa-triangle-exclamation"></i>{" "}
            {error}
          </Alert>
        )}{" "}
      </div>
    </Form>
  );
}

export default WorkoutForm;
