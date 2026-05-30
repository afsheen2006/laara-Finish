import { Calendar, MapPin, ArrowRight, Plus, Edit, Trash2, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CourseEditor } from "@/components/admin/course-editor";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { resolveImageUrl } from "@/lib/cms-helpers";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";

export function CoursesSection({ coursesBlock, isAdmin, onSave }) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [expandedCourseId, setExpandedCourseId] = useState(null);

  let courses = [];
  try {
    courses = coursesBlock ? JSON.parse(coursesBlock.content || "[]") : [];
  } catch (e) {
    console.error("Error parsing coursesBlock:", e);
  }

  const [localCourses, setLocalCourses] = useState(courses);

  // Sync local state when prop changes
  useEffect(() => {
    setLocalCourses(courses);
  }, [coursesBlock]);

  const handleDeleteCourse = async (courseId) => {
    const updatedCourses = localCourses.filter((c) => c.id !== courseId);
    
    // Optimistic UI Update
    setLocalCourses(updatedCourses);

    try {
      const blockId = coursesBlock.id || coursesBlock._id;
      const res = await apiClient.put(`/cms/blocks/${blockId}`, { content: JSON.stringify(updatedCourses) });
      if (res.data.success) {
        toast.success("Course deleted successfully");
        if (onSave) onSave();
      } else {
        toast.error("Failed to delete course");
        setLocalCourses(courses); // Revert
      }
    } catch (e) {
      toast.error("Failed to delete course: " + e.message);
      setLocalCourses(courses); // Revert
    }
  };

  const handleEditorSave = () => {
    if (onSave) onSave();
    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between border-b border-border/30 pb-4">
        <h2 className="text-3xl font-black tracking-tight flex items-center gap-3 text-foreground">
          <BookOpen className="w-6 h-6 text-primary" />
          Training & <span className="text-primary">Courses</span>
        </h2>
        {isAdmin && (
          <Button
            onClick={() => setIsEditorOpen(true)}
            className="bg-primary/10 border border-primary/30 text-primary font-bold hover:bg-primary hover:text-black flex items-center gap-2 rounded-full px-5 py-2 text-xs cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            Manage Courses
          </Button>
        )}
      </div>

      {localCourses.length === 0 && !isAdmin ? (
        <div className="py-16 text-center glass-card rounded-[2.5rem] border border-border/20">
          <p className="text-muted-foreground font-medium">No courses are currently available. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isAdmin && (
            <button
              onClick={() => setIsEditorOpen(true)}
              className="group relative flex flex-col rounded-[2.5rem] border-2 border-dashed border-primary/50 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all duration-500 min-h-[400px] items-center justify-center cursor-pointer"
            >
              <Plus className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-primary font-bold text-lg">Add New Course</span>
            </button>
          )}

          {localCourses.map((course) => (
            <div key={course.id} className="group relative flex flex-col rounded-[2.5rem] glass-card overflow-hidden hover:border-primary/50 transition-all duration-500">
              <div className="aspect-[16/10] overflow-hidden relative bg-black/20 flex items-center justify-center">
                {/* Blurred background */}
                <div className="absolute inset-0 w-full h-full z-0">
                  <img
                    src={resolveImageUrl(course.image) || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"}
                    alt=""
                    className="w-full h-full object-cover blur-2xl opacity-60 scale-150"
                  />
                </div>
                {/* Main Image */}
                <img
                  src={resolveImageUrl(course.image) || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"}
                  alt={course.title}
                  className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
                
                {isAdmin && (
                  <div className="absolute top-6 right-6 flex gap-2 z-20">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsEditorOpen(true);
                      }}
                      className="p-2 rounded-xl bg-black/60 hover:bg-primary hover:text-black border border-white/10 transition-colors text-white cursor-pointer"
                      title="Edit Course"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteCourse(course.id);
                      }}
                      className="p-2 rounded-xl bg-black/60 hover:bg-red-500 hover:text-white border border-white/10 transition-colors text-white cursor-pointer"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-1 justify-between">
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                    {course.description}
                  </p>
                  <div className="space-y-4 mb-8">
                    {course.startDate && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                        <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        Starts: {course.startDate}
                      </div>
                    )}
                    {course.date && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                        <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        Duration: {course.date}
                      </div>
                    )}
                    {course.location && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                        <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center border border-border group-hover:border-secondary/30 transition-colors">
                          <MapPin className="w-4 h-4 text-secondary" />
                        </div>
                        {course.location}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full mt-auto pt-4 flex flex-col gap-3">
                  {course.gformLink ? (
                    <a
                      href={course.gformLink.startsWith("http") ? course.gformLink : `https://${course.gformLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        className="w-full h-14 rounded-2xl bg-primary text-black hover:bg-primary/90 font-bold text-sm cursor-pointer"
                      >
                        Apply Now
                      </Button>
                    </a>
                  ) : (
                    <a
                      href="/contact"
                      className="w-full"
                    >
                      <Button
                        className="w-full h-14 rounded-2xl bg-primary text-black hover:bg-primary/90 font-bold text-sm cursor-pointer"
                      >
                        Register Interest
                      </Button>
                    </a>
                  )}
                  <a href={`/edutech/course/${course.id}`} className="w-full">
                    <Button variant="outline" className="w-full h-14 rounded-2xl border border-border hover:bg-muted font-bold text-sm">
                      Read More
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditorOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col pointer-events-auto p-8 z-10"
            >
              <button
                onClick={() => setIsEditorOpen(false)}
                className="absolute top-6 right-6 z-30 p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="overflow-y-auto pr-2 z-20">
                <CourseEditor
                  coursesBlock={coursesBlock}
                  onSave={handleEditorSave}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
