import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Div, Text, Input, Button } from "atomize";
import "./Login.css"; // Reuse the login CSS

interface RegisterForm {
    account: string;
    password: string;
    email: string;
    name: string;
}

const Register = () => {
    const [form, setForm] = useState<RegisterForm>({
        account: "",
        password: "",
        email: "",
        name: ""
    });
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!data.status) {
                throw new Error(data.msg || "註冊失敗");
            }

            alert("註冊成功，請登入！");
            navigate("/login");
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
                    註冊
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
                        placeholder="帳號"
                        value={form.account}
                        onChange={handleChange}
                        bg="gray200" textColor="gray700" borderColor="gray700" border="1px solid"
                        m={{ b: "1rem" }} w="100%" rounded="10px" h="3rem"
                        p={{ x: "1rem" }} // Added horizontal padding
                        required
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="密碼"
                        value={form.password}
                        onChange={handleChange}
                        bg="gray200" textColor="gray700" borderColor="gray700" border="1px solid"
                        m={{ b: "1rem" }} w="100%" rounded="10px" h="3rem"
                        p={{ x: "1rem" }} // Added horizontal padding
                        required
                    />
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        bg="gray200" textColor="gray700" borderColor="gray700" border="1px solid"
                        m={{ b: "1rem" }} w="100%" rounded="10px" h="3rem"
                        p={{ x: "1rem" }} // Added horizontal padding
                        required
                    />
                    <Input
                        name="name"
                        placeholder="姓名"
                        value={form.name}
                        onChange={handleChange}
                        bg="gray200" textColor="gray700" borderColor="gray700" border="1px solid"
                        m={{ b: "1.5rem" }} w="100%" rounded="10px" h="3rem"
                        p={{ x: "1rem" }} // Added horizontal padding
                        required
                    />
                    <Button
                        type="submit"
                        w="100%"
                        bg="#009999"
                        hoverBg="#9ca2ae"
                        rounded="10px"
                        h="3rem"
                    >
                        註冊
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Register;
