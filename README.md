# Collection 系統

本專案是一個前後端分離的管理系統，名為 Collection。前端使用 React 和 Vite，後端使用 Spring Boot 和 Java。

## 技術棧

- **後端**: Java, Spring Boot, Gradle, JTA (Java Transaction API)
- **前端**: React, Vite
- **資料庫**: SQL (例如 PostgreSQL, MySQL)
- **容器化**: Docker

## 專案架構

專案採用模組化的方式組織，主要分為 `backend` 和 `frontend` 兩個部分。

```
collection_app/
├── backend/
│   ├── build.gradle                # 後端 Gradle 建置腳本
│   ├── settings.gradle             # Gradle 專案設定檔，定義專案名稱
│   └── src/
│       └── main/
│           ├── java/com/collection/
│           │   ├── config/         # Spring Boot 組態 (如 CORS, 安全性)
│           │   ├── controller/     # API 端點 (Controllers)
│           │   ├── model/          # 資料庫實體 (Entities)
│           │   ├── repository/     # 資料存取層 (Repositories)
│           │   ├── service/        # 業務邏輯層 (Services)
│           │   └── CollectionApplication.java # Spring Boot 啟動類別
│           └── resources/
│               ├── application.properties    # 應用程式組態 (資料庫連線等)
│               └── static/                   # 用於存放前端建置後產生的靜態檔案
├── frontend/
│   ├── public/                     # 靜態資源
│   ├── src/
│   │   ├── components/             # React 元件
│   │   ├── pages/                  # 頁面級元件
│   │   ├── App.jsx                 # React 根元件
│   │   └── main.jsx                # 應用程式進入點
│   ├── index.html                  # Vite 進入點 HTML
│   ├── package.json                # 前端依賴與腳本
│   └── vite.config.js              # Vite 組態檔
├── Dockerfile                      # 用於打包前後端應用的 Docker 設定
└── README.md                       # 本文件
```

### 各模組作用

- **`Dockerfile`**: 定義了一個多階段建置 (multi-stage build) 的流程。它會先建置前端的靜態檔案，然後建置後端的 Spring Boot 應用程式，最後將兩者打包到一個輕量級的 Java 執行環境映像檔中，形成一個獨立運行的應用程式。

- **`backend`**:
  - `build.gradle`: 定義後端所有依賴項，例如 Spring Web, Spring Data JPA, JTA API, 以及資料庫驅動程式。
  - `settings.gradle`: Gradle 專案的根設定檔，定義了專案的名稱 (`rootProject.name = 'collection-backend'`)。
  - `src/main/java`: 核心 Java 程式碼。
    - `com/collection`: 專案的根套件，包含所有業務邏輯和組態。
      - `config`: 集中管理應用程式的組態，例如跨域請求(CORS)設定，讓前端可以順利呼叫後端 API。
      - `controller`: 接收 HTTP 請求，並將請求轉發給 `service` 層處理。這是 API 的入口。
      - `model`: 定義與資料庫表格對應的 Java 物件 (Entity)。
      - `repository`: 繼承 Spring Data JPA 的介面，提供基礎的 CRUD (建立、讀取、更新、刪除) 功能。
      - `service`: 處理核心業務邏輯，並透過 JTA 管理跨多個資料庫操作的事務。
      - `CollectionApplication.java`: 整個 Spring Boot 應用程式的啟動點。
  - `src/main/resources`:n    - `application.properties`: 配置資料庫連線資訊、伺服器埠號等。**請務必在此設定您的資料庫連線資訊。**
    - `static`: 用於存放前端建置後產生的靜態檔案。Dockerfile 會將 `frontend/dist` 的內容複製到這裡。

- **`frontend`**:
  - `package.json`: 管理前端專案的依賴（如 React, Axios）和可執行的腳本（如 `npm run dev`, `npm run build`）。
  - `vite.config.js`: Vite 的組態檔，可以設定代理伺服器(proxy)來解決開發時的跨域問題。
  - `src`: 存放所有 React 原始碼。

## 如何運行專案

1.  **設定資料庫**: 確保您的 SQL 資料庫正在運行，並在後端的 `application.properties` 中填寫正確的連線資訊。
2.  **啟動後端**:
    ```bash
    cd backend
    ./gradlew bootRun
    ```
    後端預設會在 `http://localhost:8080` 啟動。
3.  **啟動前端**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    前端開發伺服器預設會在 `http://localhost:5173` 啟動。

## 下一步開發建議

您的下一步操作現在，您需要手動完成最後一步的設定：

1. 在您的 IntelliJ IDEA 中，打開這個檔案： `backend/src/main/resources/application.properties`
2. 修改檔案內容，將其中的預留位置替換為您自己的資料庫資訊：`your_database_name`: 替換成您要使用的資料庫名稱。`your_username`: 替換成您的資料庫使用者名稱。`your_password`: 替換成您的資料庫密碼。(如果您使用的是 MySQL 或其他資料庫，您還需要修改 `spring.datasource.url` 和 `spring.datasource.driver-class-name` 等設定。)
3. 儲存檔案。
4. 重新運行後端。回到終端機，再次執行：Shell Script./gradlew bootRun只要您的資料庫正在運行，並且您在 `application.properties` 中填寫的資訊是正確的，這次 Spring Boot 應用程式就應該可以成功啟動了。

專案框架已成功搭建，您可以開始為 `Collection` 系統添加獨有的業務功能。以下是一個典型的開發流程：

1.  **定義核心資料模型 (後端)**:
    *   在 `backend/src/main/java/com/collection/model` 套件下，建立新的 Java 類別 (例如 `CollectionItem.java`)，使用 JPA 註解定義其與資料庫表格的映射。
    *   在 `backend/src/main/java/com/collection/repository` 套件下，為其建立 `JpaRepository` 介面 (例如 `CollectionItemRepository`)。

2.  **建立後端 API 端點 (後端)**:
    *   在 `backend/src/main/java/com/collection/service` 中建立業務邏輯 (例如 `CollectionItemService`)，處理資料庫操作和業務規則。
    *   在 `backend/src/main/java/com/collection/controller` 中建立 RESTful API 控制器 (例如 `CollectionItemController`)，定義 API 端點 (如 `@GetMapping("/api/collection-items")`)，呼叫 Service 層並回傳 JSON 資料。
    *   **測試 API**: 使用 Postman 或瀏覽器直接訪問 API 端點，確認資料回傳正確。

3.  **在前端顯示資料 (前端)**:
    *   在 `frontend/src/pages` 或 `frontend/src/components` 中，建立新的 React 元件 (例如 `CollectionPage.jsx`)。
    *   使用 `useEffect` 和 `useState` Hooks，透過 `axios` 或 `fetch` 呼叫後端 API。
    *   將取得的資料渲染到頁面上。

4.  **容器化與部署 (進階)**:
    *   當核心功能開發完成後，可以利用根目錄的 `Dockerfile` 將前後端應用打包成一個獨立的 Docker 映像檔，方便部署到生產環境。
