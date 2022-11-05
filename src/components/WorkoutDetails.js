import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";


function WorkoutDetails({ workout }) {
  const {dispatch} = useWorkoutsContext()
  const { user } = useAuthContext();

  const handleDelete = async () => {
        if (!user) {
          return;
    }
    
    const response = await fetch(`/api/workouts/` + workout._id, {
      method: 'DELETE',
      headers: {
          'Authorization': `Brearer ${user.token}`
        }
    })
    
    const data = await response.json()

    if(response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data});
    }
}

  return (
    <ListGroup as="ol" className="mb-1">
      <ListGroup.Item
        as="li"
        key={workout._id}
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{workout.title}</div>
          <div className="">Reps : {workout.reps}</div>
          <div className="">Load (kg): {workout.load}</div>
          <div className="text-muted">Date: {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</div>
        </div>
        <Button variant="warning" onClick={handleDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </Button>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default WorkoutDetails;
