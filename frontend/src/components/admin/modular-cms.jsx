
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus, Trash2, Edit3,
  Layout, LayoutGrid, Type, Send, MousePointer2,
  Sparkles, Users, HelpCircle, ClipboardList, Rocket } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";

const addBlock = async (data) => {
  const response = await apiClient.post("/cms/blocks", data);
  return response.data;
};

const updateBlock = async (id, data) => {
  const response = await apiClient.put(`/cms/blocks/${id}`, data);
  return response.data;
};

const deleteBlock = async (id) => {
  const response = await apiClient.delete(`/cms/blocks/${id}`);
  return response.data;
};

const getBlocks = async () => {
  const response = await apiClient.get("/cms/blocks");
  return response.data;
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";

const BLOCK_ICONS = {
  HERO: Layout,
  FEATURE_CARDS: LayoutGrid,
  PORTFOLIO_GRID: MousePointer2,
  CONTACT_FORM: Send,
  TEXT_BLOCK: Type,
  CTA_SECTION: Rocket,
  FORM_BUILDER: ClipboardList,
  SERVICES_SECTION: Sparkles,
  TESTIMONIALS: Users,
  FAQ_SECTION: HelpCircle
};

export function ModularCMSManager() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    refreshBlocks();
  }, []);

  const refreshBlocks = async () => {
    setLoading(true);
    const data = await getBlocks();
    setBlocks(data);
    setLoading(false);
  };

  const handleAddBlock = async (type) => {
    const res = await addBlock({
      type: type,
      title: `New ${type}`,
      content: JSON.stringify({}),
      order: blocks.length
    });
    if (res.success) {
      toast.success("Block added!");
      refreshBlocks();
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteBlock(id);
    if (res.success) {
      toast.success("Block removed");
      refreshBlocks();
    }
  };

  const handleUpdateTitle = async (id) => {
    const res = await updateBlock(id, { title: editingTitle });
    if (res.success) {
      toast.success("Title updated");
      setEditingId(null);
      refreshBlocks();
    }
  };

  return (/*#__PURE__*/
    _jsxs("div", { className: "space-y-8", children: [/*#__PURE__*/
      _jsxs("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
        _jsxs("h3", { className: "text-xl font-bold flex items-center gap-2", children: [/*#__PURE__*/
          _jsx(Layout, { className: "w-5 h-5 text-primary" }), "Page Builder"] }

        ), /*#__PURE__*/
        _jsx("div", { className: "flex gap-2", children:
          Object.keys(BLOCK_ICONS).map((type) => /*#__PURE__*/
          _jsxs(Button, {

            size: "sm",
            variant: "outline",
            className: "border-white/10 hover:bg-white/5 gap-2",
            onClick: () => handleAddBlock(type), children: [/*#__PURE__*/

            _jsx(Plus, { className: "w-3 h-3" }),
            type.split("_")[0]] }, type
          )
          ) }
        )] }
      ), /*#__PURE__*/

      _jsx("div", { className: "space-y-4", children:
        loading ? /*#__PURE__*/
        _jsx("div", { className: "py-12 text-center text-gray-500 italic", children: "Loading configuration..." }) :
        blocks.length === 0 ? /*#__PURE__*/
        _jsx("div", { className: "py-12 text-center glass-card rounded-3xl text-gray-500 border-dashed border-2 border-white/10", children: "No blocks found. Start by adding one above." }

        ) : /*#__PURE__*/

        _jsx("div", { className: "grid gap-4", children:
          blocks.map((block, index) => {
            const Icon = BLOCK_ICONS[block.type] || Type;
            return (/*#__PURE__*/
              _jsxs(motion.div, {

                layout: true,
                className: "glass-card p-6 rounded-2xl flex items-center gap-6 border border-white/5 hover:border-primary/20 transition-all group", children: [/*#__PURE__*/

                _jsx("div", { className: "p-3 bg-white/5 rounded-xl text-gray-400", children: /*#__PURE__*/
                  _jsx(Icon, { className: "w-6 h-6" }) }
                ), /*#__PURE__*/

                _jsx("div", { className: "flex-1", children:
                  editingId === block.id ? /*#__PURE__*/
                  _jsxs("div", { className: "flex gap-2", children: [/*#__PURE__*/
                    _jsx(Input, {
                      value: editingTitle,
                      onChange: (e) => setEditingTitle(e.target.value),
                      className: "bg-white/5 border-primary/50 text-sm h-8" }
                    ), /*#__PURE__*/
                    _jsx(Button, { size: "sm", onClick: () => handleUpdateTitle(block.id), children: "Save" }), /*#__PURE__*/
                    _jsx(Button, { size: "sm", variant: "ghost", onClick: () => setEditingId(null), children: "Cancel" })] }
                  ) : /*#__PURE__*/

                  _jsxs(_Fragment, { children: [/*#__PURE__*/
                    _jsxs("div", { className: "font-bold text-white flex items-center gap-2", children: [
                      block.title, /*#__PURE__*/
                      _jsx("span", { className: "text-[10px] uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded-full", children:
                        block.type }
                      )] }
                    ), /*#__PURE__*/
                    _jsxs("div", { className: "text-xs text-gray-500 mt-1", children: ["Order Index: ", block.order] })] }
                  ) }

                ), /*#__PURE__*/

                _jsxs("div", { className: "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all", children: [/*#__PURE__*/
                  _jsx(Button, {
                    size: "icon",
                    variant: "ghost",
                    className: "hover:bg-white/5",
                    onClick: () => {
                      setEditingId(block.id);
                      setEditingTitle(block.title || "");
                    }, children: /*#__PURE__*/

                    _jsx(Edit3, { className: "w-4 h-4 text-blue-400" }) }
                  ), /*#__PURE__*/
                  _jsx(Button, { size: "icon", variant: "ghost", className: "hover:bg-red-500/10", onClick: () => handleDelete(block.id), children: /*#__PURE__*/
                    _jsx(Trash2, { className: "w-4 h-4 text-red-500" }) }
                  )] }
                )] }, block.id
              ));

          }) }
        ) }

      )] }
    ));

}