// lib
import { Shell } from '../components/shell';
import { Home } from '../components/pages/home';

/**
 * Page
 */

export default function Page() {
  return (
    <Shell container={false}>
      <Home />
    </Shell>
  );
}
