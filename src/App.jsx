// import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Loader2, Trash2 } from 'lucide-react';

// interface Website {
//   id: string;
//   username: string;
//   templateName: string;
//   liveUrl: string;
// }

// interface FormData {
//   username: string;
//   templateName: string;
//   title: string;
//   content: string;
// }

// export default function WebsiteGenerator() {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [websites, setWebsites] = useState<Website[]>([]);
//   const [formData, setFormData] = useState<FormData>({
//     username: '',
//     templateName: 't1',
//     title: '',
//     content: ''
//   });

//   useEffect(() => {
//     const storedWebsites = localStorage.getItem('websites');
//     if (storedWebsites) {
//       setWebsites(JSON.parse(storedWebsites));
//     }
//   }, []);

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTemplateChange = (value: string) => {
//     setFormData(prev => ({ ...prev, templateName: value }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/generate-sites', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: formData.username,
//           templateName: formData.templateName,
//           siteData: {
//             title: formData.title,
//             content: formData.content
//           }
//         })
//       });
//       if (response.ok) {
//         const result = await response.json();

//         const newWebsite: Website = {
//           id: result.site_id,
//           username: formData.username,
//           templateName: formData.templateName,
//           liveUrl: result.liveUrl
//         };

//         const updatedWebsites = [...websites, newWebsite];
//         setWebsites(updatedWebsites);
//         localStorage.setItem('websites', JSON.stringify(updatedWebsites));

//         alert("Website Created Successfully:\n" +
//               `Live URL: ${newWebsite.liveUrl}\n` +
//               `Site ID: ${newWebsite.id}`);

//         setFormData({ username: '', templateName: 't1', title: '', content: '' });
//       } else {
//         throw new Error('Failed to generate website');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert("Error: Failed to create the website. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUpdate = async (siteId: string) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/update-site', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           siteId,
//           username: formData.username,
//           templateName: formData.templateName,
//           siteData: {
//             title: formData.title,
//             content: formData.content
//           }
//         })
//       });
//       if (response.ok) {
//         const updatedSite = await response.json();
//         setWebsites(prev => prev.map(site => site.id === siteId ? updatedSite : site));
//         localStorage.setItem('websites', JSON.stringify(websites));
//         alert("Your website has been successfully updated.");
//       } else {
//         throw new Error('Failed to update website');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert("Error: Failed to update the website. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (siteId: string) => {
//     try {
//       const response = await fetch('http://localhost:8000/delete-site', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ siteId })
//       });
//       if (response.ok) {
//         const updatedWebsites = websites.filter(site => site.id !== siteId);
//         setWebsites(updatedWebsites);
//         localStorage.setItem('websites', JSON.stringify(updatedWebsites));
//         alert("Your website has been successfully deleted.");
//       } else {
//         throw new Error('Failed to delete website');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert("Error: Failed to delete the website. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Tabs defaultValue="create">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="create">Create Website</TabsTrigger>
//           <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
//         </TabsList>
//         <TabsContent value="create">
//           <Card>
//             <CardHeader>
//               <CardTitle>Create a New Website</CardTitle>
//               <CardDescription>Fill out the form to generate your website.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="username">Username</Label>
//                   <Input id="username" name="username" value={formData.username} onChange={handleInputChange} required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="template">Template</Label>
//                   <Select name="templateName" value={formData.templateName} onValueChange={handleTemplateChange}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a template" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="t1">Template 1</SelectItem>
//                       <SelectItem value="t2">Template 2</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Title</Label>
//                   <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="content">Content</Label>
//                   <Textarea id="content" name="content" value={formData.content} onChange={handleInputChange} required />
//                 </div>
//                 <Button type="submit" disabled={isLoading}>
//                   {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                   Generate Website
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="dashboard">
//           <Card>
//             <CardHeader>
//               <CardTitle>Your Websites</CardTitle>
//               <CardDescription>Manage your generated websites.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Username</TableHead>
//                     <TableHead>Template</TableHead>
//                     <TableHead>Live URL</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {websites.map((site) => (
//                     <TableRow key={site.id}>
//                       <TableCell>{site.username}</TableCell>
//                       <TableCell>{site.templateName}</TableCell>
//                       <TableCell>
//                         <a href={site.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                           {site.liveUrl}
//                         </a>
//                       </TableCell>
//                       <TableCell>
//                         <Button variant="outline" size="sm" onClick={() => handleUpdate(site.id)} className="mr-2">
//                           Update
//                         </Button>
//                         <Button variant="destructive" size="sm" onClick={() => handleDelete(site.id)}>
//                           <Trash2 className="mr-2 h-4 w-4" /> Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Auth from './Auth';
// import AdminDashboard from './sections/AdminDashboard';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<Auth />} /> {/* Auth route */}
//           <Route path="/dashboard" element={<AdminDashboard />} /> {/* AdminDashboard route */}
//           {/* Add more routes here as needed */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// /App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Auth';
import AdminDashboard from './sections/AdminDashboard';
import CreateWebsite from './sections/CreateWebsite';
import WebsiteDashboard from './sections/WebsiteDashboard';
import Navbar from './sections/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path="/auth" element={<Auth />} /> {/* Auth route */}
          {/* <Route path="/dashboard" element={<AdminDashboard />}> */}
            <Route path="/createsite" element={<CreateWebsite />} />
            <Route path="/websitedashboard" element={<WebsiteDashboard />} />
          {/* </Route> */}
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
