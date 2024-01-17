const Filter = () => {
  return (
    <div className="flex items-center ">
      <select
        id="filter"
        className="bg-light-gray-color border border-light-gray-color text-dark-gray-color text-sm rounded-lg focus:ring-primary-dark-color focus:border-primary-dark-color block w-full p-2.5"
        defaultValue={"latest"}
      >
        <option value="latest">최신순</option>
        <option value="oldest">오래된 순</option>
        <option value="commentCount">댓글 순</option>
        <option value="recommended">추천 순</option>
      </select>
    </div>
  );
};

export default Filter;
