// /sections/CreateWebsite.jsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

const CreateWebsite = ({ fetchWebsites, websites, setWebsites }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    templateName: 't1',
    title: '',
    content: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTemplateChange = (value) => {
    setFormData((prev) => ({ ...prev, templateName: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      });
      if (response.ok) {
        const result = await response.json();

        const newWebsite = {
          id: result.site_id,
          username: formData.username,
          templateName: formData.templateName,
          liveUrl: result.liveUrl
        };

        const updatedWebsites = [...websites, newWebsite];
        setWebsites(updatedWebsites);
        localStorage.setItem('websites', JSON.stringify(updatedWebsites));

        alert("Website Created Successfully:\n" +
          `Live URL: ${newWebsite.liveUrl}\n` +
          `Site ID: ${newWebsite.id}`);

        setFormData({ username: '', templateName: 't1', title: '', content: '' });
      } else {
        throw new Error('Failed to generate website');
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error: Failed to create the website. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="dark:bg-#060d1c border border-gray-500">
      <CardHeader>
        <CardTitle>Create a New Website</CardTitle>
        <CardDescription>Fill out the form to generate your website.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input className="border border-gray-500" id="username" name="username" value={formData.username} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select name="templateName" value={formData.templateName} onValueChange={handleTemplateChange}>
              <SelectTrigger className="border border-gray-500">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent className="border border-gray-600">
                <SelectItem className="border border-gray-500" value="t1">Template 1</SelectItem>
                <SelectItem className="border border-gray-500" value="t2">Template 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input className="border border-gray-500" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea className="border border-gray-500" id="content" name="content" value={formData.content} onChange={handleInputChange} required />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Website
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateWebsite;
