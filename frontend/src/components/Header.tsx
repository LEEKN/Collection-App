import { Link, useNavigate, useLocation, NavigateFunction } from "react-router-dom";
import { useEffect, useState, ReactNode, MouseEvent } from "react";
import { Div, Text, Button, Anchor, Icon } from "atomize";

// Define props interface for SidebarLink
interface SidebarLinkProps {
  to: string;
  navigate: NavigateFunction;
  children: ReactNode;
}

// A new, robust, and correct implementation of SidebarLink
const SidebarLink = ({ to, navigate, children }: SidebarLinkProps) => (
  <Anchor
    href={to} // Render a proper href for accessibility and SEO
    onClick={(e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault(); // Prevent full page reload
      navigate(to); // Perform client-side navigation
    }}
    d="block"
    p={{ y: "0.75rem", x: "1.5rem" }}
    textColor="gray800"
    hoverTextColor="black"
    textWeight="500"
    transition
  >
    {children}
  </Anchor>
);

const Header = () => {
  const [user, setUser] = useState<string | null>(
    sessionStorage.getItem("user")
  );
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(sessionStorage.getItem("user"));
  }, [location]);

  const handleLogout = async () => {
    await fetch("api/user/logout", {
      method: "POST",
      credentials: "include",
    });
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const sidebarWidth = "240px";
  const categories = [
    "玄幻奇幻", "武俠仙俠", "現代都市", "歷史軍事",
    "科幻小說", "遊戲競技", "恐怖靈異", "言情小說", "其他類型"
  ];

  return (
    <Div
      as="header"
      pos="fixed"
      top="0"
      left="0"
      w={sidebarWidth}
      h="100vh"
      bg="gray200"
      shadow="4"
      p={{ y: "2rem", x: "0" }}
      d="flex"
      flexDir="column"
      zIndex="10"
    >
      {/* Logo - Using a standard Link as it's simple */}
      <Div p={{ x: "1.5rem" }} m={{ b: "2rem" }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Text tag="h1" textSize="title" textColor="black" d="flex" align="center">
            <i className="fas fa-book" style={{ marginRight: '0.75rem' }}></i>
            書界小說
          </Text>
        </Link>
      </Div>

      {/* Main Navigation - Now using the corrected SidebarLink */}
      <Div flexGrow="1">
        <SidebarLink to="/" navigate={navigate}>首頁</SidebarLink>
        {user === "admin" && <SidebarLink to="/admin" navigate={navigate}>管理系統</SidebarLink>}
        <SidebarLink to="/favorite" navigate={navigate}>Favorite</SidebarLink>
        <SidebarLink to="/about" navigate={navigate}>About</SidebarLink>

        <Button
          w="100%"
          justify="space-between"
          bg="transparent"
          textColor="gray800"
          textWeight="500"
          p={{ y: "0.75rem", x: "1.5rem" }}
          onClick={() => setCategoryOpen(!isCategoryOpen)}
          suffix={
            <Icon
              name={isCategoryOpen ? "UpArrow" : "DownArrow"}
              size="20px"
              color="gray800"
            />
          }
        >
          分類
        </Button>

        <Div
          overflow="hidden"
          transition="all 0.3s ease-out"
          maxH={isCategoryOpen ? "500px" : "0px"}
          opacity={isCategoryOpen ? 1 : 0}
        >
          <Div p={{ b: "0.5rem" }}>
            {categories.map(cat => (
              <Anchor
                key={cat}
                href={`/result?tag=${cat}`}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); navigate(`/result?tag=${cat}`); }}
                d="block"
                p={{ y: "0.5rem", l: "2.5rem" }}
                textColor="gray700"
                hoverTextColor="black"
              >
                {cat}
              </Anchor>
            ))}
          </Div>
        </Div>
      </Div>

      {/* User Area */}
      <Div p={{ x: "1.5rem" }}>
        {user ? (
          <>
            <Text p={{ y: "0.75rem" }} textColor="gray900">Hi, {user}</Text>
            <Button
              w="100%"
              bg="gray400"
              hoverBg="gray500"
              onClick={handleLogout}
            >
              登出
            </Button>
          </>
        ) : (
          <>
            <SidebarLink to="/login" navigate={navigate}>登入</SidebarLink>
            <SidebarLink to="/register" navigate={navigate}>註冊</SidebarLink>
          </>
        )}
      </Div>
    </Div>
  );
};

export default Header;
