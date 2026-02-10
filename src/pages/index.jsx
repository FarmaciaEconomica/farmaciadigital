import Layout from "./Layout.jsx";
import { AdminSidebarProvider } from '@/contexts/AdminSidebarContext';

import AdminCustomers from "./AdminCustomers";

import AdminDashboard from "./AdminDashboard";

import AdminFinancial from "./AdminFinancial";

import AdminImportHistory from "./AdminImportHistory";

import AdminImportProducts from "./AdminImportProducts";

import AdminOrders from "./AdminOrders";

import AdminPrescriptions from "./AdminPrescriptions";

import AdminMedications from "./AdminMedications";

import AdminProducts from "./AdminProducts";

import AdminPromotions from "./AdminPromotions";

import AdminReports from "./AdminReports";

import AdminSettings from "./AdminSettings";

import Blog from "./Blog";

import Cart from "./Cart";

import Category from "./Category";

import CustomerArea from "./CustomerArea";

import CustomerAreaEnhanced from "./CustomerAreaEnhanced";

import DeliveryAreas from "./DeliveryAreas";

import Favorites from "./Favorites";

import Home from "./Home";

import Product from "./Product";

import Promotions from "./Promotions";

import Search from "./Search";

import TrackOrder from "./TrackOrder";

import UploadPrescription from "./UploadPrescription";

import AdminStoreEditor from "./AdminStoreEditor";

import AdminVisualEditor from "./AdminVisualEditor";

import Login from "./Login";
import Register from "./Register";
import AdminLogin from "./AdminLogin";
import ProtectedRoute from "@/components/ProtectedRoute";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    AdminCustomers: AdminCustomers,
    AdminDashboard: AdminDashboard,
    AdminLogin: AdminLogin,
    
    AdminFinancial: AdminFinancial,
    
    AdminImportHistory: AdminImportHistory,
    
    AdminImportProducts: AdminImportProducts,
    
    AdminOrders: AdminOrders,
    
    AdminPrescriptions: AdminPrescriptions,
    AdminMedications: AdminMedications,
    
    AdminProducts: AdminProducts,
    
    AdminPromotions: AdminPromotions,
    
    AdminReports: AdminReports,
    
    AdminSettings: AdminSettings,
    
    Blog: Blog,
    
    Cart: Cart,
    
    Category: Category,
    
    CustomerArea: CustomerArea,
    
    CustomerAreaEnhanced: CustomerAreaEnhanced,
    
    DeliveryAreas: DeliveryAreas,
    
    Favorites: Favorites,
    
    Home: Home,
    Login: Login,
    Register: Register,
    Product: Product,
    
    Promotions: Promotions,
    
    Search: Search,
    
    TrackOrder: TrackOrder,
    
    UploadPrescription: UploadPrescription,
    
    AdminStoreEditor: AdminStoreEditor,
    
    AdminVisualEditor: AdminVisualEditor,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    
    // Se a URL for vazia ou apenas "/", retornar "Home"
    if (!urlLastPart || urlLastPart === '') {
        return 'Home';
    }
    
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || 'Home'; // Retornar 'Home' como padrão ao invés da primeira página
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    const isAdminPage = currentPage?.startsWith('Admin');
    
    return (
        <AdminSidebarProvider>
            <Layout currentPageName={currentPage}>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/AdminLogin" element={<AdminLogin />} />

                <Route path="/AdminCustomers" element={<ProtectedRoute><AdminCustomers /></ProtectedRoute>} />
                <Route path="/AdminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/AdminFinancial" element={<ProtectedRoute><AdminFinancial /></ProtectedRoute>} />
                <Route path="/AdminImportHistory" element={<ProtectedRoute><AdminImportHistory /></ProtectedRoute>} />
                <Route path="/AdminImportProducts" element={<ProtectedRoute><AdminImportProducts /></ProtectedRoute>} />
                <Route path="/AdminOrders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
                <Route path="/AdminPrescriptions" element={<ProtectedRoute><AdminPrescriptions /></ProtectedRoute>} />
                <Route path="/AdminMedications" element={<ProtectedRoute><AdminMedications /></ProtectedRoute>} />
                <Route path="/AdminProducts" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
                <Route path="/AdminPromotions" element={<ProtectedRoute><AdminPromotions /></ProtectedRoute>} />
                <Route path="/AdminReports" element={<ProtectedRoute><AdminReports /></ProtectedRoute>} />
                <Route path="/AdminSettings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
                <Route path="/AdminStoreEditor" element={<ProtectedRoute><AdminStoreEditor /></ProtectedRoute>} />
                <Route path="/AdminVisualEditor" element={<ProtectedRoute><AdminVisualEditor /></ProtectedRoute>} />

                <Route path="/Blog" element={<Blog />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/Category" element={<Category />} />
                <Route path="/CustomerArea" element={<CustomerAreaEnhanced />} />
                <Route path="/CustomerAreaOld" element={<CustomerArea />} />
                <Route path="/DeliveryAreas" element={<DeliveryAreas />} />
                <Route path="/Favorites" element={<Favorites />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Product" element={<Product />} />
                <Route path="/Promotions" element={<Promotions />} />
                <Route path="/Search" element={<Search />} />
                <Route path="/TrackOrder" element={<TrackOrder />} />
                <Route path="/UploadPrescription" element={<UploadPrescription />} />
                </Routes>
            </Layout>
        </AdminSidebarProvider>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}