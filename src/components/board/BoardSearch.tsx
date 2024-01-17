import { useState } from "react";

const BoardSearch = () => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div className="text-right">
      <input
        className="border-light-gray-color"
        onChange={handleChange}
        value={search}
        type="text"
        placeholder="검색어를 입력하세요."
      />
      <button className="border border-light-gray-color text-dark-gray-color">
        검색
      </button>
    </div>
  );
};

export default BoardSearch;
