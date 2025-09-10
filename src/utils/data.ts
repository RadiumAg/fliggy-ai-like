import type { Session } from '@/store/session-store';
import shortid from 'shortid';
import { StreamStatusEnum } from './type';

function dataFormat(data: Record<string, any>, lastSession: Session | undefined): Partial<Session> {
  const content = data.message;
  const lastContent = lastSession?.content.at(-1) || {};

  if (lastContent) {
    if (lastContent.message && data.message) {
      lastContent.message += data.message;
    }
    if (lastContent.components && data.components) {
      lastContent.components = data.components;
    }
  }
  else {

  }

  return {
    role: 'assistant',
    status: StreamStatusEnum.STREAMING,
    agentType: content.agentType,
    systemMessageId: data.systemMessageId,
    userMessageId: data.userMessageId,
    content: [{
      type: 'markdown',
      id: shortid.generate(),
      message: content.message,
    }],
  };
}

export {
  dataFormat,
};
