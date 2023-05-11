import {useState, useEffect} from "react";

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
<<<<<<< Updated upstream
  const [currentCategory, setCurrentCategory] = useState<string>("all");
=======
  const [currentCategory, setCurrentCategory] = useState<string>(categories[0].value);
  const route = useRouter()
>>>>>>> Stashed changes

  // useEffect(() => {
  //   if (localStorage.getItem("category")) {
  //     const category: string | null = localStorage.getItem("category");
  //     category && setCurrentCategory(category);
  //   }
  // }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
<<<<<<< Updated upstream
  function changeHandler(e: any): void {
    console.log("filter", e.currentTarget.value);
    setCurrentCategory(e.currentTarget.value);
    localStorage.setItem("category", e.currentTarget.value);
=======
  function changeHandler(value:string): void {
    console.log("filter", value);
    setCurrentCategory(value)
    route.push({query : {category : value}})
>>>>>>> Stashed changes
  }

  useEffect(() => {
    if (route.query.category) {
      const category = route.query.category;
      setCurrentCategory(Array.isArray(category) ? category[0] : category);
    }
  }, [route.query.category]);
  console.log("current Cate",currentCategory)

  console.log("route Cate",route.query.categories)

  return (
    // <div className="home-filter hidden lg:block lg:w-1/5 lg:h-[360px] lg:p-4 shadow">
    <form className="filter-form">
      <p className="filter-form-title">Category</p>
      {categories.map((category: CategoryType, i: number) => (
        <label key={i}>
          <input
            type="radio"
            name="category"
            // value={category.value}
            onChange={()=>changeHandler(category.value)}
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
