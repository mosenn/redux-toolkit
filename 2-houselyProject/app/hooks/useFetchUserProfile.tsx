import { useEffect } from "react";
import useUserStore from "../store/useUserStroe";

const useFetchUserProfile = () => {
  const fetchUserProfile = useUserStore((state) => state.fetchUserProfile);

  return useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useFetchUserProfile;
