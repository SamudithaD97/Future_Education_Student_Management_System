// 
import { useNavigate } from 'react-router-dom';
import "../components/homePage.css";
import '../components/homeBackground.css';

function HomePage() {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate('/login');
  };

  const handleTeacherLogin = () => {
    navigate('/teachersLogin');
  };

  return (
    <div className="card mx-auto mt-16 p-8 max-w-lg bg-slate-300 rounded-lg   ">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome to FUTURE EDUCATION Student Management System</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <a href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded">
          Students
        </a>
        <a href="/teachersRegister" className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded">
          Teachers
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={handleStudentLogin} className="bg-red-700 hover:bg-red-900 text-white font-bold py-4 px-8 rounded">
          Login as Student
        </button>
        <button onClick={handleTeacherLogin} className="bg-red-700 hover:bg-red-900 text-white font-bold py-4 px-8 rounded">
          Login as Teacher
        </button>
      </div>
    </div>
  );
}

export default HomePage;