// Types for our data
export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export interface AnalyticsSummary {
  widgetTitle: string;
  totalUsers: number;
  newSignupsToday: number;
  activeUsers: number;
  revenueToday: string;
  conversionRate: string;
  recentActivities: Activity[];
}

export interface Notification {
  id: string;
  message: string;
  severity: 'high' | 'info' | 'low';
  read: boolean;
}

export interface DashboardData {
  analyticsSummary: AnalyticsSummary;
  notifications: Notification[];
}

// API functions
const API_BASE_URL = 'http://localhost:3001';

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  try {
    const response = await fetch(`${API_BASE_URL}/analyticsSummary`);
    if (!response.ok) {
      throw new Error('Failed to fetch analytics summary');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    throw error;
  }
}

export async function fetchNotifications(): Promise<Notification[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`);
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}

export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const [analyticsSummary, notifications] = await Promise.all([
      fetchAnalyticsSummary(),
      fetchNotifications()
    ]);
    
    return {
      analyticsSummary,
      notifications
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
}