import { useContext, useEffect, useRef, useState } from "react";
import "./Dropdown.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import Game from "./Game";

interface DropdownProps {
  selectedOption: string;
  handleOptionSelect: (option: string) => void;
}
export default function Dropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const options = ["5", "6", "7", "8", "9", "10"];
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOptionSelect = (option: string) => {
    console.log(`Selected option: ${selectedOption}`);
    // const selectedValue = parseInt(option, 10);
    // onSquareChange(selectedValue);
    setSelectedOption(option);
    setIsDropdownOpen(false);
    //onOptionSelect(option); // Call the onOptionSelect prop to pass the selected option to the parent component (App)
    // You can perform any action when an option is selected
  };
  const handleStartClick = () => {
    console.log("Start button clicked!");
    if (user) {
      //navigate("game");
      navigate(`game?boardSize=${selectedOption}`);
    } else {
      navigate("login");
    }

    // Add any functionality for the Start button click event
  };

  useEffect(() => {
    // Add event listener to detect clicks outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="dropdown">
      {/* <div>{propToPass}</div> */}
      <button onClick={toggleDropdown}>Board Size</button>
      {isDropdownOpen && (
        <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}

      {selectedOption && (
        <button className="start-button" onClick={handleStartClick}>
          Start
        </button>
      )}
    </div>
  );
}
