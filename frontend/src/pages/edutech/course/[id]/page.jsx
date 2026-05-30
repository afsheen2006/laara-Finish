import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getNavLinks, getSystemConfig, getBlocks } from "@/lib/cms-helpers";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Clock, MapPin, ArrowRight, Loader2, Info, BookOpen } from "lucide-react";
import { Link } from 'react-router-dom';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CourseDetailPage() {
  const params = useParams();
  const [navLinks, setNavLinks] = useState([]);
  const [config, setConfig] = useState({});
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      getNavLinks(),
      getSystemConfig(),
      getBlocks()
    ]).then(([navLinksData, configData, blocksData]) => {
      setNavLinks(navLinksData || []);
      setConfig(configData || {});
      
      const coursesBlock = blocksData.find(b => b.type === "COURSES_CONFIGURATION");
      if (coursesBlock) {
        try {
          const courses = JSON.parse(coursesBlock.content);
          const foundCourse = courses.find(c => String(c.id) === String(params.id));
          setCourse(foundCourse || null);
        } catch (e) {
          console.error("Failed to parse courses", e);
        }
      }
      setLoading(false);
    });
  }, [params.id]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black flex flex-col justify-between">
      <Navigation customLinks={navLinks} config={config} loading={loading} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 select-none flex-1">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <span className="text-sm font-semibold tracking-widest text-muted-foreground animate-pulse uppercase">Loading Course Details...</span>
        </div>
      ) : !course ? (
        <section className="py-40 px-4 text-center max-w-xl mx-auto space-y-6 flex-1 flex flex-col justify-center items-center">
          <BookOpen className="w-16 h-16 text-primary animate-pulse" />
          <h1 className="text-4xl font-black tracking-tight">Course Not Found</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">The course you are looking for might have been removed, or the URL contains an invalid ID.</p>
          <Link to="/drone-rd">
            <Button className="bg-primary text-black font-bold hover:bg-primary/90 rounded-2xl gap-2 px-6 h-12">
              <ChevronLeft className="w-4 h-4" /> Back to Research & Development
            </Button>
          </Link>
        </section>
      ) : (
        <div className="flex-1 pt-24 sm:pt-40 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
          <div className="relative z-10">
            <Link to="/drone-rd" className="inline-flex items-center text-sm font-semibold text-primary hover:underline group gap-1">
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Research & Development
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {/* Left main details column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent leading-none">
                  {course.title}
                </h1>
              </div>

              <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-border bg-muted relative">
                <img
                  src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=2000&q=80"}
                  alt={course.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              <div className="glass-card rounded-[2.5rem] p-8 sm:p-10 space-y-6">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" /> About the Course
                </h3>
                <p className="text-muted-foreground leading-relaxed font-semibold text-lg whitespace-pre-wrap">
                  {course.detailedDescription || course.description}
                </p>
                <hr className="border-border" />
                
                {(!course.curriculum || course.curriculum.length === 0) ? (
                  <div className="text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap space-y-4 font-medium">
                    Detailed curriculum is not available for this course yet.
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" /> Curriculum & Syllabus
                    </h3>
                    <div className="space-y-6">
                      {(course.curriculum || []).map((item, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            {item.heading}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed text-sm font-medium whitespace-pre-wrap pl-4 border-l border-primary/20">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right details box sidebar */}
            <div className="space-y-8">
              <div className="glass-card rounded-[2.5rem] p-8 space-y-6">
                <h4 className="text-lg font-bold text-foreground">Course Details</h4>
                <div className="space-y-4">
                  {course.startDate && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-primary flex-shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Start Date</div>
                        <div className="text-sm font-semibold text-foreground mt-0.5">{course.startDate}</div>
                      </div>
                    </div>
                  )}
                  {course.date && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-secondary flex-shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Duration</div>
                        <div className="text-sm font-semibold text-foreground mt-0.5">{course.date}</div>
                      </div>
                    </div>
                  )}
                  {course.location && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-accent flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Location / Format</div>
                        <div className="text-sm font-semibold text-foreground mt-0.5">{course.location}</div>
                      </div>
                    </div>
                  )}
                </div>
                <hr className="border-border" />
                <div className="space-y-3">
                  {course.gformLink ? (
                    <a href={course.gformLink.startsWith("http") ? course.gformLink : `https://${course.gformLink}`} target="_blank" rel="noopener noreferrer" className="block">
                      <Button
                        className="w-full h-14 bg-primary text-black font-black hover:bg-primary/90 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  ) : (
                    <Link to="/contact" className="block">
                      <Button className="w-full h-14 bg-primary text-black font-black hover:bg-primary/90 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        Register Interest <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                  <Link to="/contact" className="block">
                    <Button variant="outline" className="w-full h-14 border-border hover:bg-muted text-foreground font-bold rounded-2xl">
                      Inquire for Custom Training
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer config={config} />
    </main>
  );
}