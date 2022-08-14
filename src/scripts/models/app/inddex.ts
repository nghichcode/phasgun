import {Instance, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"

export const AppModel = types
  .model("AppModel")
  .props({
    score: types.optional(types.number, 0),
    sound: types.optional(types.boolean, true),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setScore: (score: number) => {
      self.score = score
    },
    setSound: (sound: boolean) => {
      self.sound = sound
    },
  }))
  .views(self => ({}))
export type AppType = Instance<typeof AppModel>
