import Sidebar from "@/components/components/navigation/sidebar/page";
import TabBar from "@/components/components/navigation/tabbar/tabbar";

type Params = {
  params: {
    month: string;
    year: string;
  };
  children: React.ReactNode;
};
export default async function RootLayout({
  children,
  params: { year, month },
}: Params) {
  return (
    <>
      <Sidebar anchor="left" />
      {children}
      <TabBar params={{ year, month }} />
    </>
  );
}
