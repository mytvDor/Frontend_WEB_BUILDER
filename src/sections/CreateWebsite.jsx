// // /sections/CreateWebsite.jsx
// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2 } from 'lucide-react';

// const CreateWebsite = ({ fetchWebsites, websites, setWebsites }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     templateName: 't1',
//     title: '',
//     content: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTemplateChange = (value) => {
//     setFormData((prev) => ({ ...prev, templateName: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/generate-sites', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: formData.username,
//           templateName: formData.templateName,
//           userId: localStorage.getItem('email'),
//           siteData: {
//             title: formData.title,
//             content: formData.content
//           }
//         })
//       });
//       if (response.ok) {
//         const result = await response.json();

//         const newWebsite = {
//           id: result.site_id,
//           username: formData.username,
//           templateName: formData.templateName,
//           liveUrl: result.liveUrl
//         };

//         const updatedWebsites = [...websites, newWebsite];
//         setWebsites(updatedWebsites);
//         localStorage.setItem('websites', JSON.stringify(updatedWebsites));

//         alert("Website Created Successfully:\n" +
//           `Live URL: ${newWebsite.liveUrl}\n` +
//           `Site ID: ${newWebsite.id}`);

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

//   return (
//     <Card className="dark:bg-#060d1c border border-gray-500">
//       <CardHeader>
//         <CardTitle>Create a New Website</CardTitle>
//         <CardDescription>Fill out the form to generate your website.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="username">Username</Label>
//             <Input className="border border-gray-500" id="username" name="username" value={formData.username} onChange={handleInputChange} required />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="template">Template</Label>
//             <Select name="templateName" value={formData.templateName} onValueChange={handleTemplateChange}>
//               <SelectTrigger className="border border-gray-500">
//                 <SelectValue placeholder="Select a template" />
//               </SelectTrigger>
//               <SelectContent className="border border-gray-600">
//                 <SelectItem className="border border-gray-500" value="t1">Template 1</SelectItem>
//                 <SelectItem className="border border-gray-500" value="t2">Template 2</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="title">Title</Label>
//             <Input className="border border-gray-500" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="content">Content</Label>
//             <Textarea className="border border-gray-500" id="content" name="content" value={formData.content} onChange={handleInputChange} required />
//           </div>
//           <Button type="submit" disabled={isLoading}>
//             {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//             Generate Website
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default CreateWebsite;
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Globe, Layout, Type, FileText } from 'lucide-react'
// import { FormWrapper } from "formstash"
const CreateWebsite = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    templateName: 't1',
    title: '',
    content: ''
  })
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTemplateChange = (value) => {
    setFormData((prev) => ({ ...prev, templateName: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/generate-sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          templateName: formData.templateName,
          userId: localStorage.getItem('email'),
          siteData: {
            title: formData.title,
            content: formData.content
          }
        })
      })
      if (response.ok) {
        const result = await response.json()

        const newWebsite = {
          id: result.site_id,
          username: formData.username,
          templateName: formData.templateName,
          liveUrl: result.liveUrl
        }

        const updatedWebsites = [...websites, newWebsite]
        setWebsites(updatedWebsites)
        localStorage.setItem('websites', JSON.stringify(updatedWebsites))

        alert("Website Created Successfully:\n" +
          `Live URL: ${newWebsite.liveUrl}\n` +
          `Site ID: ${newWebsite.id}`)

        setFormData({ username: '', templateName: 't1', title: '', content: '' })
      } else {
        throw new Error('Failed to generate website')
      }
    } catch (error) {
      console.error('Error:', error)
      alert("Error: Failed to create the website. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto bg-zinc-950 border-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">Create a New Website</CardTitle>
          <CardDescription className="text-gray-400">Fill out the form below to generate your custom website.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-300">
                Username
              </Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-10 bg-zinc-900 border-gray-700 text-white"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="template" className="text-sm font-medium text-gray-300">
                Template
              </Label>
              <Select name="templateName" value={formData.templateName} onValueChange={handleTemplateChange}>
                <SelectTrigger className="w-full bg-zinc-900 border-gray-700 text-white">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-gray-700">
                  <SelectItem value="t1">Template 1</SelectItem>
                  <SelectItem value="t2">Template 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-300">
                Title
              </Label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="pl-10 bg-zinc-900 border-gray-700 text-white"
                  placeholder="Enter website title"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium text-gray-300">
                Content
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="pl-10 min-h-[100px] bg-zinc-900 border-gray-700 text-white"
                  placeholder="Enter website content"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-zinc-200 hover:bg-zinc-700 hover:text-white text-black" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Layout className="mr-2 h-4 w-4" />
                  Generate Website
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateWebsite