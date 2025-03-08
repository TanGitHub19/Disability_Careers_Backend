// adminApi.js
import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;
export const adminStore = create((set) => ({
  isAdminLoading: false,
  error: null,
  totalUsers: 0,
  totalEmployers: 0,
  pendingEmployerID: 0,
  pendingPwdID: 0,
  totaluploaddisability: [],
  totaluploademployer: [],

  getTotalUsers: async () => {
    set({ isAdminLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/admin/users/total`);
      const totalUsers = response.data.totalUsers || 0;
      set({
        totalUsers: totalUsers,
        isAdminLoading: false,
      });
      console.log("Total Users:", response.data);
    } catch (error) {
      console.error("Error fetching total users:", error);
      toast.error(
        error.response?.data?.message || "Error fetching total users"
      );
      set({
        error: error.response?.data?.message || "Error fetching total users",
        isAdminLoading: false,
      });
    }
  },

  getTotalEmployers: async () => {
    set({ isAdminLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/admin/users/employers/total`);
      const totalEmployers = response.data.totalEmployers || 0;
      set({
        totalEmployers: totalEmployers,
        isAdminLoading: false,
      });
    } catch (error) {
      console.error("Error fetching total Employers:", error);
      toast.error(
        error.response?.data?.message || "Error fetching total employers"
      );
      set({
        error:
          error.response?.data?.message || "Error fetching total employers",
        isAdminLoading: false,
      });
    }
  },

  getTotalApplicants: async () => {
    set({ isAdminLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/admin/users/applicants/total`);
      const totalApplicants = response.data.totalApplicants || 0;
      set({
        totalApplicants: totalApplicants,
        isAdminLoading: false,
      });
    } catch (error) {
      console.error("Error fetching total Applicants:", error);
      toast.error(
        error.response?.data?.message || "Error fetching total applicants"
      );
      set({
        error:
          error.response?.data?.message || "Error fetching total applicants",
        isAdminLoading: false,
      });
    }
  },

  getEmployerVerificationId: async () => {
    set({ isAdminLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/admin/pending-employerID`);
      const pendingEmployerID = response.data.pendingEmployerVerifications || 0;
      set({
        pendingEmployerID: pendingEmployerID,
        isAdminLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error fetching pending employer ID";
      console.error("Error fetching pending employer ID:", errorMessage);
      toast.error(errorMessage);
      set({ error: errorMessage, isAdminLoading: false });
    }
  },

  getEmployerVerificationList: async () => {
    set({ isAdminLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/admin/disability-id/all-employer`
      );
      set({ isAdminLoading: false, totaluploademployer: response.data });
    } catch (error) {
      console.error("Error fetching employer verification ID:", error);
      toast.error(
        error.response?.data?.message || "Error fetching verification ID"
      );
      set({
        error:
          error.response?.data?.message || "Error fetching verification ID",
        isAdminLoading: false,
      });
    }
  },

  updateEmployerVerificationStatus: async (userId, isVerified) => {
    try {
      const response = await axios.put(
        `${API_URL}/admin/employer-verify/${userId}`,
        { isVerified }
      );
      set((state) => ({
        totaluploaddisability: state.totaluploaddisability.map((user) =>
          user.userId === userId ? { ...user, isIdVerified: isVerified } : user
        ),
      }));
      toast.success(`Verification ${isVerified ? "approved" : "rejected"}`);
      return response.data;
    } catch (error) {
      console.error("Error updating verification status:", error);
      toast.error(
        error.response?.data?.message || "Error updating verification status"
      );
    }
  },

  getPWDVerificationId: async () => {
    set({ isAdminLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/admin/pending-pwdID`);
      console.log("API Response:", response.data);
      const pendingPwdID = response.data.pendingDisabilityVerifications || 0;
      console.log("Pending PWD ID:", pendingPwdID);
      set({
        pendingPwdID: pendingPwdID,
        isAdminLoading: false,
      });
    } catch (error) {
      console.error("Error fetching pending PWD ID:", error);
      toast.error(
        error.response?.data?.message || "Error fetching pending PWD ID"
      );
      set({
        error: error.response?.data?.message || "Error fetching pending PWD ID",
        isAdminLoading: false,
      });
    }
  },

  //bar chart of pwd
  getDisabilityCounts: async () => {
    set({ isAdminLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/admin/disability-counts`);
      set({
        totalDisabilityCounts: response.data,
        isAdminLoading: false,
      });
    } catch (error) {
      console.error("Error fetching disability counts:", error);
      toast.error(
        error.response?.data?.message || "Error fetching disability counts"
      );
      set({
        error:
          error.response?.data?.message || "Error fetching disability counts",
        isAdminLoading: false,
      });
    }
  },

  //get user list
  getDisabilityVerificationId: async () => {
    set({ isAdminLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/admin/disability-id/all`);
      set({ isAdminLoading: false, totaluploaddisability: response.data });
    } catch (error) {
      console.error("Error fetching disability verification ID:", error);
      toast.error(
        error.response?.data?.message || "Error fetching verification ID"
      );
      set({
        error:
          error.response?.data?.message || "Error fetching verification ID",
        isAdminLoading: false,
      });
    }
  },

  //update approved and reject
  updateDisabilityVerificationStatus: async (userId, isVerified) => {
    try {
      const response = await axios.put(`${API_URL}/admin/disability-verify/${userId}`, { isVerified });
      set((state) => ({
        totaluploaddisability: state.totaluploaddisability.map(user =>
          user.userId === userId ? { ...user, isIdVerified: isVerified } : user
        ),
      }));
      toast.success(`Verification ${isVerified ? "approved" : "rejected"}`);
      return response.data;
    } catch (error) {
      console.error("Error updating verification status:", error);
      toast.error(
        error.response?.data?.message || "Error updating verification status"
      );
    }
  }
  
}));

// Retrieve the admin token (assumed to be stored in localStorage after login)
const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

/**
 * Fetch users data from the backend.
 * Expected response shape: { employers: [...], applicants: [...] }
 */
export const fetchUsersApi = () => {
  return axios.get(`${API_URL}/admin/get-users`, { headers });
};

/**
 * Delete a user by ID.
 */
export const deleteUserApi = (userId) => {
  return axios.delete(`${API_URL}/admin/user/${userId}`, { headers });
};

/**
 * Ban a user by ID.
 */
export const banUserApi = (userId) => {
  return axios.patch(`${API_URL}/admin/user/${userId}/ban`, {}, { headers });
};

/**
 * Unban a user by ID.
 */
export const unbanUserApi = (userId) => {
  return axios.patch(`${API_URL}/admin/user/${userId}/unban`, {}, { headers });
};

/**
 * Update a user's full name by ID.
 */
export const updateEmployer = async (userId, formData) => {
  try {
    const response = await axios.put(`${API_URL}/admin/users/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("User updated successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to update user");
    console.error("Update error:", error);
    throw error;
  }
};

export const updateApplicant = async (userId, formData) => {
  try {
    const response = await axios.put(`${API_URL}/admin/users/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("User updated successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to update user");
    console.error("Update error:", error);
    throw error;
  }
};
