import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    ${reset};
    * {
        box-sizing: border-box;
        font-family: 'Roboto Slab', serif;
    }
    body {
        font-family: 'Roboto Slab', serif;
        background-color: ${props => props.theme.bgColor};
    }
    a {
        text-decoration:none;
    }
    input {
        outline:none;
    }
`;
