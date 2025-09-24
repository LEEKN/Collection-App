import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Div, Text, Input, Button } from "atomize";
import "./Login.css"; // Import the new CSS file

interface LoginForm {
    account: string;
    password: string;
}

const Login = () => {
    const [form, setForm] = useState<LoginForm>({ account: "", password: "" });
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(""); // 清除之前的錯誤

        try {
            const res = await fetch("api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // 保留 session
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!data.status) {
                throw new Error(data.msg || "登入失敗");
            }

            // 儲存登入狀態（簡單做法）
            sessionStorage.setItem("user", form.account);
            alert("登入成功！");
            navigate("/");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("發生未知錯誤");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <Text tag="h2" textSize="title" m={{ b: "2rem" }} textAlign="center">
                    登入
                </Text>

                {error && (
                    <Div
                        p="1rem"
                        bg="danger100"
                        textColor="danger800"
                        m={{ b: "1rem" }}
                        borderColor="danger500"
                        border="1px solid"
                        rounded="10px"
                    >
                        {error}
                    </Div>
                )}

                <form onSubmit={handleSubmit}>
                    <Input
                        name="account"
                        value={form.account}
                        onChange={handleChange}
                        placeholder="帳號"
                        bg="gray200"
                        textColor="gray700"
                        borderColor="gray700"
                        border="1px solid"
                        m={{ b: "1rem" }}
                        p={{ x: "1rem" }} // Added horizontal padding
                        w="100%"
                        rounded="10px"
                        h="3rem" // Set explicit height
                        required
                    />
                    <Input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="密碼"
                        bg="gray200"
                        textColor="gray500"
                        borderColor="gray700"
                        border="1px solid"
                        m={{ b: "1.5rem" }}
                        p={{ x: "1rem" }} // Added horizontal padding
                        w="100%"
                        rounded="10px"
                        h="3rem" // Set explicit height
                        required
                    />
                    <Button
                        type="submit"
                        w="100%"
                        bg="#009999"
                        hoverBg="#9ca2ae"
                        rounded="10px"
                        h="3rem" // Set explicit height
                    >
                        登入
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;