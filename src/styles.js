import styled from "styled-components";
import { Grid } from "@material-ui/core";

export const MainPage = styled(Grid)`
    padding: 70px;
    background: #fff;
    border-radius: 10px;

    .todo__list {
        border-style: solid;
        border-width: 2px;
        border-radius: 5px;
        padding: 20px;
        min-width: 35vh;
        border-color: rgb(233, 233, 233);
    }

    .count__label {
        font-size: 13px;
        color: rgb(60,72,88);
        font-weight: bold;
        position: relative;
        text-align: right;
        top: 30px;
    }

    .todo__description {
        word-wrap: break-word;
        margin: 0px 50px 0px 0px;
    }

    & .MuiListItem-container {
        border-bottom-style: solid;
        border-width: 1px;
        border-color: rgb(233, 233, 233);
    }
`;