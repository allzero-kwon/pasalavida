import styled from "@emotion/styled";

const Button = styled.button`
  font-family: "MapoFlowerIsland", "Noto Sans KR", "Apple SD Gothic Neo", serif;
  padding: 0.5em 0.8em;
  border-radius: 8px;
  border: 1px solid #dfdfdf;
  outline: none;
  box-shadow: none;
  font-size: 0.9rem;
  cursor: pointer;
  background: transparent;
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  gap: 2px;
`.withComponent("a");

export default Button;
