import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import NotAllowed from "./NotAllowed.js";
import { Spin } from "antd";
import AddInvoiceTemplate from "./Components/AddInvoiceTemplate.js";

const Home = lazy(() => import("./Components/Home"));
const LoginForm = lazy(() => import("./Login.js"));
const Dash = lazy(() => import("./Components/user/Dash.js"));
const Info = lazy(() => import("./Components/user/Info.js"));
const OTPLogin = lazy(() => import("./OTPLogin.js"));
const FinishSignUp = lazy(() => import("./FinishSignUp.js"));
const RegisterForm = lazy(() => import("./Register.js"));
const LandingPage = lazy(() => import("./Components/LandingPage.js"));
const AdminDashboard = lazy(() => import("./Components/AdminDashboard.js"));
const UserDashboard = lazy(() => import("./Components/UserDashboard.js"));
const InvoiceProductTable = lazy(() => import("./Components/InvoiceProductTable.js"));
const AllCandidates = lazy(() => import("./Components/AllCandidates.js"));
const AddProduct = lazy(() => import("./Components/AddProduct.js"));
const AllProducts = lazy(() => import("./Components/AllProducts.js"));
const AddCandidates = lazy(() => import("./Components/Addcandidates.js"));
const AddMasterDetials = lazy(() => import("./Components/AddMasterDetials.js"));
const AllMasterDetials = lazy(() => import("./Components/AllMasterDetials.js"));
const InvoiceDataForm = lazy(() => import("./Components/InvoiceDataForm.js"));
const InvoiceDataTable = lazy(() => import("./Components/InvoiceDataTable.js"));
const Features = lazy(() => import("./Components/Features.js"));
const AddCustomerDetials = lazy(() => import("./Components/AddCustomerDetials.js"));
const AllCustomer = lazy(() => import("./Components/AllCustomer.js"));
const About = lazy(() => import("./Components/About.js"));
const SearchOperation = lazy(() => import("./Components/SearchOperation.js"));
const SearchSyncfusion = lazy(() => import("./Components/SearchSyncfusion.js"));
const Contact = lazy(() => import("./Components/Contact.js"));
const AddMasterProducts = lazy(() => import("./Components/AddMasterProducts.js"));
const AllMasterProducts = lazy(() => import("./Components/AllMasterProducts.js"));
const AddGST = lazy(() => import("./Components/AddGST.js"));
const AllGSTMaster = lazy(() => import("./Components/AllGSTMaster.js"));
const AllInvoiceTemplate  = lazy(() => import("./Components/AllInvoiceTemplate.js"));

export default function Router() {
  return (
    <Suspense fallback={<Spin size="large" 
     />}>
      <Routes>

        <Route path="/" element={<LoginForm />} />
        <Route path="/otplogin" element={<OTPLogin />} />
        <Route path="/finishSignUp" element={<FinishSignUp />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/landingpage" element={<LandingPage />} />


        <Route
          path="/Dash"
          element={
            <ProtectedRoute allowedAdminTypes={[2]}>
              <Dash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Info"
          element={
            <ProtectedRoute allowedAdminTypes={[2]}>
              <Info />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute allowedAdminTypes={[2]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        {/* Protected Routes for Admin (Type: 1) */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddMasterDetials"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AddMasterDetials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AllMasterDetials"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AllMasterDetials />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes for User (Type: 2) */}
        
        <Route
          path="/InvoiceSheet"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <InvoiceProductTable />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/AddInvoiceTemplate"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AddInvoiceTemplate />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/AllInvoiceTemplate"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AllInvoiceTemplate />
            </ProtectedRoute>
          }
        />
        
        {/* Shared Routes for both Admin (Type: 1) and User (Type: 2) */}
        <Route
          path="/Home"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AllCandidates"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AllCandidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CreateBill"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AllBill"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AllProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Addcandidates"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AddCandidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/InvoiceForm"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <InvoiceDataForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/InvoiceData"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <InvoiceDataTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Features"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <Features />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddCustomer"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AddCustomerDetials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AllCustomer"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AllCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/About"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Search"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <SearchOperation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SyncfusionSearch"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <SearchSyncfusion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Contact"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddMasterProducts"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AddMasterProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AllMasterProducts"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AllMasterProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddGST"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AddGST />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AllGSTMaster"
          element={
            <ProtectedRoute allowedAdminTypes={[1]}>
              <AllGSTMaster />
            </ProtectedRoute>
          }
        />
        
        <Route path="/not-allowed" element={<NotAllowed />} />
      </Routes>
    </Suspense>
  );
}
