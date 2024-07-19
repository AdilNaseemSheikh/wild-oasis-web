import Logo from "./components/Logo";
import Navigation from "./components/Navigation";


export default function RootLayout({ children }) {
  return <html lang="en">

    {/* we dont need head here. We have some other ways to influence the stuff that goes into the head tag */}
    <body>
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>{children}</main>
      <footer>Copyright by The Wild Oasis</footer>
    </body>
  </html>
}

export const metadata = {
  title: 'The Wild Oasis'
}