import Tabbar from "@/components/components/navigation/tabbar/tabbar";

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
    <div>
      {children}
      <Tabbar params={{ year, month }} />
    </div>
  );
}
