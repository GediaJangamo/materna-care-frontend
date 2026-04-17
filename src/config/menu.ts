import {
  Home,
  Calendar,
  FileText,
  MessageSquare,
  Users,
  BarChart3,
  User,

} from "lucide-react";


export const menuItemsByRole = {
  pregnant: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: Calendar,
    },
    {
      title: "Exams",
      href: "/exams",
      icon: FileText,
    },
    {
      title: "Monitoring",
      href: "/monitoring",
      icon: BarChart3,
    },
   
    {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
    },
  
    {
      title: "Profile",
      href: "/profile",
      icon: User,
    },
  ],

  professional: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    
    {
      title: "Patients",
      href: "/patients",
      icon: Users,
    },

    {
      title: "Appointments",
      href: "/appointments",
      icon: Calendar,
    },

     {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User,
    }
  ],
  admin: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    
    {
      title: "Patients",
      href: "/patients",
      icon: Users,
    },
    {
      title: "Professionals",
      href: "/professionals",
      icon: Users,
    },
 
   {
      title: "Reports",
      href: "/reports",
      icon: FileText,
    },
    
    {
      title: "Profile",
      href: "/profile",
      icon: User,
    }
  ]
};
