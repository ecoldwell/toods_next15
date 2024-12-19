import { NavigationMenu } from './Navigation';
import { Navigation } from '@/sanity/types';

type navTypeProps = {
  navigation: Navigation;
}

export function Header({ navigation }: navTypeProps) {
  console.log(navigation, 'hello')

  return (
    <header>
      <NavigationMenu navigation={navigation} />
    </header>
  );
}

export function Footer({ navigation }: navTypeProps) {
  return (
    <footer>
      <NavigationMenu navigation={navigation} />
    </footer>
  );
}