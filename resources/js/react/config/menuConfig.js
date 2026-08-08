/**
 * Menu Configuration
 * Define your sidebar menu structure here
 * 
 * Structure:
 * - icon: Font Awesome class (e.g., 'fa fa-home')
 * - label: Menu item label
 * - route: Navigation path
 * - submenu: Optional array of submenu items
 * - roles: Array of roles allowed to see this menu (e.g., ['admin', 'user'])
 */

export const menuConfig = [
  {
    id: 'dashboard',
    icon: 'fa fa-dashboard',
    label: 'Home',
    roles: ['Viewer', 'System Administrator', 'Accounting', 'Site Manager'],
    submenu: [
      {
        label: 'Records',
        route: '/view/records',
        roles: ['Viewer', 'System Administrator', 'Accounting', 'Site Manager'],
      },

      
    ]
  },
  

 
  
  
  
  
];

// Optional: Function to filter menu by user role
export const getMenuByRole = (userRole) => {
  return menuConfig.filter(item => item.roles.includes(userRole));
};
