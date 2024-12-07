import { T_Props_Children } from "@/app/types";
import Navbar from "@/app/ui/Navbar";
import Logout_Btn from "@/app/ui/Logout_Btn";
import Mobile_Menu from "@/app/ui/Mobile_Menu";
import { inter } from "@/lib/fonts";

type Props = T_Props_Children;

export default function Layout({ children }: Props) {
  
  return (
    <div>
      <h1 className={`${inter.className} p-3 text-center text-xl sm:text-2xl`}>ZIPIT.admin</h1>
      <div className="hidden sm:flex w-full bg-gray-100/40 justify-between p-3">
        <Navbar />
        <Logout_Btn />
      </div>
      <div className="sm:hidden bg-gray-100/40 p-1 flex justify-end">
        <Mobile_Menu />
      </div>
      <main className="p-3">
        {children}
      </main>
    </div>
  );
};