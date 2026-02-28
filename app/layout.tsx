import "./globals.css";
import FishBase from "@/components/FishBase";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "dalton avery",
  description: "dalton avery's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FishBase>
          <div id="body-main">
            <Sidebar />
            {children}
            <aside className="right-aside"></aside>
          </div>
        </FishBase>
      </body>
    </html>
  );
}
