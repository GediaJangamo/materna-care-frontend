import {
  Home,
  Calendar,
  FileText,
  MessageSquare,
  Users,
  BarChart3,
  User,
  Building,
  LucideGitBranch,

} from "lucide-react";


export const menuItemsByRole = {
  pregnant: [
    {
      title: "Dashboard",
      href: "/maternaCare/dashboard",
      icon: Home,
    },
    {
      title: "Appointments",
      href: "/maternaCare/appointments",
      icon: Calendar,
    },
    {
      title: "Exams",
      href: "/maternaCare/exams",
      icon: FileText,
    },
    {
      title: "Monitoring",
      href: "/maternaCare/monitoring",
      icon: BarChart3,
    },
    {
      title: "Hospitals",
      href: "/maternaCare/hospitals",
      icon: Building,
    },
    {
      title: "Messages",
      href: "/maternaCare/messages",
      icon: MessageSquare,
    },
    {
      title: "Education",
      href: "/maternaCare/education",
      icon: LucideGitBranch,
    },
    {
      title: "Profile",
      href: "/maternaCare/profile",
      icon: User,
    },
  ],

  professional: [
    {
      title: "Dashboard",
      href: "/maternaCare/dashboard",
      icon: Home,
    },
    
    {
      title: "Patients",
      href: "/maternaCare/patients",
      icon: Users,
    },

    {
      title: "Appointments",
      href: "/maternaCare/appointments",
      icon: Calendar,
    },

     {
      title: "Messages",
      href: "/maternaCare/messages",
      icon: MessageSquare,
    },
    {
      title: "Profile",
      href: "/maternaCare/profile",
      icon: User,
    }
  ],
  admin: [
    {
      title: "Dashboard",
      href: "/maternaCare/dashboard",
      icon: Home,
    },
    
    {
      title: "Patients",
      href: "/maternaCare/patients",
      icon: Users,
    },
    {
      title: "Professionals",
      href: "/maternaCare/professionals",
      icon: Users,
    },
   {
      title: "Hospitals",
      href: "/maternaCare/hospitals",
      icon: Building,
    },
   {
      title: "Reports",
      href: "/maternaCare/reports",
      icon: FileText,
    },
    
    {
      title: "Profile",
      href: "/maternaCare/profile",
      icon: User,
    }
  ]
};
