
import { useState, useEffect } from "react";
import { Save, Calendar, Plus, Trash2, MapPin, Type, Image as ImageIcon } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function EventEditor({ eventsBlock, onSave }) {
  const [events, setEvents] = useState(() => {
    try {
      return JSON.parse(eventsBlock?.content || "[]");
    } catch (e) {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);

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
    if (!eventsBlock) {
      // If no block exists, we might need to create it first
      setLoading(true);
      const res = await addBlock({
        type: "TEXT_BLOCK",
        title: "Global Events Configuration",
        content: JSON.stringify(events),
        order: 99
      });
      if (res.success) {
        toast.success("Event section initialized and saved");
        if (onSave) onSave();
      } else {
        toast.error("Failed to initialize events");
      }
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await updateBlock(eventsBlock.id || eventsBlock._id, { content: JSON.stringify(events) });
      if (res.success) {
        toast.success("Events updated successfully");
        if (onSave) onSave();
      } else {
        toast.error("Failed to save events");
      }
    } catch (e) {
      toast.error("An error occurred while saving");
    } finally {
      setLoading(false);
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
      image: ""
    }]
    );
  };

  const removeEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const updateEvent = (id, updates) => {
    setEvents(events.map((e) => e.id === id ? { ...e, ...updates } : e));
  };

  return (/*#__PURE__*/
    _jsxs("div", { className: "space-y-8", children: [/*#__PURE__*/
      _jsxs("div", { className: "flex items-center justify-between mb-8", children: [/*#__PURE__*/
        _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
          _jsx("div", { className: "p-2 rounded-xl bg-primary/10 text-primary", children: /*#__PURE__*/
            _jsx(Calendar, { className: "w-5 h-5" }) }
          ), /*#__PURE__*/
          _jsxs("div", { children: [/*#__PURE__*/
            _jsx("h3", { className: "text-xl font-bold text-white", children: "Event Management" }), /*#__PURE__*/
            _jsx("p", { className: "text-xs text-gray-500", children: "Manage all upcoming summits and workshops" })] }
          )] }
        ), /*#__PURE__*/
        _jsxs("div", { className: "flex gap-4", children: [/*#__PURE__*/
          _jsxs(Button, {
            variant: "outline",
            onClick: addEvent,
            className: "border-white/10 hover:bg-white/5", children: [/*#__PURE__*/

            _jsx(Plus, { className: "w-4 h-4 mr-2" }), "Add Event"] }

          ), /*#__PURE__*/
          _jsxs(Button, {
            onClick: handleSave,
            disabled: loading,
            className: "bg-primary text-black font-bold hover:bg-primary/90", children: [/*#__PURE__*/

            _jsx(Save, { className: "w-4 h-4 mr-2" }), "Publish Changes"] }

          )] }
        )] }
      ), /*#__PURE__*/

      _jsxs("div", { className: "grid grid-cols-1 gap-6", children: [
        events.length === 0 && /*#__PURE__*/
        _jsxs("div", { className: "py-20 text-center glass-card rounded-[2rem] border-dashed border-2 border-white/10", children: [/*#__PURE__*/
          _jsx(Calendar, { className: "w-12 h-12 text-gray-700 mx-auto mb-4" }), /*#__PURE__*/
          _jsx("p", { className: "text-gray-500", children: "No events configured. Add your first event to get started." })] }
        ),


        events.map((event) => /*#__PURE__*/
        _jsxs("div", { className: "glass-card rounded-[2rem] p-8 border border-white/5 relative group", children: [/*#__PURE__*/
          _jsx("button", {
            onClick: () => removeEvent(event.id),
            className: "absolute top-6 right-6 p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100", children: /*#__PURE__*/

            _jsx(Trash2, { className: "w-4 h-4" }) }
          ), /*#__PURE__*/

          _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [/*#__PURE__*/
            _jsxs("div", { className: "space-y-4", children: [/*#__PURE__*/
              _jsxs("div", { className: "space-y-2", children: [/*#__PURE__*/
                _jsxs("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2", children: [/*#__PURE__*/
                  _jsx(Type, { className: "w-3 h-3" }), " Event Title"] }
                ), /*#__PURE__*/
                _jsx(Input, {
                  value: event.title,
                  onChange: (e) => updateEvent(event.id, { title: e.target.value }),
                  className: "bg-white/5 border-white/10 rounded-xl" }
                )] }
              ), /*#__PURE__*/

              _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [/*#__PURE__*/
                _jsxs("div", { className: "space-y-2", children: [/*#__PURE__*/
                  _jsxs("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2", children: [/*#__PURE__*/
                    _jsx(Calendar, { className: "w-3 h-3" }), " Date"] }
                  ), /*#__PURE__*/
                  _jsx(Input, {
                    value: event.date,
                    onChange: (e) => updateEvent(event.id, { date: e.target.value }),
                    className: "bg-white/5 border-white/10 rounded-xl" }
                  )] }
                ), /*#__PURE__*/
                _jsxs("div", { className: "space-y-2", children: [/*#__PURE__*/
                  _jsxs("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2", children: [/*#__PURE__*/
                    _jsx(MapPin, { className: "w-3 h-3" }), " Location"] }
                  ), /*#__PURE__*/
                  _jsx(Input, {
                    value: event.location,
                    onChange: (e) => updateEvent(event.id, { location: e.target.value }),
                    className: "bg-white/5 border-white/10 rounded-xl" }
                  )] }
                )] }
              ), /*#__PURE__*/

              _jsxs("div", { className: "space-y-2", children: [
                _jsx("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest", children: "Short Description" }), /*#__PURE__*/
                _jsx(Textarea, {
                  value: event.description,
                  onChange: (e) => updateEvent(event.id, { description: e.target.value }),
                  className: "bg-white/5 border-white/10 rounded-xl min-h-[80px]" }
                )] }
              ), /*#__PURE__*/

              _jsxs("div", { className: "space-y-2", children: [
                _jsx("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest", children: "Detailed Description" }), /*#__PURE__*/
                _jsx(Textarea, {
                  value: event.detailedDescription || "",
                  onChange: (e) => updateEvent(event.id, { detailedDescription: e.target.value }),
                  placeholder: "Add rich description / details / agenda about this event here...",
                  className: "bg-white/5 border-white/10 rounded-xl min-h-[140px]" }
                )] }
              )] }
            ), /*#__PURE__*/

            _jsxs("div", { className: "space-y-4", children: [/*#__PURE__*/
              _jsxs("div", { className: "space-y-2", children: [/*#__PURE__*/
                _jsxs("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2", children: [/*#__PURE__*/
                  _jsx(ImageIcon, { className: "w-3 h-3" }), " Cover Image URL"] }
                ), /*#__PURE__*/
                _jsx(Input, {
                  value: event.image,
                  onChange: (e) => updateEvent(event.id, { image: e.target.value }),
                  placeholder: "https://images.unsplash.com/...",
                  className: "bg-white/5 border-white/10 rounded-xl" }
                )] }
              ), /*#__PURE__*/

              _jsxs("div", { className: "space-y-2", children: [/*#__PURE__*/
                _jsx("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest", children: "Event Category" }), /*#__PURE__*/
                _jsxs("select", {
                  value: event.type,
                  onChange: (e) => updateEvent(event.id, { type: e.target.value }),
                  className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none text-white", children: [/*#__PURE__*/

                  _jsx("option", { value: "Conference", children: "Conference" }), /*#__PURE__*/
                  _jsx("option", { value: "Workshop", children: "Workshop" }), /*#__PURE__*/
                  _jsx("option", { value: "Expo", children: "Expo" }), /*#__PURE__*/
                  _jsx("option", { value: "Summit", children: "Summit" }), /*#__PURE__*/
                  _jsx("option", { value: "Webinar", children: "Webinar" })] }
                )] }
              ),

              event.image && /*#__PURE__*/
              _jsx("div", { className: "relative aspect-video rounded-2xl overflow-hidden border border-white/10 mt-4", children: /*#__PURE__*/
                _jsx("img", { src: event.image, alt: "Preview", className: "w-full h-full object-cover" }) }
              )] }

            )] }
          )] }, event.id
        )
        )] }
      )] }
    ));

}