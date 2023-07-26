import { styled, keyframes } from "@mui/system";
import { ReactComponent as ArrowCicleIcon } from '../../assets/icons/arrow_cycle.svg';

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const CustomLoadingIcon = styled("div")(({ theme }) => ({
  width: '24px',
  height: '24px',
  background: `url(${ArrowCicleIcon})`,
  animation: `${spinAnimation} 1s linear infinite`, /* Apply the spin animation to the custom loading icon */
})
);
