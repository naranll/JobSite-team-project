import { useState, useEffect } from "react";

interface CategoryType {
  value: string;
}

const categories: CategoryType[] = [
  {
    value: "all",
  },
  {
    value: "developer",
  },
  {
    value: "designer",
  },
];

export default function Filter() {
  const [currentCategory, setCurrentCategory] = useState<string>("all");

  useEffect(() => {
    if (localStorage.getItem("category")) {
      const category: string | null = localStorage.getItem("category");
      category && setCurrentCategory(category);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function changeHandler(e: any): void {
    console.log("filter", e.currentTarget.value);
    setCurrentCategory(e.currentTarget.value);
    localStorage.setItem("category", e.currentTarget.value);
  }

  return (
    <div className="home-filter hidden lg:block lg:w-1/5 lg:h-[360px] lg:p-4 shadow">
      <form className="filter-form">
        <p className="filter-form-title">Category</p>
        {categories.map((category: CategoryType, i: number) => (
          <label key={i}>
            <input
              type="radio"
              name="category"
              value={category.value}
              onChange={changeHandler}
              checked={currentCategory === category.value ? true : false}
            />
            {category.value.charAt(0).toUpperCase() + category.value.slice(1)}
          </label>
        ))}
        <hr />
      </form>
    </div>
  );
}
