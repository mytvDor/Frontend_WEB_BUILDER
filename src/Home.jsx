import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Code, Globe, Zap, Cpu, Shield, RefreshCcw } from "lucide-react"
import { Link } from "react-router-dom";

export default function DarkLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      {/* <header className="px-4 lg:px-6 h-14 flex items-center border-b border-zinc-800">
        <a className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6 text-lime-400" />
          <span className="ml-2 text-xl font-bold">DeployNow</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:text-blue-400 transition-colors" href="#features">
            Features
          </a>
          <a className="text-sm font-medium hover:text-blue-400 transition-colors" href="#pricing">
            Pricing
          </a>
          <a className="text-sm font-medium hover:text-blue-400 transition-colors" href="#testimonials">
            Testimonials
          </a>
          <a className="text-sm font-medium hover:text-blue-400 transition-colors" href="#contact">
            Contact
          </a>
        </nav>
      </header> */}
      <main className="flex-1">
        <section className="w-full h-auto py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className=" text-5xl mb-14 font-bold tracking-tighter sm:text-5xl md:text-5xl lg:text-9xl/none bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-teal-400">
                  Deploy at the Speed of Innovation
                </h1>
                <p className="mx-auto  max-w-[700px] text-zinc-400 md:text-xl" >
                  DeployNow empowers developers to build, deploy, and scale applications with unprecedented ease. 
                  Say goodbye to infrastructure headaches and hello to seamless deployment.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex m-24 align-middle justify-center space-x-2">
                  {/* <Input className="max-w-lg flex-1 bg-zinc-900 border-zinc-800" placeholder="Enter your email" type="email" /> */}
                  <Button type="submit" className="bg-lime-400 text-black hover:bg-white">
                  <Link to="/createsite" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Create
            </Link>                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-zinc-400">
                  14-day free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center  mb-12">Powerful Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Globe, title: "Global Edge Network", description: "Deploy your applications to a worldwide network for lightning-fast access from any location." },
                { icon: Code, title: "Serverless Functions", description: "Write and deploy code without managing servers. Scale automatically with demand." },
                { icon: Zap, title: "Instant Deployments", description: "Push to git and see your changes live in seconds. Automatic rollbacks ensure stability." },
                { icon: Cpu, title: "Advanced Analytics", description: "Gain deep insights into your application's performance and user behavior." },
                { icon: Shield, title: "Enterprise-Grade Security", description: "Benefit from built-in SSL, DDoS protection, and regular security audits." },
                { icon: RefreshCcw, title: "Continuous Integration", description: "Automatically build, test, and deploy your code with every commit." },
              ].map((feature, index) => (
                <Card key={index} className="bg-zinc-800 border-zinc-700">
                  <CardHeader>
                    <feature.icon className="h-8 w-8 mb-2 text-lime-400" />
                    <CardTitle className="text-lime-400">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-200">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Simple, Transparent Pricing</h2>
            <Tabs defaultValue="monthly" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="annual">Annual Billing (Save 20%)</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { name: "Starter", price: "$29", features: ["Up to 5 Projects", "50GB Bandwidth", "5 Custom Domains", "Basic Analytics", "Community Support"] },
                    { name: "Pro", price: "$99", features: ["Unlimited Projects", "500GB Bandwidth", "Unlimited Custom Domains", "Advanced Analytics", "Priority Support", "CI/CD Integration"] },
                    { name: "Enterprise", price: "Custom", features: ["Everything in Pro", "Dedicated Infrastructure", "99.99% Uptime SLA", "24/7 Phone Support", "Custom Integrations", "On-premises Deployment Option"] },
                  ].map((plan) => (
                    <Card key={plan.name} className="flex flex-col text-lime-300 bg-zinc-800 border-zinc-700">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">{plan.name}</CardTitle>
                        <CardDescription className="text-center">
                          <span className="text-4xl font-bold text-white">{plan.price}</span>
                          {plan.price !== "Custom" && <span className="text-sm">/month</span>}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-zinc-400">
                              <CheckCircle className="text-lime-400 mr-2 h-4 w-4" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-lime-400 text-black">{plan.price === "Custom" ? "Contact Sales" : "Choose Plan"}</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="annual">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { name: "Starter", price: "$278", features: ["Up to 5 Projects", "50GB Bandwidth", "5 Custom Domains", "Basic Analytics", "Community Support"] },
                    { name: "Pro", price: "$948", features: ["Unlimited Projects", "500GB Bandwidth", "Unlimited Custom Domains", "Advanced Analytics", "Priority Support", "CI/CD Integration"] },
                    { name: "Enterprise", price: "Custom", features: ["Everything in Pro", "Dedicated Infrastructure", "99.99% Uptime SLA", "24/7 Phone Support", "Custom Integrations", "On-premises Deployment Option"] },
                  ].map((plan) => (
                    <Card key={plan.name} className="flex flex-col bg-zinc-800 border-zinc-700">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center text-lime-400">{plan.name}</CardTitle>
                        <CardDescription className="text-center">
                          <span className="text-4xl font-bold text-white">{plan.price}</span>
                          {plan.price !== "Custom" && <span className="text-sm">/year</span>}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-zinc-400">
                              <CheckCircle className="text-lime-400 mr-2 h-4 w-4" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-lime-400 text-black">{plan.price === "Custom" ? "Contact Sales" : "Choose Plan"}</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Customers Say</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Alex Johnson", role: "CTO, TechCorp", quote: "DeployNow has revolutionized our deployment process. We've cut our time-to-market by 50%." },
                { name: "Sarah Lee", role: "Lead Developer, InnovateCo", quote: "The scalability and performance of DeployNow's infrastructure is unmatched. It's a game-changer for our team." },
                { name: "Michael Zhang", role: "Founder, StartupX", quote: "As a startup, DeployNow's pricing and features allowed us to punch above our weight. Highly recommended!" },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-lime-400 border-lime-400 hover:bg-white">
                  <CardHeader>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription className="text-black text-md">{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm  text-zinc-900 ">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Get in Touch</h2>
            <div className="mx-auto max-w-lg space-y-4">
              <p className="text-center text-zinc-400">
                Have questions or need help? Our team is here to assist you. Reach out and we'll get back to you as soon as possible.
              </p>
              <form className="space-y-4">
                <Input placeholder="Your Name" className="bg-zinc-900 border-zinc-800" />
                <Input placeholder="Your Email" type="email" className="bg-zinc-900 border-zinc-800" />
                <textarea
                  className="w-full h-32 px-3 py-2 text-white bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
                  placeholder="Your Message"
                ></textarea>
                <Button className="w-full text-black bg-lime-400 hover:bg-white">Send Message</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">About Us</h3>
              <p className="text-sm text-zinc-400">DeployNow is revolutionizing the way developers deploy and manage their applications.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Connect</h3>
              
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <p className="text-center text-xs text-zinc-400">
              © 2024 DeployNow Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}