import styled from "styled-components";
import { Modal, Paper } from "@material-ui/core";

export const ModalContainer = styled(Modal)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
`;

export const PaperContainer = styled(Paper)`
  margin-bottom: 40px;
  position: relative;
  max-width: ${({ maxwidth }) => maxwidth};
  min-width: 46vw;
  padding: 0 30px !important;

  .wellcome__message {
    font-family: Helvetica, sans-serif;
    font-size: 28px;
    text-align: center;
    margin: 30px
  }

  &.MuiPaper-elevation1 {
    box-shadow: ${({ shadow }) => shadow};
  }

  &.MuiPaper-rounded {
    border-radius: 14px;
  }

  .row {
    width: 100%;
    display: table;
    margin-top: 16px;

  }
  .name {
    display: table-cell;
    white-space: nowrap;
    line-height: 1.4;
  }
  .dotted {
    border-bottom: 1px dashed lightgray;
    display: table-cell;
    width: 100%;
    margin-bottom: 2px;
  }
  .value {
    text-align: right;
    white-space: nowrap;
  }
`;
