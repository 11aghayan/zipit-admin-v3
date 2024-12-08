import Add_Category from "./components/Add_Category";
import Category_List from "./components/Category_List";

export default function Categories() {

  return (
    <div>
      <div className="mb-2 pb-1">
        <Add_Category />
      </div>
      <Category_List />
    </div>
  );
};