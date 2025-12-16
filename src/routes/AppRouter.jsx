import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import ArticleDetail from "../components/ArticleDetail";
import AboutUs from "../components/AboutUs";
import FromTheEditorsDesk from "../components/FromTheEditorsDesk";
import BoardPage from "../components/BoardPage";
import BoardMembers from "../components/BoardMembers";
import SubboardMembers from "../components/SubboardMembers";
import Notices from "../components/Notices";
import Login from "../components/Login";

import AdminLayout from "../components/AdminLayout";
import AdminDashboard from "../components/AdminDashboard";
import AdminArticlesList from "../components/AdminArticlesList";
import EditArticle from "../components/EditArticle";
import UploadNotices from "../components/UploadNotices";
import AdminStatistics from "../components/AdminStatistics";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = ({ articles }) => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage articles={articles} />} />

      <Route
        path="/articles/:id"
        element={<ArticleDetail articles={articles} />}
      />

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
        }
      >
        <Route path="new" element={<AdminDashboard articles={articles} />} />
        <Route
          path="modify"
          element={<AdminArticlesList articles={articles} />}
        />
        <Route path="edit/:id" element={<EditArticle />} />
        <Route path="statistics" element={<AdminStatistics />} />
        <Route path="upload-notice" element={<UploadNotices />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
