import Add_Category from "@/app/ui/categories/Add_Category";
import Category_List from "@/app/ui/categories/Category_List";

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