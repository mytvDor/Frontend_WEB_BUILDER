// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Trash2 } from 'lucide-react';
// import { Loader2 } from 'lucide-react'; // Import a loader icon

// const WebsiteDashboard = ({ websites, setWebsites, fetchWebsites }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({
//     id: '',
//     username: '',
//     templateName: '',
//     siteData: { title: '', content: '' }, // Added siteData object
//   });
//   const [loading, setLoading] = useState(false); // New loading state
// const [Del_loading , setDel_loading]= useState(false)
//   const handleDelete = async (siteId) => {
//     console.log(siteId)
//     setDel_loading(true)
//     try {
//       const response = await fetch('http://localhost:8000/delete-site', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ siteId })
//       });
//       if (response.ok) {
//         alert("Your website has been successfully deleted.");
//         fetchWebsites(); // Refresh the websites after deletion
//       } else {
//         throw new Error('Failed to delete website');
//       }
//       setDel_loading(false)

//     } catch (error) {
//         setDel_loading(false)
//       console.error('Error:', error);
//       alert("Error: Failed to delete the website. Please try again.");
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:8000/update-site`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           siteId: editData.id,
//           username: editData.username,
//           templateName: editData.templateName,
//           siteData: editData.siteData, // Pass siteData object
//         })
//       });
//       if (response.ok) {
//         alert("Website updated successfully!");
//         setIsEditing(false); // Hide the update form
//         fetchWebsites(); // Refresh the website list
//       } else {
//         throw new Error('Failed to update website');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert("Error: Failed to update the website. Please try again.");
//     }
//   };

//   const startEditing = (site) => {
//     setEditData({
//       id: site.siteId, // Set the ID of the site being edited
//       username: site.username,
//       templateName: site.templateName,
//       siteData: { title: site.siteData.title, content: site.siteData.content } // Populate siteData with existing values
//     });
//     setIsEditing(true); // Show the update form
//   };

//   return (
//     <>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Username</TableHead>
//             <TableHead>Template</TableHead>
//             <TableHead>Live URL</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {websites.map((site) => (
//             <TableRow key={site.siteId}>
//               <TableCell>{site.username}</TableCell>
//               <TableCell>{site.templateName}</TableCell>
//               <TableCell>
//                 <a href={site.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
//                   {site.liveUrl.slice(0,17)}
//                 </a>
//               </TableCell>
//               <TableCell >
//               <Button variant="default" size="sm" className="m-2" onClick={() => startEditing(site)}>
//                   Update
//                 </Button>
//                 <Button variant="destructive" disabled={Del_loading} size="sm" onClick={() => handleDelete(site.siteId)}>
// Delete                </Button>
              
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {isEditing && (
//         <div className="fixed inset-0 flex items-center justify-center bg-zinc-950 bg-opacity-50">
//           <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow-md w-1/3">
//             <h3 className="text-lg font-bold">Update Website</h3>
//             <div className="space-y-2">
//               <label htmlFor="username">Username</label>
//               <input
//                 id="username"
//                 value={editData.username}
//                 onChange={(e) => setEditData({ ...editData, username: e.target.value })}
//                 className="border border-gray-500 w-full p-2"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="templateName">Template</label>
//               <select
//                 id="templateName"
//                 value={editData.templateName}
//                 onChange={(e) => setEditData({ ...editData, templateName: e.target.value })}
//                 className="border border-gray-500 w-full p-2"
//               >
//                 <option value="t1">Template 1</option>
//                 <option value="t2">Template 2</option>
//               </select>
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="title">Title</label>
//               <input
//                 id="title"
//                 value={editData.siteData.title} // Use siteData.title for input
//                 onChange={(e) => setEditData({ ...editData, siteData: { ...editData.siteData, title: e.target.value } })}
//                 className="border border-gray-500 w-full p-2"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="content">Content</label>
//               <textarea
//                 id="content"
//                 value={editData.siteData.content} // Use siteData.content for textarea
//                 onChange={(e) => setEditData({ ...editData, siteData: { ...editData.siteData, content: e.target.value } })}
//                 className="border border-gray-500 w-full p-2"
//                 required
//               />
//             </div>
//             <div className="flex justify-end space-x-2">
//             <Button type="submit"  disabled={loading}> {/* Disable button while loading */}
//                 {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Update Website"} {/* Show loader icon */}
//             </Button>          
//             <Button type="button" onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
//             </div>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default WebsiteDashboard;


import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"; 
import{Button} from "@/components/ui/button" 
  // Import Shadcn components
import { Trash2, Loader2 } from 'lucide-react'; // Import icons

const WebsiteDashboard = () => {


  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    username: '',
    templateName: '',
    siteData: { title: '', content: '' },
  });
  const [loading, setLoading] = useState(false);
  const [Del_loading, setDel_loading] = useState(false);

  const [websites, setWebsites] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

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

  const handleDelete = async (siteId) => {
    setDel_loading(true);
    try {
      const response = await fetch('http://localhost:8000/delete-site', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId })
      });
      if (response.ok) {
        alert("Your website has been successfully deleted.");
        fetchWebsites();
      } else {
        throw new Error('Failed to delete website');
      }
    } catch (error) {
      alert("Error: Failed to delete the website. Please try again.");
    } finally {
      setDel_loading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/update-site`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId: editData.id,
          username: editData.username,
          templateName: editData.templateName,
          siteData: editData.siteData,
        })
      });
      if (response.ok) {
        alert("Website updated successfully!");
        setIsEditing(false);
        fetchWebsites();
      } else {
        throw new Error('Failed to update website');
      }
    } catch (error) {
      alert("Error: Failed to update the website. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (site) => {
    setEditData({
      id: site.siteId,
      username: site.username,
      templateName: site.templateName,
      siteData: { title: site.siteData.title, content: site.siteData.content }
    });
    setIsEditing(true);
  };

  return (
    <div className="bg-zinc-950 min-h-screen p-8"> 
    <div className="flex justify-start items-center flex-wrap">
  {websites.map((site) => (
    <Card key={site.siteId} className="bg-zinc-900 text-white w-72 m-2"> {/* Added 2cm margin around each card */}
      <CardHeader>
        <CardTitle className="text-lg font-bold text-lime-400">{site.username}</CardTitle>
        <CardDescription className="text-zinc-400" >Template: {site.templateName} </CardDescription>
        <CardDescription  className="text-zinc-300">Content: {site.siteData.content} </CardDescription>

      </CardHeader>
      <CardContent className="text-lime-400">
      Link <a href={site.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mb-2 block">
          {site.liveUrl.slice(0, 17)}
        </a>
        <br></br>
        ID <br></br> <div className="text-white">{site.siteId}</div>
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
        <Button variant="default"className="bg-lime-400 text-black" size="sm" onClick={() => startEditing(site)}>
          Update
        </Button>
        <Button variant="destructive" size="sm" disabled={Del_loading} onClick={() => handleDelete(site.siteId)}>
          {Del_loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>


      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-950 bg-opacity-75">
          <form onSubmit={handleUpdate} className="bg-zinc-900 p-6 rounded-lg shadow-md w-full text-white"> {/* Dark form */}
            <h3 className="text-lg font-bold mb-4">Update Website</h3>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">Username</label>
              <input
                id="username"
                value={editData.username}
                onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                className="border border-gray-500 bg-zinc-950 w-full p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="templateName" className="block mb-2">Template</label>
              <select
                id="templateName"
                value={editData.templateName}
                onChange={(e) => setEditData({ ...editData, templateName: e.target.value })}
                className="border border-gray-500 bg-zinc-950 w-full p-2 rounded"
              >
                <option value="t1">Template 1</option>
                <option value="t2">Template 2</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2">Title</label>
              <input
                id="title"
                value={editData.siteData.title}
                onChange={(e) => setEditData({ ...editData, siteData: { ...editData.siteData, title: e.target.value } })}
                className="border border-gray-500 bg-zinc-950 w-full p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block mb-2">Content</label>
              <textarea
                id="content"
                value={editData.siteData.content}
                onChange={(e) => setEditData({ ...editData, siteData: { ...editData.siteData, content: e.target.value } })}
                className="border border-gray-500 bg-zinc-950 w-full p-2 rounded"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Update Website"}
              </Button>
              <Button type="button" className="text-blue-950" onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WebsiteDashboard;
