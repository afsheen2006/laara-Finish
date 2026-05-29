import { useState, useEffect } from "react";
import { Plus, Trash2, Save, X, Settings, Link as LinkIcon, Image, Upload, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";

export function CourseEditor({ coursesBlock, onSave }) {
  const [courses, setCourses] = useState(() => {
    try {
      return JSON.parse(coursesBlock?.content || "[]");
    } catch (e) {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  useEffect(() => {
    if (coursesBlock?.content) {
      try {
        setCourses(JSON.parse(coursesBlock.content));
      } catch (e) {
        console.error("Failed to parse coursesBlock.content:", e);
      }
    }
  }, [coursesBlock]);

  const handleSave = async () => {
    if (!coursesBlock) {
      setLoading(true);
      try {
        const response = await apiClient.post("/cms/blocks", {
          type: "COURSES_CONFIGURATION",
          title: "Research Courses",
          content: JSON.stringify(courses),
          order: 98
        });
        if (response.data.success) {
          toast.success("Courses initialized successfully");
          if (onSave) onSave();
        } else {
          toast.error("Failed to initialize courses");
        }
      } catch (e) {
        console.error("Save error:", e);
        toast.error("An error occurred while saving: " + (e.message || "Unknown error"));
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      const blockId = coursesBlock.id || coursesBlock._id;
      const res = await apiClient.put(`/cms/blocks/${blockId}`, { content: JSON.stringify(courses) });
      if (res.data.success) {
        toast.success("Courses updated successfully");
        if (onSave) onSave();
      } else {
        toast.error("Failed to save courses");
      }
    } catch (e) {
      console.error("Save error:", e);
      toast.error("An error occurred while saving: " + (e.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, courseId) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    setUploadingField(courseId);

    try {
      const raw = localStorage.getItem("user");
      let email = "";
      if (raw) {
        try { email = JSON.parse(raw).email; } catch(err){}
      }
      const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5001").replace("5000", "5001");
      const res = await fetch(`${API_URL}/api/cms/upload`, {
        method: "POST",
        headers: { "x-user-email": email },
        body: uploadData
      });
      
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Upload failed");
      }
      
      const data = await res.json();
      updateCourse(courseId, { image: data.url });
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploadingField(null);
    }
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Math.random().toString(36).substr(2, 9),
        title: "New Course",
        description: "Course short description...",
        image: "",
        startDate: "",
        date: "",
        location: "",
        gformLink: "",
        curriculum: []
      }
    ]);
  };

  const updateCourse = (id, updates) => {
    setCourses(courses.map((c) => c.id === id ? { ...c, ...updates } : c));
  };

  const removeCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const addCurriculumItem = (courseId) => {
    setCourses(courses.map((c) => {
      if (c.id === courseId) {
        return {
          ...c,
          curriculum: [...(c.curriculum || []), { heading: "", text: "" }]
        };
      }
      return c;
    }));
  };

  const updateCurriculumItem = (courseId, index, field, value) => {
    setCourses(courses.map((c) => {
      if (c.id === courseId) {
        const newCurriculum = [...(c.curriculum || [])];
        newCurriculum[index] = { ...newCurriculum[index], [field]: value };
        return { ...c, curriculum: newCurriculum };
      }
      return c;
    }));
  };

  const removeCurriculumItem = (courseId, index) => {
    setCourses(courses.map((c) => {
      if (c.id === courseId) {
        const newCurriculum = [...(c.curriculum || [])];
        newCurriculum.splice(index, 1);
        return { ...c, curriculum: newCurriculum };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Course Manager</h2>
          <p className="text-muted-foreground text-sm">Add, edit or delete courses displayed in the Research section.</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={addCourse}
            className="border-border hover:bg-muted"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Course
          </Button>
          <Button
            onClick={handleSave}
            type="button"
            disabled={loading}
            className="bg-primary text-black font-bold hover:bg-primary/90"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Publish Changes
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {courses.length === 0 ? (
          <div className="p-12 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-center bg-card">
            <Settings className="w-8 h-8 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-foreground font-semibold mb-2">No Courses Added</h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">Click "Add Course" above to create the first course for the research page.</p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="p-6 border border-border rounded-2xl bg-card space-y-6 relative group/card">
              <div className="flex items-start justify-between pb-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{course.title || "Untitled Course"}</h3>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">ID: {course.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCourse(course.id)}
                    className="border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Course Title</label>
                    <Input
                      value={course.title}
                      onChange={(e) => updateCourse(course.id, { title: e.target.value })}
                      placeholder="e.g. Advanced Propeller Dynamics"
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Short Description</label>
                    <Textarea
                      value={course.description}
                      onChange={(e) => updateCourse(course.id, { description: e.target.value })}
                      className="bg-background border-border min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Start Date</label>
                      <Input
                        value={course.startDate || ""}
                        onChange={(e) => updateCourse(course.id, { startDate: e.target.value })}
                        placeholder="e.g. Sept 15, 2026"
                        className="bg-background border-border h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Duration</label>
                      <Input
                        value={course.date}
                        onChange={(e) => updateCourse(course.id, { date: e.target.value })}
                        placeholder="e.g. 4 Weeks"
                        className="bg-background border-border h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Location / Format</label>
                      <Input
                        value={course.location}
                        onChange={(e) => updateCourse(course.id, { location: e.target.value })}
                        placeholder="e.g. Online / Main Campus"
                        className="bg-background border-border h-9"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Course Image</label>
                    <div className="flex items-center gap-3">
                      {course.image ? (
                        <img src={course.image} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-border" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center border border-border">
                          <Image className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <label className="cursor-pointer border border-border hover:bg-muted px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 text-foreground">
                        {uploadingField === course.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                        Upload Image
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, course.id)} />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                      <LinkIcon className="w-3 h-3" /> Apply Link (Google Form)
                    </label>
                    <Input
                      value={course.gformLink || ""}
                      onChange={(e) => updateCourse(course.id, { gformLink: e.target.value })}
                      placeholder="e.g. https://forms.gle/..."
                      className="bg-background border-border h-9"
                    />
                  </div>
                </div>
              </div>

              {/* Curriculum Section */}
              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Course Curriculum / Syllabus</label>
                  <button
                    onClick={() => addCurriculumItem(course.id)}
                    type="button"
                    className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Section
                  </button>
                </div>
                
                {(course.curriculum || []).length === 0 ? (
                  <div className="text-xs text-muted-foreground italic">No syllabus sections added yet.</div>
                ) : (
                  <div className="space-y-4">
                    {(course.curriculum || []).map((item, index) => (
                      <div key={index} className="p-4 rounded-xl bg-background border border-border space-y-3 relative group">
                        <button
                          onClick={() => removeCurriculumItem(course.id, index)}
                          type="button"
                          className="absolute -top-2 -right-2 p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Sub Heading</label>
                          <Input
                            value={item.heading}
                            onChange={(e) => updateCurriculumItem(course.id, index, "heading", e.target.value)}
                            placeholder="e.g. Module 1: Introduction"
                            className="bg-card border-border rounded-lg h-9 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Content Text</label>
                          <Textarea
                            value={item.text}
                            onChange={(e) => updateCurriculumItem(course.id, index, "text", e.target.value)}
                            placeholder="Details about this module..."
                            className="bg-card border-border rounded-lg min-h-[80px] text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
