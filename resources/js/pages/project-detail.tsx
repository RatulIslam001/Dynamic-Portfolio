import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, User, Link as LinkIcon } from 'lucide-react';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  category: string;
  is_featured: boolean;
  completion_date?: string;
  client_name?: string;
  project_url?: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
};

type Props = {
  project: Project;
  relatedProjects: Project[];
};

export default function ProjectDetail({ project, relatedProjects }: Props) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <Head title={`${project.title} - Project Details`} />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 cursor-pointer" 
            >
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#20B2AA] rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <span className="font-medium text-base">Portfolio</span>
              </Link>
            </motion.div>
          </div>

          <NavigationMenu>
            <NavigationMenuList className="flex gap-8">
              {['Home', 'Services', 'Works', 'Skills', 'Resume', 'Testimonials', 'Contact'].map((item, index) => (
                <NavigationMenuItem key={item}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                  {item === 'Works' ? (
                    <Link
                      href="/projects"
                      className="text-sm font-medium cursor-pointer text-[#20B2AA] hover:text-[#20B2AA] transition-colors relative group after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#20B2AA] after:rounded-full"
                    >
                      {item}
                    </Link>
                  ) : item === 'Home' ? (
                    <Link
                      href="/"
                      className="text-sm font-medium cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#20B2AA] transition-colors relative group"
                    >
                      {item}
                    </Link>
                  ) : item === 'Contact' ? (
                    <Link
                      href="/#contact"
                      className="text-sm font-medium cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#20B2AA] transition-colors relative group"
                    >
                      {item}
                    </Link>
                  ) : item === 'Services' ? (
                    <Link
                      href="/services"
                      className="text-sm font-medium cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#20B2AA] transition-colors relative group"
                    >
                      {item}
                    </Link>
                  ) : (
                    <Link
                      href={`/#${item.toLowerCase() === 'works' ? 'works' : item.toLowerCase()}`}
                      className="text-sm font-medium cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#20B2AA] transition-colors relative group"
                    >
                      {item}
                    </Link>
                  )}
                  </motion.div>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/#contact">
                <Button className="bg-[#20B2AA] hover:bg-[#1a9994] text-white px-6 py-2.5 text-sm">
                  Hire Me
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.nav>
        
        {/* Content with padding to account for fixed navbar */}
        <div className="pt-24">
          {/* Back to Projects Button */}
          <div className="max-w-7xl mx-auto px-4 mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <Link 
                href={route('projects')}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#20B2AA] dark:hover:text-[#20B2AA] transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Projects</span>
              </Link>
            </motion.div>
          </div>
          
          {/* Project Detail */}
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md">
                    {/* Project Image */}
                    <div className="relative h-[300px] sm:h-[400px]">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-400 dark:text-gray-500">No image available</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#20B2AA] text-white text-sm px-3 py-1 rounded-full">{project.category}</span>
                      </div>
                    </div>
                    
                    {/* Project Content */}
                    <div className="p-6 sm:p-8">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">{project.title}</h1>
                      <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed whitespace-pre-line">{project.description}</p>
                      
                      {/* Project Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span 
                                key={index}
                                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Project Actions */}
                      <div className="flex flex-wrap gap-4">
                        {project.live_url && (
                          <a 
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#20B2AA] hover:bg-[#1a9994] text-white px-5 py-3 rounded-lg transition-colors duration-300"
                          >
                            <ExternalLink className="w-5 h-5" />
                            <span>View Live</span>
                          </a>
                        )}
                        
                        {project.github_url && (
                          <a 
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 px-5 py-3 rounded-lg transition-colors duration-300"
                          >
                            <Github className="w-5 h-5" />
                            <span>View Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Sidebar */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Details</h3>
                    
                    <div className="space-y-4">
                      {project.client_name && (
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-[#E6F7F6] rounded-lg">
                            <User className="w-5 h-5 text-[#20B2AA]" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Client</p>
                            <p className="text-gray-900 dark:text-white font-medium">{project.client_name}</p>
                          </div>
                        </div>
                      )}
                      
                      {project.completion_date && (
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-[#E6F7F6] rounded-lg">
                            <Calendar className="w-5 h-5 text-[#20B2AA]" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Completed On</p>
                            <p className="text-gray-900 dark:text-white font-medium">{project.completion_date}</p>
                          </div>
                        </div>
                      )}
                      
                      {project.project_url && (
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-[#E6F7F6] rounded-lg">
                            <LinkIcon className="w-5 h-5 text-[#20B2AA]" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Project URL</p>
                            <a 
                              href={project.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#20B2AA] hover:underline font-medium break-all"
                            >
                              {project.project_url}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Related Projects */}
                  {relatedProjects.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Related Projects</h3>
                        
                        <div className="space-y-4">
                          {relatedProjects.map((relatedProject) => (
                            <Link 
                              key={relatedProject.id} 
                              href={`/projects/${relatedProject.id}`}
                              className="block group"
                            >
                              <div className="flex gap-3 items-start">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  {relatedProject.image ? (
                                    <img 
                                      src={relatedProject.image} 
                                      alt={relatedProject.title} 
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                      <span className="text-gray-400 dark:text-gray-500 text-xs">No image</span>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-gray-900 dark:text-white font-medium group-hover:text-[#20B2AA] transition-colors duration-300">
                                    {relatedProject.title}
                                  </h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                    {relatedProject.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 mt-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#20B2AA] rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
              <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
                Let's collaborate and bring your ideas to life with cutting-edge technology and innovative
                solutions tailored to your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/?section=contact"
                  className="px-8 py-3.5 bg-[#20B2AA] hover:bg-[#1a9e98] text-white font-medium rounded-lg w-full sm:w-auto transition-all duration-300 shadow-lg shadow-[#20B2AA]/20"
                >
                  Start a Project
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 border border-gray-700 text-white font-medium rounded-lg hover:border-[#20B2AA] hover:text-[#20B2AA] w-full sm:w-auto transition-all duration-300"
                >
                  Download Resume
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
} 