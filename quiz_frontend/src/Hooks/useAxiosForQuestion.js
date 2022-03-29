import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:5000";

const useAxiosForQuestions = ({ url }) => {
  const [questionresponse, setQuestionResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then((res) => setQuestionResponse(res.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [url]);

  return { questionresponse, error, loading };
};

export default useAxiosForQuestions;