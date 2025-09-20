# Collection 系統

本專案是一個前後端分離的管理系統，名為 Collection。前端使用 React 和 Vite，後端使用 Spring Boot 和 Java。

## 技術棧

- **後端**: Java, Spring Boot, Gradle, JTA (Java Transaction API)
- **前端**: React, Vite, TypeScript, Atomize React
- **資料庫**: SQL (例如 PostgreSQL, MySQL)
- **容器化**: Docker

## 專案架構

專案採用前後端分離的 monorepo 模式（將多個專案放在同一個倉庫中），主要分為 `backend` 和 `frontend` 兩個獨立的部分。

```
collection_app/
├── backend/                  # Spring Boot 後端應用
│   ├── build.gradle
│   └── src/main/
│       ├── java/com/collection/
│       │   ├── config/         # Spring Boot 組態 (CORS, 安全性等)
│       │   ├── controller/     # API 端點 (HTTP請求入口)
│       │   ├── model/          # 資料庫實體 (JPA Entities)
│       │   ├── repository/     # 資料存取層 (JPA Repositories)
│       │   └── service/        # 業務邏輯層
│       └── resources/
│           ├── application.properties
│           └── static/         # 用於存放前端建置後的靜態檔案
├── frontend/                 # React 前端應用
│   ├── src/
│   │   ├── api/          # API 請求相關函式
│   │   ├── assets/       # 靜態資源 (CSS, 圖片)
│   │   ├── components/   # 可複用的React元件 (Header, Footer)
│   │   ├── pages/        # 頁面級元件 (HomePage, LoginPage)
│   │   ├── App.tsx       # 應用根元件 (整體版面與路由)
│   │   └── main.tsx      # 應用程式進入點 (初始化與全域設定)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── Dockerfile                # 多階段建置的 Docker 設定
└── README.md                 # 本文件
```

## 各模組作用

### `Dockerfile`

定義了一個**多階段建置 (multi-stage build)** 的流程，是實現單體容器化部署的關鍵。其步驟如下：
1.  **第一階段 (Node)**: 使用 Node.js 環境，安裝前端依賴並執行 `npm run build`，產生最佳化後的靜態檔案 (HTML, CSS, JS)。
2.  **第二階段 (Java)**: 使用 Java 環境，建置後端的 Spring Boot 應用程式。
3.  **最終階段**: 將第一階段產生的前端靜態檔案，與第二階段建置好的後端應用，一同複製到一個輕量級的 Java 執行環境映像檔中。最終產出一個獨立、自給自足的應用程式容器。

---

### `backend` (後端)

採用經典的**分層架構 (Layered Architecture)**，確保職責分離，易於維護和測試。

一個典型的 API 請求生命週期如下：
`HTTP Request` -> `Controller` -> `Service` -> `Repository` -> `Database`

- **`src/main/java/com/collection/`**: 核心 Java 程式碼。
  - **`controller` (控制層)**: **API 的入口**。唯一的職責是接收 HTTP 請求，驗證基本參數，然後呼叫 `Service` 層處理。它不應包含任何業務邏輯。
  - **`service` (業務邏輯層)**: **應用的核心**。所有業務規則、計算和邏輯都實作在這裡。它可以協調多個 `Repository` 來完成一個複雜的操作，並使用 `@Transactional` 來確保資料的一致性。
  - **`repository` (資料存取層)**: **與資料庫溝通的唯一窗口**。這是一個繼承自 Spring Data JPA 的介面，框架會自動為其提供 CRUD (建立、讀取、更新、刪除) 功能。除了定義查詢方法外，不應包含業務邏輯。
  - **`model` (資料模型層)**: 定義與資料庫表格對應的 Java 物件 (Entity)，使用 JPA 註解 (如 `@Entity`, `@Id`) 來描述映射關係。
  - **`config` (組態層)**: 存放應用程式的組態類別，例如跨域請求(CORS)設定，讓前端可以順利呼叫後端 API。

- **`src/main/resources`**: 
  - `application.properties`: 配置資料庫連線資訊、伺服器埠號等環境變數。
  - `static`: 在生產環境中，此目錄用於存放由 `Dockerfile` 複製過來的前端靜態檔案。

---

### `frontend` (前端)

採用**元件化架構 (Component-Based Architecture)**，將 UI 拆分為獨立、可複用的部分。

- **`main.tsx` (應用程式進入點)**: **專案的「總電源」**。它負責將 React 應用掛載到 `index.html` 的 DOM 節點上。這裡是設定**全域提供者 (Global Providers)** 的地方，例如 `BrowserRouter` (提供路由功能) 和 `Atomize` 的 `ThemeProvider` (提供全域主題)。

- **`App.tsx` (應用根元件)**: **應用的「版面骨架」與「路由中心」**。它定義了整個應用的宏觀版面結構（例如，側邊欄 + 主要內容區 + 頁腳），並使用 `react-router-dom` 的 `<Routes>` 和 `<Route>` 來定義不同 URL 路徑對應渲染哪個頁面元件。

- **`components/` (可複用元件)**: **樂高積木盒**。存放通用的、不與特定頁面綁定的 UI 元件，例如 `Header.tsx`, `Footer.tsx`, `Button.tsx`。它們應該是獨立的、可被專案中任何地方使用的。

- **`pages/` (頁面級元件)**: **完整的頁面藍圖**。每個檔案代表一個完整的頁面或視圖，例如 `HomePage.tsx`, `LoginPage.tsx`。它們通常會組合多個 `components/` 中的元件來構成一個完整的頁面。

- **`api/`**: 存放所有與後端 API 互動的相關函式。將 API 請求邏輯集中管理，可以讓元件本身更專注於 UI 渲染。

## 如何運行專案

1.  **設定資料庫**: 確保您的 SQL 資料庫正在運行，並在後端的 `application.properties` 中填寫正確的連線資訊。
2.  **啟動後端**:
    ```bash
    cd backend
    ./gradlew bootRun
    ```
3.  **啟動前端**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
