export default [
  {
    title: 'Pointage',
    to: { name: 'root' },
    icon: { icon: 'ri-home-smile-2-line' },
  },
  // {
  //   title: 'Gestion des élèves',
  //   to: { name: 'apps-user-list' },
  //   icon: { icon: 'ri-user-line' },
  // },
  {
    title: 'Gestion des élèves',
    icon: { icon: 'ri-user-line' },
    children: [
      { title: 'Liste des élèves', to: 'apps-user-list' },
      { title: 'Emplou du temps', to: { name: 'apps-user-view-id', params: { id: 21 } } },
    ],
  },
  {
    title: 'Gestion des professeurs',
    icon: { icon: 'ri-user-line' },
    children: [
      { title: 'Liste des professeurs', to: 'apps-user-list' },
      { title: 'Emplou du temps', to: { name: 'apps-user-view-id', params: { id: 21 } } },
    ],
  },
  {
    title: 'Administration',
    to: { name: 'apps-user-list' },
    icon: { icon: 'ri-user-line' },
  },
]
