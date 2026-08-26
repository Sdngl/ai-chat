import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// Student pages
import StudentLayout from "./pages/students/StudentLayout";
import Dashboard from "./pages/students/Dashboard";
import Courses from "./pages/students/Courses";
import CourseDetails from "./pages/students/CourseDetails";
import Lesson from "./pages/students/Lesson";
import MyLearning from "./pages/students/MyLearning";
import Progress from "./pages/students/Progress";
import Quiz from "./pages/students/Quiz";
import Profile from "./pages/students/Profile";
import Settings from "./pages/students/Setting";
import Companion from "./pages/students/Companion";
import SkillMapPage from "./pages/students/SkillMapPage";
import QuizArena from "./pages/student/QuizArena";
import SoloRun from "./pages/student/SoloRun";
import QuizResults from "./pages/student/QuizResults";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            {/* /student → redirect to /student/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course/:id" element={<CourseDetails />} />
            <Route path="lesson/:id" element={<Lesson />} />
            <Route path="learning" element={<MyLearning />} />
            <Route path="progress" element={<Progress />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="map" element={<SkillMapPage />} />
            <Route path="companion" element={<Companion />} />
            <Route path="arena" element={<QuizArena />} />
            <Route path="arena/solo" element={<SoloRun />} />
            <Route path="arena/results" element={<QuizResults />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
