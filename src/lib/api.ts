import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const API_TIMEOUT = 30000;

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      console.warn('Unauthorized access - redirecting to login');
    } else if (error.response?.status === 403) {
      console.warn('Forbidden access');
    } else if (error.response?.status === 500) {
      console.error('Server error');
    }
    return Promise.reject(error);
  }
);

// Generic API methods with fallback support
export async function apiGet<T>(
  url: string,
  fallbackData: T,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  } catch (error) {
    console.warn(`API GET ${url} failed, using fallback data:`, error);
    return fallbackData;
  }
}

export async function apiPost<T, D = unknown>(
  url: string,
  data: D,
  fallbackData: T,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.warn(`API POST ${url} failed, using fallback data:`, error);
    return fallbackData;
  }
}

export async function apiPut<T, D = unknown>(
  url: string,
  data: D,
  fallbackData: T,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.warn(`API PUT ${url} failed, using fallback data:`, error);
    return fallbackData;
  }
}

export async function apiPatch<T, D = unknown>(
  url: string,
  data: D,
  fallbackData: T,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.warn(`API PATCH ${url} failed, using fallback data:`, error);
    return fallbackData;
  }
}

export async function apiDelete<T>(
  url: string,
  fallbackData: T,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  } catch (error) {
    console.warn(`API DELETE ${url} failed, using fallback data:`, error);
    return fallbackData;
  }
}

export { apiClient };
export default apiClient;
