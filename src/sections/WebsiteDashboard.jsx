import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from 'lucide-react';
import { Loader2 } from 'lucide-react'; // Import a loader icon

const WebsiteDashboard = ({ websites, setWebsites, fetchWebsites }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    username: '',
    templateName: '',
    siteData: { title: '', content: '' }, // Added siteData object
  });
  const [loading, setLoading] = useState(false); // New loading state
const [Del_loading , setDel_loading]= useState(false)
  const handleDelete = async (siteId) => {
    console.log(siteId)
    setDel_loading(true)
    try {
      const response = await fetch('http://localhost:8000/delete-site', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId })
      });
      if (response.ok) {
        alert("Your website has been successfully deleted.");
        fetchWebsites(); // Refresh the websites after deletion
      } else {
        throw new Error('Failed to delete website');
      }
      setDel_loading(false)

    } catch (error) {
        setDel_loading(false)
      console.error('Error:', error);
      alert("Error: Failed to delete the website. Please try again.");
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
          siteData: editData.siteData, // Pass siteData object
        })
      });
      if (response.ok) {
        alert("Website updated successfully!");
        setIsEditing(false); // Hide the update form
        fetchWebsites(); // Refresh the website list
      } else {
        throw new Error('Failed to update website');
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error: Failed to update the website. Please try again.");
    }
  };

  const startEditing = (site) => {
    setEditData({
      id: site.siteId, // Set the ID of the site being edited
      username: site.username,
      templateName: site.templateName,
      siteData: { title: site.siteData.title, content: site.siteData.content } // Populate siteData with existing values
    });
    setIsEditing(true); // Show the update form
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Template</TableHead>
            <TableHead>Live URL</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {websites.map((site) => (
            <TableRow key={site.siteId}>
              <TableCell>{site.username}</TableCell>
              <TableCell>{site.templateName}</TableCell>
              <TableCell>
                <a href={site.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  {site.liveUrl}
                </a>
              </TableCell>
              <TableCell>
                <Button variant="destructive" disabled={Del_loading} size="sm" onClick={() => handleDelete(site.siteId)}>
                  <Trash2 className="mr-2 h-4 w-4" />  {Del_loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Delete"} 
                </Button>
                <Button variant="outline" size="sm" onClick={() => startEditing(site)}>
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow-md w-1/3">
            <h3 className="text-lg font-bold">Update Website</h3>
            <div className="space-y-2">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                value={editData.username}
                onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                className="border border-gray-500 w-full p-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="templateName">Template</label>
              <select
                id="templateName"
                value={editData.templateName}
                onChange={(e) => setEditData({ ...editData, templateName: e.target.value })}
                className="border border-gray-500 w-full p-2"
              >
                <option value="t1">Template 1</option>
                <option value="t2">Template 2</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                value={editData.siteData.title} // Use siteData.title for input
                onChange={(e) => setEditData({ ...editData, siteData: { ...editData.siteData, title: e.target.value } })}
                className="border border-gray-500 w-full p-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                value={editData.siteData.content} // Use siteData.content for textarea
                onChange={(e) => setEditData({ ...editData, siteData: { ...editData.siteData, content: e.target.value } })}
                className="border border-gray-500 w-full p-2"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
            <Button type="submit"  disabled={loading}> {/* Disable button while loading */}
                {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Update Website"} {/* Show loader icon */}
            </Button>          
            <Button type="button" onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default WebsiteDashboard;
