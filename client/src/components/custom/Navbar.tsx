import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';

interface NavBarProps {
    classMenuList: string;
}
export const Navbar = ({ classMenuList }: NavBarProps) => {
    const classMenuItem = 'hover:text-gray-400 transition-colors duration-300';
    return (
        <NavigationMenu>
            <NavigationMenuList className={classMenuList}>
                <NavigationMenuItem className={classMenuItem}>
                    Home
                </NavigationMenuItem>
                <NavigationMenuItem className={classMenuItem}>
                    Sobre
                </NavigationMenuItem>
                <NavigationMenuItem className={classMenuItem}>
                    Contato
                </NavigationMenuItem>
                <NavigationMenuItem className={classMenuItem}>
                    Serviço
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
