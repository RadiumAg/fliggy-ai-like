import type React from 'react';
import type { Session } from '@/store/session-store';

interface Props {
  data: Session['data']
}

const Markdown: React.FC<Props> = (props) => {
  return <div></div>;
};

export default Markdown;
