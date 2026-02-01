import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="admin-layout admin-layout-no-sidebar">
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
