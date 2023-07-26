import { FC } from "react";
import * as Styled from "./Loader.styles";

type Props = {
  style?: object;
};

const Loader: FC<Props> = ({
  style,
}) => {
  return (
    <Styled.CustomLoadingIcon style={style}>

    </Styled.CustomLoadingIcon>
  );
};

export default Loader;
