import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Button, Layout, Drawer, Modal, Form, Input, Select, Tabs, message } from "antd";
import { UserOutlined, MenuOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/userActions";
import Cookies from "js-cookie";
const { Header } = Layout;
const { Option } = Select;

const Navbar = () => {
    const userType = localStorage.getItem('userType'); //
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
            setIsLoggedIn(true);
        }
    }, []);
    const showModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };
    const handleLogin = async (values) => {
        
        
        try {
            const response = await axios.get("https://billing-software-backend-api.onrender.com/user");
            const users = response.data;
            const user = users.find(u => u.email === values.email && u.password === values.password);
    
            if (user) {
                // Store user data in localStorage
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                localStorage.setItem("userType", user.userType);
                localStorage.setItem("username", user.username);
                localStorage.setItem("Type", user.Type);
    
                message.success("Login successful!");
                Cookies.set("token", { expires: 1 / 8 });
    
                // Set user data in Redux
                dispatch(setUserData(user));
    
                // Navigate based on user type
                if (user.userType === "Admin") {
                    navigate("/admindashboard");
                } else {
                    navigate("/Dash");
                }
            } else {
                message.error("Login failed. Please check your credentials and try again.");
            }
        } catch (error) {
            message.error("An error occurred. Please try again.");
        }
    };

    const handleRegister = async (values) => {
        try {
            if (values.password !== values.confirmPassword) {
                message.error("Passwords do not match.");
                return;
            }
            const response = await axios.post("https://billing-software-backend-api.onrender.com/user", values);
            console.log(response);
            message.success("Registration successful!");
            setModalVisible(false);
        } catch (error) {
            message.error("Registration failed. Please try again.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userType");
        localStorage.removeItem("username");
        localStorage.removeItem("Type");
        Cookies.remove("token");
        setUsername("");
        setIsLoggedIn(false);
        message.success("Logout successful!");
        navigate("/landingpage");
    };

    const userMenu = (
        <Menu>
            {!isLoggedIn ? (
                <Menu.Item key="1" icon={<LoginOutlined />} onClick={showModal}>
                    Login
                </Menu.Item>
            ) : (
                <>
                    <Menu.Item key="2" disabled>
                        {username}
                    </Menu.Item>
                    <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
                        Logout
                    </Menu.Item>
                </>
            )}
        </Menu>
    );

    const animationProps = useSpring({
        opacity: modalVisible ? 1 : 0,
        transform: modalVisible ? "translateY(0%)" : "translateY(-50%)",
        config: { tension: 200, friction: 20 }
    });

    const tabItems = [
        {
            key: "1",
            label: "Login",
            children: (
                <Form name="login" layout="vertical" onFinish={handleLogin}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            key: "2",
            label: "Register",
            children: (
                <Form name="register" layout="vertical" onFinish={handleRegister}>
                    <Form.Item
                        name="userType"
                        label="User Type"
                        rules={[{ required: true, message: "Please select user type!" }]}
                    >
                        <Select>
                            <Option value="Admin">Admin</Option>
                            <Option value="User">User</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={["password"]}
                        rules={[
                            { required: true, message: "Please confirm your password!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("The two passwords that you entered do not match!")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
    ];

    return (
        <Layout>
            <Header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 20px",
                    backgroundColor: "#fff",
                    boxShadow: "0 0 5px 0 #f0f1f2",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                        icon={<MenuOutlined />}
                        // onClick={showDrawer}
                        style={{ marginRight: "20px", fontSize: "20px" }}
                    />
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: "#000" }}>
                        RockG MicroTech
                    </div>
                </div>
                <Dropdown overlay={userMenu} trigger={["click"]}>
                    <Button icon={<UserOutlined />}>
                        {isLoggedIn && <span>{username}</span>}
                    </Button>
                </Dropdown>
            </Header>

            <Modal
                title="Login / Register"
                visible={modalVisible}
                onCancel={handleCancel}
                footer={null}
                width={500}
                centered
                bodyStyle={{ padding: "0 24px" }}
            >
                <animated.div style={animationProps}>
                    <Tabs defaultActiveKey={activeTab} onChange={(key) => setActiveTab(key)}>
                        {tabItems.map((tab) => (
                            <Tabs.TabPane tab={tab.label} key={tab.key}>
                                {tab.children}
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </animated.div>
            </Modal>
        </Layout>
    );
};

export default Navbar;