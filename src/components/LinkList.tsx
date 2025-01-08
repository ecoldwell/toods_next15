import { NavigationItem } from './NavigationItem';


export function Navigation({ navigation }: { navigation: NavigationItemProps[] }) {
  return (
    <nav>
      <ul className="flex space-x-4">
        {navigation.map((item, index) => (
          <NavigationItem key={index} item={item} />
        ))}
      </ul>
    </nav>
  );
}
