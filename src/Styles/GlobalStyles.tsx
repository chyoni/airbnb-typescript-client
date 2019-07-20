import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Theme from "./Theme";

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Righteous&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Titillium+Web&display=swap');
    ${reset};
    * {
        box-sizing: border-box;
        font-family: 'Titillium Web', sans-serif;
    }
    body {
        font-family: 'Titillium Web', sans-serif;
        background-color: ${Theme.bgColor};
    }
    a {
        text-decoration:none;
        color:${Theme.blackColor};
    }
    input {
        outline:none;
    }
`;
