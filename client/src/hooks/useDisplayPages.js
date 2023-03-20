import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../reducers/displayPages";

export const useDisplayPages = () => {
  const dispatch = useDispatch();
  const displayPage = useSelector((state) => state.displayPage.displayPage);

  const loadPages = (page) => {
    dispatch(setPage(page));
  };

  return { loadPages, displayPage };
};
