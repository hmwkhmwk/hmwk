import styled from "styled-components";

export const Sticker = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: contain;
  width: 80px;
  height: 80px;
  ${(props) => props.url && `background-image: url("${props.url}");`}
`;
