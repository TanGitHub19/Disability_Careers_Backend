import { useEffect, useState } from "react";
import { chatStore } from "../stores/chatStore";
import SideBarSkeleton from "./SidebarSkeleton";
import { Menu } from "lucide-react";
import { authStore } from "../stores/authStore";

const ChatSidebar = () => {
  const { getUsersForSidebar, users, selectedUser, setSelectedUser, isUserLoading } = chatStore();
  const { onlineUsers } = authStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); 


  useEffect(() => {
    getUsersForSidebar();
  }, [getUsersForSidebar]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUserLoading) return <SideBarSkeleton />;


  return (
    <aside
      className={`h-full transition-all duration-200 ${
        isSidebarCollapsed ? "w-20" : "w-72"
      } border-r border-base-300 flex flex-col`}
    >
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Menu
            className="size-6 cursor-pointer"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
          />
          <span
            className={`font-medium ${isSidebarCollapsed ? "hidden" : "block"}`}
          >
            Messages
          </span>
        </div>
        {!isSidebarCollapsed && (
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <span className="text-sm">Show online only</span>
            </label>
            <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
          </div>
        )}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePicture || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {!isSidebarCollapsed && (
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            )}
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
