import styled from "styled-components";

export const SingleSticker = styled.div`
  position: absolute;
  top: 25%;
  left: 25%;
  transform: translate(-50%, -50%);
  background-size: contain;
  width: 150px;
  height: 1570px;
  ${(props) => props.url && `background-image: url("${props.url}");`}
`;
