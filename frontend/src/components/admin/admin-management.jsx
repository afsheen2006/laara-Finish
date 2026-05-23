
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "./confirmation-modal";
import { Input } from "@/components/ui/input";
import { Shield, Trash2, UserPlus, ShieldAlert, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";

const addAdmin = async (data) => {
  const response = await apiClient.post("/auth/users", data);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await apiClient.delete(`/auth/users/${id}`);
  return response.data;
};

const updateRole = async (id, role) => {
  const response = await apiClient.put(`/auth/users/${id}/role`, { role });
  return response.data;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function AdminManagement({ users, currentUserId, currentUserRole, onRefresh }) {
  const [loading, setLoading] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "ADMIN" });
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(null);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading("adding");
    try {
      const result = await addAdmin(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("User added successfully");
        setShowAddForm(false);
        setFormData({ name: "", email: "", password: "", role: "ADMIN" });
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      toast.error("Failed to add user");
    } finally {
      setLoading(null);
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    if (currentUserRole !== "MASTER") {
      toast.error("Only Master Admin can manage roles");
      return;
    }

    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    setLoading(userId);
    try {
      const result = await updateRole(userId, newRole);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Role updated to ${newRole}`);
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      toast.error("Failed to update role");
    } finally {
      setLoading(null);
    }
  };

  const handleDeleteUser = (userId) => {
    if (currentUserRole !== "MASTER") {
      toast.error("Only Master Admin can delete users");
      return;
    }
    setConfirmDeleteUser(userId);
  };

  const executeDeleteUser = async (userId) => {
    setLoading(userId);
    try {
      const result = await deleteUser(userId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("User deleted successfully");
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setLoading(null);
    }
  };

  return (/*#__PURE__*/
    _jsxs("div", { className: "space-y-6", children: [/*#__PURE__*/
      _jsx(ConfirmationModal, {
        isOpen: confirmDeleteUser !== null,
        onClose: () => setConfirmDeleteUser(null),
        onConfirm: () => executeDeleteUser(confirmDeleteUser),
        title: "Delete User Account",
        message: "Are you sure you want to permanently delete this user account? This user will lose all dashboard privileges immediately."
      }),

      _jsxs("div", { className: "flex items-center justify-between bg-card p-6 border border-border rounded-2xl shadow-lg", children: [/*#__PURE__*/
        _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
          _jsx("div", { className: "p-3 bg-red-500/10 rounded-xl text-red-500", children: /*#__PURE__*/
            _jsx(ShieldAlert, { className: "w-6 h-6" }) }
          ), /*#__PURE__*/
          _jsxs("div", { children: [/*#__PURE__*/
            _jsx("h1", { className: "text-2xl font-bold text-white", children: "RBAC Management" }), /*#__PURE__*/
            _jsx("p", { className: "text-sm text-gray-400", children: "Manage admins and access levels" })] }
          )] }
        ), /*#__PURE__*/
        _jsxs(Button, {
          onClick: () => setShowAddForm(true),
          className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2", children: [/*#__PURE__*/

          _jsx(UserPlus, { className: "w-4 h-4" }), "Add New User"] }

        )] }
      ),


      showAddForm && /*#__PURE__*/
      _jsxs("div", { className: "p-6 bg-white/5 border border-primary/20 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300", children: [/*#__PURE__*/
        _jsxs("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
          _jsx("h3", { className: "text-lg font-bold", children: "Add Administrative User" }), /*#__PURE__*/
          _jsx("button", { onClick: () => setShowAddForm(false), className: "text-gray-500 hover:text-white", children: /*#__PURE__*/_jsx(X, { className: "w-5 h-5" }) })] }
        ), /*#__PURE__*/
        _jsxs("form", { onSubmit: handleAddUser, className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [/*#__PURE__*/
          _jsx(Input, {
            placeholder: "Full Name",
            value: formData.name,
            onChange: (e) => setFormData({ ...formData, name: e.target.value }),
            required: true,
            className: "bg-white/5 border-white/10" }
          ), /*#__PURE__*/
          _jsx(Input, {
            type: "email",
            placeholder: "Email Address",
            value: formData.email,
            onChange: (e) => setFormData({ ...formData, email: e.target.value }),
            required: true,
            className: "bg-white/5 border-white/10" }
          ), /*#__PURE__*/
          _jsx(Input, {
            type: "password",
            placeholder: "Temporary Password",
            value: formData.password,
            onChange: (e) => setFormData({ ...formData, password: e.target.value }),
            required: true,
            className: "bg-white/5 border-white/10" }
          ), /*#__PURE__*/
          _jsxs("select", {
            value: formData.role,
            onChange: (e) => setFormData({ ...formData, role: e.target.value }),
            className: "w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary", children: [/*#__PURE__*/

            _jsx("option", { value: "ADMIN", children: "Admin" }), /*#__PURE__*/
            _jsx("option", { value: "USER", children: "User" })] }
          ), /*#__PURE__*/
          _jsx("div", { className: "md:col-span-2", children: /*#__PURE__*/
            _jsx(Button, { type: "submit", disabled: loading === "adding", className: "w-full bg-primary text-primary-foreground", children:
              loading === "adding" ? /*#__PURE__*/_jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : "Confirm & Create User" }
            ) }
          )] }
        )] }
      ), /*#__PURE__*/



      _jsx("div", { className: "overflow-hidden bg-card border border-border rounded-2xl", children: /*#__PURE__*/
        _jsxs("table", { className: "w-full text-left", children: [/*#__PURE__*/
          _jsx("thead", { children: /*#__PURE__*/
            _jsxs("tr", { className: "text-gray-500 text-xs font-bold uppercase tracking-widest border-b border-white/5", children: [/*#__PURE__*/
              _jsx("th", { className: "px-6 py-4", children: "User" }), /*#__PURE__*/
              _jsx("th", { className: "px-6 py-4", children: "Role" }), /*#__PURE__*/
              _jsx("th", { className: "px-6 py-4 text-right", children: "Actions" })] }
            ) }
          ), /*#__PURE__*/
          _jsx("tbody", { className: "divide-y divide-white/5", children:
            users.map((user) => /*#__PURE__*/
            _jsxs("tr", { className: "group hover:bg-white/5 transition-colors", children: [/*#__PURE__*/
              _jsx("td", { className: "px-6 py-4", children: /*#__PURE__*/
                _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
                  _jsx("div", { className: "w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold", children:
                    user.name?.[0] || user.email?.[0] }
                  ), /*#__PURE__*/
                  _jsxs("div", { children: [/*#__PURE__*/
                    _jsx("div", { className: "text-sm font-medium text-white", children: user.name }), /*#__PURE__*/
                    _jsx("div", { className: "text-xs text-gray-500", children: user.email })] }
                  )] }
                ) }
              ), /*#__PURE__*/
              _jsx("td", { className: "px-6 py-4", children: /*#__PURE__*/
                _jsx("span", { className: `px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter ${
                  user.role === "MASTER" ? "bg-red-500/20 text-red-500" :
                  user.role === "ADMIN" ? "bg-primary/20 text-primary" :
                  "bg-gray-500/20 text-gray-500"}`, children:

                  user.role }
                ) }
              ), /*#__PURE__*/
              _jsx("td", { className: "px-6 py-4 text-right", children:
                currentUserRole === "MASTER" && user.id !== currentUserId && /*#__PURE__*/
                _jsxs("div", { className: "flex items-center justify-end gap-2", children: [/*#__PURE__*/
                  _jsx(Button, {
                    size: "icon",
                    variant: "ghost",
                    className: "text-gray-400 hover:text-white",
                    onClick: () => handleRoleChange(user.id, user.role),
                    disabled: loading === user.id, children: /*#__PURE__*/

                    _jsx(Shield, { className: "w-4 h-4" }) }
                  ), /*#__PURE__*/
                  _jsx(Button, {
                    size: "icon",
                    variant: "ghost",
                    className: "text-red-500/60 hover:text-red-500",
                    onClick: () => handleDeleteUser(user.id),
                    disabled: loading === user.id, children: /*#__PURE__*/

                    _jsx(Trash2, { className: "w-4 h-4" }) }
                  )] }
                ) }

              )] }, user.id
            )
            ) }
          )] }
        ) }
      )] }
    ));

}