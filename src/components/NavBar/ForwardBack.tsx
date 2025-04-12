import { ChevronLeftIcon, ChevronRightIcon } from "assets/icons";
import { useNavigate } from "react-router-dom";
import { Button, ForwardBackContainer } from "./ForwardBack.styles";

// TODO: Crate mobile lower menu.
const ForwardBack = () => {
  const navigate = useNavigate();

  return (
    <ForwardBackContainer>
      <Button onClick={() => navigate(-1)}>
        <ChevronLeftIcon />
      </Button>
      <Button onClick={() => navigate(1)}>
        <ChevronRightIcon />
      </Button>
    </ForwardBackContainer>
  );
};

export default ForwardBack;
