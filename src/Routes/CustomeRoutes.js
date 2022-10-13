import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ChangePasswordPage from '../pages/ChangePasswordPage'
import Contact from '../pages/Contact'
import EditProfilePage from '../pages/EditProfilePage'
import HomePage from '../pages/HomePage'
import NotFound from '../pages/NotFound'
import Privacy from '../pages/Privacy'
import Terms from '../pages/Terms'
import DashboardContainer from '../components/Dashboard/DashboardContainer'
import CryptoGames from '../components/Games/CryptoGames'
import ProtectedRoute from './ProtectedRoute'
import Deposit from '../pages/Deposit'
import ApiError from '../pages/ApiError'
import ServerError from '../pages/ServerError'
import UnderMaintenance from '../pages/UnderMaintenance'

const CustomeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/crypto-games" element={<CryptoGames />} />
            <Route
                path="/deposit"
                element={
                    <ProtectedRoute>
                        <Deposit />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/changePassword"
                element={
                    <ProtectedRoute>
                        <ChangePasswordPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/editProfile"
                element={
                    <ProtectedRoute>
                        <EditProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboardContainer"
                element={
                    <ProtectedRoute>
                        <DashboardContainer />
                    </ProtectedRoute>
                }
            />

            <Route path="/api-error" element={<ApiError />} />
            <Route path="/server-error" element={<ServerError />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/maintenance" element={<UnderMaintenance />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default CustomeRoutes