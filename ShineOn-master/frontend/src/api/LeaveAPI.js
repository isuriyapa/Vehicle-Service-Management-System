import axios from 'axios';
import requestConfig from './requestConfigJson';
import requestConfigJson from './requestConfigJson';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

class LeaveAPI {
  // Get all leaves
  static getAllLeaves() {
    return axios.get(`${BASE_URL}/api/leave`, requestConfig);
  }

  // Get all leaves of a user
  static getLeavesOfUser(userId) {
    return axios.get(`${BASE_URL}/api/leave/user/${userId}`, requestConfig);
  }

  // Request a leave
  static requestLeave(leave) {
    return axios.post(`${BASE_URL}/api/leave`, leave, requestConfigJson);
  }

  // Approve a leave
  static approveLeave(leaveId) {
    return axios.put(
      `${BASE_URL}/api/leave/${leaveId}/status`,
      {
        status: 'approved',
      },
      requestConfigJson
    );
  }

  // Reject a leave
  static rejectLeave(leaveId) {
    return axios.put(
      `${BASE_URL}/api/leave/${leaveId}/status`,
      {
        status: 'rejected',
      },
      requestConfigJson
    );
  }

  // Delete a leave
  static deleteLeave(leaveId) {
    return axios.delete(`${BASE_URL}/api/leave/${leaveId}`, requestConfig);
  }
}

export default LeaveAPI;
