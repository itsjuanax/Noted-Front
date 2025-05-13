export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'page',
    title: 'Pages',
    type: 'group',
    icon: 'icon-navigation',
    children: [

      {
        id: 'todo',
        title: 'To-do list',
        type: 'item',
        classes: 'nav-item',
        url: '/todo',
        icon: 'ti ti-list-check'
      },
      {
        id: 'calendar',
        title: 'Calendar',
        type: 'item',
        classes: 'nav-item',
        url: '/calendar',
        icon: 'ti ti-calendar'
      },
      {
        id: 'sleepTrackers',
        title: 'Sleep Tracker',
        type: 'collapse',
        icon: 'ti ti-bed',
        children: [
          {
            id: 'historial',
            title: 'Historial',
            type: 'item',
            classes: 'nav-item',
            url: '/sleepTrackers/historial',
            icon: 'ti ti-history'
          },
          {
            id: 'addRecord',
            title: 'Agregar Registro',
            type: 'item',
            classes: 'nav-item',
            url: '/sleepTrackers/addRecord',
            icon: 'ti ti-plus'
          }
        ]
      },
      {
        id: 'journal',
        title: 'Journal',
        type: 'collapse',
        icon: 'ti ti-notebook',
        children: [
          {
            id: 'historial',
            title: 'Historial',
            type: 'item',
            classes: 'nav-item',
            url: '/journal/historial',
            icon: 'ti ti-history'
          },
          {
            id: 'addRecord',
            title: 'Agregar Registro',
            type: 'item',
            classes: 'nav-item',
            url: '/journal/addRecord',
            icon: 'ti ti-plus'
          }
        ]
      },
      {
        id: 'waterTracker',
        title: 'Water Tracker',
        type: 'collapse',
        icon: 'ti ti-droplet',
        children: [
          {
            id: 'historial',
            title: 'Historial',
            type: 'item',
            classes: 'nav-item',
            url: '/waterTracker/historial',
            icon: 'ti ti-history'
          },
          {
            id: 'addRecord',
            title: 'Agregar Registro',
            type: 'item',
            classes: 'nav-item',
            url: '/waterTracker/addRecord',
            icon: 'ti ti-plus'
          }
        ]
      },
      {
        id: 'moodWeekly',
        title: 'Mood Tracker Weekly',
        type: 'item',
        classes: 'nav-item',
        url: '/moodWeekly',
        icon: 'ti ti-mood-smile'
      },

      {
        id: 'moodMonthly',
        title: 'Mood Tracker Monthly',
        type: 'item',
        classes: 'nav-item',
        url: '/moodMonthly',
        icon: 'ti ti-masks-theater'
      }
      


    ]


  },
];
