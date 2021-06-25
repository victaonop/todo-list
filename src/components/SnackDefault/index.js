import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snack } from "./styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackDefault({ snackStatus, handleCloseSnack }) {
  return (
    <Snack
      open={snackStatus.open}
      autoHideDuration={3000}
      onClose={handleCloseSnack}
      anchorOrigin={{vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleCloseSnack} severity={snackStatus.severity}>
        {snackStatus.text}
      </Alert>
    </Snack>
  );
}
