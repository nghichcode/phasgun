interface FrameData {
  frame: string
  key: string
}

interface FrameConfig {
  start: number
  end: number
  prefix: string
  suffix: string
  pad: number
}

const generateFrameNames = (key: string, config: FrameConfig): FrameData[] => {
  const data: FrameData[] = []
  for (let i = config.start; i <= config.end; i++) {
    data.push({key, frame: `${config.prefix}${String(i).padStart(config.pad, '0')}${config.suffix}`})
  }
  return data
}

export {
  generateFrameNames
}
