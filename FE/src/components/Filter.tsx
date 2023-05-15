import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface CategoryType {
  value: string;
}

const categories: CategoryType[] = [
  {
    value: "developer",
  },
  {
    value: "designer",
  },
];

export default function Filter() {
  const [currentCategory, setCurrentCategory] = useState<string>(
    categories[0].value
  );
  const route = useRouter();

  console.log("category=====>", route.query.category);
  // useEffect(() => {
  //   if (localStorage.getItem("category")) {
  //     const category: string | null = localStorage.getItem("category");
  //     category && setCurrentCategory(category);
  //   }
  // }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function changeHandler(value: string): void {
    console.log("filter", value);
    setCurrentCategory(value);
    route.push({ query: { category: value } });
  }

  useEffect(() => {
    if (route.query.category) {
      const category = route.query.category;
      setCurrentCategory(Array.isArray(category) ? category[0] : category);
    }
  }, [route.query.category]);

  return (
    // <div className="home-filter hidden lg:block lg:w-1/5 lg:h-[360px] lg:p-4 shadow">
    <form className="filter-form">
      <p className="filter-form-title">Category</p>
      {categories.map((category: CategoryType, i: number) => (
        <label key={i}>
          <input
            type="radio"
            name="category"
            // value={category.value}/
            onChange={() => changeHandler(category.value)}
            // checked={currentCategory === category.value ? true : false}
            checked={currentCategory === category.value}
          />
          {category.value.charAt(0).toLowerCase() + category.value.slice(1)}
        </label>
      ))}
      <hr />
    </form>
    //  </div>
  );
}
