enum StreamStatusEnum {
  READY = 'ready',
  STREAMING = 'streaming',
  FINISH = 'finish',
  ERROR = 'error',
  STOP = 'stop',
}

enum AgentTypeEnum {
  AI_PLAN = 'aiPlanV1',
  AI_SEARCH = 'aiSearchV1',
  FLIGHT_AGENT = 'flightAgentV1',
  TRAIN_AGENT = 'trainAgentV1', 
  PHOTO_AGENT = 'photoAgentV1',
}

type MessageType = 'markdown';

export {
  AgentTypeEnum,
  type MessageType,
  StreamStatusEnum,
};
