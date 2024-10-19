// // /sections/AdminDashboard.jsx
// import { useState, useEffect } from 'react';
// import { Loader2 } from 'lucide-react';
// import Navbar from './Navbar';
// import CreateWebsite from './CreateWebsite';
// import WebsiteDashboard from './WebsiteDashboard';

// export default function AdminDashboard() {
//   const [websites, setWebsites] = useState([]);
//   const [currentSection, setCurrentSection] = useState('create'); // 'create' or 'dashboard'
//   const [loading, setLoading] = useState(false);

//   const fetchWebsites = async () => {
//     const email = localStorage.getItem('email');
//     if (!email) {
//       console.error('No email found in local storage');
//       return;
//     }
  
//     setLoading(true); // Assuming you have this state to indicate loading
//     try {
//       const response = await fetch(`http://localhost:8000/user-sites/${email}`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         setWebsites(data);
//       } else {
//         throw new Error('Failed to fetch websites');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert("Error: Failed to fetch websites. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   useEffect(() => {
//     fetchWebsites();
//   }, []);

//   return (
//     <div>
//       <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection} />
//       <div className="">
//         {loading ? (
//           <div className="flex justify-center">
//             <Loader2 className="animate-spin h-6 w-6" />
//           </div>
//         ) : (
//           <>
//             {currentSection === 'create' && <CreateWebsite fetchWebsites={fetchWebsites} websites={websites} setWebsites={setWebsites} />}
//             {currentSection === 'dashboard' && <WebsiteDashboard websites={websites} setWebsites={setWebsites} fetchWebsites={fetchWebsites} />}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// /sections/AdminDashboard.jsx




import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate, Outlet } from 'react-router-dom';

export default function AdminDashboard() {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchWebsites = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
      console.error('No email found in local storage');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/user-sites/${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        const data = await response.json();
        setWebsites(data);
      } else {
        throw new Error('Failed to fetch websites');
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error: Failed to fetch websites. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : (
          <Outlet context={{ websites, setWebsites, fetchWebsites }} />
        )}
      </div>
    </div>
  );
}
