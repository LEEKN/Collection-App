import { Text } from "atomize";
import "../Favorite/Favorite.css"; // Reuse the favorite container style

const About = () => {
  return (
    <div className="favorite-container">
      <Text tag="h2" textSize="30px" m={{ b: "2rem" }} textAlign="center">
        關於我們
      </Text>
      <Text tag="p" textAlign="left" m={{ b: "1.5rem" }}>
        歡迎來到我們的網站！我們致力於提供最優質的內容與服務，打造一個讓使用者能盡情探索與享受的平台。
      </Text>
      <Text tag="p" textAlign="left" m={{ b: "1.5rem" }}>
        本站採用前後端分離架構，後端使用 Spring Boot，前端則以 React 和 Vite 精心打造，並部署於 Railway 雲端平台，以確保服務的穩定與高效。
      </Text>
      <Text tag="p" textAlign="left">
        感謝您的來訪，希望您在這裡能有一段美好的時光。若有任何建議，歡迎隨時與我們聯繫。
      </Text>
    </div>
  );
};

export default About;
