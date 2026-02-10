import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../reader/HomePage";
import ArticleDetail from "../reader/ArticleDetail";
import AboutUs from "../reader/AboutUs";
import FromTheEditorsDesk from "../reader/FromTheEditorsDesk";
import BoardPage from "../reader/BoardPage";
import BoardMembers from "../reader/BoardMembers";
import SubboardMembers from "../reader/SubboardMembers";
import Notices from "../reader/Notices";
import Login from "../auth/Login";

import AdminLayout from "../admin/AdminLayout";
import AdminDashboard from "../admin/AdminDashboard";
import AdminArticlesList from "../admin/AdminArticlesList";
import EditArticle from "../admin/EditArticle";
import UploadNotices from "../components/UploadNotices";
import AdminStatistics from "../admin/AdminStatistics";
import ProtectedRoute from "../auth/ProtectedRoute";

const AppRouter = ({ articles, total }) => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage articles={articles} total={total} />} />

      <Route path="/articles/:id" element={<ArticleDetail />} />

      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/fromTheEditorsDesk" element={<FromTheEditorsDesk />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/board/members" element={<BoardMembers />} />
      <Route path="/board/subboard" element={<SubboardMembers />} />
      <Route path="/notices" element={<Notices />} />
      <Route path="/login" element={<Login />} />

      {/* Admin routes (protected + layout) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
        <Route path="new" element={<AdminDashboard articles={articles} total={total} />} />
        <Route path="modify" element={<AdminArticlesList articles={articles} total={total} />} />
        <Route path="edit/:id" element={<EditArticle />} />
        <Route path="statistics" element={<AdminStatistics />} />
        <Route path="upload-notice" element={<UploadNotices />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
