import React, { useState } from 'react';

type DropdownButtonProps = {
  options: string[];               // 드롭다운 목록
  defaultValue: string;            // 기본값 텍스트
  onSelect: (selectedValue: string) => void;  // 부모에게 선택한 값 전달
};

export const CustomDropdownButton: React.FC<DropdownButtonProps> = ({
  options,
  defaultValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);  // 드롭다운 열림/닫힘 상태
  const [selectedValue, setSelectedValue] = useState(defaultValue);  // 선택된 값

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);  // 드롭다운 열기/닫기 토글
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);  // 선택된 값 업데이트
    onSelect(value);           // 부모 컴포넌트에 선택된 값 전달
    setIsOpen(false);          // 드롭다운 닫기
  };

  return (
    <div className="relative inline-block">
      {/* 드롭다운 버튼 */}
      <button
        onClick={handleToggleDropdown}
        className="flex items-center justify-between px-4 py-2 border rounded-md bg-white text-gray-700
        shadow-sm w-full focus:outline-none cursor-pointer"
      >
        <span className="mr-2">{isOpen ? '↑' : '↓'}</span>
        <span>{selectedValue}</span> {/* 기본값 텍스트 */}
      </button>

      {/* 드롭다운 목록 */}
      {isOpen && (
        <div className="absolute left-0 w-full mt-2 bg-white border rounded-md shadow-lg z-10">
          <ul className="divide-y divide-gray-100">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
