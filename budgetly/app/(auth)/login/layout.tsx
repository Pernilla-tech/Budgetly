import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import styles from "./page.module.css";

type Props = {
  children: React.ReactNode;
};
export default function LoginLayout({ children }: Props) {
  return (
    <section className={styles.loginPage}>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
