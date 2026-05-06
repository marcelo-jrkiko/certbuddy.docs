export interface MenuItem {
  id: string;
  title: string;
  component: string;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface MenuConfig {
  sections: MenuSection[];
}
