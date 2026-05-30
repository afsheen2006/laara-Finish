
import { useState, useEffect } from "react";
import { Save, Calendar, Plus, Trash2, MapPin, Type, Image as ImageIcon, Upload, Link as LinkIcon, Clock } from "lucide-react";
import apiClient from "@/lib/api-client";

const updateBlock = async (id, data) => {
  const response = await apiClient.put(`/cms/blocks/${id}`, data);
  return response.data;
};

const addBlock = async (data) => {
  const response = await apiClient.post("/cms/blocks", data);
  return response.data;
};

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function EventEditor({ eventsBlock, onSave }) {
  const [events, setEvents] = useState(() => {
    try {
      return JSON.parse(eventsBlock?.content || "[]");
    } catch (e) {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  useEffect(() => {
    if (eventsBlock?.content) {
      try {
        setEvents(JSON.parse(eventsBlock.content));
      } catch (e) {
        console.error("Failed to parse eventsBlock.content:", e);
      }
    }
  }, [eventsBlock]);

  const handleSave = async () => {
    // Ensure all events have the uploadedByAdmin metadata set to true
    const sanitizedEvents = events.map(event => ({
      ...event,
      uploadedByAdmin: true
    }));

    if (!eventsBlock) {
      setLoading(true);
      try {
        const res = await addBlock({
          type: "TEXT_BLOCK",
          title: "Global Events Configuration",
          content: JSON.stringify(sanitizedEvents),
          order: 99
        });
        if (res.success) {
          toast.success("Event section initialized and saved");
          if (onSave) onSave();
        } else {
          toast.error("Failed to initialize events");
        }
      } catch (e) {
        toast.error("An error occurred while initializing events");
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      const res = await updateBlock(eventsBlock.id || eventsBlock._id, { content: JSON.stringify(sanitizedEvents) });
      if (res.success) {
        toast.success("Events updated successfully");
        if (onSave) onSave();
      } else {
        toast.error("Failed to save events");
      }
    } catch (e) {
      console.error("Save error:", e);
      toast.error("An error occurred while saving: " + (e.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, eventId) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    setUploadingField(eventId);

    try {
      const raw = localStorage.getItem("user");
      let email = "";
      if (raw) {
        try { email = JSON.parse(raw).email; } catch(e){}
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
      updateEvent(eventId, { image: data.url });
      toast.success("Poster uploaded successfully!");
    } catch (err) {
      console.error("Poster upload error:", err);
      toast.error(err.message || "Failed to upload poster");
    } finally {
      setUploadingField(null);
    }
  };

  const addEvent = () => {
    setEvents([
      ...events,
      {
        id: Math.random().toString(36).substr(2, 9),
        title: "New Tech Event",
        date: "TBD",
        location: "Virtual / TBD",
        description: "Event description goes here...",
        detailedDescription: "",
        type: "Conference",
        image: "",
        timeline: "",
        gformLink: "",
        isFeatured: true,
        uploadedByAdmin: true
      }
    ]);
  };

  const removeEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const updateEvent = (id, updates) => {
    setEvents(events.map((e) => e.id === id ? { ...e, ...updates } : e));
  };

  const addCurriculumItem = (eventId) => {
    setEvents(events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          curriculum: [...(e.curriculum || []), { heading: "", text: "" }]
        };
      }
      return e;
    }));
  };

  const updateCurriculumItem = (eventId, index, field, value) => {
    setEvents(events.map((e) => {
      if (e.id === eventId) {
        const newCurriculum = [...(e.curriculum || [])];
        newCurriculum[index] = { ...newCurriculum[index], [field]: value };
        return { ...e, curriculum: newCurriculum };
      }
      return e;
    }));
  };

  const removeCurriculumItem = (eventId, index) => {
    setEvents(events.map((e) => {
      if (e.id === eventId) {
        const newCurriculum = [...(e.curriculum || [])];
        newCurriculum.splice(index, 1);
        return { ...e, curriculum: newCurriculum };
      }
      return e;
    }));
  };

  return (
    _jsxs("div", { className: "space-y-8", children: [
      _jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        _jsxs("div", { className: "flex items-center gap-3", children: [
          _jsx("div", { className: "p-2 rounded-xl bg-primary/10 text-primary", children:
            _jsx(Calendar, { className: "w-5 h-5" })
          }),
          _jsxs("div", { children: [
            _jsx("h3", { className: "text-xl font-bold text-white", children: "Event Management" }),
            _jsx("p", { className: "text-xs text-gray-500", children: "Manage all upcoming summits and workshops" })
          ] })
        ] }),
        _jsxs("div", { className: "flex gap-4", children: [
          _jsxs(Button, {
            variant: "outline",
            onClick: addEvent,
            className: "border-white/10 hover:bg-white/5", children: [
              _jsx(Plus, { className: "w-4 h-4 mr-2" }), "Add Event"
            ]
          }),
          _jsxs(Button, {
            onClick: handleSave,
            type: "button",
            disabled: loading,
            className: "bg-primary text-black font-bold hover:bg-primary/90", children: [
              _jsx(Save, { className: "w-4 h-4 mr-2" }), "Publish Changes"
            ]
          })
        ] })
      ] }),

      _jsxs("div", { className: "grid grid-cols-1 gap-6", children: [
        events.length === 0 &&
        _jsxs("div", { className: "py-20 text-center glass-card rounded-[2rem] border-dashed border-2 border-white/10", children: [
          _jsx(Calendar, { className: "w-12 h-12 text-gray-700 mx-auto mb-4" }),
          _jsx("p", { className: "text-gray-500", children: "No events configured. Add your first event to get started." })
        ] }),

        events.map((event) =>
          _jsxs("div", { className: "glass-card rounded-[2rem] p-8 border border-white/5 relative group", children: [
            _jsx("button", {
              onClick: () => removeEvent(event.id),
              className: "absolute top-6 right-6 p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer", children:
                _jsx(Trash2, { className: "w-4 h-4" })
            }),

            _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
              _jsxs("div", { className: "space-y-4", children: [
                _jsxs("div", { className: "space-y-2", children: [
                  _jsxs("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2", children: [
                    _jsx(Type, { className: "w-3 h-3" }), " Event Title"
                  ] }),
                  _jsx(Input, {
                    value: event.title,
                    onChange: (e) => updateEvent(event.id, { title: e.target.value }),
                    className: "bg-white/5 border-white/10 rounded-xl"
                  })
                ] }),

                _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  _jsxs("div", { className: "space-y-2", children: [
                    _jsxs("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2", children: [
                      _jsx(Calendar, { className: "w-3 h-3" }), " Date"
                    ] }),
                    _jsx(Input, {
                      value: event.date,
                      onChange: (e) => updateEvent(event.id, { date: e.target.value }),
                      className: "bg-white/5 border-white/10 rounded-xl"
                    })
                  ] }),
                  _jsxs("div", { className: "space-y-2", children: [
                    _jsxs("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2", children: [
                      _jsx(MapPin, { className: "w-3 h-3" }), " Location"
                    ] }),
                    _jsx(Input, {
                      value: event.location,
                      onChange: (e) => updateEvent(event.id, { location: e.target.value }),
                      className: "bg-white/5 border-white/10 rounded-xl"
                    })
                  ] })
                ] }),

                _jsxs("div", { className: "space-y-2", children: [
                  _jsx("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest", children: "Short Description" }),
                  _jsx(Textarea, {
                    value: event.description,
                    onChange: (e) => updateEvent(event.id, { description: e.target.value }),
                    className: "bg-white/5 border-white/10 rounded-xl min-h-[80px]"
                  })
                ] }),

                _jsxs("div", { className: "space-y-2", children: [
                  _jsx("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest", children: "Detailed Description" }),
                  _jsx(Textarea, {
                    value: event.detailedDescription || "",
                    onChange: (e) => updateEvent(event.id, { detailedDescription: e.target.value }),
                    placeholder: "Add rich description / details / agenda about this event here...",
                    className: "bg-white/5 border-white/10 rounded-xl min-h-[140px]"
                  })
                ] }),

                _jsxs("div", { className: "space-y-4 pt-4 border-t border-white/10", children: [
                  _jsxs("div", { className: "flex items-center justify-between", children: [
                    _jsx("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest", children: "Curriculum / Agenda" }),
                    _jsxs("button", {
                      onClick: () => addCurriculumItem(event.id),
                      type: "button",
                      className: "text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1", children: [
                        _jsx(Plus, { className: "w-3 h-3" }), "Add Item"
                      ]
                    })
                  ] }),
                  
                  (event.curriculum || []).length === 0 ? (
                    _jsx("div", { className: "text-xs text-gray-500 italic", children: "No curriculum items added yet." })
                  ) : (
                    _jsx("div", { className: "space-y-4", children:
                      (event.curriculum || []).map((item, index) => (
                        _jsxs("div", { key: index, className: "p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 relative group", children: [
                          _jsx("button", {
                            onClick: () => removeCurriculumItem(event.id, index),
                            type: "button",
                            className: "absolute -top-2 -right-2 p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100", children:
                              _jsx(Trash2, { className: "w-3 h-3" })
                          }),
                          _jsxs("div", { className: "space-y-1.5", children: [
                            _jsx("label", { className: "text-[9px] font-bold text-gray-500 uppercase tracking-widest", children: "Sub Heading" }),
                            _jsx(Input, {
                              value: item.heading,
                              onChange: (e) => updateCurriculumItem(event.id, index, "heading", e.target.value),
                              placeholder: "e.g. Day 1: Introduction",
                              className: "bg-black/20 border-white/5 rounded-lg h-9 text-sm"
                            })
                          ] }),
                          _jsxs("div", { className: "space-y-1.5", children: [
                            _jsx("label", { className: "text-[9px] font-bold text-gray-500 uppercase tracking-widest", children: "Content Text" }),
                            _jsx(Textarea, {
                              value: item.text,
                              onChange: (e) => updateCurriculumItem(event.id, index, "text", e.target.value),
                              placeholder: "Details about this section...",
                              className: "bg-black/20 border-white/5 rounded-lg min-h-[80px] text-sm"
                            })
                          ] })
                        ] })
                      ))
                    })
                  )
                ] })
              ] }),

              _jsxs("div", { className: "space-y-4", children: [
                _jsxs("div", { className: "space-y-2", children: [
                  _jsxs("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2", children: [
                    _jsx(ImageIcon, { className: "w-3 h-3" }), " Cover Image / Poster URL"
                  ] }),
                  _jsxs("div", { className: "flex gap-2 items-center", children: [
                    _jsx(Input, {
                      value: event.image || "",
                      onChange: (e) => updateEvent(event.id, { image: e.target.value }),
                      placeholder: "https://images.unsplash.com/...",
                      className: "bg-white/5 border-white/10 rounded-xl flex-1"
                    }),
                    _jsxs("label", {
                      className: "h-10 px-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-semibold hover:bg-white/10 cursor-pointer transition-colors shrink-0 text-white",
                      children: [
                        uploadingField === event.id ? (
                          _jsx("span", { className: "text-muted-foreground animate-pulse", children: "Uploading..." })
                        ) : (
                          _jsxs("div", { className: "flex items-center gap-2", children: [
                            _jsx(Upload, { className: "w-4 h-4 text-primary" }),
                            _jsx("span", { children: "Upload" })
                          ] })
                        ),
                        _jsx("input", {
                          type: "file",
                          accept: "image/*",
                          className: "hidden",
                          disabled: uploadingField === event.id,
                          onChange: (e) => handleImageUpload(e, event.id)
                        })
                      ]
                    })
                  ] })
                ] }),

                _jsxs("div", { className: "space-y-2", children: [
                  _jsx("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest", children: "Event Category" }),
                  _jsxs("select", {
                    value: event.type,
                    onChange: (e) => updateEvent(event.id, { type: e.target.value }),
                    className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none text-white", children: [
                      _jsx("option", { value: "Conference", children: "Conference" }),
                      _jsx("option", { value: "Workshop", children: "Workshop" }),
                      _jsx("option", { value: "Expo", children: "Expo" }),
                      _jsx("option", { value: "Summit", children: "Summit" }),
                      _jsx("option", { value: "Webinar", children: "Webinar" }),
                      _jsx("option", { value: "Hackathon", children: "Hackathon" }),
                      _jsx("option", { value: "Other", children: "Other" })
                    ]
                  })
                ] }),

                _jsxs("div", { className: "flex items-center gap-3 py-2", children: [
                  _jsx("input", {
                    type: "checkbox",
                    id: `featured-${event.id}`,
                    checked: event.isFeatured || false,
                    onChange: (e) => updateEvent(event.id, { isFeatured: e.target.checked }),
                    className: "w-5 h-5 rounded border border-white/10 bg-white/5 accent-primary cursor-pointer focus:ring-0 outline-none"
                  }),
                  _jsxs("label", { htmlFor: `featured-${event.id}`, className: "text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer select-none", children: [
                    "Feature on Landing Page"
                  ] })
                ] }),

                _jsxs("div", { className: "space-y-2", children: [
                  _jsxs("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2", children: [
                    _jsx(LinkIcon, { className: "w-3 h-3" }), " Google Form Link"
                  ] }),
                  _jsx(Input, {
                    value: event.gformLink || "",
                    onChange: (e) => updateEvent(event.id, { gformLink: e.target.value }),
                    placeholder: "https://docs.google.com/forms/...",
                    className: "bg-white/5 border-white/10 rounded-xl"
                  })
                ] }),

                _jsxs("div", { className: "space-y-2", children: [
                  _jsxs("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2", children: [
                    _jsx(Clock, { className: "w-3 h-3" }), " Event Timeline (Expiry Date-Time)"
                  ] }),
                  _jsx(Input, {
                    type: "datetime-local",
                    value: event.timeline || "",
                    onChange: (e) => updateEvent(event.id, { timeline: e.target.value }),
                    className: "bg-white/5 border-white/10 rounded-xl text-white [color-scheme:dark]"
                  })
                ] }),

                event.image &&
                _jsx("div", { className: "relative aspect-video rounded-2xl overflow-hidden border border-white/10 mt-4", children:
                  _jsx("img", { src: event.image, alt: "Preview", className: "w-full h-full object-cover" })
                })
              ] })
            ] })
          ] }, event.id)
        )
      ] })
    ] })
  );
}