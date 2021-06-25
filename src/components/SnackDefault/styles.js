import styled from "styled-components";
import { Snackbar } from "@material-ui/core";

export const Snack = styled(Snackbar)`
  height: 200px;
  .MuiAlert-root {
    padding: 20px 40px;
  }
  .MuiAlert-message {
    margin: 0 20px;
  }
`;
