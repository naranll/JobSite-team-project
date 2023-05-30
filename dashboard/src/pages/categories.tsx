import {CategoryType} from "@/utils/types";
import CategoryRow from "../components/CategoryRow";

export default function Categories(props: {
  categories: CategoryType[];
}): JSX.Element {
  const {categories} = props;

  return (
    <div>
      <form className="subHeaderStyle justify-end">
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Search"
            className="searchBarStyle"
          />
          <div className="buttonStyle">Filter</div>
        </div>
      </form>

      <table className="tableStyle ">
        <thead>
          <tr className="[&>*]:border [&>*]:border-slate-200">
            <th className="w-[40px]">No.</th>
            <th className="w-[250px]">Category</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: CategoryType, i: number) => {
            const categoryData = {
              rowNumber: i,
              data: category,
            };
            return <CategoryRow key={i} categoryData={categoryData} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:8008/category/all");
  const categories = await response.json();
  return {
    props: {
      categories: categories,
    },
  };
}
