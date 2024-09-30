import React, { useState } from "react";
import {
  CaretDownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Logo from "./Assets/ROCKG_LOGO.png";
import { Button, Layout, Menu, Popover, theme, Space } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

import { HouseDoor, Receipt, ReceiptCutoff, Tag, Tags, TagsFill, Building, BuildingCheck, PersonLinesFill, Box2Heart, BoxArrowRight, PersonHearts, GenderAmbiguous, PersonBadgeFill, ThreeDots,FileEarmarkPlus,  App, Gear, Person, FileText, Search, SearchHeart, PersonBadge, BoxSeam } from "react-bootstrap-icons";

import { useSelector } from "react-redux";
const { Content, Footer, Sider } = Layout;

const User = [
  {
    key: "/Dash",
    label: (
      <Link to="/Dash" className="no-underline">
        Dashboard
      </Link>
    ),
    icon: <HouseDoor />,
  },
  {
    key: "/Info",
    label: (
      <Link to="/Info" className="no-underline">
        Information
      </Link>
    ),
    icon: <Building />,
  },
];

const Admin = [
  // Dashboard
  {
    key: "/admindashboard",
    label: (
      <Link to="/admindashboard" className="no-underline">
        Dashboard
      </Link>
    ),
    icon: <HouseDoor />,
  },
  // Bill
  {
    key: "Bill",
    label: 'Bill',
    icon: <Receipt />,
    children: [
      {
        key: "/CreateBill",
        label: (
          <Link to="/CreateBill" className="no-underline">
            Create Bill
          </Link>
        ),
        icon: <FileEarmarkPlus />,
      },
      {
        key: "/InvoiceSheet",
        label: (
          <Link to="/InvoiceSheet" className="no-underline">
            Invoice Sheet
          </Link>
        ),
        icon: <ReceiptCutoff />,
      },
    ]
  },

  // Candidate
  {
    key: "Candidate",
    label: 'Candidate',
    icon: <PersonBadgeFill />,
    children: [
      {
        key: "/Addcandidates",
        label: (
          <Link to="/Addcandidates" className="no-underline">
            Add Candidates
          </Link>
        ),
        icon: <Person />,
      },
      {
        key: "/AllCandidates",
        label: (
          <Link to="/AllCandidates" className="no-underline">
            All Candidates
          </Link>
        ),
        icon: <Person />,
      },
      {
        key: "/AddMasterDetials",
        label: (
          <Link to="/AddMasterDetials" className="no-underline">
            Add Gender Master
          </Link>
        ),
        icon: <GenderAmbiguous />,
      },
      {
        key: "/AllMasterDetials",
        label: (
          <Link to="/AllMasterDetials" className="no-underline">
            All Gender Master
          </Link>
        ),
        icon: <ThreeDots />,
      },
    ]
  },

  // Company Logo & Address
  {
    key: "Logo & Address",
    label: 'Logo & Address',
    icon: <BoxArrowRight />,
    children: [
      {
        key: "/InvoiceForm",
        label: (
          <Link to="/InvoiceForm" className="no-underline">
            Invoice Form Logo
          </Link>
        ),
        icon: <FileText />,
      },
      {
        key: "/InvoiceData",
        label: (
          <Link to="/InvoiceData" className="no-underline">
            Invoice Logo Data
          </Link>
        ),
        icon: <FileText />,
      },
    ]
  },
  // Invoice Template  
  {
    key: "Invoice Templates",
    label: 'Invoice Templates',
    icon: <FileText />,
    children: [
      {
        key: "/AddInvoiceTemplate",
        label: (
          <Link to="/AddInvoiceTemplate" className="no-underline">
            Add Invoice Template
          </Link>
        ),
        icon: <FileText />,
      },
      {
        key: "/AllInvoiceTemplate",
        label: (
          <Link to="/AllInvoiceTemplate" className="no-underline">
            All Invoice Template
          </Link>
        ),
        icon: <FileText />,
      },
    ]
  },
  // Customer
  {
    key: "Customer",
    label: 'Customer',
    icon: <PersonHearts />,
    children: [
      {
        key: "/AddCustomer",
        label: (
          <Link to="/AddCustomer" className="no-underline">
            Add Customer
          </Link>
        ),
        icon: <PersonBadge />,
      },
      {
        key: "/AllCustomer",
        label: (
          <Link to="/AllCustomer" className="no-underline">
            All Customers
          </Link>
        ),
        icon: <PersonBadge />,
      },
    ]
  },

  // Master Products
  {
    key: "Products",
    label: 'Products',
    icon: <Box2Heart />,
    children: [
      {
        key: "/AddMasterProducts",
        label: (
          <Link to="/AddMasterProducts" className="no-underline">
            Add Master Products
          </Link>
        ),
        icon: <BoxSeam />,
      },
      {
        key: "/AllMasterProducts",
        label: (
          <Link to="/AllMasterProducts" className="no-underline">
            All Master Products
          </Link>
        ),
        icon: <BoxSeam />,
      },
    ]
  },

  // TAX
  {
    key: "Tax",
    label: 'Tax',
    icon: <Tag />,
    children: [
      {
        key: "/AddGST",
        label: (
          <Link to="/AddGST" className="no-underline">
            Add GST
          </Link>
        ),
        icon: <Tags />,
      },
      {
        key: "/AllGSTMaster",
        label: (
          <Link to="/AllGSTMaster" className="no-underline">
            AllGSTMaster
          </Link>
        ),
        icon: <TagsFill />,
      },
    ]
  },

  // Search
  {
    key: "Search",
    label: 'Search',
    icon: <Search />,
    children: [
      {
        key: "/Search",
        label: (
          <Link to="/Search" className="no-underline">
            Search
          </Link>
        ),
        icon: <Search />,
      },
      {
        key: "/SyncfusionSearch",
        label: (
          <Link to="/SyncfusionSearch" className="no-underline">
            Syncfusion Search
          </Link>
        ),
        icon: <SearchHeart />,
      },
    ]
  },

  // About
  {
    key: "/About",
    label: (
      <Link to="/About" className="no-underline">
        About
      </Link>
    ),
    icon: <Building />,
  },
  
  // Features
  {
    key: "/Features",
    label: (
      <Link to="/Features" className="no-underline">
        Features
      </Link>
    ),
    icon: <BuildingCheck />,
  },

  // Contact
  {
    key: "/Contact",
    label: (
      <Link to="/Contact" className="no-underline">
        Contact
      </Link>
    ),
    icon: <PersonLinesFill />,
  },
];

const Formatted = ({ children }) => {
  // const usersdata = JSON.parse(localStorage.getItem("loggedInUser"));
  const userData = useSelector((e) => e.userData);

  const usertypleformenu = localStorage.getItem("userType");

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" ||
    location.pathname === "/landingpage" ||
    location.pathname === "/otplogin" ||
    location.pathname === "/finishSignUp" ||
    location.pathname === "/register" ||
    location.pathname === "/not-allowed";

  if (isLoginPage) {
    return <div>{children}</div>;
  }
  const handlelogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userType");
    localStorage.removeItem("formDraft");
    Cookies.remove("token");
    navigate("/landingpage");
  };
  const content = (
    <div className="d-flex flex-column ">
      <Button type="text">Profile</Button>

      <Button type="text" onClick={handlelogout}>
        Sign out
      </Button>
    </div>
  );

  const currentPath = location.pathname;
  const buttonStyle = { width: "180px" };

  return (
    <Layout hasSider style={{ minHeight: "100%" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100%",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 999, // To Ensure Sider is above other content
        }}
        theme="dark"
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={230}
        collapsedWidth={80}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            flexWrap: "wrap",
            alignItems: "center",
            color: "white",
          }}
        >
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ fontSize: "24px" }} />
              ) : (
                <MenuFoldOutlined style={{ fontSize: "24px" }} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{ width: 64, height: 64, color: "white" }}
            className="ps-2"
          />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[currentPath]}
          defaultOpenKeys={["dashboard"]}
          theme="dark"
          style={{ height: "100%", borderRight: 0 }}
          items={usertypleformenu === "Admin" ? Admin : User}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 230,
          transition: "margin-left 0.4s",
        }}
      >
        <Navbar
          variant="light"
          expand="md"
          style={{
            padding: 0,
            background: colorBgContainer,
            top: 0,
            position: "sticky",
            zIndex: 1000,
          }}
          className="shadow-sm"
        >
          <Container fluid>
            <Navbar.Brand>
              <Row className="align-items-center">
                <Col xs={4} md={4} className="d-flex">
                 <img height={60} src={Logo}  alt="logo" />  
                </Col>
              </Row>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <div className="d-md-flex flex-md-row align-items-center">
                  <Space wrap className="d-none d-md-flex pe-2 ps-1">
                    <Popover content={content} title="" trigger="click">
                      <Button style={buttonStyle}>
                        {userData?.username}
                        <CaretDownOutlined />
                      </Button>
                    </Popover>
                  </Space>
                  {/* Responsive display for mobile view */}
                  <div className="d-md-none">
                    <div className="d-flex flex-column">
                      <Popover content={content} title="" trigger="click">
                        <Button className="mb-2">
                          {userData?.username}
                          <CaretDownOutlined />
                        </Button>
                      </Popover>
                    </div>
                  </div>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Content
          style={{ margin: "10px 10px", overflow: "hidden", minHeight: 500 }}
        >
          <div
            style={{
              padding: 18,
              height: "100%",
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowX: "hidden", // Handle horizontal overflow
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          RockG MicroTech ©2024 Created by MERN FullStack Developer
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Formatted;
