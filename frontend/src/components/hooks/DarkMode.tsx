import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../../store/darkmode/DarckSlice';
import { AppDispatch , RootState } from '../../store/store';

export const useDarkMode = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector((state: RootState) => state.darkMode.isDarkMode);

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  return { isDarkMode, toggleDarkMode };
};
