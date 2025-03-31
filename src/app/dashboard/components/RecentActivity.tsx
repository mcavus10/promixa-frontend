'use client';

type ActivityItem = {
  id: string;
  service: string;
  timestamp: string;
  timeAgo: string;
};

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    service: 'AI Image Generator',
    timestamp: '2025-03-31T14:30:00',
    timeAgo: '1 day ago'
  },
  {
    id: '2',
    service: 'Transcribe Audio/Video',
    timestamp: '2025-03-29T10:15:00',
    timeAgo: '3 days ago'
  },
  {
    id: '3',
    service: 'AI Image Generator',
    timestamp: '2025-03-28T16:45:00',
    timeAgo: '4 days ago'
  }
];

export function RecentActivity() {
  return (
    <div className="mb-8 animate-fadeIn animation-delay-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
      <div className="bg-white rounded-xl shadow-md p-4">
        {mockActivities.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {mockActivities.map((activity) => (
              <li key={activity.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                  <span className="text-gray-700">
                    Used <span className="font-medium">{activity.service}</span>
                  </span>
                </div>
                <span className="text-sm text-gray-500">{activity.timeAgo}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-6 text-center text-gray-500">
            No recent activity to show
          </div>
        )}
      </div>
    </div>
  );
}
