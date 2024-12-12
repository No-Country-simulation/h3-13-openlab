import React from 'react';
import { useSelector } from 'react-redux';
import { Moon, Sun } from '../../assets';

interface ThemeSwitcherProps {
    onclick: () => void;  
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onclick }) => {
  const isDarkMode = useSelector((state: any) => state.darkMode.isDarkMode);

  return (
    <div className="flex items-center space-x-4">
      <div
        className={`relative w-16 h-8 rounded-full cursor-pointer transition-all ease-in-out ${
          isDarkMode ? "bg-gray-700" : "bg-blue-300"
        }`}
        onClick={onclick}
      >
        <div
          className={`absolute top-0 left-0 w-8 h-8 rounded-full shadow-md transition-transform ${
            isDarkMode ? "translate-x-8" : "translate-x-0"
          }`}
        >
          <img
            src={isDarkMode ? Moon : Sun}
            alt="mode"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
