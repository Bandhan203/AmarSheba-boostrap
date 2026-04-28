import { useState } from 'react';
import { MobileFrame } from '../components/MobileFrame';
import { MESSAGE_THREADS } from '../data/platformContracts';

const chatMessages = [
  { id: 'm1', sender: 'Customer', text: 'Please confirm material quality before start.', time: '10:12 AM' },
  { id: 'm2', sender: 'Provider', text: 'Confirmed. Sharing material sheet and quote breakdown now.', time: '10:15 AM' },
  { id: 'm3', sender: 'Customer', text: 'Great. Uploading room photos and measurements.', time: '10:18 AM' },
];

export const MessagesPage = () => {
  const [input, setInput] = useState('');

  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Communication Center</h1>
        <p className="text-sm text-gray-500 mb-4">In-app messaging, quote discussion, and job-specific chat.</p>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2 mb-4">
          <h2 className="text-sm font-semibold text-gray-900">Active Job Threads</h2>
          {MESSAGE_THREADS.map(thread => (
            <div key={thread.id} className="rounded-xl border border-gray-100 p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-800">{thread.id} • {thread.bookingId}</p>
                {thread.unreadCount > 0 && (
                  <span className="text-[10px] px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">{thread.unreadCount} unread</span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">{thread.participants.join(' ↔ ')}</p>
              <p className="text-[11px] text-gray-600 mt-1">{thread.lastMessage}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Job Chat (BK-2026-00192)</h2>
          <div className="space-y-2">
            {chatMessages.map(message => (
              <div key={message.id} className={`rounded-xl p-3 ${message.sender === 'Customer' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-gray-800">{message.sender}</p>
                  <p className="text-[10px] text-gray-400">{message.time}</p>
                </div>
                <p className="text-xs text-gray-700">{message.text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-dashed border-gray-300 p-3">
            <p className="text-xs text-gray-600 mb-2">Share photo/document</p>
            <input type="file" className="w-full text-xs" />
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type message..."
              className="flex-1 rounded-xl border border-gray-200 p-3 text-sm"
            />
            <button className="px-4 rounded-xl text-white text-sm font-semibold" style={{ background: '#1E88E5' }}>
              Send
            </button>
          </div>
          <p className="text-[11px] text-gray-500">Push + email notifications are triggered on new messages and quote updates.</p>
        </div>
      </div>
    </MobileFrame>
  );
};
