import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  setDoc,
  writeBatch,
  serverTimestamp,
  disableNetwork,
  enableNetwork
} from 'firebase/firestore';
import { auth, db, forceReconnect, isOnline } from '../firebase/config';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiX, FiAlertTriangle, FiRefreshCw, FiWifi, FiWifiOff } from 'react-icons/fi';

// Modal component for projects and skills
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-secondary-dark border border-white/10 rounded-xl p-6 w-full max-w-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <FiX className="text-white" />
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [networkStatus, setNetworkStatus] = useState(isOnline ? 'online' : 'offline');
  const [isRetrying, setIsRetrying] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
    technologies: '',
    featured: false
  });

  const [skillForm, setSkillForm] = useState({
    name: '',
    icon: '',
    category: '',
    proficiency: 0
  });

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      }
    });

    // Load projects and skills
    loadData();

    // Set up connection state listeners
    const handleOnlineStatus = () => {
      setNetworkStatus('online');
      enableNetwork(db).then(() => {
        console.log('Network connection re-enabled');
        // Try to refresh data on reconnection
        loadData();
      });
    };

    const handleOfflineStatus = () => {
      setNetworkStatus('offline');
      disableNetwork(db).then(() => {
        console.log('Network connection disabled');
      });
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    return () => {
      unsubscribe();
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, [navigate]);

  const loadData = async () => {
    try {
      setIsRetrying(false);
      setLoading(true);
      setError('');
      
      // Try to fetch projects with retry logic
      let projectsData = [];
      try {
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        projectsData = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
      } catch (projectError) {
        console.error('Error loading projects:', projectError);
        setProjects([]);
        setError(prev => prev + `Projects: ${projectError.message}. `);
      }

      // Try to fetch skills with retry logic
      let skillsData = [];
      try {
        const skillsSnapshot = await getDocs(collection(db, 'skills'));
        skillsData = skillsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSkills(skillsData);
      } catch (skillError) {
        console.error('Error loading skills:', skillError);
        setSkills([]);
        setError(prev => prev + `Skills: ${skillError.message}`);
      }

      // If we got no data but also no error, it might be permissions
      if (projectsData.length === 0 && skillsData.length === 0 && !error) {
        console.warn('No data retrieved. Checking permissions...');
      }
    } catch (generalError) {
      console.error('General error loading data:', generalError);
      setError(`Failed to load data: ${generalError.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
      setError(`Error signing out: ${error.message}`);
    }
  };

  // Project CRUD operations
  const handleAddProject = () => {
    setCurrentProject(null);
    setProjectForm({
      title: '',
      description: '',
      imageUrl: '',
      liveUrl: '',
      githubUrl: '',
      technologies: '',
      featured: false
    });
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setProjectForm({
      ...project,
      technologies: project.technologies.join(', ')
    });
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', projectId));
        setProjects(projects.filter(project => project.id !== projectId));
      } catch (error) {
        console.error('Error deleting project:', error);
        setError(`Error deleting project: ${error.message}`);
      }
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const timestamp = serverTimestamp();
      const projectData = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(tech => tech.trim()),
        featured: Boolean(projectForm.featured),
        updatedAt: timestamp
      };

      if (currentProject) {
        // Update existing project
        try {
          const projectRef = doc(db, 'projects', currentProject.id);
          await updateDoc(projectRef, projectData);
          setProjects(projects.map(p => 
            p.id === currentProject.id ? { ...projectData, id: currentProject.id } : p
          ));
          setIsProjectModalOpen(false);
        } catch (error) {
          console.error('Error updating project:', error);
          setError(`Error updating project: ${error.message}`);
          
          // Try to set the document if update fails (permissions issue)
          try {
            await setDoc(doc(db, 'projects', currentProject.id), {
              ...projectData,
              createdAt: currentProject.createdAt || timestamp
            });
            setProjects(projects.map(p => 
              p.id === currentProject.id ? { ...projectData, id: currentProject.id } : p
            ));
            setIsProjectModalOpen(false);
          } catch (setDocError) {
            console.error('Error setting project document:', setDocError);
            setError(`Error saving project: ${setDocError.message}`);
          }
        }
      } else {
        // Add new project with batch write
        try {
          const batch = writeBatch(db);
          const newProjectRef = doc(collection(db, 'projects'));
          
          batch.set(newProjectRef, {
            ...projectData,
            createdAt: timestamp
          });
          
          await batch.commit();
          
          setProjects([...projects, { 
            ...projectData, 
            id: newProjectRef.id,
            createdAt: new Date() // Client-side date as placeholder
          }]);
          setIsProjectModalOpen(false);
        } catch (batchError) {
          console.error('Error in batch write for new project:', batchError);
          
          // Fall back to regular addDoc if batch fails
          try {
            const docRef = await addDoc(collection(db, 'projects'), {
              ...projectData,
              createdAt: timestamp
            });
            
            setProjects([...projects, { 
              ...projectData, 
              id: docRef.id,
              createdAt: new Date() // Client-side date as placeholder
            }]);
            setIsProjectModalOpen(false);
          } catch (addDocError) {
            console.error('Error adding new project with addDoc:', addDocError);
            setError(`Error adding project: ${addDocError.message}`);
          }
        }
      }
    } catch (error) {
      console.error('Error in project submission:', error);
      setError(`Error saving project: ${error.message}`);
    }
  };

  // Skill CRUD operations
  const handleAddSkill = () => {
    setCurrentSkill(null);
    setSkillForm({
      name: '',
      icon: '',
      category: '',
      proficiency: 0
    });
    setIsSkillModalOpen(true);
  };

  const handleEditSkill = (skill) => {
    setCurrentSkill(skill);
    setSkillForm(skill);
    setIsSkillModalOpen(true);
  };

  const handleDeleteSkill = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteDoc(doc(db, 'skills', skillId));
        setSkills(skills.filter(skill => skill.id !== skillId));
      } catch (error) {
        console.error('Error deleting skill:', error);
        setError(`Error deleting skill: ${error.message}`);
      }
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const timestamp = serverTimestamp();
      const skillData = {
        ...skillForm,
        proficiency: Number(skillForm.proficiency),
        updatedAt: timestamp
      };

      if (currentSkill) {
        // Update existing skill with error handling and fallback
        try {
          await updateDoc(doc(db, 'skills', currentSkill.id), skillData);
          setSkills(skills.map(s => 
            s.id === currentSkill.id ? { ...skillData, id: currentSkill.id } : s
          ));
          setIsSkillModalOpen(false);
        } catch (updateError) {
          console.error('Error updating skill:', updateError);
          
          // Try setDoc as fallback
          try {
            await setDoc(doc(db, 'skills', currentSkill.id), {
              ...skillData,
              createdAt: currentSkill.createdAt || timestamp
            });
            setSkills(skills.map(s => 
              s.id === currentSkill.id ? { ...skillData, id: currentSkill.id } : s
            ));
            setIsSkillModalOpen(false);
          } catch (setDocError) {
            console.error('Error setting skill document:', setDocError);
            setError(`Error saving skill: ${setDocError.message}`);
          }
        }
      } else {
        // Add new skill with batch write
        try {
          const batch = writeBatch(db);
          const newSkillRef = doc(collection(db, 'skills'));
          
          batch.set(newSkillRef, {
            ...skillData,
            createdAt: timestamp
          });
          
          await batch.commit();
          
          setSkills([...skills, { 
            ...skillData, 
            id: newSkillRef.id,
            createdAt: new Date() // Client-side date as placeholder
          }]);
          setIsSkillModalOpen(false);
        } catch (batchError) {
          console.error('Error in batch write for new skill:', batchError);
          
          // Fall back to regular addDoc
          try {
            const docRef = await addDoc(collection(db, 'skills'), {
              ...skillData,
              createdAt: timestamp
            });
            
            setSkills([...skills, { 
              ...skillData, 
              id: docRef.id,
              createdAt: new Date() // Client-side date as placeholder
            }]);
            setIsSkillModalOpen(false);
          } catch (addDocError) {
            console.error('Error adding new skill with addDoc:', addDocError);
            setError(`Error adding skill: ${addDocError.message}`);
          }
        }
      }
    } catch (error) {
      console.error('Error in skill submission:', error);
      setError(`Error saving skill: ${error.message}`);
    }
  };

  const retryLoadData = async () => {
    setIsRetrying(true);
    
    // Try to force reconnect first
    if (networkStatus === 'offline') {
      try {
        const reconnected = await forceReconnect();
        if (reconnected) {
          console.log('Successfully reconnected to Firestore');
          setNetworkStatus('online');
        } else {
          console.warn('Reconnection attempt failed, but continuing with data load anyway');
        }
      } catch (error) {
        console.error('Error during reconnection attempt:', error);
      }
    }
    
    // Force re-enable network before retrying
    try {
      await enableNetwork(db);
      console.log('Network connection re-enabled for retry');
      
      // Short delay to allow connection to establish
      setTimeout(() => {
        loadData();
        setIsRetrying(false);
      }, 1000);
    } catch (error) {
      console.error('Error re-enabling network:', error);
      loadData(); // Try anyway
      setIsRetrying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-white mb-4">
            {isRetrying ? 'Retrying connection...' : 'Loading...'}
          </div>
          {networkStatus === 'offline' && (
            <div className="text-red-400 text-sm">
              You appear to be offline. Data may not be up to date.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-secondary-dark py-20 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            {networkStatus === 'offline' ? (
              <div className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-lg text-sm flex items-center">
                <FiWifiOff className="mr-2" /> Offline Mode
              </div>
            ) : (
              <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-lg text-sm flex items-center">
                <FiWifi className="mr-2" /> Connected
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 
              hover:bg-red-500/20 transition-all duration-200"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <div className="flex items-start gap-3">
              <FiAlertTriangle className="text-red-400 text-xl mt-1" />
              <div>
                <h3 className="text-red-400 font-medium mb-1">Error</h3>
                <p className="text-red-300 text-sm">{error}</p>
                <button 
                  onClick={retryLoadData}
                  className="mt-3 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm rounded flex items-center gap-1"
                >
                  <FiRefreshCw className={isRetrying ? "animate-spin" : ""} />
                  {isRetrying ? "Reconnecting..." : "Retry Connection"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Projects</h2>
            <button
              onClick={handleAddProject}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary 
              hover:bg-primary/20 transition-all duration-200"
            >
              <FiPlus /> Add Project
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="backdrop-blur-xl bg-black/30 rounded-xl border border-white/10 p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-black/20 rounded-xl border border-white/5">
                <p className="text-gray-400">No projects found. Add your first project!</p>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Skills</h2>
            <button
              onClick={handleAddSkill}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary 
              hover:bg-primary/20 transition-all duration-200"
            >
              <FiPlus /> Add Skill
            </button>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <div
                  key={skill.id}
                  className="backdrop-blur-xl bg-black/30 rounded-xl border border-white/10 p-4 
                  flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-white">{skill.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditSkill(skill)}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-black/20 rounded-xl border border-white/5">
                <p className="text-gray-400">No skills found. Add your first skill!</p>
              </div>
            )}
          </div>
        </section>

        {/* Project Modal */}
        <Modal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          title={currentProject ? 'Edit Project' : 'Add Project'}
        >
          <form onSubmit={handleProjectSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={projectForm.imageUrl}
                onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Live URL
              </label>
              <input
                type="url"
                value={projectForm.liveUrl}
                onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={projectForm.githubUrl}
                onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={projectForm.technologies}
                onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={projectForm.featured}
                onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                Featured Project
              </label>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsProjectModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
              >
                {currentProject ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Skill Modal */}
        <Modal
          isOpen={isSkillModalOpen}
          onClose={() => setIsSkillModalOpen(false)}
          title={currentSkill ? 'Edit Skill' : 'Add Skill'}
        >
          <form onSubmit={handleSkillSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={skillForm.name}
                onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Icon (emoji or icon code)
              </label>
              <input
                type="text"
                value={skillForm.icon}
                onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={skillForm.category}
                onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                required
              >
                <option value="">Select a category</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="devops">DevOps</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Proficiency (1-100)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={skillForm.proficiency}
                onChange={(e) => setSkillForm({ ...skillForm, proficiency: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsSkillModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
              >
                {currentSkill ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </motion.div>
  );
};

export default AdminDashboard; 