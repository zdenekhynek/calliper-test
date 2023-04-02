import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Loader from "./loader";
import Error from "./error";
import { getShareData } from "./fetch_data";

export default function SharePage() {
  const { shareId } = useParams();

  const queryKey = [shareId];
  const { data, isLoading, error, isError } = useQuery({
    retry: 0,
    queryKey,
    queryFn: async () => {
      return getShareData(shareId);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError && error) {
    return <Error msg={error.toString()} />;
  }

  console.log("data", data);

  return <div>Share page</div>;
}
