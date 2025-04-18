import { useNavigate } from "react-router-dom";

export const useNavigateToPlayPage = () => {
  const navigate = useNavigate();

  return (uri?: string) => {
    if (!uri) return;

    const [type, id] = uri.split(":").slice(1);
    if (type && id) {
      navigate(`/${type}/${id}`);
    }
  };
};
