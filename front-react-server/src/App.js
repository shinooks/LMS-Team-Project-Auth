import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import RoleBasedRoute from './components/routes/RoleBasedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Callback from './pages/auth/Callback'
import Home from './pages/auth/Home'
// Student Pages
import StudentDashboard from './pages/student/dashboard/Dashboard';
import StudentCourseList from './pages/student/courses/CourseList';
import StudentCourseDetail from './pages/student/courses/CourseDetail';
import StudentAssignmentList from './pages/student/assignments/AssignmentList';
import StudentAssignmentSubmit from './pages/student/assignments/AssignmentSubmit';
import StudentGradeList from './pages/student/grades/GradeList';
import CourseEnrollment from './pages/student/enrollment/CourseEnrollment';
import StudentTimetable from './pages/student/timetable/StudentTimetable';

// Professor Pages
import ProfessorDashboard from './pages/professor/dashboard/Dashboard';
import ProfessorCourseManagement from './pages/professor/courses/CourseManagement';
import ProfessorCourseCreate from './pages/professor/courses/CourseCreate';
import ProfessorAssignmentManagement from './pages/professor/assignments/AssignmentManagement';
import ProfessorGradeAssignment from './pages/professor/assignments/GradeAssignment';
import ProfessorStudentList from './pages/professor/students/StudentList';

// Admin Pages
import AdminDashboard from './pages/admin/dashboard/Dashboard';
import AdminUserManagement from './pages/admin/users/UserManagement';
import AdminUserCreate from './pages/admin/users/UserCreate';
import AdminCourseManagement from './pages/admin/courses/CourseManagement';
import AdminSettings from './pages/admin/system/Settings';
import AdminLogs from './pages/admin/system/Logs';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/auth/home" element={<Home />} />


        {/* Student Routes */}
        <Route
            path="/student"
            element={
                <RoleBasedRoute allowedRoles={['student']}>
                    <Layout />
                </RoleBasedRoute>
            }
        >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="enrollment" element={<CourseEnrollment />} />
            <Route path="timetable" element={<StudentTimetable />} />
            <Route path="courses" element={<StudentCourseList />} />
            <Route path="courses/:id" element={<StudentCourseDetail />} />
            <Route path="assignments" element={<StudentAssignmentList />} />
            <Route path="assignments/submit/:id" element={<StudentAssignmentSubmit />} />
            <Route path="grades" element={<StudentGradeList />} />
        </Route>

        {/* Professor Routes */}
        <Route
            path="/professor"
            element={
                <RoleBasedRoute allowedRoles={['professor']}>
                    <Layout />
                </RoleBasedRoute>
            }
        >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ProfessorDashboard />} />
            <Route path="courses" element={<ProfessorCourseManagement />} />
            <Route path="courses/create" element={<ProfessorCourseCreate />} />
            <Route path="assignments" element={<ProfessorAssignmentManagement />} />
            <Route path="assignments/grade/:id" element={<ProfessorGradeAssignment />} />
            <Route path="students" element={<ProfessorStudentList />} />
        </Route>

        {/* Admin Routes */}
        <Route
            path="/admin"
            element={
                <RoleBasedRoute allowedRoles={['admin']}>
                    <Layout />
                </RoleBasedRoute>
            }
        >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUserManagement />} />
            <Route path="users/create" element={<AdminUserCreate />} />
            <Route path="courses" element={<AdminCourseManagement />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="logs" element={<AdminLogs />} />
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/auth/home" replace />} />
        <Route path="*" element={<Navigate to="/auth/home" replace />} />
    </Routes>
  );
};

export default App;